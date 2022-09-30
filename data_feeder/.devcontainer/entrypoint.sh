#!/bin/bash

if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
else
  packages=("kaggle" "grpcio" "grpcio-tools" "flake8" "black")
  for package in ${packages[@]}; do
    pip install --user ${package}
  done

  pip freeze > requirements.txt
fi

datasets=("anime.csv" "anime_with_synopsis.csv" "animelist.csv")
for dataset in ${datasets[@]}; do
  if [ ! -f "data/${dataset}" ]; then
    kaggle datasets download hernan4444/anime-recommendation-database-2020 --unzip -f ${dataset} -p data/
    unzip data/${dataset}.zip -d data/
    rm data/${dataset}.zip
  fi
done

exec "$@"
