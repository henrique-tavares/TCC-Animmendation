import math
from itertools import combinations
from multiprocessing import Pipe, Process
from multiprocessing.connection import Connection
from typing import List, Tuple, TypedDict

from more_itertools import ichunked
from prisma.types import RecommendationCreateWithoutRelationsInput

from entities.knn import KNN
from utils.prisma import prisma
from utils.timer import Timer


class RecommenderService:
    class AnimeRecommendationInput(TypedDict):
        id: int
        rating: int

    @classmethod
    def _db_worker(cls, conn: Connection):
        while True:
            value: List[Tuple[int, int, float]] | None = conn.recv()
            if value is None:
                break
            recommendations: List[RecommendationCreateWithoutRelationsInput] = list()
            for anime_a, anime_b, distance in value:
                recommendations.append(
                    RecommendationCreateWithoutRelationsInput(
                        baseAnimeId=anime_a, recommendedAnimeId=anime_b, distance=distance
                    )
                )
                recommendations.append(
                    RecommendationCreateWithoutRelationsInput(
                        baseAnimeId=anime_b, recommendedAnimeId=anime_a, distance=distance
                    )
                )

            with Timer(f"{len(recommendations)} rows inserted!"):
                prisma.recommendation.create_many(data=recommendations, skip_duplicates=True)

    @classmethod
    def train(cls, dataset_path: str, total_anime: int, max_user_id: int):
        knn = KNN(total_anime, max_user_id)

        with Timer("knn feeded successfully"):
            knn.feed(dataset_path)

        anime_ids = knn.get_animes()
        anime_pairs = combinations(anime_ids, 2)
        chunksize = 100000
        total_iterations = math.ceil(math.comb(len(anime_ids), 2) / chunksize)

        parent_conn, child_conn = Pipe()
        worker_db = Process(target=cls._db_worker, args=(child_conn,))
        worker_db.start()

        for i, chunk in enumerate(ichunked(anime_pairs, chunksize)):
            with Timer(f"{i+1}/{total_iterations} ({((i+1)/total_iterations):.2f}%) - {chunksize} calculations"):
                buffer = [(a, b, knn.distance(a, b)) for a, b in chunk]
                parent_conn.send(buffer)

        parent_conn.send(None)
        worker_db.join()

    @classmethod
    def _nearest_neighbors(cls, anime_id: int, n: int):
        return prisma.recommendation.find_many(
            where={
                "baseAnimeId": anime_id,
            },
            order={
                "baseAnimeId": "asc",
            },
            take=n,
        )

    @classmethod
    def recommend(cls, animes: List[AnimeRecommendationInput], n: int):
        for anime in animes:
            yield (anime["id"], cls._nearest_neighbors(anime["id"], n))
