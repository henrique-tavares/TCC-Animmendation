import pandas as pd

from . import parse_array, transform_dates


def execute(in_path: str, out_path: str):
    anime_df = pd.read_csv(
        in_path,
        usecols=[
            "MAL_ID",
            "Name",
            "Score",
            "Genres",
            "Japanese name",
            "Type",
            "Episodes",
            "Aired",
            "Studios",
            "Source",
            "Duration",
            "Rating",
            "Popularity",
            "Ranked",
            "Watching",
        ],
        na_values="Unknown",
    ).rename(
        columns={
            "MAL_ID": "malId",
            "Name": "name",
            "Score": "score",
            "Genres": "genres",
            "Japanese name": "japaneseName",
            "Type": "type",
            "Episodes": "episodes",
            "Aired": "aired",
            "Studios": "studios",
            "Source": "source",
            "Duration": "duration",
            "Rating": "ageClassification",
            "Popularity": "popularity",
            "Ranked": "ranked",
            "Watching": "watching",
        }
    )

    anime_df = anime_df.apply(
        transform_dates.execute,
        axis="columns",
    ).drop(columns=["aired"])

    anime_df["genres"] = anime_df["genres"].map(parse_array.execute)
    anime_df["studios"] = anime_df["studios"].map(parse_array.execute)
    anime_df["episodes"] = anime_df["episodes"].astype(float).astype("Int32")
    anime_df["ranked"] = anime_df["ranked"].astype(float).astype("Int32")

    anime_df.to_csv(out_path, index=False)
