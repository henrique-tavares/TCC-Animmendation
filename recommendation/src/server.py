import signal
from concurrent import futures

import grpc
from loguru import logger

from controllers.recommender_controller import RecommenderController
from infra.grpc.recommender_pb2_grpc import add_RecommenderServicer_to_server
from utils.prisma import prisma

if __name__ == "__main__":
    prisma.connect()

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

    add_RecommenderServicer_to_server(RecommenderController(), server)

    server.add_insecure_port("[::]:50051")

    def signal_handler(sig, frame):
        logger.info("Closing the server...")
        server.stop(None).wait()

    server.start()
    logger.info("Server stated on port 50051")
    signal.signal(signal.SIGINT, signal_handler)

    server.wait_for_termination()
    prisma.disconnect()
