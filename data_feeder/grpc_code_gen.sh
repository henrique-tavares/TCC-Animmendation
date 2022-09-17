#!/bin/bash

proto_files=("raw_anime.proto" "shutdown.proto")

for proto_file in ${proto_files[@]}; do
  python -m grpc_tools.protoc \
    -I ./src/infrastructure/grpc/protos \
    --python_out=./src/infrastructure/grpc/pb \
    --grpc_python_out=./src/infrastructure/grpc/pb \
    ./src/infrastructure/grpc/protos/${proto_file}
done
