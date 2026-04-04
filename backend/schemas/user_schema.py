from datetime import date

from pydantic import BaseModel, EmailStr
from schemas.default import Pagination


class UserBase(BaseModel):
    name: str
    email: EmailStr
    location: str
    birth_date: date


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: date

    model_config = {"from_attributes": True}


class UserListResponse(Pagination):
    items: list[UserResponse]
