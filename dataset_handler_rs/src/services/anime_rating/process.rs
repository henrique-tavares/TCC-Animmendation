use convert_case::{Case, Casing};
use polars::{
    prelude::{DataType, NullValues, PolarsResult, Schema, Utf8Chunked},
    series::IntoSeries,
};
use polars_lazy::prelude::{col, LazyCsvReader, LazyFrame, SpecialEq};

pub fn exec(anime_rating_path: &str) -> PolarsResult<LazyFrame> {
    let columns = [
        "user_id",
        "anime_id",
        "rating",
        "watching_status",
        "watched_episodes",
    ];

    let mut anime_rating_schema = Schema::new();
    anime_rating_schema.with_column("user_id".to_string(), DataType::UInt32);
    anime_rating_schema.with_column("anime_id".to_string(), DataType::UInt32);
    anime_rating_schema.with_column("rating".to_string(), DataType::UInt32);
    anime_rating_schema.with_column("watching_status".to_string(), DataType::UInt32);
    anime_rating_schema.with_column("watched_episodes".to_string(), DataType::UInt32);

    let lazy_anime_rating_df = LazyCsvReader::new(anime_rating_path)
        .low_memory(true)
        .has_header(true)
        .with_null_values(Some(NullValues::AllColumnsSingle("Unknown".to_string())))
        .with_dtype_overwrite(Some(&anime_rating_schema))
        .finish()?
        .rename(
            &columns,
            columns
                .iter()
                .map(|column| column.to_case(Case::Camel))
                .collect::<Vec<_>>(),
        )
        .with_column(col("watchingStatus").map(
            |status| {
                status.u32().and_then(|series| {
                    Ok(series
                        .into_iter()
                        .map(|status| {
                            status.and_then(|status| match status {
                                1 => Some("CURRENTLY_WATCHING"),
                                2 => Some("COMPLETED"),
                                3 => Some("ON_HOLD"),
                                4 => Some("DROPPED"),
                                6 => Some("PLAN_TO_WATCH"),
                                _ => None,
                            })
                        })
                        .collect::<Utf8Chunked>()
                        .into_series())
                })
            },
            SpecialEq::from_type(polars::prelude::DataType::Utf8),
        ));

    Ok(lazy_anime_rating_df)
}
