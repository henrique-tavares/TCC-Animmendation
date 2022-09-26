from dataclasses import dataclass
from typing import Optional


@dataclass
class RawAnime:
    mal_id: int
    name: str
    score: Optional[float] = None
    genres: Optional[str] = None
    japanese_name: Optional[str] = None
    type: Optional[str] = None
    episodes: Optional[int] = None
    aired: Optional[str] = None
    studios: Optional[str] = None
    source: Optional[str] = None
    rating: Optional[str] = None
    popularity: Optional[int] = None
    watching: Optional[int] = None
