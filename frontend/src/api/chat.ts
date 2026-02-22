const API_BASE = import.meta.env.VITE_API_URL || "";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  reply: string;
  session_id: string;
}

export async function sendChatMessage(
  message: string,
  sessionId: string | null,
  history: ChatMessage[]
): Promise<ChatResponse> {
  const url = `${API_BASE}/api/chat`;
  const body = {
    message,
    session_id: sessionId || undefined,
    history: history.length ? history : undefined,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}
