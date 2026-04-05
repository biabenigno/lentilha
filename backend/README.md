# Lentilha Backend

Lentilha is an environmental impact tracking API for food consumption. It allows users to register meals and analyze the carbon, water, and ecological footprint of the foods they eat, while suggesting lower-impact alternatives.

Built with **FastAPI**, **SQLAlchemy**, **Alembic**, and **PostgreSQL**.

---

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker (Recommended)](#running-with-docker-recommended)
  - [Running Locally](#running-locally)
- [Database](#database)
- [API Documentation](#api-documentation)

---

## Architecture

The project follows a **layered architecture** with clear separation of concerns:

```
Request → Controller → Service → Model/Database
                ↕            ↕
             Schemas      SQLAlchemy ORM
```

| Layer          | Responsibility                                                                 |
|----------------|--------------------------------------------------------------------------------|
| **Controllers** | Handle HTTP requests, define routes, validate input via schemas, return responses |
| **Services**    | Contain business logic, orchestrate database queries, compute environmental impact |
| **Models**      | Define SQLAlchemy ORM entities that map to PostgreSQL tables                     |
| **Schemas**     | Pydantic models for request/response validation and serialization               |
| **Migrations**  | Alembic version-controlled database schema changes                              |

---

## Tech Stack

| Technology   | Purpose                        |
|-------------|--------------------------------|
| FastAPI     | Web framework (async, ASGI)    |
| SQLAlchemy  | ORM and database toolkit       |
| Alembic     | Database migrations            |
| PostgreSQL  | Relational database            |
| Pydantic    | Data validation and schemas    |
| Uvicorn     | ASGI server                    |
| uv          | Python package manager         |
| Docker      | Containerization               |

---

## Project Structure

```
backend/
├── main.py                # Application entry point
├── factory.py             # FastAPI app factory (CORS, lifespan, routers)
├── config.py              # Database URL and app configuration
├── database.py            # SQLAlchemy engine, session, and Base setup
├── populate_db.py         # Seeds the database with food data from Excel
├── pyproject.toml         # Project dependencies (managed by uv)
├── Dockerfile             # Container image definition
├── alembic.ini            # Alembic migration configuration
│
├── controllers/           # Route handlers (API layer)
│   ├── user_controller.py
│   ├── food_controller.py
│   └── meal_controller.py
│
├── services/              # Business logic layer
│   ├── user_service.py
│   ├── food_service.py
│   └── meal_service.py
│
├── models/                # SQLAlchemy ORM models
│   ├── user.py
│   ├── food.py
│   └── meal.py
│
├── schemas/               # Pydantic request/response models
│   ├── user_schema.py
│   ├── food_schema.py
│   ├── meal_schema.py
│   └── default.py         # Shared pagination schema
│
├── migrations/            # Alembic migrations
│   └── versions/
│
└── files/
    └── food_and_preparations.xlsx  # Food environmental data
```

---

### Prerequisites

**Both Windows and Linux:**

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for Docker setup)
- [Python 3.10+](https://www.python.org/downloads/) (for local setup)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) package manager (for local setup)
- [PostgreSQL 13+](https://www.postgresql.org/download/) (for local setup without Docker)

---

### Running with Docker (Recommended)

This is the simplest way to get the entire stack running. Docker Compose will start the backend and a PostgreSQL database, run migrations, and seed the food data automatically.

#### Linux

```bash
# Clone the repository and navigate to the project root
cd lentilha

# Build and start all services
docker compose up -d

# Check that containers are running
docker compose ps

# View backend logs
docker compose logs -f backend
```

#### Windows (PowerShell)

```powershell
# Clone the repository and navigate to the project root
cd lentilha

# Build and start all services
docker compose up -d

# Check that containers are running
docker compose ps

# View backend logs
docker compose logs -f backend
```

The API will be available at **http://localhost:8000**.

To stop the services:

```bash
docker compose down
```

To stop and remove all data (including the database volume):

```bash
docker compose down -v
```

---

### Running Locally

When running locally, you need to set up the database and install dependencies manually.

#### 1. Install uv

**Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

#### 2. Start PostgreSQL

You can either install PostgreSQL directly or use Docker just for the database:

**Option A — Using Docker for the database only:**

```bash
docker compose up -d db
```

This starts PostgreSQL on port **5433** (mapped from container port 5432).

**Option B — Using a local PostgreSQL installation:**

Create the database and user manually:

**Linux:**

```bash
sudo -u postgres psql -c "CREATE USER \"user\" WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE lentilha OWNER \"user\";"
```

**Windows (PowerShell):**

```powershell
psql -U postgres -c "CREATE USER \"user\" WITH PASSWORD 'postgres';"
psql -U postgres -c "CREATE DATABASE lentilha OWNER \"user\";"
```

> **Note:** If using a local PostgreSQL instance, update `config.py` to use the local connection string:
> ```python
> SQLALCHEMY_DATABASE_URL = "postgresql://user:postgres@localhost:5433/lentilha"
> ```

#### 3. Install Dependencies

Navigate to the backend directory and install:

```bash
cd backend
uv sync
```

#### 4. Run Database Migrations

```bash
uv run alembic upgrade head
```

#### 5. Start the Application

```bash
uv run python main.py
```

Or with auto-reload for development:

```bash
uv run uvicorn main:app --reload --host 127.0.0.1 --port 9000
```

The API will be available at **http://127.0.0.1:9000**.

---

## Database

### Connection Details

| Setting    | Docker          | Local                |
|------------|-----------------|----------------------|
| Host       | `db`            | `localhost`          |
| Port       | `5432`          | `5433`               |
| User       | `user`          | `user`               |
| Password   | `postgres`      | `postgres`           |
| Database   | `lentilha`      | `lentilha`           |

### Entity Relationship

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  users   │       │  meals   │       │  foods   │
├──────────┤       ├──────────┤       ├──────────┤
│ id (PK)  │──1:N──│ id (PK)  │──N:1──│ id (PK)  │
│ name     │       │ user_id  │       │ name     │
│ email    │       │ food_id  │       │ pof_code │
│ password │       │ name     │       │ carbon   │
│ location │       │ desc     │       │ water    │
│ birth    │       │ created  │       │ eco      │
│ created  │       └──────────┘       │ image    │
└──────────┘                          │ created  │
                                      └──────────┘
```

### Running Migrations

```bash
# Apply all pending migrations
uv run alembic upgrade head

# Create a new migration after model changes
uv run alembic revision --autogenerate -m "description of change"

# Rollback the last migration
uv run alembic downgrade -1
```

---

## API Documentation

FastAPI automatically generates interactive API documentation:

| Environment | Swagger UI                              | ReDoc                                  |
|-------------|------------------------------------------|----------------------------------------|
| Docker      | http://localhost:8000/api/docs           | http://localhost:8000/redoc        |
| Local       | http://127.0.0.1:9000/api/docs          | http://127.0.0.1:9000/redoc       |