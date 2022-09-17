import logging
import threading
import grpc
from concurrent import futures

from infrastructure.grpc.pb import raw_anime_pb2_grpc, shutdown_pb2_grpc
from infrastructure.grpc.services import raw_anime_service, shutdown_service


def serve(port: int, max_workers: int):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))

    shutdown_event = threading.Event()

    raw_anime_pb2_grpc.add_RawAnimeServiceServicer_to_server(raw_anime_service.RawAnimeServicer(), server)
    shutdown_pb2_grpc.add_ShutdownServiceServicer_to_server(shutdown_service.ShutdownServicer(shutdown_event), server)

    server.add_insecure_port(f"[::]:{port}")

    server.start()
    logging.info(f"Server started on port: {port}")
    shutdown_event.wait()
    server.stop(None)
    logging.info("Server shutdown")
