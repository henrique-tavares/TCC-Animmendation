from dataclasses import dataclass
from typing import Optional


@dataclass
class RawAnime:
    mal_id: int
    name: str
    score: Optional[float]
    genres: Optional[str]
    japanese_name: Optional[str]
    type: Optional[str]
    episodes: Optional[int]
    aired: Optional[str]
    studios: Optional[str]
    source: Optional[str]
    rating: Optional[str]
    popularity: Optional[int]
    watching: Optional[int]
