from collections import defaultdict
import itertools
import math
from typing import DefaultDict, List

from loguru import logger
import numpy as np

from utils.prisma import prisma


class RecommenderService:
    @classmethod
    def check_is_trained(cls):
        total_anime_metadata = prisma.metadata.find_unique(where={"key": "totalAnime"})
        if total_anime_metadata is None:
            return False

        total_anime = int(total_anime_metadata.value)

        expected_rows = math.comb(total_anime, 2) * 2
        actual_rows = prisma.recommendation.count()

        if expected_rows != actual_rows:
            logger.info(f"expected: {expected_rows} | actual: {actual_rows}")
            return False

        return True

    @classmethod
    def nearest_neighbors(cls, anime_id: int, n: int):
        return prisma.recommendation.find_many(
            where={
                "baseAnimeId": anime_id,
            },
            order={
                "distance": "asc",
            },
            take=n if n != -1 else None,
        )

    @classmethod
    def group_nearest_neighbors(cls, anime_ids: List[int], n: int):
        animes_recommendations = {anime_id: cls.nearest_neighbors(anime_id, 1000) for anime_id in anime_ids}
        recommendations_dict: DefaultDict[int, List[float]] = defaultdict(list)

        for anime_recommendation in itertools.chain(*animes_recommendations.values()):
            recommendations_dict[anime_recommendation.recommendedAnimeId].append(anime_recommendation.distance)

        group_recommendations = {k: float(np.average(v)) for k, v in recommendations_dict.items()}
        sorted_recommendations = [k for k, _ in sorted(group_recommendations.items(), key=lambda item: item[1])]
        return sorted_recommendations[:n]
