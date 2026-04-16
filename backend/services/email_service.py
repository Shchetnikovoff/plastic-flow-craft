"""Send lead notifications and escalation emails via SMTP."""
import logging
from email.message import EmailMessage

import aiosmtplib

from config import settings

logger = logging.getLogger(__name__)


async def send_lead_email(
    name: str, phone: str, email: str, query_summary: str,
    chat_history: list[dict], pdf_bytes: bytes | None = None,
) -> bool:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP not configured, skipping email")
        return False

    history_text = "\n".join(
        f"{'К' if m['role'] == 'user' else 'Б'}: {m['content']}" for m in chat_history
    )

    body = (
        f"Новая заявка с сайта plastic-flow\n{'=' * 40}\n\n"
        f"Имя: {name}\nТелефон: {phone}\nEmail: {email}\n\n"
        f"Запрос клиента:\n{query_summary}\n\nИстория диалога:\n{history_text}\n"
    )

    msg = EmailMessage()
    msg["Subject"] = f"Заявка с сайта — {query_summary[:60]}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_to
    msg.set_content(body)

    if pdf_bytes:
        msg.add_attachment(pdf_bytes, maintype="application", subtype="pdf", filename="КП.pdf")

    try:
        await aiosmtplib.send(
            msg, hostname=settings.smtp_host, port=settings.smtp_port,
            username=settings.smtp_user, password=settings.smtp_password, use_tls=True,
        )
        logger.info("Lead email sent to %s", settings.smtp_to)
        return True
    except Exception as e:
        logger.error("Failed to send email: %s", e)
        return False


async def send_escalation_email(reason: str, chat_history: list[dict]) -> bool:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP not configured, skipping escalation email")
        return False

    history_text = "\n".join(
        f"{'К' if m['role'] == 'user' else 'Б'}: {m['content']}" for m in chat_history
    )

    body = (
        f"Требуется участие специалиста\n{'=' * 40}\n\n"
        f"Причина: {reason}\n\nИстория диалога:\n{history_text}\n"
    )

    msg = EmailMessage()
    msg["Subject"] = f"[Эскалация] {reason[:60]}"
    msg["From"] = settings.smtp_user
    msg["To"] = settings.smtp_to
    msg.set_content(body)

    try:
        await aiosmtplib.send(
            msg, hostname=settings.smtp_host, port=settings.smtp_port,
            username=settings.smtp_user, password=settings.smtp_password, use_tls=True,
        )
        logger.info("Escalation email sent: %s", reason)
        return True
    except Exception as e:
        logger.error("Failed to send escalation email: %s", e)
        return False
