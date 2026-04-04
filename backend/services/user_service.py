import math

from models.user import User
from schemas.user_schema import UserCreate, UserListResponse
from sqlalchemy.orm import Session


def get_users(db: Session, skip: int = 0, limit: int = 10) -> UserListResponse:
    total = db.query(User).count()
    items = db.query(User).offset(skip).limit(limit).all()

    return UserListResponse(
        items=items,
        total=total,
        total_pages=math.ceil(total / limit),
        per_page=limit,
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
