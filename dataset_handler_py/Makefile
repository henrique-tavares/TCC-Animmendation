run:
	python src/main.py

setup:
	pip install -r requirements.txt

freeze:
	pip freeze > requirements.txt

install:
	pip install $(pkg)
	pip freeze > requirements.txt

out_datasets := data/raw_datasets
dataset:
	@chmod +x ./scripts/download_datasets.sh
	@mkdir -p $(out_datasets)
	scripts/download_datasets.sh $(out_datasets)

clean:
	rm -rf ${out_datasets}/*.csv
