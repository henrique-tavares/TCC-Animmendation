from loguru import logger
from services.train_service import TrainService

from utils.prisma import prisma


def main():
    logger.info("Training invoked")
    if not TrainService.should_train():
        logger.info("Training data is up to date, exiting...")
        return

    TrainService.handle_metadata()
    logger.info("Metadata loaded from server")
    prisma.recommendation.delete_many(where={})
    TrainService.train("/data/anime_ratings")


if __name__ == "__main__":
    prisma.connect()
    main()
    prisma.disconnect()
