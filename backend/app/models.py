from sqlalchemy import Column, Integer, Text
from app.database import Base

class ResumeChunk(Base):
    __tablename__ = "resume_chunks"
    id = Column(Integer, primary_key=True)
    content = Column(Text)
    embedding = Column(Text)  # store as JSON string