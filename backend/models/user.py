from sqlalchemy import DATE, Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from models import BASE


class User(BASE):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    location = Column(String, nullable=False)

    birth_date = Column(DATE, nullable=False)

    created_at = Column(DATE, server_default=func.now(), nullable=False)

    meals = relationship("Meal", back_populates="user")
