from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database
from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Job Market Intelligence API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Job Market Intelligence API"}

@app.get("/api/jobs", response_model=List[schemas.Job])
def get_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jobs = db.query(models.Job).offset(skip).limit(limit).all()
    return jobs

@app.get("/api/trends", response_model=List[schemas.SkillTrend])
def get_trends(db: Session = Depends(get_db)):
    trends = db.query(models.SkillTrend).all()
    return trends

@app.post("/api/match-resume")
async def match_resume(request: schemas.ResumeMatchRequest):
    # This would involve OpenAI processing
    # For now, returning mock data as seen in frontend
    return {
        "score": 85,
        "matches": [
            "React architecture matches Senior Frontend roles",
            "5 years of experience aligns with Cloud Architect needs"
        ],
        "gaps": ["Kubernetes", "AWS Certification"]
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
