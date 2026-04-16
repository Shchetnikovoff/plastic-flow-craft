"""LLM API client — OpenAI-compatible (OhMyLama) with streaming."""
import asyncio
import json as _json
import logging
import re
from collections.abc import AsyncIterator

import httpx

from config import settings

logger = logging.getLogger(__name__)

_http_client: httpx.AsyncClient | None = None
_THINK_RE = re.compile(r"<think>.*?</think>\s*", re.DOTALL)


def _get_client() -> httpx.AsyncClient:
    global _http_client
    if _http_client is None or _http_client.is_closed:
        try:
            import h2  # noqa: F401
            use_http2 = True
        except ImportError:
            use_http2 = False
        _http_client = httpx.AsyncClient(
            timeout=60.0,
            http2=use_http2,
            limits=httpx.Limits(max_connections=10, max_keepalive_connections=5),
        )
    return _http_client


async def close_client() -> None:
    global _http_client
    if _http_client is not None and not _http_client.is_closed:
        await _http_client.aclose()
        _http_client = None


def strip_thinking(text: str) -> str:
    return _THINK_RE.sub("", text).strip() if text else ""


def _headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {settings.llm_api_key}",
        "Content-Type": "application/json",
    }


async def chat_stream(
    messages: list[dict[str, str]],
    max_tokens: int = 2000,
    temperature: float = 0.1,
) -> AsyncIterator[str]:
    client = _get_client()
    payload = {
        "model": settings.llm_model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": True,
    }
    async with client.stream(
        "POST",
        f"{settings.llm_base_url}/chat/completions",
        json=payload,
        headers=_headers(),
    ) as resp:
        resp.raise_for_status()
        async for line in resp.aiter_lines():
            if not line.startswith("data: "):
                continue
            data = line[6:]
            if data == "[DONE]":
                break
            try:
                chunk = _json.loads(data)
                delta = chunk["choices"][0].get("delta", {})
                token = delta.get("content", "")
                if token:
                    yield token
            except (KeyError, IndexError, _json.JSONDecodeError):
                continue


async def chat(
    messages: list[dict[str, str]],
    max_tokens: int = 2000,
    temperature: float = 0.1,
) -> str:
    client = _get_client()
    payload = {
        "model": settings.llm_model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": False,
    }
    resp = await asyncio.wait_for(
        client.post(
            f"{settings.llm_base_url}/chat/completions",
            json=payload,
            headers=_headers(),
        ),
        timeout=60.0,
    )
    resp.raise_for_status()
    body = resp.json()
    text = body["choices"][0]["message"]["content"]
    return strip_thinking(text)
