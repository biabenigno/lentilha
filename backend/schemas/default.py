from pydantic import BaseModel


class Pagination(BaseModel):
    page: int
    total: int
    total_pages: int
    per_page: int
