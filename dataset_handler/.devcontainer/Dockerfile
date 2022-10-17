FROM python:3.10.7-slim

ENV PYTHONUNBUFFERED=1

ARG user
ARG uid

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
    gcc \
    git \
    make \
    wget \
    time \
    sudo \
    unzip
    
ENV GIT_DISCOVERY_ACROSS_FILESYSTEM=1

COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN useradd -m -u ${uid} -g sudo -s /bin/bash ${user} \
    && echo "${user} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

WORKDIR /home/${user}/TCC-Animmendation/dataset_handler
USER ${user}
COPY .bashrc /home/${user}/.bashrc

ENV PATH="$PATH:/home/${user}/.local/bin"

CMD [ "tail", "-f", "/dev/null" ]