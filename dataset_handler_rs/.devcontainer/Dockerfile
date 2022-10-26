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


FROM rust:1.64

ARG user
ARG uid

RUN apt-get -y update && \
    apt-get install sudo time

COPY .devcontainer/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN useradd -m -u ${uid} -g sudo -s /bin/bash ${user} && \
    echo "${user} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /home/${user}/TCC-Animmendation/dataset_handler
USER ${user}

COPY --from=downloader /datasets /tmp/raw_datasets

CMD ["tail", "-f", "/dev/null"]
