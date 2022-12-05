from time import time

from loguru import logger


class Timer:
    def __init__(self, start_msg: str, finish_msg: str | None = None) -> None:
        self.start_msg = start_msg if finish_msg is not None else None
        self.finish_msg = finish_msg if finish_msg is not None else start_msg

    def __enter__(self):
        self.start = time()
        if self.start_msg:
            logger.opt(depth=1).info(f"{self.start_msg}")

    def __exit__(self, exc_type, exc_value, exc_tb):
        self.end = time()
        logger.opt(depth=1).info(f"{self.finish_msg} [{(self.end-self.start):.4f}s]")
