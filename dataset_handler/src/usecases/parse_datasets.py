from os import chmod, makedirs
from pathlib import Path
from typing import Callable

from loguru import logger

from entities.env import Env
from services.anime import process as animeProcess
from services.anime_rating import process as animeRatingProcess


def execute():
    with logger.catch():
        _handle_data_csv(
            "./data/raw_datasets/animelist.csv",
            Env.anime_rating_dir,
            animeRatingProcess.execute,
        )

        _handle_data_csv(
            f"./data/datasets/{Env.anime_rating_dir}/data.csv",
            Env.anime_data_dir,
            animeProcess.execute,
        )


def _handle_data_csv(
    in_path: str,
    data_dir: str,
    callback: Callable[[str, str], None],
):
    if Path(f"./data/datasets/{data_dir}/.initialized").exists():
        logger.info(f"Data for {data_dir} has already been initialized, skipping...")
        return

    logger.info(f"Started parsing {data_dir}/data.csv")
    makedirs(f"./data/datasets/{data_dir}", exist_ok=True)
    callback(in_path, f"./data/datasets/{data_dir}/data.csv")
    chmod(f"./data/datasets/{data_dir}/data.csv", 0o777)
    logger.info(f"Finished parsing {data_dir}/data.csv")
