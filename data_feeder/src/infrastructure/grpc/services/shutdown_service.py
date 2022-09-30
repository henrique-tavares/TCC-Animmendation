import logging
from os import path
import threading
from ..pb.shutdown_pb2_grpc import ShutdownServiceServicer
from ..pb import shutdown_pb2

from pathlib import Path


class ShutdownServicer(ShutdownServiceServicer):
    def __init__(self, shutdown_event: threading.Event) -> None:
        self._shutdown_event = shutdown_event

    def Shutdown(self, request, context):
        self._shutdown_event.set()

        datasets = Path(path.join(path.curdir, "data")).glob("*.csv")
        for dataset in datasets:
            try:
                dataset.unlink()
            except OSError as e:
                logging.error(e.strerror)

        return shutdown_pb2.Void()  # type: ignore
