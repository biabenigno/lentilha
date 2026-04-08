import os

class Config:
    SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:postgres@localhost:5433/lentilha")
