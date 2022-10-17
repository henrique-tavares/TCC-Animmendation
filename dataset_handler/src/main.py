import logging

from usecases import start_server

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(asctime)s -> %(message)s")
    try:
        start_server.execute(port=50052, max_workers=10)
    except KeyboardInterrupt:
        logging.info("Program interrupted")
