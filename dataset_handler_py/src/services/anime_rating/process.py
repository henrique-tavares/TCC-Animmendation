import pandas as pd


def execute(in_path: str, out_path: str):
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
        for anime_chunk in reader:
            anime_chunk: pd.DataFrame = anime_chunk
            anime_chunk = anime_chunk.drop_duplicates(["user_id", "anime_id"])

            anime_chunk["watching_status"] = anime_chunk["watching_status"].map(
                {
                    1: "CURRENTLY_WATCHING",
                    2: "COMPLETED",
                    3: "ON_HOLD",
                    4: "DROPPED",
                    6: "PLAN_TO_WATCH",
                }
            )
            anime_chunk.index += 1
            anime_chunk.to_csv(writer, header=False)
