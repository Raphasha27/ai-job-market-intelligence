from sqlalchemy import Column, Integer, String, DateTime, JSON, Float
from database import Base
import datetime

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String)
    location = Column(String)
    description = Column(String)
    salary = Column(String, nullable=True)
    posted_at = Column(DateTime, default=datetime.datetime.utcnow)
    skills = Column(JSON)  # List of identified skills
    source = Column(String) # LinkedIn, Indeed, etc.

class SkillTrend(Base):
    __tablename__ = "skill_trends"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    demand_score = Column(Float)
    growth_rate = Column(Float)
    category = Column(String)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)
