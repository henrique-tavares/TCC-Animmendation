run:
	python src/main.py

setup:
	pip install -r requirements.txt

freeze:
	pip freeze > requirements.txt

clean:
	sudo find -path '*/__pycache__/*' -delete
	sudo find -type d -name '__pycache__' -delete
	sudo find -type f -name '*.proto' -delete

proto_files_raw = $(shell find -type f -name '*.proto')
proto_files = $(foreach file,$(proto_files_raw),$(realpath $(file)))
grpc_path = $(realpath ./src/infrastructure/grpc)

grpc: $(proto_files) $(grpc_path)
	@for proto_file in $(proto_files); do \
		python -m grpc_tools.protoc \
    		-I $(grpc_path)/protos \
    		--python_out=$(grpc_path)/pb \
    		--grpc_python_out=$(grpc_path)/pb \
    		$$proto_file; \
		echo "Generated $$proto_file"; \
	done
