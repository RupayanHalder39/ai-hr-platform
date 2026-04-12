from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class Stage(Base):
    __tablename__ = "stages"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    order_index = Column(Integer, nullable=False)

    candidates = relationship("Candidate", back_populates="stage")
