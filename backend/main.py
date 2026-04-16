import asyncio
import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import Response
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

        parsed = parse_markers(full_text)
        if parsed.lead:
            yield {"event": "lead", "data": "show_form"}
        if parsed.kp_articles:
            yield {"event": "kp", "data": ",".join(parsed.kp_articles)}
        if parsed.escalate_reason:
            yield {"event": "escalate", "data": parsed.escalate_reason}
            asyncio.create_task(send_escalation_email(parsed.escalate_reason, req.session_id))

    return EventSourceResponse(event_generator())


@app.post("/api/lead")
async def lead_endpoint(req: LeadRequest):
    lead_id = await save_lead(
        session_id=req.session_id, name=req.name, phone=req.phone,
        email=req.email, query_summary=req.query_summary, chat_history=req.chat_history,
    )
    asyncio.create_task(send_lead_email(
        name=req.name, phone=req.phone, email=req.email,
        query_summary=req.query_summary, chat_history=req.chat_history,
    ))
    return {"status": "ok", "lead_id": lead_id}


@app.post("/api/kp")
async def kp_endpoint(req: KpRequest):
    pdf_bytes = generate_kp_pdf(req.articles)
    return Response(content=pdf_bytes, media_type="application/pdf",
                    headers={"Content-Disposition": "attachment; filename=KP.pdf"})
