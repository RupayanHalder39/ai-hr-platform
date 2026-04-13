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
        payload = []
        for job, status_name in items:
            payload.append(
                {
                    "id": job.id,
                    "title": job.title,
                    "description": job.description,
                    "status_id": job.status_id,
                    "status_name": status_name,
                    "created_at": job.created_at,
                }
            )
        return payload, total
