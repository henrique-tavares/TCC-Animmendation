from loguru import logger
from usecases import parse_datasets

if __name__ == "__main__":
    try:
        logger.info("Service started")
        parse_datasets.execute()
        logger.info("Service finished")
    except KeyboardInterrupt:
        print("\r")
        logger.info("Program interrupted")
