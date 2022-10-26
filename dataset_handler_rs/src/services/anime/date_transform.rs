use std::collections::HashMap;

use chrono::NaiveDateTime;

use polars::prelude::IntoSeries;
use polars::{
    prelude::{PolarsResult, Utf8Chunked},
    series::Series,
};
use polars_lazy::prelude::{col, LazyFrame, SpecialEq};

pub fn exec(anime_df: LazyFrame) -> LazyFrame {
    let mut aired_transform_mapper = HashMap::new();
    aired_transform_mapper.insert("broadcastStartDate", &AiredTransform::StartDate);
    aired_transform_mapper.insert("broadcastEndDate", &AiredTransform::EndDate);
    aired_transform_mapper.insert("releasedDate", &AiredTransform::ReleaseDate);

    anime_df
        .with_columns(
            aired_transform_mapper
                .into_iter()
                .map(|(column_name, transform_type)| {
                    col("aired")
                        .map(
                            |aired_series| aired_map_transform(aired_series, transform_type),
                            SpecialEq::from_type(polars::prelude::DataType::Utf8),
                        )
                        .alias(column_name)
                })
                .collect::<Vec<_>>(),
        )
        .drop_columns(["aired"])
}

enum AiredTransform {
    StartDate,
    EndDate,
    ReleaseDate,
}

fn aired_map_transform(
    aired_series: Series,
    transform_type: &AiredTransform,
) -> PolarsResult<Series> {
    let transformed_series = aired_series
        .utf8()
        .unwrap()
        .into_iter()
        .map(|aired| aired.and_then(|aired| aired_process(aired, &transform_type)))
        .collect::<Utf8Chunked>()
        .into_series();

    Ok(transformed_series)
}

fn aired_process(aired: &str, transform_type: &AiredTransform) -> Option<String> {
    let aired_splitted = aired.split(" to ").collect::<Vec<_>>();

    match (transform_type, aired_splitted.as_slice()) {
        (AiredTransform::StartDate, [start_date, _end_date]) => parse_date(start_date),
        (AiredTransform::EndDate, [_start_date, end_date]) => parse_date(end_date),
        (AiredTransform::ReleaseDate, [released_date]) => parse_date(released_date),
        _ => None,
    }
}

fn parse_date(raw_date: &str) -> Option<String> {
    let formatted_date = match raw_date
        .replace(',', "")
        .split(" ")
        .collect::<Vec<_>>()
        .as_slice()
    {
        [month, day, year] => format!("{}-{}-{} 00:00:00", year, month, day),
        [month, year] => format!("{}-{}-1 00:00:00", year, month),
        [year] => format!("{}-Jan-1 00:00:00", year),
        _ => "".to_string(),
    };

    if let Ok(parsed_date) = NaiveDateTime::parse_from_str(&formatted_date, "%Y-%b-%e %H:%M:%S") {
        return Some(parsed_date.format("%Y-%m-%dT%H:%M:%S").to_string());
    }

    None
}
