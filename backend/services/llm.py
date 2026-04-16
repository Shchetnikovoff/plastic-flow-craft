"""LLM session manager: history, circuit breaker, prompt assembly."""
import asyncio
import logging
import time
from collections.abc import AsyncIterator
from pathlib import Path

from services.knowledge import kb
from services.llm_client import chat_stream, strip_thinking

logger = logging.getLogger(__name__)

MAX_HISTORY = 6
HISTORY_TTL = 7200
_TRIM_LEN = 300

_sessions: dict[str, list[dict]] = {}
_session_ts: dict[str, float] = {}

_fail_count = 0
_fail_until = 0.0
_FAIL_THRESHOLD = 3
_BACKOFF_STEPS = [15, 30, 60, 120, 300]

_system_prompt_template: str = ""
_PROMPT_PATH = Path(__file__).parent.parent / "prompts" / "system.md"

_semaphore = asyncio.Semaphore(5)


def _load_prompt_template() -> str:
    global _system_prompt_template
    if not _system_prompt_template:
        _system_prompt_template = _PROMPT_PATH.read_text(encoding="utf-8")
    return _system_prompt_template


def _cleanup_sessions() -> None:
    now = time.time()
    expired = [sid for sid, ts in _session_ts.items() if now - ts > HISTORY_TTL]
    for sid in expired:
        _sessions.pop(sid, None)
        _session_ts.pop(sid, None)


def _get_history(session_id: str) -> list[dict]:
    _cleanup_sessions()
    _session_ts[session_id] = time.time()
    if session_id not in _sessions:
        _sessions[session_id] = []
    return _sessions[session_id]


def _trim(text: str) -> str:
    return text[:_TRIM_LEN] + "..." if len(text) > _TRIM_LEN else text


async def chat_sse(session_id: str, user_message: str) -> AsyncIterator[str]:
    global _fail_count, _fail_until

    if _fail_count >= _FAIL_THRESHOLD:
        if time.time() < _fail_until:
            yield "Сервис временно недоступен. Попробуйте через несколько минут."
            return
        _fail_count = 0

    knowledge = kb.get_relevant(user_message)
    template = _load_prompt_template()
    system_prompt = template.replace("{knowledge}", knowledge)

    history = _get_history(session_id)

    messages = [{"role": "system", "content": system_prompt}]
    for msg in history[-MAX_HISTORY:]:
        messages.append(msg)
    messages.append({"role": "user", "content": user_message})

    full_response = ""
    try:
        async with _semaphore:
            async for token in chat_stream(messages):
                full_response += token
                yield token
        _fail_count = 0
    except Exception as e:
        _fail_count += 1
        idx = min(_fail_count - 1, len(_BACKOFF_STEPS) - 1)
        _fail_until = time.time() + _BACKOFF_STEPS[idx]
        logger.error("LLM error (%d/%d): %s", _fail_count, _FAIL_THRESHOLD, e)
        yield "Произошла ошибка при обращении к AI. Попробуйте повторить запрос."
        return

    clean_response = strip_thinking(full_response)

    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": _trim(clean_response)})

    if len(history) > MAX_HISTORY:
        _sessions[session_id] = history[-MAX_HISTORY:]
