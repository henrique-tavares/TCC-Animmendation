use convert_case::{Case, Casing};
use polars::prelude::{DataType, NullValues, PolarsResult, Schema};
use polars_lazy::prelude::{col, LazyCsvReader, LazyFrame};

use super::date_transform;

pub fn exec(anime_path: &str, anime_synopsis_path: &str) -> PolarsResult<LazyFrame> {
    let lazy_anime_df = process_anime(anime_path)?;
    let lazy_anime_synopsis = process_anime_synopsis(anime_synopsis_path)?;

    let mut lazy_anime_merged_df =
        lazy_anime_df.left_join(lazy_anime_synopsis, col("malId"), col("malId"));

    lazy_anime_merged_df = date_transform::exec(lazy_anime_merged_df);

    Ok(lazy_anime_merged_df)
}

fn process_anime(path: &str) -> PolarsResult<LazyFrame> {
    let anime_useful_columns = [
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
        "Ranked",
        "Popularity",
        "Watching",
    ];

    let anime_useless_columns = [
        "English name",
        "Premiered",
        "Producers",
        "Licensors",
        "Duration",
        "Members",
        "Favorites",
        "Completed",
        "On-Hold",
        "Dropped",
        "Plan to Watch",
        "Score-10",
        "Score-9",
        "Score-8",
        "Score-7",
        "Score-6",
        "Score-5",
        "Score-4",
        "Score-3",
        "Score-2",
        "Score-1",
    ];

    let mut anime_schema = Schema::new();
    anime_schema.with_column("MAL_ID".to_string(), DataType::UInt32);
    anime_schema.with_column("Score".to_string(), DataType::Float32);
    anime_schema.with_column("Episodes".to_string(), DataType::UInt32);
    anime_schema.with_column("Popularity".to_string(), DataType::UInt32);
    anime_schema.with_column("Watching".to_string(), DataType::UInt32);

    let anime_df = LazyCsvReader::new(path)
        .has_header(true)
        .with_null_values(Some(NullValues::AllColumnsSingle("Unknown".to_string())))
        .with_dtype_overwrite(Some(&anime_schema))
        .finish()?
        .drop_columns(anime_useless_columns)
        .rename(
            &anime_useful_columns,
            anime_useful_columns
                .iter()
                .map(|col| col.to_case(Case::Camel))
                .collect::<Vec<_>>(),
        )
        .rename(["rating"], ["ageClassification"])
        .with_column(col("ranked").cast(DataType::UInt32));

    Ok(anime_df)
}

fn process_anime_synopsis(path: &str) -> PolarsResult<LazyFrame> {
    let mut anime_synopsis_schema = Schema::new();
    anime_synopsis_schema.with_column("MAL_ID".to_string(), DataType::UInt32);

    let anime_synopsis_df = LazyCsvReader::new(path)
        .has_header(true)
        .with_null_values(Some(NullValues::AllColumnsSingle("Unknown".to_string())))
        .with_dtype_overwrite(Some(&anime_synopsis_schema))
        .finish()?
        .drop_columns(vec!["Name", "Score", "Genres"])
        .rename(["MAL_ID", "sypnopsis"], ["malId", "synopsis"]);

    Ok(anime_synopsis_df)
}
