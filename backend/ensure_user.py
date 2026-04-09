from database import SessionLocal
from models.user import User
from sqlalchemy.sql import text

def ensure_user():
    db = SessionLocal()
    from datetime import date
    try:
        # Usuário 1 (Teste A)
        user1 = db.query(User).filter(User.id == 1).first()
        if not user1:
            print("Creating dummy user with ID 1 (Teste A)...")
            user1 = User(
                id=1,
                name="Fernanda (Teste A)",
                email="fernanda@lentilha.com",
                password="dummy",
                location="São Paulo, BR",
                birth_date=date(1995, 1, 1)
            )
            db.add(user1)
            db.commit()
            print("User 1 created successfully.")
        else:
            print("User with ID 1 already exists.")

        # Usuário 2 (Teste B)
        user2 = db.query(User).filter(User.id == 2).first()
        if not user2:
            print("Creating dummy user with ID 2 (Teste B)...")
            user2 = User(
                id=2,
                name="Ricardo (Teste B)",
                email="ricardo@lentilha.com",
                password="dummy",
                location="Fortaleza, BR",
                birth_date=date(1990, 5, 20)
            )
            db.add(user2)
            db.commit()
            print("User 2 created successfully.")
        else:
            print("User with ID 2 already exists.")
    except Exception as e:
        db.rollback()
        print(f"Error ensuring user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    ensure_user()
