from typing import Iterator

from grpc import ServicerContext

from src.entities.anime import Anime
from src.entities.anime_rating import AnimeRating

from ..pb.anime_pb2_grpc import AnimeServiceServicer


class AnimeServicer(AnimeServiceServicer):
    def FetchAnime(self, request_iterator: Iterator[Anime], context: ServicerContext):
        pass

    def FetchAnimeRating(self, request_iterator: Iterator[AnimeRating], context: ServicerContext):
        pass
