import threading
from ..pb.shutdown_pb2_grpc import ShutdownServiceServicer
from ..pb.shutdown_pb2 import Void


class ShutdownServicer(ShutdownServiceServicer):
    def __init__(self, shutdown_event: threading.Event) -> None:
        self._shutdown_event = shutdown_event

    def Shutdown(self, request, context):
        self._shutdown_event.set()

        return Void()
