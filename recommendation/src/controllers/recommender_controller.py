from loguru import logger

from infra.grpc.recommender_pb2 import (
    Empty,
    GroupRecommendationRequest,
    GroupRecommendationResponse,
    IsTrainedResponse,
    Recommendation,
    RecommendationRequest,
    RecommendationResponse,
)
from infra.grpc.recommender_pb2_grpc import RecommenderServicer
from services.recommender_service import RecommenderService
from utils.method_logger import MethodLogger


class RecommenderController(RecommenderServicer):
    def IsTrained(self, request: Empty, context):
        with logger.catch(), MethodLogger("IsTrained"):
            trained = RecommenderService.check_is_trained()
            return IsTrainedResponse(trained=trained)

    def GetGroupRecommendations(self, request: GroupRecommendationRequest, context):
        with logger.catch(), MethodLogger("GetGroupRecommendations"):

            logger.info("aaaaa")
            animes_rec = RecommenderService.group_nearest_neighbors(
                list(request.animeIds), list(request.excludedAnimeIds), request.k
            )
            return GroupRecommendationResponse(
                recommendations=[
                    Recommendation(recommendedAnimeId=anime_id, rank=i + 1)
                    for i, (anime_id, distance) in enumerate(animes_rec)
                ]
            )

    def GetRecommendations(self, request: RecommendationRequest, context):
        with logger.catch(), MethodLogger("GetRecommendations"):

            recommendations = RecommenderService.nearest_neighbors(
                request.animeId, request.k, list(request.excludedAnimeIds)
            )
            return RecommendationResponse(
                animeId=request.animeId,
                recommendations=[
                    Recommendation(recommendedAnimeId=r.recommendedAnimeId, rank=i + 1)
                    for i, r in enumerate(recommendations)
                ],
            )
