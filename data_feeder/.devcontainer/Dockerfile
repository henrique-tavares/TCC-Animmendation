FROM python:3.10.7-alpine3.15

ARG user
ARG uid

COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN apk add bash git ncurses --no-cache
ENV GIT_DISCOVERY_ACROSS_FILESYSTEM=1

RUN adduser -s /bin/bash -S -D -u ${uid} ${user}

WORKDIR /home/${user}/TCC-Animmendation/data_feeder
USER ${user}

COPY .bashrc /home/${user}/.bashrc

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "tail", "-f", "/dev/null" ]