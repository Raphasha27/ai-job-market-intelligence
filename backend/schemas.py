from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    description: str
    salary: Optional[str] = None
    skills: List[str] = []
    source: str

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    posted_at: datetime

    class Config:
        from_attributes = True

class SkillTrendBase(BaseModel):
    name: str
    demand_score: float
    growth_rate: float
    category: str

class SkillTrend(SkillTrendBase):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True

class ResumeMatchRequest(BaseModel):
    resume_text: str

class CareerRecommendation(BaseModel):
    career_path: str
    reasoning: str
    required_skills: List[str]
    potential_salary: str
