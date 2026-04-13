from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.modules.hiring.jobs.repository import JobRepository
from app.modules.hiring.jobs.schema import JobListRead
from app.modules.hiring.jobs.service import JobService
from app.schemas.response import ListResponse, PaginationMeta
from app.utils.pagination import Pagination

router = APIRouter(prefix="/api/v1/hiring/jobs", tags=["Hiring Jobs"])


def get_service() -> JobService:
    return JobService(JobRepository())


@router.get("", response_model=ListResponse[JobListRead])
async def list_jobs(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
    service: JobService = Depends(get_service),
):
    pagination = Pagination(page=page, page_size=page_size)
    items, total = await service.list_jobs(session, pagination)
    return ListResponse(data=items, meta=PaginationMeta(page=page, page_size=page_size, total=total))
