from typing import Generic, Optional, TypeVar, List
from pydantic import BaseModel

T = TypeVar("T")


class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int


class APIResponse(BaseModel, Generic[T]):
    data: T
    meta: Optional[PaginationMeta] = None


class ListResponse(BaseModel, Generic[T]):
    data: List[T]
    meta: PaginationMeta
