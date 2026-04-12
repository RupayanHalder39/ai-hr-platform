from sqlalchemy import Column, DateTime, ForeignKey, Integer, Text, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    transcript = Column(Text)
    score = Column(Integer)
    sentiment = Column(String(50))
    status_id = Column(Integer, ForeignKey("statuses.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    candidate = relationship("Candidate", back_populates="interviews")
    status = relationship("Status", back_populates="interviews")
