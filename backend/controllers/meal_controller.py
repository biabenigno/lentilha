from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from schemas.meal_schema import MealCreate, MealListResponse, MealResponse
from services import meal_service
from sqlalchemy.orm import Session

router = APIRouter(prefix="/meals", tags=["meals"])


@router.post("", response_model=MealResponse, status_code=201)
def create_meal(meal: MealCreate, db: Session = Depends(get_db)):
    """Register a new meal entry linking a user to a food item with quantity and date."""
    print(f"DEBUG: Attempting to add meal: {meal}")
    try:
        return meal_service.create_meal(db, meal)
    except Exception as e:
        print(f"ERROR: Failed to add meal: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=MealListResponse)
def list_meals(page: int = 1, per_page: int = 10, db: Session = Depends(get_db)):
    """List all meals with paginated results."""
    return meal_service.get_meals(db, page=page, per_page=per_page)


@router.get("/{meal_id}", response_model=MealResponse)
def get_meal(meal_id: int, db: Session = Depends(get_db)):
    """Retrieve a specific meal by its ID."""
    meal = meal_service.get_meal_by_id(db, meal_id)

    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    return meal


@router.get("/user/{user_id}", response_model=MealListResponse)
def list_meals_by_user(
    user_id: int, page: int = 1, per_page: int = 10, db: Session = Depends(get_db)
):
    """List all meals for a specific user with paginated results."""
    return meal_service.get_meals_by_user(db, user_id, page=page, per_page=per_page)


@router.delete("/user/{user_id}", status_code=200)
def delete_all_user_meals(user_id: int, db: Session = Depends(get_db)):
    """Delete all meals associated with a specific user."""
    deleted_count = meal_service.delete_meals_by_user(db, user_id)
    return {"message": f"Successfully deleted {deleted_count} meals.", "deleted_count": deleted_count}


@router.delete("/{meal_id}", status_code=200)
def delete_meal(meal_id: int, db: Session = Depends(get_db)):
    """Delete a meal by its ID."""
    meal = meal_service.delete_meal(db, meal_id)

    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    return {"message": "Meal deleted successfully", "id": meal_id}
