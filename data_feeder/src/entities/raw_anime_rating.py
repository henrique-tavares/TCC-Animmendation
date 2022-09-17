from dataclasses import dataclass


@dataclass
class RawAnimeRating:
    anime_id: int
    user_id: int
    rating: int
