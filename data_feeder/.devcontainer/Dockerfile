FROM python:3.10.7-alpine3.15

ARG user
ARG uid

COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN apk add bash --no-cache

RUN adduser -s /bin/bash -S -D -u ${uid} ${user}

WORKDIR /home/${user}/app
USER ${user}

RUN touch ~/.bashrc

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "tail", "-f", "/dev/null" ]