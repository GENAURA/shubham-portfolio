from sqlalchemy.orm import Session
from app.models import Resume

def get_resume_content(db: Session):
    resume = db.query(Resume).first()
    return resume.content if resume else ""