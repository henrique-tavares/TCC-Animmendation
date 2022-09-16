FROM python:3.10.7-alpine3.15

COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

RUN apk add bash --no-cache

WORKDIR /data_feeder/app

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "tail", "-f", "/dev/null" ]