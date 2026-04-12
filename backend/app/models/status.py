from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Status(Base):
    __tablename__ = "statuses"

    id = Column(Integer, primary_key=True)
    entity_type = Column(String(50), nullable=False, index=True)
    name = Column(String(100), nullable=False)

    jobs = relationship("Job", back_populates="status")
    assignments = relationship("Assignment", back_populates="status")
    interviews = relationship("Interview", back_populates="status")
    offers = relationship("Offer", back_populates="status")
