import math

from models.meal import Meal
from schemas.meal_schema import MealCreate, MealListResponse
from sqlalchemy.orm import Session


def get_meals(db: Session, skip: int = 0, limit: int = 10) -> MealListResponse:
    total = db.query(Meal).count()
    items = db.query(Meal).offset(skip).limit(limit).all()

    return MealListResponse(
        items=items,
        total=total,
        total_pages=math.ceil(total / limit),
        per_page=limit,
    )


def get_meal_by_id(db: Session, meal_id: int) -> Meal | None:
    return db.query(Meal).filter(Meal.id == meal_id).first()


def get_meals_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 10) -> MealListResponse:
    query = db.query(Meal).filter(Meal.user_id == user_id)
    total = query.count()
    items = query.offset(skip).limit(limit).all()

    return MealListResponse(
        items=items,
        total=total,
        total_pages=math.ceil(total / limit),
        per_page=limit,
    )


def create_meal(db: Session, meal: MealCreate) -> Meal:
    db_meal = Meal(**meal.model_dump())

    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)

    return db_meal


def delete_meal(db: Session, meal_id: int) -> Meal | None:
    db_meal = get_meal_by_id(db, meal_id)

    if db_meal:
        db.delete(db_meal)
        db.commit()

    return db_meal
