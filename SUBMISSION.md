# Assignment Submission Checklist

**Submission form (mandatory):** https://forms.gle/7AkdJbKDtj4chqqWA  
**Deadline:** 24 February 2026

---

## ✅ Requirements vs What You Have

| Requirement | Status | How It's Done |
|-------------|--------|----------------|
| **Personal portfolio website** | ✅ | Single-page portfolio with Hero, Experience, Skills, Projects, Contact (see `frontend/src/components/` and `frontend/src/data/portfolio.ts`). |
| **AI chat functionality** | ✅ | Floating chat button + “Ask AI” in Hero + “AI Chat” section + Nav link. Chat opens a panel; users type questions and get AI replies. |
| **Chat interacts with resume** | ✅ | Backend injects full resume from `backend/resume_context.py` into the AI system prompt. OpenRouter answers **only** from that context. |
| **Accurate responses** | ✅ | System prompt instructs the model to answer only from the resume; off-topic or unknown info is declined politely. |
| **Frontend: React + TypeScript** | ✅ | React 19 + TypeScript, Vite, Tailwind (see `frontend/package.json`, `frontend/src/**/*.tsx`). |
| **Backend: Python** | ✅ | FastAPI app in `backend/main.py`; `backend/openrouter.py`, `backend/database.py`, `backend/resume_context.py`. |
| **Database** | ✅ | SQLite used for chat history (sessions + messages) in `backend/database.py`; DB file: `backend/chat.db`. |
| **Chat engine: OpenRouter (free model)** | ✅ | `backend/openrouter.py` uses OpenRouter API with `openrouter/free` (free model router). Key in `backend/.env`. |
| **Good-looking portfolio / UI-UX** | ✅ | Dark theme, amber accent, Syne + DM Sans fonts, scroll-in animations, glass-style cards, clear sections, responsive layout, obvious AI chat entry points. |
| **Sensible backend structure** | ✅ | Separate modules: `main.py` (API + CORS), `openrouter.py` (LLM), `resume_context.py` (content), `database.py` (SQLite). |

---

## What to Mention in the Form

When filling the form, you can briefly say:

- **Project summary:** “Personal portfolio (React + TypeScript frontend, Python FastAPI backend) with an AI chat that answers questions using my resume. Chat is powered by OpenRouter (free model); chat history stored in SQLite.”
- **Live link (if you did the bonus):** Your Cloudflare tunnel URL or hosted frontend URL.
- **GitHub repo (if you did the bonus):** Your public repo URL.
- **Tech stack:** React, TypeScript, Vite, Tailwind CSS (frontend); Python, FastAPI, SQLite (backend); OpenRouter for AI.

---

## Bonus: Public GitHub + Non-Localhost Access

To get “extra consideration”:

### 1. Push to a public GitHub repo

```bash
cd "/Users/shubhamprasad/ai portfolio"
git init
git add .
# Ensure .env is NOT added (backend/.env is in .gitignore)
git commit -m "Portfolio with AI resume chat"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Important:** Do **not** commit `backend/.env` (it contains your API key). It’s already in `backend/.gitignore`.

### 2. Expose the app (e.g. Cloudflare Tunnel)

**Option A – Cloudflare Tunnel (both frontend and backend from your machine):**

1. Install Cloudflare Tunnel: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
2. Start the app (from project root): `npm run dev`
3. In a **second** terminal, run two tunnels (or run backend on a free host and only tunnel frontend):

   ```bash
   # Terminal 1: tunnel for frontend
   cloudflared tunnel --url http://localhost:5173
   # Note the public URL (e.g. https://xxxx.trycloudflare.com)

   # Terminal 2: tunnel for backend
   cloudflared tunnel --url http://localhost:8000
   # Note the backend public URL
   ```

4. In the frontend, set the backend URL:
   - Create `frontend/.env` with:  
     `VITE_API_URL=https://YOUR_BACKEND_TUNNEL_URL`
   - Rebuild: `cd frontend && npm run build`
   - Serve the built site (e.g. `npx serve dist`) and tunnel that, **or** use the dev server URL from step 3 and use the frontend tunnel URL as your “live link” (with `VITE_API_URL` pointing to the backend tunnel).

**Option B – Host backend online (recommended for a stable “live” link):**

1. Deploy backend to **Render**, **Railway**, or **Fly.io** (connect your GitHub repo, set `OPENROUTER_API_KEY` in env).
2. Deploy frontend to **Cloudflare Pages** or **Vercel** (connect repo, build command `npm run build`, output `dist`).
3. In the hosted frontend, set env: `VITE_API_URL=https://your-backend-url.onrender.com` (or your backend host).
4. Use the Cloudflare Pages / Vercel URL as your “live link” in the form.

---

## Quick Run (for demo / testing)

From project root:

```bash
npm run dev
```

Then open **http://localhost:5173**. Use “Open AI Chat” or “Ask AI” to test resume Q&A.

---

## Summary

Your project **meets the assignment**: portfolio + AI chat backed by your resume, correct tech stack (React/TypeScript, Python, DB, OpenRouter), clear UI/UX and backend structure. Fill the form before the deadline and, if you can, add the bonus (public GitHub + public URL) for extra consideration.
