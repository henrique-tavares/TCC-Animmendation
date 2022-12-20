from typing import Dict, List

import numpy as np
import numpy.typing as npt
import pandas as pd
import pysftp
import scipy.sparse as sps
from loguru import logger

from entities.env import Env
from utils.prisma import prisma


class KNN:
    def __init__(self, total_anime: int, total_users: int) -> None:
        self._total_anime = total_anime
        self._total_users = total_users

        self._data: Dict[int, sps.csr_array] = dict()
        self._norms: Dict[int, float] = dict()

    @staticmethod
    def _distance_cosine(a: sps.csr_array, b: sps.csr_array, a_norm: float, b_norm: float) -> float:
        return 1 - ((a * b).sum() / (a_norm * b_norm))

    @staticmethod
    def _parse_postgres_array(raw_array: str, dtype: npt.DTypeLike):
        return np.fromiter((int(e) for e in raw_array[1:-1].split(",")), dtype)

    def _stream_dataset(self, remote_data_dir: str):
        with pysftp.Connection(
            host=Env.sftp_host, port=Env.sftp_port, username=Env.sftp_username, password=Env.sftp_password
        ) as sftp:
            anime_rating_files: List[str] = sftp.listdir(remote_data_dir)
            totalUsers = prisma.metadata.find_unique(where={"key": "totalUsers"})
            if totalUsers is None:
                raise RuntimeError("Metadata 'totalUsers' is not set")

            for file in anime_rating_files:
                logger.info(f"feeding anime '{file}'")
                sftp.get(f"{remote_data_dir}/{file}", f"datasets/{file}", preserve_mtime=True)

                anime_id = int(file.split(".")[0])
                anime_data = pd.read_csv(f"datasets/{file}")
                sparse_ratings = sps.csr_array(
                    (
                        anime_data["score"].to_numpy(),
                        (np.zeros(len(anime_data["user_id"])), anime_data["user_id"].to_numpy()),
                    ),
                    shape=(1, int(totalUsers.value)),
                    dtype=np.uint8,
                )

                yield (anime_id, sparse_ratings)

    def feed(self, remote_data_dir: str):
        for (anime_id, sparse_ratings) in self._stream_dataset(remote_data_dir):
            self._data[anime_id] = sparse_ratings
            self._norms[anime_id] = sps.linalg.norm(sparse_ratings)  # type: ignore

    def distance(self, anime_1: int, anime_2: int) -> float:
        return self._distance_cosine(
            self._data[anime_1], self._data[anime_2], self._norms[anime_1], self._norms[anime_2]
        )

    def get_animes(self):
        return self._data.keys()
