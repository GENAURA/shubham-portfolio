# AI Portfolio with Resume Chat

A personal portfolio site with an **AI chat** that answers questions using your resume. Built with React (TypeScript), Python (FastAPI), OpenRouter, and SQLite.

## Tech stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Backend:** Python 3, FastAPI, httpx
- **Database:** SQLite (chat history)
- **AI:** OpenRouter (free models)

## Quick start

### 1. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and set OPENROUTER_API_KEY (get a free key at https://openrouter.ai/settings/keys)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. The chat button (bottom-right) talks to the backend; in dev, Vite proxies `/api` and `/health` to the Python server.

### 3. Customize your resume

- **Backend (for the AI):** Edit `backend/resume_context.py` and replace `RESUME_TEXT` with your own resume/CV. The chatbot uses only this content to answer.
- **Frontend (for the site):** Edit `frontend/src/data/portfolio.ts` to match your name, tagline, experience, skills, projects, and contact. Keep it in sync with `resume_context.py` for consistent answers.

## Environment

| Variable | Where | Description |
|----------|--------|-------------|
| `OPENROUTER_API_KEY` | Backend | Required. Get at [OpenRouter Keys](https://openrouter.ai/settings/keys). |
| `CORS_ORIGINS` | Backend | Optional. Comma-separated origins for CORS (e.g. `https://your-site.pages.dev`). |
| `VITE_API_URL` | Frontend | Optional. API base URL when not using Vite proxy (e.g. `https://your-api.example.com`). |

## Hosting (bonus)

### GitHub

1. Create a new repo and push this project.
2. For the frontend: you can use **GitHub Pages** (static build) or **Cloudflare Pages** (connect repo, build command `npm run build`, output `dist`).
3. For the backend: run the FastAPI app on a free tier (e.g. **Railway**, **Render**, **Fly.io**) and set `VITE_API_URL` in the frontend to that URL.

### Cloudflare Tunnel (expose localhost)

1. Install [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/).
2. Start your backend and frontend locally.
3. Expose the frontend (e.g. port 5173):
   ```bash
   cloudflared tunnel --url http://localhost:5173
   ```
   You’ll get a public URL. For the chat to work, the backend must also be reachable: either run it on a hosted service and set `VITE_API_URL`, or run a second tunnel for port 8000 and point `VITE_API_URL` to that tunnel URL.

## Project layout

```
ai portfolio/
├── backend/
│   ├── main.py           # FastAPI app, /api/chat, CORS
│   ├── openrouter.py     # OpenRouter client
│   ├── resume_context.py # Resume text for AI context (edit this)
│   ├── database.py       # SQLite chat history
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   # Nav, Hero, Experience, Skills, Projects, Contact, Chat
│   │   ├── api/chat.ts   # API client for /api/chat
│   │   └── data/portfolio.ts  # Site content (edit this)
│   ├── vite.config.ts    # Proxy /api and /health to backend
│   └── .env.example
└── README.md
```

## API

- `GET /health` — Health check.
- `POST /api/chat` — Send a message, get an AI reply. Body: `{ "message": "...", "session_id": "optional", "history": [] }`. Response: `{ "reply": "...", "session_id": "..." }`.

The backend injects your resume into the system prompt so the model answers only from that context.
