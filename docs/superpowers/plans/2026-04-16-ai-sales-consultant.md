# AI Sales Consultant — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an AI sales consultant chat widget to the plastic-flow industrial equipment site, with keyword-based RAG, OhMyLama LLM streaming, lead capture via email, and KP PDF generation.

**Architecture:** Monolith — FastAPI backend in `backend/` folder, React chat widget in `src/components/ChatWidget.tsx`. Vite proxies `/api/*` to FastAPI on port 8000. RAG uses keyword matching against markdown knowledge files (same pattern as iremel-bot).

**Tech Stack:** FastAPI, httpx[http2], sse-starlette, pydantic-settings, aiosmtplib, aiosqlite, reportlab (backend); React 18, shadcn/ui, TypeScript (frontend).

**Spec:** `docs/superpowers/specs/2026-04-16-ai-sales-consultant-design.md`

---

## File Map

### New Files (Backend)

| File | Responsibility |
|------|---------------|
| `backend/main.py` | FastAPI app, routes: `/api/chat`, `/api/lead`, `/api/kp`, `/api/health` |
| `backend/config.py` | pydantic-settings: LLM, SMTP, app config from `.env` |
| `backend/requirements.txt` | Python dependencies |
| `backend/services/knowledge.py` | KnowledgeBase class: load markdown, keyword matching, get_relevant() |
| `backend/services/llm_client.py` | httpx AsyncClient, OpenAI-compatible chat + streaming |
| `backend/services/llm.py` | Session management, history, circuit breaker, prompt assembly |
| `backend/services/postprocess.py` | Parse [LEAD], [KP:...], [ESCALATE:...] markers from LLM response |
| `backend/services/email_service.py` | aiosmtplib: send lead notification + escalation emails |
| `backend/services/kp_generator.py` | reportlab: generate commercial proposal PDF |
| `backend/services/db.py` | aiosqlite: leads table CRUD |
| `backend/prompts/system.md` | System prompt template with `{knowledge}` placeholder |
| `backend/knowledge/manual/faq.md` | FAQ: сроки, гарантия, доставка, оплата |
| `backend/knowledge/manual/podbor-materiala.md` | PPC vs PPH vs PE100 selection guide |
| `backend/knowledge/manual/o-kompanii.md` | Company info, contacts, requisites |
| `backend/scripts/sync_knowledge.py` | Parse `src/data/*.ts` → `backend/knowledge/auto/*.md` |
| `backend/tests/test_knowledge.py` | Tests for RAG pipeline |
| `backend/tests/test_postprocess.py` | Tests for marker parsing |
| `backend/tests/test_api.py` | Integration tests for API endpoints |

### New Files (Frontend)

| File | Responsibility |
|------|---------------|
| `src/components/ChatWidget.tsx` | Floating chat widget: UI, SSE streaming, lead form |

### Modified Files

| File | Change |
|------|--------|
| `vite.config.ts` | Add proxy: `/api` → `http://localhost:8000` |
| `src/App.tsx` | Add `<ChatWidget />` outside `<Routes>` |
| `.env` | Add LLM_API_KEY, SMTP_* variables |

---

## Task 1: Backend Skeleton + Config

**Files:**
- Create: `backend/main.py`
- Create: `backend/config.py`
- Create: `backend/requirements.txt`
- Create: `.env`

- [ ] **Step 1: Create `backend/requirements.txt`**

```
fastapi==0.115.6
uvicorn[standard]==0.34.0
httpx[http2]==0.28.1
sse-starlette==2.2.1
pydantic-settings==2.7.1
aiosmtplib==3.0.2
aiosqlite==0.20.0
reportlab==4.2.5
python-dotenv==1.0.1
pytest==8.3.4
pytest-asyncio==0.25.0
httpx==0.28.1
```

- [ ] **Step 2: Create `backend/config.py`**

```python
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    llm_base_url: str = "https://ohmylama.ru/v1"
    llm_api_key: str = ""
    llm_model: str = "gpt-5.4-mini"

    smtp_host: str = "smtp.mail.ru"
    smtp_port: int = 465
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_to: str = "osobenkov@list.ru"

    db_path: str = "leads.db"

    model_config = {"env_file": "../.env", "extra": "ignore"}


settings = Settings()
```

- [ ] **Step 3: Create `backend/main.py`**

```python
from fastapi import FastAPI

app = FastAPI(title="Plast-Metall Pro AI Consultant")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

- [ ] **Step 4: Create `.env` at project root**

```
LLM_BASE_URL=https://ohmylama.ru/v1
LLM_API_KEY=your-key-here
LLM_MODEL=gpt-5.4-mini

SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_USER=
SMTP_PASSWORD=
SMTP_TO=osobenkov@list.ru
```

- [ ] **Step 5: Install deps and verify server starts**

Run:
```bash
cd backend && pip install -r requirements.txt
uvicorn main:app --port 8000
```

Expected: Server starts, `GET http://localhost:8000/api/health` returns `{"status":"ok"}`

- [ ] **Step 6: Commit**

```bash
git add backend/main.py backend/config.py backend/requirements.txt .env
git commit -m "feat: backend skeleton with FastAPI + config"
```

---

## Task 2: Knowledge Base — RAG Engine

**Files:**
- Create: `backend/services/__init__.py`
- Create: `backend/services/knowledge.py`
- Create: `backend/tests/__init__.py`
- Create: `backend/tests/test_knowledge.py`

- [ ] **Step 1: Create `backend/services/__init__.py`**

Empty file.

- [ ] **Step 2: Create `backend/tests/__init__.py`**

Empty file.

- [ ] **Step 3: Write failing test `backend/tests/test_knowledge.py`**

```python
import tempfile
from pathlib import Path

from services.knowledge import KnowledgeBase


def _make_kb(files: dict[str, str]) -> KnowledgeBase:
    """Create a KnowledgeBase with temp markdown files."""
    kb = KnowledgeBase()
    with tempfile.TemporaryDirectory() as td:
        for name, content in files.items():
            (Path(td) / f"{name}.md").write_text(content, encoding="utf-8")
        kb.load_all(Path(td))
    return kb


def test_load_all_reads_markdown_files():
    kb = _make_kb({"topic_a": "Content A", "topic_b": "Content B"})
    assert kb.get("topic_a") == "Content A"
    assert kb.get("topic_b") == "Content B"
    assert kb.get("nonexistent") is None


def test_get_relevant_matches_keywords():
    kb = _make_kb({
        "emkosti-evpp": "Вертикальные ёмкости ЕВПП...",
        "vodoochistka-ffu": "Флотационно-фильтрационные установки...",
        "faq": "Часто задаваемые вопросы...",
    })
    result = kb.get_relevant("нужна ёмкость на 5000 литров")
    assert "Вертикальные ёмкости ЕВПП" in result
    assert "Флотационно-фильтрационные установки" not in result


def test_get_relevant_returns_fallback_when_no_match():
    kb = _make_kb({
        "catalog-overview": "Общий каталог продукции...",
        "faq": "Часто задаваемые вопросы...",
    })
    result = kb.get_relevant("привет как дела")
    assert "Общий каталог продукции" in result


def test_get_relevant_limits_to_max_topics():
    files = {f"topic_{i}": f"Content {i}" for i in range(10)}
    kb = KnowledgeBase()
    with tempfile.TemporaryDirectory() as td:
        for name, content in files.items():
            (Path(td) / f"{name}.md").write_text(content, encoding="utf-8")
        kb.load_all(Path(td))
    # Force all topics to match by injecting keywords
    kb._topic_keywords = {f"topic_{i}": ["тест"] for i in range(10)}
    result = kb.get_relevant("тест")
    # Should have at most MAX_TOPICS sections
    assert result.count("---") <= 5  # 6 topics = 5 separators
```

- [ ] **Step 4: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_knowledge.py -v`
Expected: FAIL — `ModuleNotFoundError: No module named 'services'`

- [ ] **Step 5: Implement `backend/services/knowledge.py`**

```python
"""Knowledge base: load markdown files + keyword-based RAG retrieval."""
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

_MAX_TOPICS = 6

_TOPIC_KEYWORDS: dict[str, list[str]] = {
    # --- Auto-generated topics (products) ---
    "emkosti-evpp": ["ёмкост", "емкост", "бак", "евпп", "вертикальн", "цистерн", "резервуар"],
    "emkosti-gorizontalnye": ["горизонтальн", "ёмкост горизонт", "лежач"],
    "emkosti-podzemnye": ["подземн", "заглублен"],
    "emkosti-pryamougolnye": ["прямоугольн"],
    "emkosti-pozharnye": ["пожарн", "противопожарн", "пожаротушен"],
    "emkosti-perelivnye": ["переливн", "бассейн"],
    "vodoochistka-ffu": ["водоочист", "ффу", "ffu", "флотац", "фильтрац"],
    "vodoochistka-lamelnyj": ["ламел", "отстойник", "тонкослойн"],
    "vodoochistka-obezvozhivatel": ["обезвожив", "мешочн", "шлам"],
    "vodoochistka-zhirouloviteli": ["жироулов", "жиро-улов", "grease"],
    "vodoochistka-dozirovanie": ["дозирован", "реагент"],
    "gazoochistka-skrubbery": ["скруббер", "газоочист", "scrubber"],
    "gazoochistka-fvg": ["фвг", "fvg", "волокнист фильтр"],
    "gazoochistka-kapleuloviteli": ["каплеулов", "капл", "demister"],
    "ventilation": ["вентиляц", "воздуховод", "отвод", "тройник", "раздвижн", "фитинг"],
    "kns": ["кнс", "канализ", "насосн станц"],
    "los": ["лос", "локальн очист", "очистн сооруж"],
    "reaktory": ["реактор", "химическ реактор"],
    "gidrometallurgiya": ["гидрометаллург", "нутч", "выщелач", "сорбцион"],
    "catalog-overview": ["каталог", "что производ", "продукц", "ассортимент"],
    # --- Manual topics ---
    "faq": ["срок", "гарантия", "доставк", "оплат", "цена", "стоимость", "сколько стоит", "почём"],
    "podbor-materiala": ["материал", "полипропилен", "pph", "ppc", "pe100", "pe 100", "кислот", "щёлоч", "щелоч", "химическ стойк", "коррозион"],
    "o-kompanii": ["компани", "пласт-металл", "контакт", "адрес", "телефон", "реквизит"],
}

_FALLBACK_TOPIC = "catalog-overview"


class KnowledgeBase:
    def __init__(self) -> None:
        self._data: dict[str, str] = {}

    def load_all(self, knowledge_dir: Path) -> None:
        self._data = {}
        for md_file in sorted(knowledge_dir.glob("*.md")):
            topic = md_file.stem
            self._data[topic] = md_file.read_text(encoding="utf-8").strip()
        logger.info("KB loaded: %d topics from %s", len(self._data), knowledge_dir)

    def get(self, topic: str) -> str | None:
        return self._data.get(topic)

    def get_relevant(self, user_message: str) -> str:
        msg_lower = user_message.lower()
        matched: set[str] = set()
        keywords = getattr(self, "_topic_keywords", _TOPIC_KEYWORDS)

        for topic, kws in keywords.items():
            if topic not in self._data:
                continue
            for kw in kws:
                if kw in msg_lower:
                    matched.add(topic)
                    break

        if not matched:
            if _FALLBACK_TOPIC in self._data:
                matched.add(_FALLBACK_TOPIC)
            elif self._data:
                matched.add(next(iter(self._data)))

        if len(matched) > _MAX_TOPICS:
            rest = sorted(matched, key=lambda t: len(self._data.get(t, "")))
            matched = set(rest[:_MAX_TOPICS])

        parts = [self._data[t] for t in sorted(matched) if t in self._data]
        result = "\n\n---\n\n".join(parts)
        logger.info("RAG: %d topics (%d chars): %s", len(matched), len(result), sorted(matched))
        return result

    def topics(self) -> list[str]:
        return list(self._data.keys())


kb = KnowledgeBase()
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_knowledge.py -v`
Expected: 4 passed

- [ ] **Step 7: Commit**

```bash
git add backend/services/ backend/tests/
git commit -m "feat: knowledge base with keyword-based RAG"
```

---

## Task 3: LLM Client + Streaming

**Files:**
- Create: `backend/services/llm_client.py`

- [ ] **Step 1: Create `backend/services/llm_client.py`**

```python
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
    """Stream chat completion tokens from OhMyLama."""
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
    """Non-streaming chat completion. Returns full text."""
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
```

- [ ] **Step 2: Commit**

```bash
git add backend/services/llm_client.py
git commit -m "feat: OhMyLama LLM client with streaming"
```

---

## Task 4: Session Manager + Prompt Assembly

**Files:**
- Create: `backend/services/llm.py`
- Create: `backend/prompts/system.md`

- [ ] **Step 1: Create `backend/prompts/system.md`**

```markdown
Ты — инженер-консультант компании ООО СЗПК «Пласт-Металл Про».
Специализация: проектирование и производство химически стойкого полимерного оборудования для промышленных предприятий.

## Стиль общения
- Строго формальный, технический язык
- Без эмодзи, без уменьшительных, без разговорных форм
- Ответы структурированы: сначала рекомендация, затем техническое обоснование
- Единицы измерения: мм, л, °C, МПа
- Обращение на «Вы»

## Правила
- Отвечай ТОЛЬКО на основе предоставленной базы знаний
- Если информации нет в базе — скажи прямо: «Данный вопрос выходит за рамки моей компетенции. Рекомендую оставить заявку для связи с инженером.»
- Не выдумывай цены, сроки поставки, технические характеристики
- Цены не фиксированы — всегда указывай «цена по запросу» и предлагай оформить заявку
- При подборе оборудования уточни: рабочая среда, концентрация, рабочая температура, требуемый объём, давление
- Если клиент называет задачу и параметры — предложи конкретный артикул и материал

## Маркеры в ответе
Вставляй маркеры в текст ответа когда это уместно. Маркер должен стоять на отдельной строке в конце ответа.

- [LEAD] — клиент обозначил задачу, назвал параметры и готов к оформлению заявки. Вставляй после того, как дал рекомендацию по оборудованию.
- [KP:артикул1,артикул2] — клиент явно просит коммерческое предложение или запрашивает КП. Перечисли артикулы через запятую.
- [ESCALATE:причина] — вопрос выходит за рамки базы знаний, требуется участие инженера. Кратко укажи причину.

## Контекст компании
- Производство: Ленинградская область, пос. Разметелево
- Телефон: +7 963 322-55-40
- Материалы: PPC (блок-сополимер), PPH (гомополимер), PE 100 (полиэтилен), PPs (самозатухающий)
- Продукция: ёмкости, водоочистка, газоочистка, КНС, ЛОС, реакторы, вентиляция, лабораторная мебель

## База знаний
{knowledge}
```

- [ ] **Step 2: Create `backend/services/llm.py`**

```python
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
HISTORY_TTL = 7200  # 2 hours
_TRIM_LEN = 300

_sessions: dict[str, list[dict]] = {}
_session_ts: dict[str, float] = {}

# Circuit breaker state
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
    """Stream LLM response for a user message, managing history and RAG."""
    global _fail_count, _fail_until

    # Circuit breaker check
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

    # Keep only last MAX_HISTORY messages
    if len(history) > MAX_HISTORY:
        _sessions[session_id] = history[-MAX_HISTORY:]
```

- [ ] **Step 3: Commit**

```bash
git add backend/services/llm.py backend/prompts/system.md
git commit -m "feat: LLM session manager with circuit breaker + system prompt"
```

---

## Task 5: Marker Post-Processing

**Files:**
- Create: `backend/services/postprocess.py`
- Create: `backend/tests/test_postprocess.py`

- [ ] **Step 1: Write failing test `backend/tests/test_postprocess.py`**

```python
from services.postprocess import parse_markers, ParsedResponse


def test_plain_text_no_markers():
    r = parse_markers("Рекомендую ёмкость ЕВПП-5000 из PPH.")
    assert r.text == "Рекомендую ёмкость ЕВПП-5000 из PPH."
    assert r.lead is False
    assert r.kp_articles == []
    assert r.escalate_reason is None


def test_lead_marker():
    r = parse_markers("Рекомендую ЕВПП-5000.\n[LEAD]")
    assert r.text == "Рекомендую ЕВПП-5000."
    assert r.lead is True


def test_kp_marker_single():
    r = parse_markers("Вот подборка.\n[KP:СЗПК.ЕВПП.5000]")
    assert r.text == "Вот подборка."
    assert r.kp_articles == ["СЗПК.ЕВПП.5000"]


def test_kp_marker_multiple():
    r = parse_markers("Две позиции.\n[KP:СЗПК.ЕВПП.5000,СЗПК.ЕВПП.3000]")
    assert r.kp_articles == ["СЗПК.ЕВПП.5000", "СЗПК.ЕВПП.3000"]


def test_escalate_marker():
    r = parse_markers("Не могу ответить.\n[ESCALATE:нестандартная конфигурация]")
    assert r.text == "Не могу ответить."
    assert r.escalate_reason == "нестандартная конфигурация"


def test_multiple_markers():
    r = parse_markers("Рекомендую ЕВПП-5000.\n[KP:СЗПК.ЕВПП.5000]\n[LEAD]")
    assert r.lead is True
    assert r.kp_articles == ["СЗПК.ЕВПП.5000"]
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_postprocess.py -v`
Expected: FAIL — `ModuleNotFoundError`

- [ ] **Step 3: Implement `backend/services/postprocess.py`**

```python
"""Parse LLM response markers: [LEAD], [KP:...], [ESCALATE:...]."""
import re
from dataclasses import dataclass, field

_LEAD_RE = re.compile(r"^\[LEAD\]\s*$", re.MULTILINE)
_KP_RE = re.compile(r"^\[KP:([^\]]+)\]\s*$", re.MULTILINE)
_ESCALATE_RE = re.compile(r"^\[ESCALATE:([^\]]+)\]\s*$", re.MULTILINE)


@dataclass
class ParsedResponse:
    text: str
    lead: bool = False
    kp_articles: list[str] = field(default_factory=list)
    escalate_reason: str | None = None


def parse_markers(raw: str) -> ParsedResponse:
    lead = bool(_LEAD_RE.search(raw))
    kp_articles: list[str] = []
    kp_match = _KP_RE.search(raw)
    if kp_match:
        kp_articles = [a.strip() for a in kp_match.group(1).split(",")]

    escalate_reason: str | None = None
    esc_match = _ESCALATE_RE.search(raw)
    if esc_match:
        escalate_reason = esc_match.group(1).strip()

    text = _LEAD_RE.sub("", raw)
    text = _KP_RE.sub("", text)
    text = _ESCALATE_RE.sub("", text)
    text = text.strip()

    return ParsedResponse(
        text=text,
        lead=lead,
        kp_articles=kp_articles,
        escalate_reason=escalate_reason,
    )
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_postprocess.py -v`
Expected: 6 passed

- [ ] **Step 5: Commit**

```bash
git add backend/services/postprocess.py backend/tests/test_postprocess.py
git commit -m "feat: marker post-processing for [LEAD], [KP], [ESCALATE]"
```

---

## Task 6: SQLite Lead Storage

**Files:**
- Create: `backend/services/db.py`

- [ ] **Step 1: Create `backend/services/db.py`**

```python
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
    session_id: str,
    name: str,
    phone: str,
    email: str,
    query_summary: str,
    chat_history: list[dict],
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
```

- [ ] **Step 2: Commit**

```bash
git add backend/services/db.py
git commit -m "feat: SQLite lead storage"
```

---

## Task 7: Email Service

**Files:**
- Create: `backend/services/email_service.py`

- [ ] **Step 1: Create `backend/services/email_service.py`**

```python
"""Send lead notifications and escalation emails via SMTP."""
import logging
from email.message import EmailMessage

import aiosmtplib

from config import settings

logger = logging.getLogger(__name__)


async def send_lead_email(
    name: str,
    phone: str,
    email: str,
    query_summary: str,
    chat_history: list[dict],
    pdf_bytes: bytes | None = None,
) -> bool:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP not configured, skipping email")
        return False

    history_text = "\n".join(
        f"{'К' if m['role'] == 'user' else 'Б'}: {m['content']}"
        for m in chat_history
    )

    body = (
        f"Новая заявка с сайта plastic-flow\n"
        f"{'=' * 40}\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Email: {email}\n\n"
        f"Запрос клиента:\n{query_summary}\n\n"
        f"История диалога:\n{history_text}\n"
    )

    msg = EmailMessage()
    msg["Subject"] = f"Заявка с сайта — {query_summary[:60]}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_to
    msg.set_content(body)

    if pdf_bytes:
        msg.add_attachment(
            pdf_bytes,
            maintype="application",
            subtype="pdf",
            filename="КП.pdf",
        )

    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_user,
            password=settings.smtp_password,
            use_tls=True,
        )
        logger.info("Lead email sent to %s", settings.smtp_to)
        return True
    except Exception as e:
        logger.error("Failed to send email: %s", e)
        return False


async def send_escalation_email(
    reason: str,
    chat_history: list[dict],
) -> bool:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP not configured, skipping escalation email")
        return False

    history_text = "\n".join(
        f"{'К' if m['role'] == 'user' else 'Б'}: {m['content']}"
        for m in chat_history
    )

    body = (
        f"Требуется участие специалиста\n"
        f"{'=' * 40}\n\n"
        f"Причина: {reason}\n\n"
        f"История диалога:\n{history_text}\n"
    )

    msg = EmailMessage()
    msg["Subject"] = f"[Эскалация] {reason[:60]}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_to
    msg.set_content(body)

    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.smtp_host,
            port=settings.smtp_port,
            username=settings.smtp_user,
            password=settings.smtp_password,
            use_tls=True,
        )
        logger.info("Escalation email sent: %s", reason)
        return True
    except Exception as e:
        logger.error("Failed to send escalation email: %s", e)
        return False
```

- [ ] **Step 2: Commit**

```bash
git add backend/services/email_service.py
git commit -m "feat: email service for leads and escalations"
```

---

## Task 8: KP PDF Generator

**Files:**
- Create: `backend/services/kp_generator.py`

- [ ] **Step 1: Create `backend/services/kp_generator.py`**

```python
"""Generate commercial proposal (КП) PDF using reportlab."""
import io
import logging
from datetime import datetime, timezone

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

from services.knowledge import kb

logger = logging.getLogger(__name__)

# Register Cyrillic font if available
_font_registered = False


def _register_fonts() -> None:
    global _font_registered
    if _font_registered:
        return
    try:
        pdfmetrics.registerFont(TTFont("PTSans", "public/fonts/PTSans-Regular.ttf"))
        pdfmetrics.registerFont(TTFont("PTSans-Bold", "public/fonts/PTSans-Bold.ttf"))
        _font_registered = True
    except Exception:
        logger.warning("PTSans fonts not found, using Helvetica")


def generate_kp_pdf(articles: list[str]) -> bytes:
    """Generate a commercial proposal PDF for given articles."""
    _register_fonts()
    font_name = "PTSans" if _font_registered else "Helvetica"

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "KPTitle", parent=styles["Heading1"], fontName=font_name,
        fontSize=16, spaceAfter=10 * mm,
    )
    normal_style = ParagraphStyle(
        "KPNormal", parent=styles["Normal"], fontName=font_name, fontSize=10,
    )
    header_style = ParagraphStyle(
        "KPHeader", parent=styles["Normal"], fontName=font_name,
        fontSize=9, textColor=colors.grey,
    )

    elements = []

    # Header
    now = datetime.now(timezone.utc).strftime("%d.%m.%Y")
    elements.append(Paragraph(f"ООО СЗПК «Пласт-Металл Про»", header_style))
    elements.append(Paragraph(f"Тел: +7 963 322-55-40 | Email: osobenkov@list.ru", header_style))
    elements.append(Spacer(1, 10 * mm))
    elements.append(Paragraph(f"Коммерческое предложение от {now}", title_style))

    # Table
    table_data = [["№", "Артикул", "Наименование", "Цена"]]
    for i, article in enumerate(articles, 1):
        table_data.append([str(i), article, article, "По запросу"])

    table = Table(table_data, colWidths=[15 * mm, 50 * mm, 70 * mm, 30 * mm])
    table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), font_name),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1a5276")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f0f4f8")]),
    ]))
    elements.append(table)

    elements.append(Spacer(1, 10 * mm))
    elements.append(Paragraph(
        "Цены уточняются индивидуально. Для получения точной стоимости свяжитесь с нами.",
        normal_style,
    ))

    doc.build(elements)
    return buf.getvalue()
```

- [ ] **Step 2: Commit**

```bash
git add backend/services/kp_generator.py
git commit -m "feat: KP PDF generator with reportlab"
```

---

## Task 9: API Routes (chat SSE, lead, kp)

**Files:**
- Modify: `backend/main.py`

- [ ] **Step 1: Write failing test `backend/tests/test_api.py`**

```python
import pytest
from httpx import AsyncClient, ASGITransport
from main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.mark.anyio
async def test_health():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        resp = await client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


@pytest.mark.anyio
async def test_chat_requires_message():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        resp = await client.post("/api/chat", json={})
    assert resp.status_code == 422


@pytest.mark.anyio
async def test_lead_requires_fields():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        resp = await client.post("/api/lead", json={"session_id": "x"})
    assert resp.status_code == 422
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_api.py -v`
Expected: FAIL on chat and lead tests (routes don't exist yet)

- [ ] **Step 3: Update `backend/main.py` with all routes**

```python
import asyncio
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel, Field
from sse_starlette.sse import EventSourceResponse

from services.knowledge import kb
from services.llm import chat_sse
from services.postprocess import parse_markers
from services.db import init_db, save_lead
from services.email_service import send_lead_email, send_escalation_email
from services.kp_generator import generate_kp_pdf

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load knowledge base from auto/ and manual/ dirs
    for sub in ("auto", "manual"):
        d = KNOWLEDGE_DIR / sub
        if d.exists():
            kb.load_all(d)
    await init_db()
    yield


app = FastAPI(title="Plast-Metall Pro AI Consultant", lifespan=lifespan)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: str = Field(..., min_length=1)


class LeadRequest(BaseModel):
    session_id: str
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=7)
    email: str = ""
    query_summary: str = ""
    chat_history: list[dict] = []


class KpRequest(BaseModel):
    articles: list[str] = Field(..., min_length=1)


@app.get("/api/health")
async def health():
    return {"status": "ok", "topics": len(kb.topics())}


@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    async def event_generator():
        full_text = ""
        async for token in chat_sse(req.session_id, req.message):
            full_text += token
            yield {"data": token}

        # Parse markers from complete response
        parsed = parse_markers(full_text)
        if parsed.lead:
            yield {"event": "lead", "data": "show_form"}
        if parsed.kp_articles:
            yield {"event": "kp", "data": ",".join(parsed.kp_articles)}
        if parsed.escalate_reason:
            yield {"event": "escalate", "data": parsed.escalate_reason}
            asyncio.create_task(send_escalation_email(
                parsed.escalate_reason, req.session_id
            ))

    return EventSourceResponse(event_generator())


@app.post("/api/lead")
async def lead_endpoint(req: LeadRequest):
    lead_id = await save_lead(
        session_id=req.session_id,
        name=req.name,
        phone=req.phone,
        email=req.email,
        query_summary=req.query_summary,
        chat_history=req.chat_history,
    )
    asyncio.create_task(send_lead_email(
        name=req.name,
        phone=req.phone,
        email=req.email,
        query_summary=req.query_summary,
        chat_history=req.chat_history,
    ))
    return {"status": "ok", "lead_id": lead_id}


@app.post("/api/kp")
async def kp_endpoint(req: KpRequest):
    pdf_bytes = generate_kp_pdf(req.articles)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=KP.pdf"},
    )
```

- [ ] **Step 4: Run tests**

Run: `cd backend && python -m pytest tests/test_api.py -v`
Expected: 3 passed

- [ ] **Step 5: Commit**

```bash
git add backend/main.py backend/tests/test_api.py
git commit -m "feat: API routes — chat SSE, lead capture, KP PDF"
```

---

## Task 10: Knowledge Sync Script (TS → Markdown)

**Files:**
- Create: `backend/scripts/sync_knowledge.py`

- [ ] **Step 1: Create `backend/scripts/sync_knowledge.py`**

```python
"""Parse TypeScript data files from src/data/ and generate markdown knowledge files.

Usage: python scripts/sync_knowledge.py
Run from the backend/ directory. Reads ../src/data/*.ts, writes to knowledge/auto/
"""
import json
import re
import sys
from pathlib import Path

SRC_DATA = Path(__file__).parent.parent.parent / "src" / "data"
OUT_DIR = Path(__file__).parent.parent / "knowledge" / "auto"

# Extract array/object literals from TS exports
# Simplified: extract content between first [ and last ] or first { and last }
_EXPORT_RE = re.compile(
    r"export\s+const\s+(\w+).*?=\s*(\[[\s\S]*\]|\{[\s\S]*\})\s*(?:as\s+const)?;?\s*$",
    re.MULTILINE,
)


def _strip_ts_types(text: str) -> str:
    """Remove TypeScript type annotations to get valid JSON-ish content."""
    # Remove 'as const' suffix
    text = re.sub(r"\s+as\s+const", "", text)
    # Remove trailing commas before ] or }
    text = re.sub(r",(\s*[}\]])", r"\1", text)
    # Convert single quotes to double quotes (rough)
    text = re.sub(r"'([^']*)'", r'"\1"', text)
    # Remove line comments
    text = re.sub(r"//.*$", "", text, flags=re.MULTILINE)
    # Handle unquoted keys: word: -> "word":
    text = re.sub(r"(\s)(\w+)\s*:", r'\1"\2":', text)
    return text


def _parse_ts_file(filepath: Path) -> dict | list | None:
    """Try to extract the main export from a TS data file."""
    content = filepath.read_text(encoding="utf-8")
    match = _EXPORT_RE.search(content)
    if not match:
        return None
    raw = match.group(2)
    cleaned = _strip_ts_types(raw)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        print(f"  WARN: Could not parse {filepath.name}, skipping")
        return None


def _product_to_md_row(item: dict) -> str:
    """Convert a product dict to a markdown table row."""
    article = item.get("article", "—")
    name = item.get("name", item.get("model", "—"))
    cols = []
    for key in ("diameter", "height", "volume", "capacity", "flow", "dimensions", "D"):
        if key in item:
            cols.append(str(item[key]))
    return f"| {article} | {name} | {' | '.join(cols) if cols else '—'} |"


def _generate_catalog_overview(catalog_data: list) -> str:
    """Generate catalog overview markdown from catalog.ts data."""
    lines = ["# Каталог продукции ООО СЗПК «Пласт-Металл Про»\n"]
    for cat in catalog_data:
        name = cat.get("name", "")
        desc = cat.get("description", "")
        lines.append(f"## {name}")
        if desc:
            lines.append(desc)
        subs = cat.get("subcategories", [])
        for sub in subs:
            lines.append(f"- {sub.get('name', '')}")
        lines.append("")
    return "\n".join(lines)


def _generate_products_md(name: str, data: list | dict) -> str:
    """Generate markdown for a products data file."""
    lines = [f"# {name}\n"]

    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                if "categories" in item or "subcategories" in item:
                    # Hierarchical: emkostiProducts style
                    title = item.get("title", item.get("name", ""))
                    lines.append(f"## {title}\n")
                    for cat in item.get("categories", item.get("subcategories", [])):
                        cat_title = cat.get("title", cat.get("name", ""))
                        lines.append(f"### {cat_title}")
                        cat_desc = cat.get("description", "")
                        if cat_desc:
                            lines.append(cat_desc)
                        items = cat.get("items", [])
                        if items:
                            lines.append("")
                            for p in items:
                                lines.append(f"- Артикул: {p.get('article', '—')}, "
                                             f"Объём: {p.get('volume', '—')} л, "
                                             f"Диаметр: {p.get('diameter', '—')} мм, "
                                             f"Высота: {p.get('height', '—')} мм")
                        lines.append("")
                else:
                    # Flat product
                    article = item.get("article", "")
                    pname = item.get("name", item.get("model", ""))
                    lines.append(f"### {pname}")
                    lines.append(f"- Артикул: {article}")
                    for k, v in item.items():
                        if k not in ("article", "name", "model", "images", "image"):
                            lines.append(f"- {k}: {v}")
                    lines.append("")

    return "\n".join(lines)


# Mapping: TS filename (without .ts) -> output MD filename
_FILE_MAP = {
    "catalog": ("catalog-overview", _generate_catalog_overview),
    "emkostiProducts": ("emkosti-evpp", None),
    "ffuProducts": ("vodoochistka-ffu", None),
    "lamelnyjProducts": ("vodoochistka-lamelnyj", None),
    "fvgProducts": ("gazoochistka-fvg", None),
    "kapleulovitelProducts": ("gazoochistka-kapleuloviteli", None),
    "scrubberProducts": ("gazoochistka-skrubbery", None),
    "scrubberHorizProducts": ("gazoochistka-skrubbery-goriz", None),
    "products": ("ventilation", None),
    "troynikProducts": ("ventilation-troyniki", None),
    "vozdukhovodProducts": ("ventilation-vozdukhovody", None),
    "razdvizhnoyProducts": ("ventilation-razdvizhnye", None),
    "knsSvtProducts": ("kns-svt", None),
    "knsPpProducts": ("kns-pp", None),
    "losProducts": ("los", None),
    "reaktorOsazhdeniyaProducts": ("reaktory", None),
    "nutchFiltrProducts": ("gidrometallurgiya-nutch", None),
    "vyshchelachProducts": ("gidrometallurgiya-vyshchelach", None),
    "sorbtsionnyeProducts": ("gidrometallurgiya-sorbtsionnye", None),
    "podzemnyeProducts": ("emkosti-podzemnye", None),
    "pryamougolnyeProducts": ("emkosti-pryamougolnye", None),
    "pozharnyeProducts": ("emkosti-pozharnye", None),
    "perelivnyeProducts": ("emkosti-perelivnye", None),
}


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    count = 0

    for ts_file in sorted(SRC_DATA.glob("*.ts")):
        stem = ts_file.stem
        if stem == "chemicalResistance":
            continue  # Skip — too technical for chat RAG

        mapping = _FILE_MAP.get(stem)
        if mapping is None:
            print(f"  SKIP: {ts_file.name} (no mapping)")
            continue

        out_name, custom_fn = mapping
        data = _parse_ts_file(ts_file)
        if data is None:
            continue

        if custom_fn:
            md_content = custom_fn(data)
        else:
            md_content = _generate_products_md(out_name, data)

        out_path = OUT_DIR / f"{out_name}.md"
        out_path.write_text(md_content, encoding="utf-8")
        print(f"  OK: {ts_file.name} -> {out_name}.md")
        count += 1

    print(f"\nGenerated {count} knowledge files in {OUT_DIR}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run the sync script**

Run:
```bash
cd backend && python scripts/sync_knowledge.py
```

Expected: ~15-20 markdown files generated in `backend/knowledge/auto/`. Some TS files may fail to parse (complex syntax) — fix those manually.

- [ ] **Step 3: Verify generated files are readable**

Run: `ls backend/knowledge/auto/`

- [ ] **Step 4: Commit**

```bash
git add backend/scripts/sync_knowledge.py backend/knowledge/auto/
git commit -m "feat: knowledge sync script TS->markdown + auto-generated KB"
```

---

## Task 11: Manual Knowledge Files

**Files:**
- Create: `backend/knowledge/manual/faq.md`
- Create: `backend/knowledge/manual/podbor-materiala.md`
- Create: `backend/knowledge/manual/o-kompanii.md`

- [ ] **Step 1: Create `backend/knowledge/manual/faq.md`**

```markdown
# Часто задаваемые вопросы

## Цены
Цены на продукцию рассчитываются индивидуально и зависят от объёма, материала, комплектации и количества. Для получения точной стоимости оставьте заявку с указанием параметров.

## Сроки производства
Стандартные изделия: 2-4 недели. Нестандартная конфигурация: 4-8 недель. Точный срок уточняется после согласования ТЗ.

## Доставка
Доставка по всей России транспортными компаниями. Стоимость доставки рассчитывается отдельно. Возможен самовывоз с производства (Ленинградская область, пос. Разметелево).

## Гарантия
Гарантия на продукцию — 12 месяцев с момента ввода в эксплуатацию. Гарантия распространяется на дефекты материала и производства при соблюдении условий эксплуатации.

## Оплата
Работаем с юридическими лицами по безналичному расчёту. Предоплата 50-70%, остаток перед отгрузкой. Возможна рассрочка для постоянных клиентов.

## Монтаж
Оказываем услуги монтажа и пуско-наладки. Стоимость и сроки определяются после выезда инженера на объект. Также доступен шеф-монтаж (руководство монтажом силами заказчика).

## Сертификация
Продукция сертифицирована. Предоставляем паспорта на изделия, сертификаты на материалы, протоколы испытаний.
```

- [ ] **Step 2: Create `backend/knowledge/manual/podbor-materiala.md`**

```markdown
# Подбор материала

## Полипропилен блок-сополимер (PPC)
- Рабочая температура: до +80°C
- Применение: нейтральные и слабоагрессивные среды, водоподготовка, канализация
- Стойкость: кислоты до 40%, щёлочи, соли
- Наиболее распространённый и экономичный вариант

## Полипропилен гомополимер (PPH)
- Рабочая температура: до +100°C
- Применение: концентрированные кислоты, гальваника, химическое производство
- Стойкость: H₂SO₄ до 80%, HCl до 30%, HNO₃ до 30%, NaOH до 50%
- Повышенная химическая стойкость по сравнению с PPC

## Полиэтилен PE 100
- Рабочая температура: до +60°C
- Применение: подземные ёмкости, питьевая вода, нефтехимия
- Стойкость: органические растворители, нефтепродукты
- Высокая ударная прочность, эластичность при низких температурах

## Самозатухающий полипропилен (PPs)
- Рабочая температура: до +80°C
- Применение: газоочистка, вентиляционные системы, помещения с повышенными требованиями пожарной безопасности
- Класс горючести: Г1-Г2 (самозатухающий)

## Рекомендации по подбору
- Серная кислота H₂SO₄ до 80% → PPH
- Соляная кислота HCl до 30% → PPH
- Щёлочи NaOH до 50% → PPH или PPC
- Питьевая вода, канализация → PPC
- Подземное размещение → PE 100
- Вентиляция, газоочистка → PPs
- Нейтральные среды до 80°C → PPC (экономичнее)
```

- [ ] **Step 3: Create `backend/knowledge/manual/o-kompanii.md`**

```markdown
# О компании ООО СЗПК «Пласт-Металл Про»

## Производство
Проектирование и производство химически стойкого полимерного оборудования для промышленных предприятий. Полный цикл: проектирование, изготовление, доставка, монтаж, пуско-наладка.

## Контакты
- Телефон: +7 963 322-55-40
- Email: osobenkov@list.ru
- Адрес производства: Ленинградская область, пос. Разметелево

## Направления
- Промышленные ёмкости (от 100 до 50 000 литров)
- Водоочистное оборудование (ФФУ, ламельные отстойники, жироуловители)
- Газоочистное оборудование (скрубберы, фильтры ФВГ, каплеуловители)
- Канализационные насосные станции (КНС)
- Локальные очистные сооружения (ЛОС)
- Химические реакторы
- Гидрометаллургическое оборудование
- Вентиляционные воздуховоды и фитинги
- Лабораторная мебель и шкафы управления

## Отрасли
Гальваническое производство, химическая промышленность, металлургия, фармацевтика, водоподготовка, экология.
```

- [ ] **Step 4: Commit**

```bash
git add backend/knowledge/manual/
git commit -m "feat: manual knowledge files — FAQ, material guide, company info"
```

---

## Task 12: Vite Proxy + Frontend ChatWidget

**Files:**
- Modify: `vite.config.ts`
- Create: `src/components/ChatWidget.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add proxy to `vite.config.ts`**

Add inside the `server` block, after `hmr`:

```typescript
proxy: {
  "/api": {
    target: "http://localhost:8000",
    changeOrigin: true,
  },
},
```

Full `server` section becomes:
```typescript
server: {
  host: "::",
  port: 8080,
  hmr: {
    overlay: false,
  },
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
    },
  },
},
```

- [ ] **Step 2: Create `src/components/ChatWidget.tsx`**

```tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface LeadForm {
  name: string;
  phone: string;
  email: string;
}

const SESSION_KEY = "pmp-chat-session";
const HISTORY_KEY = "pmp-chat-history";

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(msgs: ChatMessage[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(msgs.slice(-20)));
}

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Здравствуйте. Я инженер-консультант ООО СЗПК «Пласт-Металл Про». Помогу подобрать оборудование, уточнить характеристики и оформить заявку. Опишите вашу задачу.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadHistory();
    return saved.length > 0 ? saved : [WELCOME];
  });
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", phone: "", email: "" });
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSendRef = useRef(0);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    // Rate limit: 1 msg per 2s
    const now = Date.now();
    if (now - lastSendRef.current < 2000) return;
    lastSendRef.current = now;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    // Add empty assistant message for streaming
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: getSessionId() }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const token = line.slice(6);
            fullText += token;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: fullText };
              return updated;
            });
          } else if (line.startsWith("event: lead")) {
            setShowLead(true);
          } else if (line.startsWith("event: kp")) {
            // Next data line has articles
          }
        }
      }

      // Clean markers from displayed text
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.content = last.content
            .replace(/\[LEAD\]/g, "")
            .replace(/\[KP:[^\]]*\]/g, "")
            .replace(/\[ESCALATE:[^\]]*\]/g, "")
            .trim();
        }
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Произошла ошибка. Попробуйте повторить запрос.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, streaming]);

  const submitLead = async () => {
    if (!leadForm.name || !leadForm.phone) return;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: getSessionId(),
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          query_summary: messages.filter((m) => m.role === "user").map((m) => m.content).join("; "),
          chat_history: messages,
        }),
      });
      setLeadSent(true);
      setShowLead(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Заявка отправлена. Наш инженер свяжется с Вами в ближайшее время." },
      ]);
    } catch {
      // Silent fail — form stays open for retry
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Открыть чат"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-[400px] h-[550px] flex flex-col shadow-2xl border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div>
          <div className="font-semibold text-sm">Пласт-Металл Про</div>
          <div className="text-xs opacity-80">Инженер-консультант</div>
        </div>
        <button onClick={() => setOpen(false)} className="hover:opacity-70">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" && i === messages.length - 1 && streaming && (
                  <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                )}
              </div>
            </div>
          ))}

          {/* Lead Form */}
          {showLead && !leadSent && (
            <div className="bg-muted rounded-lg p-3 space-y-2 border">
              <div className="text-sm font-medium">Оформить заявку</div>
              <Input
                placeholder="Имя *"
                value={leadForm.name}
                onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
              />
              <Input
                placeholder="Телефон *"
                value={leadForm.phone}
                onChange={(e) => setLeadForm((f) => ({ ...f, phone: e.target.value }))}
              />
              <Input
                placeholder="Email"
                value={leadForm.email}
                onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
              />
              <Button size="sm" className="w-full" onClick={submitLead}>
                Отправить заявку
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <Input
          placeholder="Введите вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          disabled={streaming}
        />
        <Button size="icon" onClick={sendMessage} disabled={streaming || !input.trim()}>
          {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>
    </Card>
  );
}
```

- [ ] **Step 3: Add ChatWidget to `src/App.tsx`**

Add import at the top (after the last import):
```typescript
import { ChatWidget } from "./components/ChatWidget";
```

Add `<ChatWidget />` inside the JSX, after `<Sonner />` and before `<BrowserRouter>`:
```tsx
<Sonner />
<ChatWidget />
<BrowserRouter>
```

- [ ] **Step 4: Verify frontend compiles**

Run: `cd c:/tmp/plastic-flow && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts src/components/ChatWidget.tsx src/App.tsx
git commit -m "feat: chat widget + vite proxy to backend"
```

---

## Task 13: End-to-End Verification

- [ ] **Step 1: Start backend**

Run:
```bash
cd c:/tmp/plastic-flow/backend && uvicorn main:app --port 8000 --reload
```

Expected: Server starts, loads knowledge files

- [ ] **Step 2: Start frontend (if not running)**

Run:
```bash
cd c:/tmp/plastic-flow && npm run dev
```

Expected: Vite on port 8080

- [ ] **Step 3: Test healthcheck**

Run: `curl http://localhost:8000/api/health`
Expected: `{"status":"ok","topics":N}` where N > 0

- [ ] **Step 4: Test in browser**

Open `http://localhost:8080`. Verify:
1. Blue chat button visible in bottom-right corner
2. Click opens chat panel
3. Welcome message is displayed
4. Type "какие ёмкости вы производите" and send
5. Response streams in from LLM (requires valid LLM_API_KEY in .env)
6. Close button works

- [ ] **Step 5: Run all backend tests**

Run: `cd backend && python -m pytest tests/ -v`
Expected: All pass

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: AI sales consultant — complete MVP"
```

---

## Summary

| Task | What | Estimated |
|------|------|-----------|
| 1 | Backend skeleton + config | 3 min |
| 2 | Knowledge base RAG engine | 5 min |
| 3 | LLM client + streaming | 3 min |
| 4 | Session manager + prompt | 4 min |
| 5 | Marker post-processing | 4 min |
| 6 | SQLite lead storage | 2 min |
| 7 | Email service | 3 min |
| 8 | KP PDF generator | 3 min |
| 9 | API routes | 5 min |
| 10 | Knowledge sync script | 5 min |
| 11 | Manual knowledge files | 3 min |
| 12 | Frontend ChatWidget + proxy | 5 min |
| 13 | E2E verification | 5 min |
