#!/usr/bin/env bash

if ! type pdm > /dev/null 2>&1; then
  curl -sSL https://raw.githubusercontent.com/pdm-project/pdm/main/install-pdm.py | python -
  pdm completion fish > ~/.config/fish/completions/pdm.fish
  pdm plugin add pdm-vscode
fi

if [[ -f "pdm.lock" && -f "pyproject.toml" ]]; then
  pdm install
fi

sudo chmod 777 data/datasets

chmod +x scripts/download_datasets.sh
mkdir -p data/raw_datasets
scripts/download_datasets.sh data/raw_datasets

fish -c "fisher install pure-fish/pure"

exec "$@"
