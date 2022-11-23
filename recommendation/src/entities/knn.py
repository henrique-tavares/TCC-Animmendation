from pathlib import Path
from typing import Dict, Iterable, cast

import numpy as np
import numpy.typing as npt
import pandas as pd
import scipy.sparse as sps


class KNN:
    def __init__(self, total_anime: int, max_user_id: int) -> None:
        self._total_anime = total_anime
        self._max_user_id = max_user_id

        self._data: Dict[int, sps.csr_array] = dict()
        self._norms: Dict[int, float] = dict()

    @staticmethod
    def _distance_cosine(a: sps.csr_array, b: sps.csr_array, a_norm: float, b_norm: float) -> float:
        return 1 - ((a * b).sum() / (a_norm * b_norm))

    @staticmethod
    def _parse_postgres_array(raw_array: str, dtype: npt.DTypeLike):
        return np.fromiter((int(e) for e in raw_array[1:-1].split(",")), dtype)

    def _stream_dataset(self, file_path: str):
        with pd.read_csv(Path("./datasets", file_path), chunksize=1) as reader:
            for chunk in cast(Iterable[pd.DataFrame], reader):
                anime_id = cast(int, chunk.iloc[0]["animeId"])
                parsed_ratings = self._parse_postgres_array(chunk.iloc[0]["ratings"], np.uint8)
                parsed_user_ids = self._parse_postgres_array(chunk.iloc[0]["userIds"], np.uint32)
                sparse_ratings = sps.csr_array(
                    (
                        parsed_ratings,
                        (np.zeros(len(parsed_user_ids)), parsed_user_ids),
                    ),
                    shape=(1, self._max_user_id),
                    dtype=np.uint8,
                )
                yield (anime_id, sparse_ratings)

    def feed(self, file_path: str):
        for (anime_id, sparse_ratings) in self._stream_dataset(file_path):
            self._data[anime_id] = sparse_ratings
            self._norms[anime_id] = sps.linalg.norm(sparse_ratings)  # type: ignore

    def distance(self, anime_1: int, anime_2: int) -> float:
        return self._distance_cosine(
            self._data[anime_1], self._data[anime_2], self._norms[anime_1], self._norms[anime_2]
        )

    def get_animes(self):
        return self._data.keys()
