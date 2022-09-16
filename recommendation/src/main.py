import logging

from server import serve
from utils.env import Env

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.DEBUG if Env.DEBUG else logging.INFO, format="[%(levelname)s] %(asctime)s -> %(message)s"
    )
    serve(port=50051, max_workers=10)
