from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.modules.hiring.settings.repository import HiringSettingsRepository
from app.modules.hiring.settings.schema import JobRead, RoleRead, StageRead, StatusRead
from app.modules.hiring.settings.service import HiringSettingsService
from app.schemas.response import APIResponse

router = APIRouter(prefix="/api/v1/hiring/settings", tags=["Hiring Settings"])


def get_service() -> HiringSettingsService:
    return HiringSettingsService(HiringSettingsRepository())


@router.get("/stages", response_model=APIResponse[list[StageRead]])
async def list_stages(
    session: AsyncSession = Depends(get_session),
    service: HiringSettingsService = Depends(get_service),
):
    stages = await service.list_stages(session)
    return APIResponse(data=stages)


@router.get("/jobs", response_model=APIResponse[list[JobRead]])
async def list_jobs(
    session: AsyncSession = Depends(get_session),
    service: HiringSettingsService = Depends(get_service),
):
    jobs = await service.list_jobs(session)
    return APIResponse(data=jobs)


@router.get("/roles", response_model=APIResponse[list[RoleRead]])
async def list_roles(
    session: AsyncSession = Depends(get_session),
    service: HiringSettingsService = Depends(get_service),
):
    roles = await service.list_roles(session)
    return APIResponse(data=roles)


@router.get("/statuses", response_model=APIResponse[list[StatusRead]])
async def list_statuses(
    entity_type: str | None = Query(None),
    session: AsyncSession = Depends(get_session),
    service: HiringSettingsService = Depends(get_service),
):
    statuses = await service.list_statuses(session, entity_type)
    return APIResponse(data=statuses)


@router.get("/health", response_model=APIResponse[dict])
async def health_check(
    session: AsyncSession = Depends(get_session),
    service: HiringSettingsService = Depends(get_service),
):
    await service.check_health(session)
    return APIResponse(data={"ok": True})
