from models.meal import Meal
from schemas.meal_schema import MealCreate, MealListResponse
from sqlalchemy.orm import Session


def get_meals(db: Session, page: int = 1, per_page: int = 10) -> MealListResponse:
    total = db.query(Meal).count()
    total_pages = max((total + per_page - 1) // per_page, 1)

    if page < 1:
        page = 1

    if page > total_pages:
        return MealListResponse(
            page=page, total=total, total_pages=total_pages, per_page=per_page, items=[]
        )

    skip = (page - 1) * per_page
    items = db.query(Meal).offset(skip).limit(per_page).all()

    return MealListResponse(
        page=page, total=total, total_pages=total_pages, per_page=per_page, items=items
    )


def get_meal_by_id(db: Session, meal_id: int) -> Meal | None:
    return db.query(Meal).filter(Meal.id == meal_id).first()


def get_meals_by_user(db: Session, user_id: int, page: int = 1, per_page: int = 10) -> MealListResponse:
    query = db.query(Meal).filter(Meal.user_id == user_id)
    total = query.count()
    total_pages = max((total + per_page - 1) // per_page, 1)

    if page < 1:
        page = 1

    if page > total_pages:
        return MealListResponse(
            page=page, total=total, total_pages=total_pages, per_page=per_page, items=[]
        )

    skip = (page - 1) * per_page
    items = query.offset(skip).limit(per_page).all()

    return MealListResponse(
        page=page, total=total, total_pages=total_pages, per_page=per_page, items=items
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


def delete_meals_by_user(db: Session, user_id: int) -> int:
    """Delete all meals associated with a specific user and return the count."""
    deleted_count = db.query(Meal).filter(Meal.user_id == user_id).delete(synchronize_session=False)
    db.commit()
    return deleted_count
