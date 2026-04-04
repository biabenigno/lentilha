from pydantic import BaseModel


class Pagination(BaseModel):
    total: int
    total_pages: int
    per_page: int
