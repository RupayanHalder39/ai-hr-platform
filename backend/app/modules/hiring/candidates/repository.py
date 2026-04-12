from typing import Dict, List, Optional, Tuple
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.candidate import Candidate
from app.models.job import Job
from app.models.stage import Stage
from app.utils.pagination import Pagination


class CandidateRepository:
    async def get_with_lookups(self, session: AsyncSession, candidate_id: int) -> Optional[Tuple[Candidate, str, str]]:
        stmt = (
            select(Candidate, Job.title, Stage.name)
            .join(Job, Candidate.job_id == Job.id)
            .join(Stage, Candidate.stage_id == Stage.id)
            .where(Candidate.id == candidate_id)
        )
        result = await session.execute(stmt)
        return result.first()

    async def list_with_lookups(
        self,
        session: AsyncSession,
        pagination: Pagination,
        filters: Dict[str, Optional[str]],
    ) -> List[Tuple[Candidate, str, str]]:
        stmt = select(Candidate, Job.title, Stage.name).join(Job).join(Stage)

        if filters.get("job_id"):
            stmt = stmt.where(Candidate.job_id == int(filters["job_id"]))
        if filters.get("stage_id"):
            stmt = stmt.where(Candidate.stage_id == int(filters["stage_id"]))
        if filters.get("score_min"):
            stmt = stmt.where(Candidate.score >= int(filters["score_min"]))
        if filters.get("score_max"):
            stmt = stmt.where(Candidate.score <= int(filters["score_max"]))
        if filters.get("search"):
            search = f"%{filters['search']}%"
            stmt = stmt.where((Candidate.name.ilike(search)) | (Candidate.github_link.ilike(search)))

        stmt = stmt.order_by(Candidate.created_at.desc()).offset(pagination.offset).limit(pagination.page_size)
        result = await session.execute(stmt)
        return list(result.all())

    async def count(self, session: AsyncSession, filters: Dict[str, Optional[str]]) -> int:
        stmt = select(func.count()).select_from(Candidate)
        if filters.get("job_id"):
            stmt = stmt.where(Candidate.job_id == int(filters["job_id"]))
        if filters.get("stage_id"):
            stmt = stmt.where(Candidate.stage_id == int(filters["stage_id"]))
        if filters.get("score_min"):
            stmt = stmt.where(Candidate.score >= int(filters["score_min"]))
        if filters.get("score_max"):
            stmt = stmt.where(Candidate.score <= int(filters["score_max"]))
        if filters.get("search"):
            search = f"%{filters['search']}%"
            stmt = stmt.where((Candidate.name.ilike(search)) | (Candidate.github_link.ilike(search)))
        result = await session.execute(stmt)
        return int(result.scalar() or 0)

    async def create(self, session: AsyncSession, candidate: Candidate) -> Candidate:
        session.add(candidate)
        await session.flush()
        await session.refresh(candidate)
        return candidate

    async def update(self, session: AsyncSession, candidate: Candidate, data: Dict) -> Candidate:
        for key, value in data.items():
            setattr(candidate, key, value)
        await session.flush()
        await session.refresh(candidate)
        return candidate

    async def delete(self, session: AsyncSession, candidate: Candidate) -> None:
        await session.delete(candidate)
