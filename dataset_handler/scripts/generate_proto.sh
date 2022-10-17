#!/bin/bash

grpc_path="$1"
proto_file="$2"

python -m grpc_tools.protoc \
  -I ${grpc_path}/protos \
  --python_out=${grpc_path}/pb \
  --grpc_python_out=${grpc_path}/pb \
  --pyi_out=${grpc_path}/pb \
  ${proto_file}
