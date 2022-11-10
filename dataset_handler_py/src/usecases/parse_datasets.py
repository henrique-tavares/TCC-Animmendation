import logging
import traceback
from pathlib import Path
from typing import Callable
from os import makedirs, chmod


from entities.env import Env
from services.anime import process as animeProcess
from services.anime_rating import process as animeRatingProcess


def execute():
    try:
        _handle_data_csv(
            "./data/raw_datasets/anime.csv",
            Env.anime_data_dir,
            animeProcess.execute,
        )

        _handle_data_csv(
            "./data/raw_datasets/animelist.csv",
            Env.anime_rating_dir,
            animeRatingProcess.execute,
        )
    except Exception as e:
        logging.error(f"Unknown exception: ({type(e)}) {e}")
        traceback.print_exc()
        return


def _handle_data_csv(
    in_path: str,
    data_dir: str,
    callback: Callable[[str, str], None],
):
    if Path(f"./data/datasets/{data_dir}/.initialized").exists():
        logging.info(f"Data for {data_dir} has already been initialized, skipping...")
        return

    logging.info(f"Started parsing {data_dir}/data.csv")
    makedirs(f"./data/datasets/{data_dir}", exist_ok=True)
    callback(in_path, f"./data/datasets/{data_dir}/data.csv")
    chmod(f"./data/datasets/{data_dir}/data.csv", 0o777)
    logging.info(f"Finished parsing {data_dir}/data.csv")
