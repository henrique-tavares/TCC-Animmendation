import numpy as np


def execute(item: str | None):
    if item is None:
        return np.nan

    return f"{{{item}}}"
