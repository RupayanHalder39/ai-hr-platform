from typing import List
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.job import Job
from app.utils.pagination import Pagination


class JobRepository:
    async def list(self, session: AsyncSession, pagination: Pagination) -> List[Job]:
        stmt = select(Job).order_by(Job.created_at.desc()).offset(pagination.offset).limit(pagination.page_size)
        result = await session.execute(stmt)
        return list(result.scalars().all())

    async def count(self, session: AsyncSession) -> int:
        result = await session.execute(select(func.count()).select_from(Job))
        return int(result.scalar() or 0)
