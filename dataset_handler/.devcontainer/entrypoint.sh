#!/bin/bash

if [ -f "requirements.txt" ]; then
  task setup
else
  packages=("kaggle" "flake8" "black")
  pip install ${packages[@]}
  
  task freeze
fi

task dataset
sudo chmod 777 data/datasets

exec "$@"