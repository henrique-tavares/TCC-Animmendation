import logging
import threading
from concurrent import futures

import grpc

from infrastructure.grpc.pb.dataset_handler_pb2_grpc import add_DatasetServiceServicer_to_server
from infrastructure.grpc.servicers.dataset_servicer import DatasetServicer


def execute(port: int, max_workers: int):
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))

    shutdown_event = threading.Event()

    add_DatasetServiceServicer_to_server(DatasetServicer(shutdown_event), server)

    server.add_insecure_port(f"[::]:{port}")

    server.start()
    logging.info(f"Server started on port: {port}")
    shutdown_event.wait()
    server.stop(None)
    logging.info("Server shutdown")
