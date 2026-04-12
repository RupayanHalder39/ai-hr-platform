from fastapi import APIRouter, Depends

from app.modules.hiring.interviews.repository import PlaceholderRepository
from app.modules.hiring.interviews.service import PlaceholderService
from app.schemas.response import APIResponse

router = APIRouter(prefix="/api/v1/hiring/interviews", tags=["Hiring interviews"])


def get_service() -> PlaceholderService:
    return PlaceholderService(PlaceholderRepository())


@router.get("/", response_model=APIResponse[dict])
async def get_placeholder(service: PlaceholderService = Depends(get_service)):
    data = await service.get()
    return APIResponse(data=data)
