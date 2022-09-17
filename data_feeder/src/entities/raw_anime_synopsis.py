from dataclasses import dataclass


@dataclass
class RawAnimeSynopsis:
    mal_id: int
    synopsis: str
