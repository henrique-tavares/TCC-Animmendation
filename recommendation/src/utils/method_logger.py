from time import time
from loguru import logger
from datetime import timedelta


class MethodLogger:
    def __init__(self, method: str) -> None:
        self.method = method

    def __enter__(self):
        self.start = time()
        logger.opt(depth=1).info(f"{self.method} method invoked!")

    def __exit__(self, exc_type, exc_value, exc_tb):
        self.end = time()
        logger.opt(depth=1).info(
            f"{self.method} method finished! Took {str(timedelta(seconds=(self.end - self.start)))}"
        )
