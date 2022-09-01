from os import getenv
from pathlib import Path

from data.handlers import filter_anime_rating, handle_anime_data, handle_anime_rating_merge, handle_rating_data
from data.io import load_csv, save_csv

ANIME_CSV_PATH = getenv("ANIME_CSV_PATH")
RATING_CSV_PATH = getenv("RATING_CSV_PATH")
USER_COUNT_THRESHOLD = int(getenv("USER_COUNT_THRESHOLD"))
ANIME_RATINGS_CSV_PATH = getenv("ANIME_RATINGS_CSV_PATH")


def prepare_data() -> None:
    anime_data = load_csv(Path(ANIME_CSV_PATH))
    rating_data = load_csv(Path(RATING_CSV_PATH))

    anime_data = handle_anime_data(anime_data)
    rating_data = handle_rating_data(rating_data)

    anime_rating_data = handle_anime_rating_merge(anime_data, rating_data)
    anime_rating_data = filter_anime_rating(anime_rating_data, USER_COUNT_THRESHOLD)

    anime_rating_path = Path(ANIME_RATINGS_CSV_PATH)
    anime_rating_path.parent.mkdir(parents=True, exist_ok=True)

    save_csv(anime_rating_data, anime_rating_path)
