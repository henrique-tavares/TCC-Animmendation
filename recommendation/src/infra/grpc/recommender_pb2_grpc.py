# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from . import recommender_pb2 as recommender__pb2


class RecommenderStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.IsTrained = channel.unary_unary(
            "/recommender.Recommender/IsTrained",
            request_serializer=recommender__pb2.Empty.SerializeToString,
            response_deserializer=recommender__pb2.IsTrainedResponse.FromString,
        )
        self.GetRecommendations = channel.unary_unary(
            "/recommender.Recommender/GetRecommendations",
            request_serializer=recommender__pb2.RecommendationRequest.SerializeToString,
            response_deserializer=recommender__pb2.RecommendationResponse.FromString,
        )
        self.GetGroupRecommendations = channel.unary_unary(
            "/recommender.Recommender/GetGroupRecommendations",
            request_serializer=recommender__pb2.GroupRecommendationRequest.SerializeToString,
            response_deserializer=recommender__pb2.GroupRecommendationResponse.FromString,
        )


class RecommenderServicer(object):
    """Missing associated documentation comment in .proto file."""

    def IsTrained(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def GetRecommendations(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")

    def GetGroupRecommendations(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details("Method not implemented!")
        raise NotImplementedError("Method not implemented!")


def add_RecommenderServicer_to_server(servicer, server):
    rpc_method_handlers = {
        "IsTrained": grpc.unary_unary_rpc_method_handler(
            servicer.IsTrained,
            request_deserializer=recommender__pb2.Empty.FromString,
            response_serializer=recommender__pb2.IsTrainedResponse.SerializeToString,
        ),
        "GetRecommendations": grpc.unary_unary_rpc_method_handler(
            servicer.GetRecommendations,
            request_deserializer=recommender__pb2.RecommendationRequest.FromString,
            response_serializer=recommender__pb2.RecommendationResponse.SerializeToString,
        ),
        "GetGroupRecommendations": grpc.unary_unary_rpc_method_handler(
            servicer.GetGroupRecommendations,
            request_deserializer=recommender__pb2.GroupRecommendationRequest.FromString,
            response_serializer=recommender__pb2.GroupRecommendationResponse.SerializeToString,
        ),
    }
    generic_handler = grpc.method_handlers_generic_handler("recommender.Recommender", rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


# This class is part of an EXPERIMENTAL API.
class Recommender(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def IsTrained(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/recommender.Recommender/IsTrained",
            recommender__pb2.Empty.SerializeToString,
            recommender__pb2.IsTrainedResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def GetRecommendations(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/recommender.Recommender/GetRecommendations",
            recommender__pb2.RecommendationRequest.SerializeToString,
            recommender__pb2.RecommendationResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )

    @staticmethod
    def GetGroupRecommendations(
        request,
        target,
        options=(),
        channel_credentials=None,
        call_credentials=None,
        insecure=False,
        compression=None,
        wait_for_ready=None,
        timeout=None,
        metadata=None,
    ):
        return grpc.experimental.unary_unary(
            request,
            target,
            "/recommender.Recommender/GetGroupRecommendations",
            recommender__pb2.GroupRecommendationRequest.SerializeToString,
            recommender__pb2.GroupRecommendationResponse.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
        )
