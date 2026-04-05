from models.food import Food
from schemas.food_schema import FoodCreate, FoodDetailResponse, FoodListResponse
from sqlalchemy import func
from sqlalchemy.orm import Session


def get_foods(db: Session, page: int = 1, per_page: int = 10) -> FoodListResponse:
    total = db.query(Food).count()
    total_pages = max((total + per_page - 1) // per_page, 1)

    if page < 1:
        page = 1

    if page > total_pages:
        return FoodListResponse(
            page=page, total=total, total_pages=total_pages, per_page=per_page, items=[]
        )

    skip = (page - 1) * per_page
    items = db.query(Food).offset(skip).limit(per_page).all()

    return FoodListResponse(
        page=page, total=total, total_pages=total_pages, per_page=per_page, items=items
    )


def search_foods(db: Session, query: str, page: int = 1, per_page: int = 10) -> FoodListResponse:
    base_query = db.query(Food).filter(Food.name.ilike(f"%{query}%"))
    total = base_query.count()
    total_pages = max((total + per_page - 1) // per_page, 1)

    if page < 1:
        page = 1

    if page > total_pages:
        return FoodListResponse(
            page=page, total=total, total_pages=total_pages, per_page=per_page, items=[]
        )

    skip = (page - 1) * per_page
    items = base_query.offset(skip).limit(per_page).all()

    return FoodListResponse(
        page=page, total=total, total_pages=total_pages, per_page=per_page, items=items
    )


def get_food_by_id(db: Session, food_id: int) -> FoodDetailResponse | None:
    food = db.query(Food).filter(Food.id == food_id).first()

    if not food:
        return None

    food_impact = _average_impact(food)
    suggestion = None

    if food_impact is not None:
        impact_expr = (
            func.coalesce(Food.carbon_footprint, 0)
            + func.coalesce(Food.water_footprint, 0)
            + func.coalesce(Food.ecological_footprint, 0)
        ) / 3.0

        max_impact = food_impact * 0.8

        suggestion = (
            db.query(Food)
            .filter(Food.id != food.id, impact_expr <= max_impact)
            .order_by(impact_expr.desc())
            .first()
        )

    return FoodDetailResponse(food=food, lower_impact_suggestion=suggestion)


def _average_impact(food: Food) -> float | None:
    values = [v for v in [food.carbon_footprint, food.water_footprint, food.ecological_footprint] if v is not None]
    if not values:
        return None
    return sum(values) / len(values)


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
