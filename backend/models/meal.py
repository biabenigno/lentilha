from sqlalchemy import Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from models import BASE


class Meal(BASE):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    food_id = Column(Integer, ForeignKey("foods.id"), nullable=False)

    name = Column(String, nullable=False)
    description = Column(String)

    created_at = Column(Date, server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="meals")
    food = relationship("Food", back_populates="meals")
