FROM python:3.10.7-slim

ENV PYTHONUNBUFFERED=1

ARG kaggle_dataset
ARG kaggle_key

ENV KAGGLE_USERNAME=${kaggle_dataset}
ENV KAGGLE_KEY=${kaggle_key}

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    gcc \
    make \
    wget \
    time

WORKDIR /tcc_animmendation/dataset_handler

COPY . .

RUN make setup && make dataset

CMD [ "make", "run" ]