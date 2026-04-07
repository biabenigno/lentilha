from datetime import date

from pydantic import BaseModel
from schemas.default import Pagination
from schemas.food_schema import FoodResponse


class MealBase(BaseModel):
    user_id: int
    food_id: int
    name: str
    description: str | None = None


class MealCreate(MealBase):
    pass


class MealResponse(MealBase):
    id: int
    created_at: date
    food: FoodResponse | None = None

    model_config = {"from_attributes": True}


class MealListResponse(Pagination):
    items: list[MealResponse]
