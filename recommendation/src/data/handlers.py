import numpy as np
import pandas as pd


def handle_anime_data(anime_data: pd.DataFrame) -> pd.DataFrame:
    anime_data.rename(columns={"name": "title"}, inplace=True)
    anime_data.dropna(axis="index", subset=["anime_id", "title", "genre", "rating"], inplace=True)
    return anime_data


def handle_rating_data(rating_data: pd.DataFrame) -> pd.DataFrame:
    rating_data.replace({-1: np.NAN}, inplace=True)
    rating_data.dropna(axis="index", subset=["rating"], inplace=True)
    return rating_data


def handle_anime_rating_merge(anime_data: pd.DataFrame, rating_data: pd.DataFrame) -> pd.DataFrame:
    anime_rating_data = pd.merge(
        left=anime_data,
        right=rating_data,
        how="inner",
        on="anime_id",
        suffixes=("_anime", "_user"),
    )
    anime_rating_data.rename(columns={"rating_anime": "overall_rating", "rating_user": "user_rating"}, inplace=True)
    return anime_rating_data


def filter_anime_rating(anime_rating: pd.DataFrame, user_threshold: int) -> pd.DataFrame:
    user_counts = anime_rating["user_id"].value_counts()
    thresholded_user_counts = user_counts[user_counts >= user_threshold]

    filtered_anime_rating = anime_rating[anime_rating["user_id"].isin(thresholded_user_counts.index)]
    return filtered_anime_rating
