from dotenv import load_dotenv

load_dotenv("../.env")

from usecase.prepare_data import prepare_data

if __name__ == "__main__":
    prepare_data()
