from time import time

from loguru import logger


class Timer:
    def __init__(self, msg: str) -> None:
        self.msg = msg

    def __enter__(self):
        self.start = time()

    def __exit__(self, exc_type, exc_value, exc_tb):
        self.end = time()
        logger.opt(depth=1).info(f"{self.msg} [{(self.end-self.start):.4f}s]")
