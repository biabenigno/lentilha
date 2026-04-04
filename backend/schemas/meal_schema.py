from datetime import date

from pydantic import BaseModel
from schemas.default import Pagination


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

    model_config = {"from_attributes": True}


class MealListResponse(Pagination):
    items: list[MealResponse]
