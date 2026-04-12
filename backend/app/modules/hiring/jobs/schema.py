from typing import Optional
from pydantic import BaseModel


class JobBase(BaseModel):
    title: str
    description: str
    status_id: int
    created_by: int


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status_id: Optional[int] = None


class JobRead(BaseModel):
    id: int
    title: str
    description: str
    status_id: int
    created_by: int

    class Config:
        from_attributes = True
