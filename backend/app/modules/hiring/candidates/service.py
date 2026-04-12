from typing import Dict, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.candidate import Candidate
from app.modules.hiring.candidates.repository import CandidateRepository
from app.modules.hiring.candidates.schema import CandidateCreate, CandidateUpdate
from app.utils.exceptions import NotFoundError
from app.utils.pagination import Pagination


class CandidateService:
    def __init__(self, repository: CandidateRepository) -> None:
        self.repository = repository

    async def list_candidates(
        self,
        session: AsyncSession,
        pagination: Pagination,
        filters: Dict[str, Optional[str]],
    ):
        items = await self.repository.list_with_lookups(session, pagination, filters)
        total = await self.repository.count(session, filters)
        return items, total

    async def get_candidate(self, session: AsyncSession, candidate_id: int):
        result = await self.repository.get_with_lookups(session, candidate_id)
        if not result:
            raise NotFoundError("Candidate not found")
        return result

    async def create_candidate(self, session: AsyncSession, payload: CandidateCreate):
        candidate = Candidate(**payload.model_dump())
        candidate = await self.repository.create(session, candidate)
        await session.commit()
        return candidate

    async def update_candidate(self, session: AsyncSession, candidate_id: int, payload: CandidateUpdate):
        existing = await session.get(Candidate, candidate_id)
        if not existing:
            raise NotFoundError("Candidate not found")
        updated = await self.repository.update(session, existing, payload.model_dump(exclude_unset=True))
        await session.commit()
        return updated

    async def delete_candidate(self, session: AsyncSession, candidate_id: int) -> None:
        existing = await session.get(Candidate, candidate_id)
        if not existing:
            raise NotFoundError("Candidate not found")
        await self.repository.delete(session, existing)
        await session.commit()
