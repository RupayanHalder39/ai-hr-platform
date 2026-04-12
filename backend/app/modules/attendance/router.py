from fastapi import APIRouter, Depends

from app.modules.attendance.repository import PlaceholderRepository
from app.modules.attendance.service import PlaceholderService
from app.schemas.response import APIResponse

router = APIRouter(prefix="/api/v1/attendance", tags=["attendance"])


def get_service() -> PlaceholderService:
    return PlaceholderService(PlaceholderRepository())


@router.get("/", response_model=APIResponse[dict])
async def get_placeholder(service: PlaceholderService = Depends(get_service)):
    data = await service.get()
    return APIResponse(data=data)
