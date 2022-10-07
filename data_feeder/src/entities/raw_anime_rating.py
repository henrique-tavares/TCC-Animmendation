from dataclasses import dataclass
from typing import Optional


@dataclass
class RawAnimeRating:
    anime_id: int
    user_id: int
    rating: int
    watching_status: Optional[int] = None
    watched_episodes: Optional[int] = None
