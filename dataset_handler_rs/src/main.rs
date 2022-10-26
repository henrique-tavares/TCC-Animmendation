use std::path::Path;

use log::{error, info};

mod services;
mod usecases;

fn main() {
    env_logger::builder()
        .target(env_logger::Target::Stdout)
        .init();

    match Path::new("./data/datasets/.initialized").try_exists() {
        Ok(true) => {
            info!("The dataset has been already initialized! Exiting...");
            return;
        }
        _ => (),
    }

    match usecases::process_datasets::exec() {
        Ok(()) => (),
        Err(err) => panic!("{}", err),
    }
}
