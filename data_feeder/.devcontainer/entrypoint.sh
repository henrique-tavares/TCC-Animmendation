#!/bin/bash

if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
else
  pip install kaggle

  pip freeze > requirements.txt
fi

datasets=("anime.csv" "anime_with_synopsis.csv")
for dataset in ${datasets[@]}; do
  if [ ! -f "data/${dataset}" ]; then
    kaggle datasets download hernan4444/anime-recommendation-database-2020 --unzip -f ${dataset} -p data/
    unzip data/${dataset}.zip -d data/
    rm data/${dataset}.zip
  fi
done


exec "$@"
