import math

from models.food import Food
from schemas.food_schema import FoodCreate, FoodListResponse
from sqlalchemy.orm import Session


def get_foods(db: Session, skip: int = 0, limit: int = 10) -> FoodListResponse:
    total = db.query(Food).count()
    items = db.query(Food).offset(skip).limit(limit).all()

    return FoodListResponse(
        items=items,
        total=total,
        total_pages=math.ceil(total / limit),
        per_page=limit,
    )


def search_foods(db: Session, query: str, skip: int = 0, limit: int = 10) -> FoodListResponse:
    base_query = db.query(Food).filter(Food.name.ilike(f"%{query}%"))
    total = base_query.count()
    items = base_query.offset(skip).limit(limit).all()

    return FoodListResponse(
        items=items,
        total=total,
        total_pages=math.ceil(total / limit) if limit else 0,
        per_page=limit,
    )


def get_food_by_id(db: Session, food_id: int) -> Food | None:
    return db.query(Food).filter(Food.id == food_id).first()


def create_food(db: Session, food: FoodCreate) -> Food:
    db_food = Food(**food.model_dump())

    db.add(db_food)
    db.commit()
    db.refresh(db_food)

    return db_food


def delete_food(db: Session, food_id: int) -> Food | None:
    db_food = get_food_by_id(db, food_id)

    if db_food:
        db.delete(db_food)
        db.commit()

    return db_food
