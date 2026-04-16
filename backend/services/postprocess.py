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

    return ParsedResponse(text=text, lead=lead, kp_articles=kp_articles, escalate_reason=escalate_reason)
