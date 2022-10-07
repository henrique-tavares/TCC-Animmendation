from typing import Dict
from entities.raw_anime import RawAnime
from entities.raw_anime_synopsis import RawAnimeSynopsis
from entities.raw_anime_rating import RawAnimeRating
from utils.common import handle_integer_conversion, handle_unknown, handle_float_conversion


def parse_raw_anime(anime_dict: Dict[str, str]):
    raw_anime = RawAnime(
        mal_id=int(anime_dict["MAL_ID"]),
        name=anime_dict["Name"],
        score=handle_float_conversion(anime_dict["Score"]),
        genres=handle_unknown(anime_dict["Genres"]),
        japanese_name=handle_unknown(anime_dict["Japanese name"]),
        type=handle_unknown(anime_dict["Type"]),
        episodes=handle_integer_conversion(anime_dict["Episodes"]),
        aired=handle_unknown(anime_dict["Aired"]),
        studios=handle_unknown(anime_dict["Studios"]),
        source=handle_unknown(anime_dict["Source"]),
        rating=handle_unknown(anime_dict["Rating"]),
        popularity=handle_integer_conversion(anime_dict["Popularity"]),
        watching=handle_integer_conversion(anime_dict["Watching"]),
    )

    return raw_anime


def parse_raw_anime_with_synopsis(anime_synopsis_dict: Dict[str, str]):
    anime_synopsis = RawAnimeSynopsis(
        mal_id=int(anime_synopsis_dict["MAL_ID"]), synopsis=anime_synopsis_dict["sypnopsis"]
    )

    return anime_synopsis


def parse_raw_anime_rating(anime_rating_dict: Dict[str, str]):
    anime_rating = RawAnimeRating(
        anime_id=int(anime_rating_dict["anime_id"]),
        user_id=int(anime_rating_dict["user_id"]),
        rating=int(anime_rating_dict["rating"]),
        watching_status=handle_integer_conversion(anime_rating_dict["watching_status"]),
        watched_episodes=handle_integer_conversion(anime_rating_dict["watched_episodes"]),
    )

    return anime_rating
