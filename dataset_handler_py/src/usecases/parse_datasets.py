import logging
from os import getenv
from typing import Tuple
import numpy as np
import pandas as pd
import psycopg2

from services.anime import transform_dates, parse_array


def execute():
    try:
        pg_conn = getenv("PGCONN", "")

        db_anime_df = pd.read_sql('SELECT * FROM public."Anime" LIMIT 1', pg_conn)
        if not db_anime_df.empty:
            logging.info("Database table 'Anime' already has data, skipping...")
            return
        logging.info("Started parsing anime_data")
        _handle_anime_csv(
            ("./data/raw_datasets/anime.csv", "./data/raw_datasets/anime_with_synopsis.csv"),
            "./data/datasets/anime_data.csv",
        )
        logging.info("Finished parsing anime_data")

        db_anime_rating_df = pd.read_sql('SELECT * FROM public."AnimeRating" LIMIT 1', pg_conn)
        if not db_anime_rating_df.empty:
            logging.info("Database table 'AnimeRating' already has data, skipping...")
            return
        logging.info("Started parsing anime_rating")
        _handle_anime_rating_csv("./data/raw_datasets/animelist.csv", "./data/datasets/anime_rating.csv")
        logging.info("Finished parsing anime_rating")
    except psycopg2.OperationalError:
        logging.error("Error connecting to database")
        return
    except Exception as e:
        logging.error(f"Unknown exception: {e}")
        return


def _handle_anime_csv(in_path: Tuple[str, str], out_path: str):
    anime_df = pd.read_csv(
        in_path[0],
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
            "Rating",
            "Popularity",
            "Watching",
        ],
        index_col="MAL_ID",
    )

    anime_synopsis_df = pd.read_csv(in_path[1], usecols=["MAL_ID", "sypnopsis"], index_col="MAL_ID")
    anime_synopsis_df.rename(columns={"sypnopsis": "synopsis"}, inplace=True)

    anime_merged_df = pd.merge(anime_df, anime_synopsis_df, on="MAL_ID", how="left")  # type: ignore

    anime_merged_df.replace("Unknown", np.nan, inplace=True)

    anime_full_df = anime_merged_df.apply(transform_dates.execute, axis="columns",).drop(
        columns=["Aired"]  # type: ignore
    )  # type: ignore

    anime_full_df["Genres"] = anime_full_df["Genres"].map(parse_array.execute)
    anime_full_df["Studios"] = anime_full_df["Studios"].map(parse_array.execute)

    anime_full_df.rename(
        columns={
            "Name": "name",
            "Score": "score",
            "Genres": "genres",
            "Japanese name": "japaneseName",
            "Type": "type",
            "Episodes": "episodes",
            "Aired": "aired",
            "Studios": "studios",
            "Source": "source",
            "Rating": "ageClassification",
            "Popularity": "popularity",
            "Watching": "watching",
        },
        inplace=True,
    )
    anime_full_df.rename_axis("malId", inplace=True)
    anime_full_df.to_csv(out_path)


def _handle_anime_rating_csv(in_path: str, out_path: str):
    anime_rating_df = pd.read_csv(
        in_path,
        index_col=["user_id", "anime_id"],
        dtype={"rating": "uint8", "watched_episodes": "uint16", "watching_status": "uint8"},
    )

    anime_rating_df["watching_status"] = anime_rating_df["watching_status"].map(  # type: ignore
        {
            1: "CURRENTLY_WATCHING",
            2: "COMPLETED",
            3: "ON_HOLD",
            4: "DROPPED",
            6: "PLAN_TO_WATCH",
        }
    )

    anime_rating_df.rename(
        columns={
            "user_id": "userId",
            "anime_id": "animeId",
            "watching_status": "watchingStatus",
            "watched_episodes": "watchedEpisodes",
        },
        inplace=True,
    )

    anime_rating_df = anime_rating_df[~anime_rating_df.index.duplicated(keep="first")]

    anime_rating_df.to_csv(out_path)
