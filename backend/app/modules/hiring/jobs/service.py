from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.hiring.jobs.repository import JobRepository
from app.utils.pagination import Pagination


class JobService:
    def __init__(self, repository: JobRepository) -> None:
        self.repository = repository

    async def list_jobs(self, session: AsyncSession, pagination: Pagination):
        # TODO: add filtering, sorting, and access control
        items = await self.repository.list(session, pagination)
        total = await self.repository.count(session)
        return items, total
