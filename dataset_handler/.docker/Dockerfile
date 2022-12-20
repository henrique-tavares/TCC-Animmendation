FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1

ARG kaggle_username
ARG kaggle_key

ENV KAGGLE_USERNAME=${kaggle_username}
ENV KAGGLE_KEY=${kaggle_key}
ENV PYTHONPATH=/tcc_animmendation/dataset_handler/__pypackages__/3.10/lib

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    gcc \
    curl \
    wget \
    unzip

RUN pip install pdm

WORKDIR /tcc_animmendation/dataset_handler

COPY . .

RUN pdm install
RUN chmod +x scripts/download_datasets.sh && \
    mkdir -p data/raw_datasets && \
    scripts/download_datasets.sh data/raw_datasets

CMD [ "python", "src/main.py" ]