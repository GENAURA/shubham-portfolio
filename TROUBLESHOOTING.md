# AI Chat not working – fix it

Follow these steps in order.

---

## 1. Backend must be running

You need **both** backend and frontend running.

**From project root (e.g. `ai portfolio`):**
```bash
npm run dev
```
This starts backend on port **8000** and frontend on **5173**.

Or run them separately:
- **Terminal 1:** `cd backend && .venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- **Terminal 2:** `cd frontend && npm run dev`

---

## 2. Check backend is reachable

Open in browser:
- **http://localhost:8000/health**  
  Should show: `{"status":"ok"}`

Then:
- **http://localhost:8000/api/health**  
  - If you see `"chat":"ready"` → API key is set and chat should work.  
  - If you see `"chat":"not_ready"` and a message about `OPENROUTER_API_KEY` → add the key to `backend/.env` (see step 3).

If **http://localhost:8000/health** does not open, the backend is not running. Start it (step 1).

---

## 3. OpenRouter API key in backend

1. Get a free key: https://openrouter.ai/settings/keys  
2. In the project, open **`backend/.env`** (create it if missing).  
3. Add exactly one line (with your key):
   ```env
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```
4. Restart the backend (stop and run `npm run dev` or uvicorn again).

---

## 4. Use the frontend dev server (for proxy)

Open the app at **http://localhost:5173** (Vite dev server), **not** by opening `frontend/dist/index.html` in the browser.

The proxy that sends `/api/*` to the backend only works when you use `npm run dev` and visit **http://localhost:5173**.

---

## 5. What you see when something is wrong

| What you see in chat | Cause | Fix |
|----------------------|--------|-----|
| "Failed to fetch" / "Network Error" | Backend not running or wrong URL | Start backend (step 1). Use http://localhost:5173 (step 4). |
| "OPENROUTER_API_KEY is not set..." | Key missing in backend | Set it in `backend/.env` and restart backend (step 3). |
| "OpenRouter API error (401)..." | Invalid or expired API key | New key from OpenRouter, update `backend/.env`, restart. |
| "OpenRouter API error (429)..." | Rate limit (free tier) | Wait a minute and try again. |
| "OpenRouter API error (502/503)..." | OpenRouter or model issue | Try again later or check status at openrouter.ai. |

---

## 6. Quick test from terminal (without frontend)

With backend running:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are your skills?"}'
```

You should get JSON with `"reply": "..."`. If you get an error message in the JSON, that’s the same error the chat would show; use the table in step 5 to fix it.
