# AI Sales Consultant Chat Widget — Design Spec

## Overview

AI-консультант для сайта plastic-flow (ООО СЗПК «Пласт-Металл Про»). Встроенный чат-виджет с RAG-системой, который консультирует по промышленному полимерному оборудованию, помогает подобрать продукцию, генерирует КП и собирает заявки.

## Architecture

Монолитный подход: FastAPI-бэкенд в `backend/` внутри того же репозитория, React chat widget в `src/components/ChatWidget.tsx`. Vite проксирует `/api/*` на FastAPI (порт 8000) — без CORS.

```
Browser (React + Vite, :8080)
  └── ChatWidget (shadcn/ui, SSE streaming)
        │
        ▼  HTTP (SSE + REST)
Backend (FastAPI, :8000)
  ├── POST /api/chat    → SSE streaming ответа
  ├── POST /api/lead    → сохранение лида + email
  ├── POST /api/kp      → генерация КП PDF
  └── GET  /api/health  → healthcheck
        │
        ├── RAG Pipeline (keyword matching)
        ├── LLM (OhMyLama, gpt-5.4-mini)
        ├── Email (aiosmtplib → osobenkov@list.ru)
        └── KP Generator (reportlab PDF)
```

## RAG Pipeline

### Knowledge Base Structure

```
backend/knowledge/
├── auto/                 # Auto-generated from src/data/*.ts
│   ├── emkosti-evpp.md
│   ├── emkosti-gorizontalnye.md
│   ├── vodoochistka-ffu.md
│   ├── gazoochistka-skrubbery.md
│   ├── kapleuloviteli.md
│   ├── ventilation.md
│   ├── kns.md
│   ├── los.md
│   ├── reaktory.md
│   ├── gidrometallurgiya.md
│   ├── catalog-overview.md
│   └── ...(~15-20 files)
└── manual/               # Expert knowledge, written by hand
    ├── faq.md
    ├── podbor-materiala.md
    ├── podbor-emkosti.md
    ├── tipichnye-oshibki.md
    ├── uslugi-i-dostavka.md
    └── o-kompanii.md
```

### Auto-Generation

Script `backend/scripts/sync_knowledge.py` parses TypeScript data files from `src/data/*.ts` and produces structured markdown with tables (article, dimensions, material, application). Run manually when catalog changes.

### Keyword Matching

Same approach as iremel-bot: hardcoded `_TOPIC_KEYWORDS` dict maps topic names to keyword lists. On each user query, matched keywords select up to 6 relevant topics. Full topic content is concatenated and injected into the system prompt via `{knowledge}` placeholder.

No vector embeddings, no external vector DB. Entire markdown file = 1 chunk.

No FAQ fast-path layer (unlike iremel-bot) — all queries go through LLM. Traffic volume is low (B2B industrial site, not a hotel with 200 guests).

## LLM Integration

- **Provider:** OhMyLama (OpenAI-compatible API)
- **Base URL:** `https://ohmylama.ru/v1`
- **Model:** `gpt-5.4-mini`
- **Temperature:** 0.1
- **Max tokens:** 2000
- **Client:** httpx AsyncClient with HTTP/2
- **Streaming:** SSE via sse-starlette
- **Circuit breaker:** 3 consecutive failures → exponential backoff (15s → 300s max)
- **Concurrency:** semaphore, max 5 parallel LLM requests

### Sessions

- `session_id` (UUID) stored in browser localStorage
- Server-side history: up to 6 messages per session
- TTL: 2 hours (shorter than iremel-bot's 24h — website sessions are brief)
- Assistant messages trimmed to 300 chars in history context

### System Prompt

Persona: formal engineer-consultant of Plast-Metall Pro. Technical language, no emoji, structured answers (recommendation first, then justification). Units: mm, l, C, MPa.

Rules: answer only from knowledge base; if info missing — say so and offer to submit a request; never invent prices, timelines, specs; when selecting equipment — ask for: medium, concentration, temperature, volume, pressure.

### Response Markers

- `[LEAD]` — client is ready for a request (named their task + parameters) → widget shows contact form
- `[KP:article1,article2]` — client asks for commercial proposal → trigger PDF generation
- `[ESCALATE:reason]` — question beyond knowledge base → email to manager

### Post-Processing

1. Strip `<think>` blocks (Qwen3 thinking models)
2. Parse `[LEAD]` → signal widget to show lead capture form
3. Parse `[KP:...]` → trigger KP generation endpoint
4. Parse `[ESCALATE:...]` → send escalation email
5. Clean markdown for chat rendering

## Chat Widget (Frontend)

### Component: `src/components/ChatWidget.tsx`

Built with existing shadcn/ui components (Card, Button, Input, ScrollArea) — no external chat library. Matches the site's design system.

### Layout

- Floating button: right bottom corner, blue circle with MessageCircle icon (lucide-react)
- Panel: ~400x550px, opens on click
- Header: company name + "Инженер-консультант" + close button
- Messages area: ScrollArea with bot/user message bubbles
- Input: text input + send button at the bottom
- Lead form: inline in message flow, appears when `[LEAD]` marker detected
- Z-index above all other content

### Behavior

- SSE streaming via fetch + ReadableStream (text appears incrementally)
- `session_id` persisted in localStorage
- Chat history persisted in localStorage (last 20 messages) — survives page reload
- Static welcome message (no LLM call)
- Client-side rate limiting: max 1 message per 2 seconds
- Typing indicator while streaming

### Integration

Added to `App.tsx` outside `<Routes>` — visible on every page.

## Email & Lead Capture

### Lead Storage

SQLite database `backend/leads.db`, table `leads`:
- id, session_id, name, phone, email, query_summary, chat_history_json, created_at

### Email Delivery

On lead submission or escalation, send email via aiosmtplib to `osobenkov@list.ru`.

Email contains: client name, phone, email, query summary, full chat history.

SMTP configuration via `.env`: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_TO.

### KP Generation

When `[KP:article1,article2]` is detected:
1. Backend looks up articles in knowledge files
2. Generates PDF via reportlab with company header, positions table, requisites
3. Returns PDF blob to frontend for download
4. Same PDF attached to lead email

## File Structure

```
c:/tmp/plastic-flow/
├── src/
│   ├── components/
│   │   └── ChatWidget.tsx        # NEW
│   ├── App.tsx                   # EDIT: add ChatWidget
│   └── ...
├── backend/
│   ├── main.py                   # FastAPI app
│   ├── config.py                 # pydantic-settings
│   ├── requirements.txt
│   ├── services/
│   │   ├── knowledge.py          # RAG: load + keyword matching
│   │   ├── llm.py                # OhMyLama: streaming, history, circuit breaker
│   │   ├── llm_client.py         # httpx AsyncClient
│   │   ├── email_service.py      # aiosmtplib
│   │   ├── kp_generator.py       # reportlab PDF
│   │   └── postprocess.py        # marker parsing
│   ├── prompts/
│   │   └── system.md             # system prompt with {knowledge}
│   ├── knowledge/
│   │   ├── auto/                 # generated from src/data/
│   │   └── manual/               # expert knowledge
│   ├── scripts/
│   │   └── sync_knowledge.py     # TS → markdown parser
│   └── leads.db                  # SQLite (auto-created)
├── vite.config.ts                # EDIT: proxy /api → :8000
└── .env                          # LLM keys, SMTP, settings
```

## Python Dependencies

```
fastapi
uvicorn[standard]
httpx[http2]
sse-starlette
pydantic-settings
aiosmtplib
aiosqlite
reportlab
python-dotenv
```

## Local Development

```bash
# Terminal 1: backend
cd backend && pip install -r requirements.txt
uvicorn main:app --port 8000 --reload

# Terminal 2: frontend (already running)
npm run dev  # port 8080, proxies /api → 8000
```

## Out of Scope

- Telegram notifications to manager (email only)
- Vector embeddings / semantic search (keyword matching is sufficient for ~30 topics)
- User authentication / admin panel
- Analytics dashboard
- Multi-language support
- Voice input
