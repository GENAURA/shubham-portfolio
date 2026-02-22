"""
OpenRouter API client for chat completions.
Uses a free model via OpenRouter (e.g. openrouter/auto or a specific free model).
"""

import os
import httpx
from typing import Any, Optional

OPENROUTER_BASE = "https://openrouter.ai/api/v1"
# Free router: picks from free models. See https://openrouter.ai/openrouter/free/api
DEFAULT_MODEL = "openrouter/free"


def get_api_key() -> str:
    key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not key:
        raise ValueError(
            "OPENROUTER_API_KEY is not set. Get a free key at https://openrouter.ai/settings/keys"
        )
    return key


async def chat(messages: list[dict[str, Any]], model: Optional[str] = None) -> str:
    """
    Send messages to OpenRouter and return the assistant reply content.
    messages: list of {"role": "user"|"assistant"|"system", "content": "..."}
    """
    api_key = get_api_key()
    url = f"{OPENROUTER_BASE}/chat/completions"
    payload = {
        "model": model or DEFAULT_MODEL,
        "messages": messages,
        "max_tokens": 1024,
        "temperature": 0.7,
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": os.environ.get("SITE_URL", "http://localhost:5173"),
    }
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(url, json=payload, headers=headers)
        if resp.status_code != 200:
            err_body = resp.text
            try:
                err_json = resp.json()
                err_body = err_json.get("error", {}).get("message", err_body) or err_body
            except Exception:
                pass
            raise RuntimeError(
                f"OpenRouter API error ({resp.status_code}): {err_body}"
            )
        data = resp.json()
    choice = data.get("choices")
    if not choice:
        return "No response from the model."
    content = choice[0].get("message", {}).get("content", "")
    return content or "No response from the model."
