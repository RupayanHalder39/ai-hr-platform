from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    github_link = Column(String(500))
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=False)
    stage_id = Column(Integer, ForeignKey("stages.id"), nullable=False)
    score = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("Job", back_populates="candidates")
    stage = relationship("Stage", back_populates="candidates")
    assignments = relationship("Assignment", back_populates="candidate")
    interviews = relationship("Interview", back_populates="candidate")
    offers = relationship("Offer", back_populates="candidate")
