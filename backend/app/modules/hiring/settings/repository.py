from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.job import Job
from app.models.stage import Stage
from app.models.status import Status


class HiringSettingsRepository:
    async def list_stages(self, session: AsyncSession) -> List[Stage]:
        result = await session.execute(select(Stage).order_by(Stage.order_index.asc()))
        return list(result.scalars().all())

    async def list_jobs(self, session: AsyncSession) -> List[Job]:
        result = await session.execute(select(Job).order_by(Job.created_at.desc()))
        return list(result.scalars().all())

    async def list_statuses(self, session: AsyncSession, entity_type: Optional[str]) -> List[Status]:
        stmt = select(Status)
        if entity_type:
            stmt = stmt.where(Status.entity_type == entity_type)
        result = await session.execute(stmt.order_by(Status.name.asc()))
        return list(result.scalars().all())
