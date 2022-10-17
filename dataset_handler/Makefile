run:
	python src/main.py

setup:
	pip install -r requirements.txt

freeze:
	pip freeze > requirements.txt

out_datasets := data/raw_datasets
dataset:
	@chmod +x ./scripts/download_datasets.sh
	@mkdir -p $(out_datasets)
	scripts/download_datasets.sh $(out_datasets)

proto_files_raw = $(shell find -type f -name '*.proto')
proto_files = $(foreach file,$(proto_files_raw),$(realpath $(file)))
grpc_path = $(realpath ./src/infrastructure/grpc)

define grpc_gen
	scripts/generate_proto.sh $(1) $(2)
endef

grpc: $(proto_files) $(grpc_path)
	@chmod +x ./scripts/generate_proto.sh
	@mkdir -p $(grpc_path)/pb
	$(foreach proto_file,$(proto_files),$(call grpc_gen,$(grpc_path),$(proto_file)))

clean:
	rm -rf ${out_datasets}/*.csv
