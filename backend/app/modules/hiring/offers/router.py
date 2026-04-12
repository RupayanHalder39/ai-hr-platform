from fastapi import APIRouter, Depends

from app.modules.hiring.offers.repository import PlaceholderRepository
from app.modules.hiring.offers.service import PlaceholderService
from app.schemas.response import APIResponse

router = APIRouter(prefix="/api/v1/hiring/offers", tags=["Hiring offers"])


def get_service() -> PlaceholderService:
    return PlaceholderService(PlaceholderRepository())


@router.get("/", response_model=APIResponse[dict])
async def get_placeholder(service: PlaceholderService = Depends(get_service)):
    data = await service.get()
    return APIResponse(data=data)
