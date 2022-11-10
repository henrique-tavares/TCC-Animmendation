FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1

ARG kaggle_username
ARG kaggle_key

ENV KAGGLE_USERNAME=${kaggle_username}
ENV KAGGLE_KEY=${kaggle_key}

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    gcc \
    curl \
    wget \
    unzip

RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b usr/local/bin

WORKDIR /tcc_animmendation/dataset_handler

COPY . .

RUN task setup
RUN task dataset

CMD [ "task", "run" ]