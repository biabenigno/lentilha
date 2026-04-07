from database import SessionLocal
from models.user import User
from sqlalchemy.sql import text

def ensure_user():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == 1).first()
        if not user:
            print("Creating dummy user with ID 1...")
            dummy_user = User(
                id=1,
                name="Fernanda",
                email="fernanda@lentilha.com",
                password_hash="dummy",
                location="São Paulo, BR"
            )
            db.add(dummy_user)
            db.commit()
            print("User created successfully.")
        else:
            print("User with ID 1 already exists.")
    except Exception as e:
        db.rollback()
        print(f"Error ensuring user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    ensure_user()
