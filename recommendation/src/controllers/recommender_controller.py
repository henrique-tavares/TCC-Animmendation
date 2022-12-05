from typing import List

from loguru import logger

from infra.grpc.recommender_pb2 import (
    RecommendationRequest,
    RecommendationResponse,
    Empty,
    IsTrainedResponse,
    GroupRecommendationRequest,
    GroupRecommendationResponse,
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
        with logger.catch(), MethodLogger("GetBatchedRecommendations"):

            animes_id = RecommenderService.group_nearest_neighbors(list(request.animeIds), request.k)

            return GroupRecommendationResponse(animeIds=animes_id)

    def GetRecommendations(self, request: RecommendationRequest, context):
        with logger.catch(), MethodLogger("GetRecommendations"):

            recommendations = RecommenderService.nearest_neighbors(request.animeId, request.k)
            return RecommendationResponse(
                animeId=request.animeId,
                recommendations=[
                    RecommendationResponse.Recommendation(recommendedAnimeId=r.recommendedAnimeId, rank=i + 1)
                    for i, r in enumerate(recommendations)
                ],
            )
