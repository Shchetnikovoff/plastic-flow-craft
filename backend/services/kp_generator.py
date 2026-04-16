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

logger = logging.getLogger(__name__)

_font_registered = False


def _register_fonts() -> None:
    global _font_registered
    if _font_registered:
        return
    try:
        pdfmetrics.registerFont(TTFont("PTSans", "../public/fonts/PTSans-Regular.ttf"))
        pdfmetrics.registerFont(TTFont("PTSans-Bold", "../public/fonts/PTSans-Bold.ttf"))
        _font_registered = True
    except Exception:
        logger.warning("PTSans fonts not found, using Helvetica")


def generate_kp_pdf(articles: list[str]) -> bytes:
    _register_fonts()
    font_name = "PTSans" if _font_registered else "Helvetica"

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("KPTitle", parent=styles["Heading1"], fontName=font_name, fontSize=16, spaceAfter=10 * mm)
    normal_style = ParagraphStyle("KPNormal", parent=styles["Normal"], fontName=font_name, fontSize=10)
    header_style = ParagraphStyle("KPHeader", parent=styles["Normal"], fontName=font_name, fontSize=9, textColor=colors.grey)

    elements = []

    now = datetime.now(timezone.utc).strftime("%d.%m.%Y")
    elements.append(Paragraph("ООО СЗПК «Пласт-Металл Про»", header_style))
    elements.append(Paragraph("Тел: +7 963 322-55-40 | Email: osobenkov@list.ru", header_style))
    elements.append(Spacer(1, 10 * mm))
    elements.append(Paragraph(f"Коммерческое предложение от {now}", title_style))

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
    elements.append(Paragraph("Цены уточняются индивидуально. Для получения точной стоимости свяжитесь с нами.", normal_style))

    doc.build(elements)
    return buf.getvalue()
