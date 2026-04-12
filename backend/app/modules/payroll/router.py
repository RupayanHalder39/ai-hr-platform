from fastapi import APIRouter, Depends

from app.modules.payroll.repository import PlaceholderRepository
from app.modules.payroll.service import PlaceholderService
from app.schemas.response import APIResponse

router = APIRouter(prefix="/api/v1/payroll", tags=["payroll"])


def get_service() -> PlaceholderService:
    return PlaceholderService(PlaceholderRepository())


@router.get("/", response_model=APIResponse[dict])
async def get_placeholder(service: PlaceholderService = Depends(get_service)):
    data = await service.get()
    return APIResponse(data=data)
