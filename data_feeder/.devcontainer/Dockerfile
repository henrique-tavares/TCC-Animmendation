FROM python:3.10.7-alpine3.15

ARG user
ARG uid

COPY .devcontainer/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN apk add bash git ncurses sudo make --no-cache
ENV GIT_DISCOVERY_ACROSS_FILESYSTEM=1

RUN adduser -s /bin/bash -S -D -u ${uid} ${user} \
  && mkdir -p /etc/sudoers.d \
  && echo "${user} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/${user} \
  && chmod 0440 /etc/sudoers.d/${user}

ENV PATH="$PATH:/home/${user}/.local/bin"

WORKDIR /home/${user}/TCC-Animmendation/data_feeder
USER ${user}
COPY .devcontainer/.bashrc /home/${user}/.bashrc

CMD [ "tail", "-f", "/dev/null" ]