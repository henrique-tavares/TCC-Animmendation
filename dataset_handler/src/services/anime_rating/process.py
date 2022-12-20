import math
from typing import Iterable, cast
import pandas as pd
from loguru import logger


def execute(in_path: str, out_path: str):
    row_count = count_lines(in_path)
    chunksize = 100_000
    steps = math.ceil(row_count / chunksize)

    with pd.read_csv(
        in_path,
        dtype={
            "user_id": "uint32",
            "anime_id": "uint16",
            "rating": "uint8",
            "watching_status": "uint8",
            "watched_episodes": "uint16",
        },
        chunksize=100_000,
    ) as reader, open(out_path, "w") as writer:
        writer.write("id,userId,animeId,rating,watchingStatus,watchedEpisodes\n")
        for step, anime_chunk in enumerate(cast(Iterable[pd.DataFrame], reader)):
            logger.info(f"Parsing chunk {step + 1}/{steps} ({((step + 1) / steps * 100):.2f}%)")
            anime_chunk: pd.DataFrame = anime_chunk
            anime_chunk = anime_chunk.drop_duplicates(["user_id", "anime_id"])
            anime_chunk = anime_chunk[(anime_chunk["watching_status"] != 6) & (anime_chunk["rating"] != 0)]

            anime_chunk.index += 1
            anime_chunk[["user_id", "anime_id", "rating"]].to_csv(writer, header=False)


def count_lines(file_name):
    with open(file_name, "r") as fp:
        line_count = 0
        for i, _ in enumerate(fp):
            line_count = i + 1
        return line_count
