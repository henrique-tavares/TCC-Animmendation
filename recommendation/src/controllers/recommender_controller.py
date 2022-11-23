from typing import List

from loguru import logger

from infra.grpc.recommender_pb2 import (RecommendationRequest,
                                        RecommendationResponse, TrainRequest,
                                        TrainResponse)
from infra.grpc.recommender_pb2_grpc import RecommenderServicer
from services.recommender_service import RecommenderService


class RecommenderController(RecommenderServicer):
    def Train(self, request: TrainRequest, context):
        with logger.catch(default=TrainResponse(ok=False)):
            logger.info("Train method invoked!")
            RecommenderService.train(
                dataset_path=request.filePath, total_anime=request.totalAnime, max_user_id=request.maxUserId
            )
            logger.info("Train method finished!")
            return TrainResponse(ok=True)

    def GetRecommendations(self, request: RecommendationRequest, context):
        with logger.catch():
            logger.info("GetRecommendations method invoked!")

            parsed_animes_request: List[RecommenderService.AnimeRecommendationInput] = [
                {
                    "id": anime.id,
                    "rating": anime.rating,
                }
                for anime in request.animes
            ]

            for (anime, recommendations) in RecommenderService.recommend(parsed_animes_request, request.k):
                yield RecommendationResponse(
                    animeId=anime, recommendations=[r.recommendedAnimeId for r in recommendations]
                )

            logger.info("GetRecommendations method finished!")
