from os import getenv

from dotenv import load_dotenv

load_dotenv("../../.env")


class Env:
    DEBUG = getenv("DEBUG")
