"""
SQLite database for chat history (optional but improves UX and persistence).
"""

import sqlite3
import os
from datetime import datetime
from typing import Any
from contextlib import contextmanager

DB_PATH = os.environ.get("CHAT_DB_PATH", os.path.join(os.path.dirname(__file__), "chat.db"))


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
            )
        """)


def ensure_db() -> None:
    init_db()


def save_message(session_id: str, role: str, content: str) -> None:
    ensure_db()
    with get_db() as conn:
        conn.execute(
            "INSERT OR IGNORE INTO chat_sessions (id, created_at) VALUES (?, ?)",
            (session_id, datetime.utcnow().isoformat()),
        )
        conn.execute(
            "INSERT INTO messages (session_id, role, content, created_at) VALUES (?, ?, ?, ?)",
            (session_id, role, content, datetime.utcnow().isoformat()),
        )


def get_session_messages(session_id: str, limit: int = 50) -> list[dict[str, Any]]:
    ensure_db()
    with get_db() as conn:
        rows = conn.execute(
            """
            SELECT role, content FROM messages
            WHERE session_id = ?
            ORDER BY id ASC
            LIMIT ?
            """,
            (session_id, limit),
        ).fetchall()
    return [{"role": row["role"], "content": row["content"]} for row in rows]
