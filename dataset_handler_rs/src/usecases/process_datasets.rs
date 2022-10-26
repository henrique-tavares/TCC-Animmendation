use std::fs::File;

use log::{debug, info};
use polars::prelude::{CsvWriter, PolarsResult, SerWriter};

use crate::services;

pub fn exec() -> PolarsResult<()> {
    info!("Started processing anime_data...");
    handle_anime(
        (
            "data/raw_datasets/anime.csv",
            "data/raw_datasets/anime_with_synopsis.csv",
        ),
        "data/datasets/anime_data.csv",
    )?;
    info!("Finished processing anime_data.");

    info!("Started processing anime_rating...");
    handle_anime_rating(
        "data/raw_datasets/animelist.csv",
        "data/datasets/anime_rating.csv",
    )?;
    info!("Finished processing anime_rating.");

    Ok(())
}

fn handle_anime(in_paths: (&str, &str), out_path: &str) -> PolarsResult<()> {
    let lazy_anime_df = services::anime::process::exec(in_paths.0, in_paths.1)?;

    let mut anime_df = lazy_anime_df.collect()?;

    debug!("{:?}", anime_df);
    debug!("{:?}", anime_df.get_column_names());

    let anime_out_file = File::create(out_path).unwrap();
    CsvWriter::new(anime_out_file)
        .has_header(true)
        .finish(&mut anime_df)
        .unwrap();

    Ok(())
}

fn handle_anime_rating(in_path: &str, out_path: &str) -> PolarsResult<()> {
    let lazy_anime_rating_df = services::anime_rating::process::exec(in_path)?;

    let mut anime_rating_df = lazy_anime_rating_df.collect()?;

    debug!("{:?}", anime_rating_df);
    debug!("{:?}", anime_rating_df.get_column_names());

    let anime_rating_out_file = File::create(out_path).unwrap();
    CsvWriter::new(anime_rating_out_file)
        .has_header(true)
        .with_datetime_format(Some("%FT%T".to_string()))
        .finish(&mut anime_rating_df)
        .unwrap();
    Ok(())
}
