import logging

from server import serve

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(asctime)s -> %(message)s")
    serve(port=50051, max_workers=10)
