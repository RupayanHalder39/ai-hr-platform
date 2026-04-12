from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.modules.hiring.candidates.repository import CandidateRepository
from app.modules.hiring.candidates.schema import CandidateCreate, CandidateRead, CandidateUpdate
from app.modules.hiring.candidates.service import CandidateService
from app.schemas.response import APIResponse, ListResponse, PaginationMeta
from app.utils.exceptions import NotFoundError
from app.utils.pagination import Pagination

router = APIRouter(prefix="/api/v1/hiring/candidates", tags=["Candidates"])


def get_service() -> CandidateService:
    return CandidateService(CandidateRepository())


@router.get("/", response_model=ListResponse[CandidateRead])
async def list_candidates(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    job_id: str | None = None,
    stage_id: str | None = None,
    score_min: str | None = None,
    score_max: str | None = None,
    search: str | None = None,
    session: AsyncSession = Depends(get_session),
    service: CandidateService = Depends(get_service),
):
    pagination = Pagination(page=page, page_size=page_size)
    filters = {
        "job_id": job_id,
        "stage_id": stage_id,
        "score_min": score_min,
        "score_max": score_max,
        "search": search,
    }
    items, total = await service.list_candidates(session, pagination, filters)
    data = [
        CandidateRead(
            **candidate.__dict__,
            job_title=job_title,
            stage_name=stage_name,
        )
        for candidate, job_title, stage_name in items
    ]
    return ListResponse(data=data, meta=PaginationMeta(page=page, page_size=page_size, total=total))


@router.get("/{candidate_id}", response_model=APIResponse[CandidateRead])
async def get_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_session),
    service: CandidateService = Depends(get_service),
):
    try:
        candidate, job_title, stage_name = await service.get_candidate(session, candidate_id)
        data = CandidateRead(
            **candidate.__dict__,
            job_title=job_title,
            stage_name=stage_name,
        )
        return APIResponse(data=data)
    except NotFoundError as exc:
        raise HTTPException(status_code=404, detail=exc.message)


@router.post("/", response_model=APIResponse[CandidateRead], status_code=201)
async def create_candidate(
    payload: CandidateCreate,
    session: AsyncSession = Depends(get_session),
    service: CandidateService = Depends(get_service),
):
    candidate = await service.create_candidate(session, payload)
    data = CandidateRead(**candidate.__dict__)
    return APIResponse(data=data)


@router.put("/{candidate_id}", response_model=APIResponse[CandidateRead])
async def update_candidate(
    candidate_id: int,
    payload: CandidateUpdate,
    session: AsyncSession = Depends(get_session),
    service: CandidateService = Depends(get_service),
):
    try:
        candidate = await service.update_candidate(session, candidate_id, payload)
        data = CandidateRead(**candidate.__dict__)
        return APIResponse(data=data)
    except NotFoundError as exc:
        raise HTTPException(status_code=404, detail=exc.message)


@router.delete("/{candidate_id}", response_model=APIResponse[dict])
async def delete_candidate(
    candidate_id: int,
    session: AsyncSession = Depends(get_session),
    service: CandidateService = Depends(get_service),
):
    try:
        await service.delete_candidate(session, candidate_id)
        return APIResponse(data={"deleted": True})
    except NotFoundError as exc:
        raise HTTPException(status_code=404, detail=exc.message)
