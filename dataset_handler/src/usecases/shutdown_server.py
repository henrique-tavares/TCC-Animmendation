import logging
from pathlib import Path
import threading


def execute(shutdown_event: threading.Event):
    shutdown_event.set()

    datasets = Path("./data/raw_datasets").glob("*.csv")
    for dataset in datasets:
        try:
            dataset.unlink()
        except OSError as e:
            logging.error(e.strerror)
