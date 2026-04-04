import pandas as pd
from database import SessionLocal
from models.food import Food


def populate_foods():
    df = pd.read_excel("files/food_and_preparations.xlsx", header=4)

    df.columns = [
        "pof_code",
        "name",
        "preparation_code",
        "preparation_description",
        "carbon_footprint",
        "water_footprint",
        "ecological_footprint",
        "_unnamed_7",
        "_unnamed_8",
    ]

    df = df.dropna(subset=["pof_code"])
    df = df.drop(columns=["_unnamed_7", "_unnamed_8"])

    db = SessionLocal()

    try:
        for _, row in df.iterrows():
            food = Food(
                pof_code=int(row["pof_code"]),
                name=row["name"],
                preparation_code=int(row["preparation_code"])
                if pd.notna(row["preparation_code"])
                else None,
                preparation_description=row["preparation_description"]
                if pd.notna(row["preparation_description"])
                else None,
                carbon_footprint=row["carbon_footprint"]
                if pd.notna(row["carbon_footprint"])
                else None,
                water_footprint=row["water_footprint"]
                if pd.notna(row["water_footprint"])
                else None,
                ecological_footprint=row["ecological_footprint"]
                if pd.notna(row["ecological_footprint"])
                else None,
            )
            db.add(food)

        db.commit()
        print(f"{len(df)} foods inserted successfully.")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    populate_foods()
