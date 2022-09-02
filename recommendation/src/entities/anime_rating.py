from dataclasses import dataclass
from enum import Enum


class WatchingStatus(Enum):
    UNKNOWN = 0
    CURRENTLY_WATCHING = 1
    COMPLETED = 2
    ON_HOLD = 3
    DROPPED = 4
    PLAN_TO_WATCH = 5


@dataclass()
class AnimeRating:
    user_id: int
    anime_id: int
    rating: int
    watching_status: WatchingStatus
