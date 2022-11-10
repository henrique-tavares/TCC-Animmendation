import numpy as np
import pandas as pd
from . import parse_date


def execute(raw_anime_row: pd.Series):
    aired = raw_anime_row["aired"]

    new_series = _aired_transform(aired if aired is not np.nan else None)

    raw_anime_row = pd.concat(
        [
            raw_anime_row,
            pd.Series(
                new_series,
                index=[
                    "broadcastStartDate",
                    "broadcastEndDate",
                    "releaseDate",
                ],
            ),
        ]
    )

    return raw_anime_row


def _aired_transform(aired: str | None):
    if aired is None:
        return [np.nan] * 3

    raw_start_date, raw_end_date = (aired.split(" to ") + [""])[:2]
    start_date = parse_date.execute(raw_start_date)
    end_date = parse_date.execute(raw_end_date)

    if end_date is None:
        return [np.nan, np.nan, start_date]

    return [start_date, end_date, np.nan]
