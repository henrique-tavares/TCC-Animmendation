from dataclasses import dataclass
import enum
from typing import Optional


class WatchingStatus(enum.Enum):
    CURRENTLY_WATCHING = 1
    COMPLETED = 2
    ON_HOLD = 3
    DROPPED = 4
    PLAN_TO_WATCH = 6


@dataclass
class RawAnimeRating:
    anime_id: int
    user_id: int
    rating: int
    watching_status: Optional[WatchingStatus] = None
    watched_episodes: Optional[int] = None
