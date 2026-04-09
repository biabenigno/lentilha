from contextlib import asynccontextmanager

from controllers.food_controller import router as food_router
from controllers.meal_controller import router as meal_router
from controllers.user_controller import router as user_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import BASE, engine
from ensure_user import ensure_user
from populate_db import populate_foods


@asynccontextmanager
async def lifespan(_app):
    # Ensure tables exist
    BASE.metadata.create_all(bind=engine)
    # Ensure base data exists
    ensure_user()
    populate_foods()
    yield


def create_app():
    app = FastAPI(
        lifespan=lifespan,
        title="Lentilha",
        version="1.0.0",
        docs_url="/api/docs",
        description="""
            This is the backend of the Lentilha project.
        """,
    )

    origins = ["*"]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(user_router)
    app.include_router(food_router)
    app.include_router(meal_router)

    return app
