from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import ResumeChunk
from app.vector_utils import get_embedding, cosine_similarity
import json
import requests
import os

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/chat")
def chat_stream(data: dict, db: Session = Depends(get_db)):

    question = data["message"]
    question_embedding = get_embedding(question)

    chunks = db.query(ResumeChunk).all()

    scored = []
    for chunk in chunks:
        emb = json.loads(chunk.embedding)
        score = cosine_similarity(question_embedding, emb)
        scored.append((score, chunk.content))

    scored.sort(reverse=True)
    context = "\n".join([c[1] for c in scored[:3]])

    def stream():
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}"},
            json={
                "model": "mistralai/mistral-7b-instruct",
                "stream": True,
                "messages": [
                    {"role": "system", "content": f"Answer only from this resume:\n{context}"},
                    {"role": "user", "content": question}
                ]
            },
            stream=True
        )

        for line in response.iter_lines():
            if line:
                yield line.decode() + "\n"

    return StreamingResponse(stream(), media_type="text/plain")