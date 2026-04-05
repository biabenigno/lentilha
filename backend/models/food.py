from sqlalchemy import Column, Date, Float, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from models import BASE


class Food(BASE):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)

    pof_code = Column(Integer, index=True)
    name = Column(String, index=True)

    preparation_code = Column(Integer)
    preparation_description = Column(String)

    carbon_footprint = Column(Float)
    water_footprint = Column(Float)
    ecological_footprint = Column(Float)

    created_at = Column(Date, server_default=func.now(), nullable=False)

    webscraped_image = Column(String, nullable=True)

    meals = relationship("Meal", back_populates="food")
