#!/usr/bin/env bash

if ! type pdm > /dev/null 2>&1; then
  curl -sSL https://raw.githubusercontent.com/pdm-project/pdm/main/install-pdm.py | python -
  pdm completion fish > ~/.config/fish/completions/pdm.fish
  pdm plugin add pdm-vscode
fi

if [[ -f "pdm.lock" && -f "pyproject.toml" ]]; then
  pdm install
  pdm run prisma py fetch
fi

fish -c "fisher install pure-fish/pure"

exec "$@"