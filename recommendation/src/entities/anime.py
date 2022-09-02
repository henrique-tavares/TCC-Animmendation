from dataclasses import dataclass


@dataclass
class Anime:
    id: int
    name: str
    score: float
    genres: str
    japanese_name: str
    type: str
    episodes: int
    broadcast_start_date: str
    broadcast_end_date: str
    season_premiere: str
    studios: str
    source: str
    age_classification: str
    popularity: int
    watching: int
    synopsis: str
