from csv import DictReader
from os import path
from grpc import ServicerContext

from services.anime.parsers import parse_raw_anime_rating, parse_raw_anime_with_synopsis, parse_raw_anime


from ..pb.raw_anime_pb2_grpc import RawAnimeServiceServicer
from ..pb import raw_anime_pb2


class RawAnimeServicer(RawAnimeServiceServicer):
    def FetchRawAnimes(self, request, context: ServicerContext):
        with open(path.join(path.curdir, "data", "anime.csv")) as csv_file:
            anime_reader = DictReader(csv_file)
            for row in anime_reader:
                raw_anime = parse_raw_anime(row)
                raw_anime_dict = vars(raw_anime)
                yield raw_anime_pb2.RawAnime(**raw_anime_dict)  # type: ignore

    def FetchRawAnimesSynopsis(self, request, context: ServicerContext):
        with open(path.join(path.curdir, "data", "anime_with_synopsis.csv")) as csv_file:
            anime_synopsis_reader = DictReader(csv_file)
            for row in anime_synopsis_reader:
                raw_anime_synopsis = parse_raw_anime_with_synopsis(row)
                raw_anime_synopsis_dict = vars(raw_anime_synopsis)
                yield raw_anime_pb2.RawAnimeSynopsis(**raw_anime_synopsis_dict)  # type: ignore

    def FetchRawAnimeRatings(self, request, context: ServicerContext):
        with open(path.join(path.curdir, "data", "animelist.csv")) as csv_file:
            anime_ratings_reader = DictReader(csv_file)
            for row in anime_ratings_reader:
                raw_anime_rating = parse_raw_anime_rating(row)
                raw_anime_rating_dict = vars(raw_anime_rating)
                yield raw_anime_pb2.RawAnimeRating(**raw_anime_rating_dict)  # type: ignore
