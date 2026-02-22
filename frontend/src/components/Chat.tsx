import { useState, useRef, useEffect } from "react";
import { sendChatMessage, type ChatMessage } from "../api/chat";

const SESSION_KEY = "portfolio_chat_session_id";
const API_BASE = import.meta.env.VITE_API_URL || "";

interface ChatProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Chat({ open: controlledOpen, onOpenChange }: ChatProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(() =>
    typeof localStorage !== "undefined" ? localStorage.getItem(SESSION_KEY) : null
  );
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<"checking" | "ready" | "error" | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId && typeof localStorage !== "undefined") {
      localStorage.setItem(SESSION_KEY, sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Check backend when chat panel opens
  useEffect(() => {
    if (!open) {
      setBackendStatus(null);
      setError(null);
      return;
    }
    setBackendStatus("checking");
    setError(null);
    const url = `${API_BASE}/api/health`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setBackendStatus(data.chat === "ready" ? "ready" : "error");
        if (data.chat !== "ready" && data.detail) {
          setError(data.detail);
        }
      })
      .catch(() => {
        setBackendStatus("error");
        setError(
          "Cannot reach backend. Run npm run dev from project root, then open http://localhost:5173"
        );
      });
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await sendChatMessage(text, sessionId, messages);
      if (res.session_id && res.session_id !== sessionId) {
        setSessionId(res.session_id);
      }
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      if (msg === "Failed to fetch" || msg.includes("NetworkError")) {
        setError(
          "Backend not reachable. Run: npm run dev (from project root), then use http://localhost:5173"
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
        style={{
          background: "var(--color-accent)",
          color: "#0a0a0b",
          boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 32px -4px rgba(245, 158, 11, 0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 0 rgba(245, 158, 11, 0.4)";
        }}
        aria-label={open ? "Close chat" : "Open AI chat"}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-40 flex h-[min(440px,72vh)] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl"
          style={{
            background: "rgba(20, 20, 22, 0.95)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="font-semibold text-amber-400">Ask about my resume</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {backendStatus === "checking" && messages.length === 0 && (
              <p className="text-xs text-zinc-500">Checking backend…</p>
            )}
            {backendStatus === "error" && messages.length === 0 && !loading && (
              <p className="text-sm text-amber-400/90">
                Backend not connected. Run <code className="rounded bg-white/10 px-1">npm run dev</code> from project root, then open http://localhost:5173
              </p>
            )}
            {(backendStatus === "ready" || backendStatus === null) && messages.length === 0 && !loading && (
              <p className="text-sm leading-relaxed text-zinc-500">
                Ask me anything about my experience, skills, or projects. I’ll answer based on my resume.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-amber-500/15 text-amber-100"
                      : "rounded-bl-md border border-white/[0.06] bg-white/[0.04] text-zinc-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3"
                  role="status"
                  aria-label="Thinking"
                >
                  <div className="typing-dots flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>
          <form
            className="border-t border-white/[0.06] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 transition disabled:opacity-50"
                style={{
                  background: "var(--color-accent)",
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
