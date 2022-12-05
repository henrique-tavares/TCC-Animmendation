import configparser
import math
import os
from itertools import combinations
from multiprocessing import Pipe, Process
from multiprocessing.connection import Connection
from typing import List, Tuple, cast

import pysftp
from more_itertools import ichunked
from prisma.types import RecommendationCreateWithoutRelationsInput

from entities.env import Env
from entities.knn import KNN
from utils.prisma import prisma
from utils.timer import Timer


class TrainService:
    @classmethod
    def _set_metadata(cls, key: str, value: str):
        prisma.metadata.upsert(
            where={
                "key": key,
            },
            data={
                "create": {
                    "key": key,
                    "value": value,
                },
                "update": {"value": value},
            },
        )

    @classmethod
    def should_train(cls):
        with pysftp.Connection(
            host=Env.sftp_host, port=Env.sftp_port, username=Env.sftp_username, password=Env.sftp_password
        ) as sftp:

            file_stats = sftp.stat("data/anime_ratings/1.csv")
            lastTrainingTracking = prisma.tracking.find_unique(where={"key": "last_trained"})

            return lastTrainingTracking is None or int(lastTrainingTracking.timeStamp.timestamp()) < cast(
                int, file_stats.st_mtime
            )

    @classmethod
    def handle_metadata(cls):
        with pysftp.Connection(
            "host.docker.internal",
            username="animmendation",
            password="12345678",
            port=2222,
        ) as sftp:

            os.makedirs("config", exist_ok=True)
            sftp.get("data/metadata.ini", "config/metadata.ini")

            config = configparser.ConfigParser()
            config.read("config/metadata.ini")

            total_animes = config.getint("animes", "total_animes")
            max_user_id = config.getint("user_anime_ratings", "max_user_id")

            cls._set_metadata("totalAnime", str(total_animes))
            cls._set_metadata("totalUsers", str(max_user_id + 1))

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
                        baseAnimeId=int(anime_a), recommendedAnimeId=int(anime_b), distance=distance
                    )
                )
                recommendations.append(
                    RecommendationCreateWithoutRelationsInput(
                        baseAnimeId=int(anime_b), recommendedAnimeId=int(anime_a), distance=distance
                    )
                )

            with Timer(f"{len(recommendations)} rows inserted!"):
                prisma.recommendation.create_many(data=recommendations, skip_duplicates=True)

    @classmethod
    def train(cls, remote_data_dir: str):
        total_anime_metadata = prisma.metadata.find_unique(where={"key": "totalAnime"})
        total_users_metadata = prisma.metadata.find_unique(where={"key": "totalUsers"})

        if total_anime_metadata is None or total_users_metadata is None:
            return False

        total_anime = int(total_anime_metadata.value)
        total_users = int(total_users_metadata.value)

        knn = KNN(total_anime, total_users)

        with Timer("starting to feed knn", "knn feeded successfully"):
            knn.feed(remote_data_dir)

        anime_ids = knn.get_animes()
        anime_pairs = combinations(anime_ids, 2)
        chunksize = 100000
        total_iterations = math.ceil(math.comb(len(anime_ids), 2) / chunksize)

        parent_conn, child_conn = Pipe()
        worker_db = Process(target=cls._db_worker, args=(child_conn,))
        worker_db.start()

        for i, chunk in enumerate(ichunked(anime_pairs, chunksize)):
            with Timer(f"{i+1}/{total_iterations} ({((i+1)/total_iterations*100):.2f}%) - {chunksize} calculations"):
                buffer = [(a, b, knn.distance(a, b)) for a, b in chunk]
                parent_conn.send(buffer)

        parent_conn.send(None)
        worker_db.join()

        return True
