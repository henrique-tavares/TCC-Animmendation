#!/bin/bash

python -m grpc_tools.protoc \
  -I ./src/infrastructure/grpc/protos \
  --python_out=./src/infrastructure/grpc/pb \
  --grpc_python_out=./src/infrastructure/grpc/pb \
  ./src/infrastructure/grpc/protos/anime.proto 