import models
from database import SessionLocal, engine
import datetime

def seed():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(models.Job).first():
        print("Database already seeded.")
        return

    # Sample Jobs
    jobs = [
        models.Job(
            title="Senior Full Stack Engineer",
            company="TechNexus ZA",
            location="Johannesburg (Remote)",
            description="Developing next-gen fintech solutions.",
            salary="R 75k - R 95k",
            skills=["React", "FastAPI", "PostgreSQL", "AWS"],
            source="LinkedIn"
        ),
        models.Job(
            title="AI Specialist",
            company="Innovate AI",
            location="Cape Town",
            description="Building NLP models for African languages.",
            salary="R 85k - R 120k",
            skills=["Python", "PyTorch", "NLP", "OpenAI"],
            source="Indeed"
        )
    ]
    
    # Sample Trends
    trends = [
        models.SkillTrend(name="React", demand_score=85, growth_rate=12, category="Frontend"),
        models.SkillTrend(name="Python", demand_score=92, growth_rate=15, category="Backend/AI"),
        models.SkillTrend(name="FastAPI", demand_score=75, growth_rate=20, category="Backend")
    ]
    
    db.add_all(jobs)
    db.add_all(trends)
    db.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
