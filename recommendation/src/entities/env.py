from dataclasses import dataclass
import os

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Env:
    sftp_host = os.getenv("SFTP_HOST") or ""
    sftp_port = int(os.getenv("SFTP_PORT") or -1)
    sftp_username = os.getenv("SFTP_USERNAME") or ""
    sftp_password = os.getenv("SFTP_PASSWORD") or ""
