#!/bin/bash

if [ -f "requirements.txt" ]; then
  make setup
else
  packages=("kaggle" "flake8" "black")
  for package in ${packages[@]}; do
    pip install ${package}
  done
  
  make freeze
fi

make dataset
sudo chmod 777 data/datasets

exec "$@"