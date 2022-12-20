import math
from typing import List, Tuple, TypedDict, cast

from loguru import logger

from utils.prisma import prisma
from utils.pg_conn import pg_conn


class PartialRecommendation(TypedDict):
    recommendedAnimeId: int
    distance: float


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
    def nearest_neighbors(cls, anime_id: int, n: int, excluded_anime_ids: List[int]):
        return prisma.recommendation.find_many(
            where={
                "baseAnimeId": anime_id,
                "recommendedAnimeId": {
                    "not_in": excluded_anime_ids,
                },
            },
            order={
                "distance": "asc",
            },
            take=n if n != -1 else None,
        )

    # @classmethod
    # def group_nearest_neighbors(cls, anime_ids: List[int], n: int, excluded_anime_ids: List[int]):
    #     animes_recommendations = {
    #         anime_id: cls.nearest_neighbors(anime_id, -1, excluded_anime_ids + anime_ids) for anime_id in anime_ids
    #     }
    #     recommendations_dict: DefaultDict[int, List[float]] = defaultdict(list)

    #     for anime_recommendation in itertools.chain(*animes_recommendations.values()):
    #         if anime_recommendation.recommendedAnimeId in anime_ids:
    #             continue

    #         recommendations_dict[anime_recommendation.recommendedAnimeId].append(anime_recommendation.distance)

    #     group_recommendations = {k: float(np.average(v)) for k, v in recommendations_dict.items()}
    #     sorted_recommendations = [k for k, _ in sorted(group_recommendations.items(), key=lambda item: item[1])]
    #     return sorted_recommendations[:n]
    # @classmethod
    # def group_nearest_neighbors(cls, anime_ids: List[int], n: int, excluded_anime_ids: List[int]):

    #     a = prisma.query_raw(
    #         f"""
    #         select "recommendedAnimeId", avg(distance) as avg_distance from "Recommendation"
    #         where "baseAnimeId" in ({str(anime_ids).strip("[]")})
    #         and "recommendedAnimeId" not in ({str(excluded_anime_ids).strip("[]")})
    #         group by "recommendedAnimeId"
    #         order by avg_distance
    #         """
    #     )

    #     return []
    @classmethod
    def group_nearest_neighbors(cls, anime_ids: List[int], excluded_anime_ids: List[int], n: int | None = None):

        with pg_conn:
            with pg_conn.cursor() as cur:
                cur.execute(
                    f"""
                    select "recommendedAnimeId", avg(distance) as distance from "Recommendation"
                    where "baseAnimeId" = any(%s)
                    and "recommendedAnimeId" <> all(%s)
                    group by "recommendedAnimeId"
                    order by distance
                    {f'limit {n}' if n else ''}
                    """,
                    [anime_ids, excluded_anime_ids],
                )
                return cast(List[Tuple[int, float]], cur.fetchall())
