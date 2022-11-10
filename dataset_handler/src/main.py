import logging

from usecases import parse_datasets

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(asctime)s -> %(message)s")
    try:
        logging.info("Service started")
        parse_datasets.execute()
        logging.info("Service finished")
    except KeyboardInterrupt:
        logging.info("Program interrupted")
