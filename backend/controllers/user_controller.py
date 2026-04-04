from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from schemas.user_schema import UserCreate, UserListResponse, UserResponse
from services import user_service
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = user_service.get_user_by_email(db, user.email)

    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    return user_service.create_user(db, user)


@router.get("/", response_model=UserListResponse)
def list_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return user_service.get_users(db, skip=skip, limit=limit)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = user_service.get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = user_service.delete_user(db, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
