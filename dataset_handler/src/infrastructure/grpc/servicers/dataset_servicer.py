import logging
from pathlib import Path
import subprocess
import threading

from infrastructure.grpc.pb.dataset_handler_pb2 import Void


from usecases import shutdown_server, parse_datasets
from ..pb.dataset_handler_pb2_grpc import DatasetServiceServicer


class DatasetServicer(DatasetServiceServicer):
    def __init__(self, shutdown_event: threading.Event) -> None:
        self._shutdown_event = shutdown_event

    def Start(self, request, context):
        logging.info("Start method invoked")

        datasets = list(Path("./data/datasets").glob("*.csv"))
        if len(datasets) == 0:
            subprocess.run(["make", "dataset"])

        parse_datasets.execute()
        return Void()

    def Shutdown(self, request, context):
        logging.info("Shutdown method invoked")
        shutdown_server.execute(self._shutdown_event)
        return Void()
