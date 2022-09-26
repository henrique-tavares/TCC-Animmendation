import threading
from ..pb.shutdown_pb2_grpc import ShutdownServiceServicer
from ..pb import shutdown_pb2


class ShutdownServicer(ShutdownServiceServicer):
    def __init__(self, shutdown_event: threading.Event) -> None:
        self._shutdown_event = shutdown_event

    def Shutdown(self, request, context):
        self._shutdown_event.set()

        return shutdown_pb2.Void()  # type: ignore
