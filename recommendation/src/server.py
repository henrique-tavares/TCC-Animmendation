import logging
from concurrent import futures

import grpc

from infrastructure.grpc.pb import anime_pb2_grpc
from infrastructure.grpc.services import anime_service


def serve(port: int, max_workers: int):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))

    anime_pb2_grpc.add_AnimeServiceServicer_to_server(anime_service.AnimeServicer(), server)

    server.add_insecure_port(f"[::]:{port}")

    server.start()
    logging.info(f"Server started on port: {port}")
    server.wait_for_termination()
