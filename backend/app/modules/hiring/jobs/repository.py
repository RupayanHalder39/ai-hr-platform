from typing import List, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.job import Job
from app.models.status import Status
from app.utils.pagination import Pagination


class JobRepository:
    async def list(self, session: AsyncSession, pagination: Pagination) -> List[Tuple[Job, str]]:
        stmt = (
            select(Job, Status.name)
            .join(Status, Job.status_id == Status.id)
            .order_by(Job.created_at.desc())
            .offset(pagination.offset)
            .limit(pagination.page_size)
        )
        result = await session.execute(stmt)
        return list(result.all())

    async def count(self, session: AsyncSession) -> int:
        result = await session.execute(select(func.count()).select_from(Job))
        return int(result.scalar() or 0)
