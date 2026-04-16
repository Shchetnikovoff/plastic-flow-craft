"""SQLite async storage for leads and chat logs."""
import json
import logging
from datetime import datetime, timezone

import aiosqlite

from config import settings

logger = logging.getLogger(__name__)

_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT DEFAULT '',
    query_summary TEXT DEFAULT '',
    chat_history TEXT DEFAULT '[]',
    created_at TEXT NOT NULL
)
"""


async def init_db() -> None:
    async with aiosqlite.connect(settings.db_path) as db:
        await db.execute(_CREATE_TABLE)
        await db.commit()
    logger.info("DB initialized: %s", settings.db_path)


async def save_lead(
    session_id: str, name: str, phone: str, email: str,
    query_summary: str, chat_history: list[dict],
) -> int:
    now = datetime.now(timezone.utc).isoformat()
    async with aiosqlite.connect(settings.db_path) as db:
        cursor = await db.execute(
            "INSERT INTO leads (session_id, name, phone, email, query_summary, chat_history, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (session_id, name, phone, email, query_summary, json.dumps(chat_history, ensure_ascii=False), now),
        )
        await db.commit()
        lead_id = cursor.lastrowid
    logger.info("Lead saved: id=%d session=%s name=%s", lead_id, session_id, name)
    return lead_id
