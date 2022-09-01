import logging
from pathlib import Path

import pandas as pd


def load_csv(path: str) -> pd.DataFrame:
    path = Path(path)
    try:
        data = pd.read_csv(path)
    except FileNotFoundError as e:
        logging.error(e)
        exit(1)

    return data


def save_csv(data: pd.DataFrame, path: str) -> None:
    try:
        data.to_csv(Path(path), index=False)
    except OSError as e:
        logging.error(e)
        exit(1)
