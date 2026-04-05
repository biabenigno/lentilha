from datetime import date

from pydantic import BaseModel
from schemas.default import Pagination


class FoodBase(BaseModel):
    pof_code: int | None = None
    name: str | None = None
    preparation_code: int | None = None
    preparation_description: str | None = None
    carbon_footprint: float | None = None
    water_footprint: float | None = None
    ecological_footprint: float | None = None


class FoodCreate(FoodBase):
    pass


class FoodResponse(FoodBase):
    id: int
    created_at: date

    model_config = {"from_attributes": True}


class FoodDetailResponse(BaseModel):
    food: FoodResponse
    lower_impact_suggestion: FoodResponse | None = None


class FoodListResponse(Pagination):
    items: list[FoodResponse]
