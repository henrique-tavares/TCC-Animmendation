from dataclasses import dataclass
from os import getenv


@dataclass(frozen=True)
class Env:
    anime_data_dir: str = getenv("ANIME_DATA_DIR", "")
    anime_rating_dir: str = getenv("ANIME_RATING_DIR", "")
    myanimelist_client_id: str = getenv("MYANIMELIST_CLIENT_ID", "")
