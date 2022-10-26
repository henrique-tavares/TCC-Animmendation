FROM python:3.10-slim as downloader

RUN apt-get -y update \
    && apt-get install unzip

ARG kaggle_username
ARG kaggle_key

ENV KAGGLE_USERNAME=${kaggle_username}
ENV KAGGLE_KEY=${kaggle_key}

RUN pip install kaggle

RUN mkdir -p /scripts && \
    mkdir -p /datasets

COPY build_scripts/download_datasets.sh /scripts
RUN chmod +x /scripts/download_datasets.sh
RUN /scripts/download_datasets.sh "/datasets"

FROM rust:1.64 as builder

ENV RUST_BACKTRACE=1

WORKDIR /tcc_animmendation/dataset_handler

COPY . .

RUN cargo install --path .


FROM debian:stable-slim

COPY --from=builder /usr/local/cargo/bin/dataset_handler /usr/local/bin/dataset_handler

WORKDIR /tcc_animmendation/dataset_handler
COPY --from=downloader /datasets ./data/raw_datasets

CMD ["dataset_handler"]