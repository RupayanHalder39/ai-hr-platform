from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.hiring.settings.repository import HiringSettingsRepository


class HiringSettingsService:
    def __init__(self, repository: HiringSettingsRepository) -> None:
        self.repository = repository

    async def list_stages(self, session: AsyncSession):
        return await self.repository.list_stages(session)

    async def list_jobs(self, session: AsyncSession):
        return await self.repository.list_jobs(session)

    async def list_roles(self, session: AsyncSession):
        return await self.repository.list_roles(session)

    async def list_statuses(self, session: AsyncSession, entity_type: Optional[str]):
        return await self.repository.list_statuses(session, entity_type)

    async def check_health(self, session: AsyncSession):
        return await self.repository.check_health(session)
