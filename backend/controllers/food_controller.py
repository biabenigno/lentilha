from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from schemas.food_schema import FoodCreate, FoodDetailResponse, FoodListResponse, FoodResponse
from services import food_service
from sqlalchemy.orm import Session

router = APIRouter(prefix="/foods", tags=["foods"])


@router.post("/", response_model=FoodResponse, status_code=201)
def create_food(food: FoodCreate, db: Session = Depends(get_db)):
    """Register a new food item with its nutritional data and environmental footprints."""
    return food_service.create_food(db, food)


@router.get("/", response_model=FoodListResponse)
def list_foods(page: int = 1, per_page: int = 10, db: Session = Depends(get_db)):
    """List all food items with paginated results."""
    return food_service.get_foods(db, page=page, per_page=per_page)


@router.get("/search", response_model=FoodListResponse)
def search_foods(
    query: str, page: int = 1, per_page: int = 10, db: Session = Depends(get_db)
):
    """Search food items by name with paginated results."""
    return food_service.search_foods(db, query, page=page, per_page=per_page)


@router.get("/{food_id}", response_model=FoodDetailResponse)
def get_food(food_id: int, db: Session = Depends(get_db)):
    """Retrieve a food item by ID along with a lower environmental impact suggestion."""
    result = food_service.get_food_by_id(db, food_id)

    if not result:
        raise HTTPException(status_code=404, detail="Food not found")

    return result


@router.delete("/{food_id}", response_model=FoodResponse)
def delete_food(food_id: int, db: Session = Depends(get_db)):
    """Delete a food item by ID."""
    food = food_service.delete_food(db, food_id)

    if not food:
        raise HTTPException(status_code=404, detail="Food not found")

    return food
