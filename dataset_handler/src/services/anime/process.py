import csv
from typing import Dict, Iterable, List, Tuple, cast, Any
import pandas as pd
import requests
from loguru import logger
from retry import retry

from entities.env import Env


def execute(in_path: str, out_path: str):
    anime_ids_set = set()

    with pd.read_csv(in_path, usecols=["animeId"], chunksize=100_000) as reader:
        for anime_rating_chunk in cast(Iterable[pd.DataFrame], reader):
            anime_ids_set |= set(anime_rating_chunk["animeId"])

    animes: List[Dict[str, str | int]] = []
    num_anime = len(anime_ids_set)

    for i, anime_id in enumerate(anime_ids_set):

        status, anime_json = _get_anime_data(anime_id, i + 1, num_anime)

        if status == 404:
            logger.info(f"anime '{anime_id}' not found")
            continue

        anime_csv = {
            "id": anime_json["id"],
            "title": anime_json["title"],
            "picture": anime_json["main_picture"]["large"] if "main_picture" in anime_json else None,
            "alternative_titles": f"{{{', '.join(value for key, value in anime_json['alternative_titles'].items() if key != 'synonyms')}}}"
            if "alternative_titles" in anime_json
            else None,
            "start_date": anime_json.get("start_date"),
            "end_date": anime_json.get("end_date"),
            "synopsis": str(anime_json.get("synopsis")).replace("\n\n", ""),
            "score": anime_json.get("mean"),
            "rank": anime_json.get("rank"),
            "popularity": anime_json.get("popularity"),
            "media_type": anime_json.get("media_type"),
            "genres": f"{{{', '.join(genre['name'] for genre in anime_json['genres'])}}}"
            if "genres" in anime_json
            else None,
            "num_episodes": anime_json.get("num_episodes"),
            "start_season": f"{anime_json['start_season']['season']} {anime_json['start_season']['year']}"
            if "start_season" in anime_json
            else None,
            "source": anime_json.get("source"),
            "age_classification": anime_json.get("rating"),
            "studios": f"{{{', '.join(genre['name'] for genre in anime_json['studios'])}}}"
            if "studios" in anime_json
            else None,
            "related_anime": f"""{{{', '.join(f"{related_anime['relation_type']} {related_anime['node']['id']}" for related_anime in anime_json['related_anime'])}}}"""
            if "related_anime" in anime_json
            else None,
        }
        animes.append(anime_csv)

    with open(out_path, "w", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(animes[0].keys()))
        writer.writeheader()
        writer.writerows(animes)


@retry(exceptions=RuntimeError, delay=5, logger=None)  # type: ignore
def _get_anime_data(anime_id: int, step: int, total: int) -> Tuple[int, Dict[str, Any]]:
    try:
        logger.info(f"fetching anime '{anime_id}' {step}/{total} ({(step / total * 100):.2f}%)")
        r: requests.Response = requests.get(
            url=f"https://api.myanimelist.net/v2/anime/{anime_id}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,nsfw,,media_type,status,genres,num_episodes,start_season,source,rating,studios,related_anime",
            headers={"X-MAL-CLIENT-ID": Env.myanimelist_client_id},
        )
        return (cast(int, r.status_code), r.json())
    except requests.exceptions.JSONDecodeError:
        logger.exception(f"failed fetching for anime '{anime_id}'. Trying again in 5 seconds.")
        raise RuntimeError()
