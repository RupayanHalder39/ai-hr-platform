from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class CandidateBase(BaseModel):
    name: str = Field(..., min_length=1)
    github_link: Optional[str] = None
    job_id: int
    stage_id: int
    score: Optional[int] = None


class CandidateCreate(CandidateBase):
    pass


class CandidateUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    github_link: Optional[str] = None
    job_id: Optional[int] = None
    stage_id: Optional[int] = None
    score: Optional[int] = None


class CandidateRead(BaseModel):
    id: int
    name: str
    github_link: Optional[str] = None
    job_id: int
    stage_id: int
    score: Optional[int] = None
    created_at: datetime
    job_title: Optional[str] = None
    stage_name: Optional[str] = None

    class Config:
        from_attributes = True
