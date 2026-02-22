"""
FastAPI backend for the portfolio AI chat.
Serves /api/chat and optional health/resume endpoints.
"""

import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from openrouter import chat as openrouter_chat
from resume_context import get_resume_context
from database import save_message, get_session_messages, ensure_db

load_dotenv()

app = FastAPI(title="Portfolio AI Chat API", version="1.0.0")

_cors_origins = os.environ.get("CORS_ORIGINS", "").strip()
origins = [o.strip() for o in _cors_origins.split(",") if o.strip()] or [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    history: Optional[list[dict[str, str]]] = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str


def build_messages(
    user_message: str,
    session_id: Optional[str],
    history: Optional[list[dict[str, str]]],
) -> list[dict[str, str]]:
    resume = get_resume_context()
    system = (
        "You are a helpful assistant for a personal portfolio website. "
        "You have access to the following resume/CV information. "
        "Answer questions about the candidate based ONLY on this information. "
        "If something is not in the resume, say so politely and suggest they check the portfolio or contact directly. "
        "Keep answers concise and professional.\n\n"
        "--- RESUME ---\n"
        f"{resume}\n"
        "--- END RESUME ---"
    )
    messages: list[dict[str, str]] = [{"role": "system", "content": system}]

    if history:
        for h in history[-20:]:  # last 20 turns
            role = h.get("role")
            content = h.get("content")
            if role and content and role in ("user", "assistant"):
                messages.append({"role": role, "content": content})
    elif session_id:
        try:
            past = get_session_messages(session_id)
            for m in past[-20:]:
                messages.append({"role": m["role"], "content": m["content"]})
        except Exception:
            pass

    messages.append({"role": "user", "content": user_message})
    return messages


@app.on_event("startup")
def startup():
    ensure_db()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/health")
def api_health():
    """Check if backend and OpenRouter key are ready for chat."""
    from openrouter import get_api_key
    try:
        get_api_key()
        return {"status": "ok", "chat": "ready"}
    except ValueError as e:
        return {"status": "ok", "chat": "not_ready", "detail": str(e)}


@app.get("/api/resume")
def resume_preview():
    """Optional: return resume text for display (can be restricted in production)."""
    return {"resume": get_resume_context()}


@app.post("/api/chat", response_model=ChatResponse)
async def api_chat(body: ChatRequest):
    if not (body.message and body.message.strip()):
        raise HTTPException(status_code=400, detail="message is required")

    session_id = body.session_id or "default"
    messages = build_messages(body.message.strip(), session_id, body.history)

    try:
        reply = await openrouter_chat(messages)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Chat failed: {e!s}")

    save_message(session_id, "user", body.message.strip())
    save_message(session_id, "assistant", reply)

    return ChatResponse(reply=reply, session_id=session_id)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
