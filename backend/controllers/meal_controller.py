from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from schemas.meal_schema import MealCreate, MealListResponse, MealResponse
from services import meal_service
from sqlalchemy.orm import Session

router = APIRouter(prefix="/meals", tags=["meals"])


@router.post("/", response_model=MealResponse, status_code=201)
def create_meal(meal: MealCreate, db: Session = Depends(get_db)):
    return meal_service.create_meal(db, meal)


@router.get("/", response_model=MealListResponse)
def list_meals(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return meal_service.get_meals(db, skip=skip, limit=limit)


@router.get("/{meal_id}", response_model=MealResponse)
def get_meal(meal_id: int, db: Session = Depends(get_db)):
    meal = meal_service.get_meal_by_id(db, meal_id)

    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    return meal


@router.get("/user/{user_id}", response_model=MealListResponse)
def list_meals_by_user(
    user_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
):
    return meal_service.get_meals_by_user(db, user_id, skip=skip, limit=limit)


@router.delete("/{meal_id}", response_model=MealResponse)
def delete_meal(meal_id: int, db: Session = Depends(get_db)):
    meal = meal_service.delete_meal(db, meal_id)

    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    return meal
