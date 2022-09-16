FROM python:3.10

ARG user

COPY .devcontainer/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN apt-get -y update
RUN groupadd -r ${user} && useradd -r -g ${user} ${user}
USER ${user}

WORKDIR /home/${user}/app