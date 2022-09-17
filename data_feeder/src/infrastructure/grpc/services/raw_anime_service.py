from grpc import ServicerContext

from ..pb.raw_anime_pb2_grpc import RawAnimeServiceServicer


class RawAnimeServicer(RawAnimeServiceServicer):
    def FetchRawAnimes(self, request, context: ServicerContext):
        pass

    def FetchRawAnimesSynopsis(self, request, context: ServicerContext):
        pass

    def FetchRawAnimeRatings(self, request, context: ServicerContext):
        pass
