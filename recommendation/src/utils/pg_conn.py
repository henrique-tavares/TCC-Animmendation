import psycopg2
from entities.env import Env

pg_conn = psycopg2.connect(Env.db_url)
