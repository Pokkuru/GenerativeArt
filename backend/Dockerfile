FROM python:3.8-slim AS builder
WORKDIR /app

COPY ./backend/requirements.txt  .
COPY ./backend/app.py            .
RUN apt update -y && apt upgrade -y
RUN apt install -y libpq-dev gcc
RUN pip install -r requirements.txt
RUN ls

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV POSTGRES_DB $POSTGRES_DB

FROM builder AS develop
CMD ["gunicorn", \
  "--timeout=300", \
  "--log-level", "debug", \
  "--bind=0.0.0.0:5100", "app:app", \
  "--reload"]

FROM builder AS debug
ENV DEBUG 1