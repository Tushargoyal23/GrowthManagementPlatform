import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine

from services.db.base import Base
from services.db import tables as tables  # noqa: F401

ENV_PATH = Path(__file__).resolve().parents[2] / ".env"


def create_tables(database_url: str | None = None) -> None:
    load_dotenv(ENV_PATH)
    url = database_url or os.environ.get("DATABASE_URL")
    if not url:
        raise RuntimeError("Set DATABASE_URL to a PostgreSQL connection string.")
    engine = create_engine(url)
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    create_tables()
