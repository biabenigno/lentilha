from models.user import User
from schemas.user_schema import UserCreate, UserListResponse
from sqlalchemy.orm import Session


def get_users(db: Session, page: int = 1, per_page: int = 10) -> UserListResponse:
    total = db.query(User).count()
    total_pages = max((total + per_page - 1) // per_page, 1)

    if page < 1:
        page = 1

    if page > total_pages:
        return UserListResponse(
            page=page, total=total, total_pages=total_pages, per_page=per_page, items=[]
        )

    skip = (page - 1) * per_page
    items = db.query(User).offset(skip).limit(per_page).all()

    return UserListResponse(
        page=page, total=total, total_pages=total_pages, per_page=per_page, items=items
    )


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate) -> User:
    db_user = User(**user.model_dump())

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(db: Session, user_id: int) -> User | None:
    db_user = get_user_by_id(db, user_id)

    if db_user:
        db.delete(db_user)
        db.commit()

    return db_user
