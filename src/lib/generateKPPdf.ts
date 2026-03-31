import { jsPDF } from "jspdf";
import { registerCyrillicFont } from "./pdfFonts";
import { loadImageAsBase64 } from "./imageUtils";
import type { KPDocument } from "@/types/kp";

export async function generateKPPdf(kp: KPDocument): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  await registerCyrillicFont(doc);
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const margin = 20;

  let logoData: string | null = null;
  try {
    logoData = await loadImageAsBase64("/images/logo.png");
  } catch { /* skip */ }

  // === HEADER ===
  let y = 15;
  if (logoData) {
    doc.addImage(logoData, "PNG", margin, y - 5, 28, 13);
  }
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("ООО СЗПК «Пласт-Металл Про»", margin + 32, y + 1);
  doc.setFontSize(8);
  doc.setTextColor(102);
  doc.setFont("PTSans", "normal");
  doc.text("+7 963 322-55-40  |  osobenkov@list.ru", pw - margin, y + 1, { align: "right" });
  y += 5;
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text(`${kp.number}  от ${kp.date}`, pw - margin, y + 3, { align: "right" });
  y += 7;
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pw - margin, y);
  y += 10;

  // === TITLE ===
  doc.setFontSize(16);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ", pw / 2, y, { align: "center" });
  y += 12;

  // === CLIENT ===
  doc.setFontSize(10);
  doc.setTextColor(51);
  doc.setFont("PTSans", "bold");
  doc.text("Заказчик:", margin, y);
  doc.setFont("PTSans", "normal");
  doc.text(kp.client.organization, margin + 25, y);
  y += 6;
  doc.setFont("PTSans", "bold");
  doc.text("Контакт:", margin, y);
  doc.setFont("PTSans", "normal");
  doc.text(kp.client.name, margin + 25, y);
  if (kp.client.inn) {
    doc.setFont("PTSans", "bold");
    doc.text("ИНН:", pw / 2, y);
    doc.setFont("PTSans", "normal");
    doc.text(kp.client.inn, pw / 2 + 12, y);
  }
  y += 10;

  // === ITEMS ===
  const isSingleProduct = kp.items.length === 1 && kp.items[0].type === "product";

  if (isSingleProduct) {
    const item = kp.items[0];
    if (item.type === "product") {
      doc.setDrawColor(220);
      doc.rect(margin, y, pw - 2 * margin, 70);
      doc.setFillColor(245, 245, 245);
      doc.rect(margin + 2, y + 2, 45, 45, "F");
      doc.setFontSize(8);
      doc.setTextColor(180);
      doc.text("Фото товара", margin + 12, y + 27);

      const infoX = margin + 52;
      let infoY = y + 8;
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 95);
      doc.setFont("PTSans", "bold");
      doc.text(item.name, infoX, infoY);
      infoY += 6;
      doc.setFontSize(10);
      doc.setTextColor(30, 82, 118);
      doc.text(`Артикул: ${item.article}`, infoX, infoY);
      infoY += 8;

      doc.setFontSize(10);
      doc.setTextColor(0);
      for (const [label, value] of Object.entries(item.specs)) {
        doc.setFont("PTSans", "normal");
        doc.setTextColor(100);
        doc.text(`${label}:`, infoX, infoY);
        doc.setFont("PTSans", "bold");
        doc.setTextColor(0);
        doc.text(value, infoX + 35, infoY);
        infoY += 6;
      }

      const priceY = y + 52;
      doc.setFillColor(240, 247, 237);
      doc.rect(margin + 2, priceY, pw - 2 * margin - 4, 16, "F");
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont("PTSans", "normal");
      doc.text(`Кол-во: ${item.quantity} шт`, margin + 6, priceY + 6);
      doc.text(`Цена за ед: ${item.pricePerUnit.toLocaleString("ru-RU")} ₽`, margin + 50, priceY + 6);
      doc.setFontSize(14);
      doc.setTextColor(46, 125, 50);
      doc.setFont("PTSans", "bold");
      const subtotal = item.quantity * item.pricePerUnit;
      doc.text(`${subtotal.toLocaleString("ru-RU")} ₽`, pw - margin - 6, priceY + 12, { align: "right" });

      y += 75;
    }
  } else {
    doc.setFillColor(30, 58, 95);
    doc.rect(margin, y, pw - 2 * margin, 8, "F");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont("PTSans", "bold");
    doc.text("№", margin + 2, y + 5.5);
    doc.text("Наименование / Артикул", margin + 10, y + 5.5);
    doc.text("Кол", pw - margin - 48, y + 5.5);
    doc.text("Цена", pw - margin - 30, y + 5.5);
    doc.text("Сумма", pw - margin - 8, y + 5.5, { align: "right" });
    y += 10;

    doc.setFontSize(9);
    for (let i = 0; i < kp.items.length; i++) {
      const item = kp.items[i];
      if (y > ph - 60) {
        doc.addPage();
        y = 20;
      }
      doc.setTextColor(0);
      doc.setFont("PTSans", "normal");
      doc.text(String(i + 1), margin + 2, y + 4);
      doc.setFont("PTSans", "bold");
      doc.text(item.name, margin + 10, y + 4);
      if (item.type === "product") {
        doc.setFont("PTSans", "normal");
        doc.setTextColor(30, 82, 118);
        doc.text(item.article, margin + 10, y + 9);
        doc.setTextColor(0);
      }
      doc.setFont("PTSans", "normal");
      doc.text(String(item.quantity), pw - margin - 46, y + 4);
      doc.text(`${item.pricePerUnit.toLocaleString("ru-RU")}`, pw - margin - 28, y + 4);
      doc.setFont("PTSans", "bold");
      const sub = item.quantity * item.pricePerUnit;
      doc.text(`${sub.toLocaleString("ru-RU")} ₽`, pw - margin - 2, y + 4, { align: "right" });
      doc.setDrawColor(230);
      const rowH = item.type === "product" ? 14 : 8;
      doc.line(margin, y + rowH - 2, pw - margin, y + rowH - 2);
      y += rowH;
    }
    y += 4;
  }

  // === TOTALS ===
  if (y > ph - 50) { doc.addPage(); y = 20; }
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.setFont("PTSans", "normal");
  doc.text(`Итого без НДС: ${kp.totalWithoutVat.toLocaleString("ru-RU")} ₽`, pw - margin, y, { align: "right" });
  y += 5;
  doc.text(`НДС (20%): ${kp.vat.toLocaleString("ru-RU")} ₽`, pw - margin, y, { align: "right" });
  y += 7;
  doc.setFontSize(14);
  doc.setTextColor(46, 125, 50);
  doc.setFont("PTSans", "bold");
  doc.text(`Итого: ${kp.totalWithVat.toLocaleString("ru-RU")} ₽`, pw - margin, y, { align: "right" });
  y += 12;

  // === TERMS ===
  doc.setDrawColor(220);
  doc.line(margin, y, pw - margin, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.setFont("PTSans", "normal");
  doc.text(`Срок изготовления: ${kp.terms.productionDays} р.д.  |  Гарантия: ${kp.terms.warrantyMonths} мес`, margin, y);
  y += 5;
  doc.text(`Предложение действует до: ${kp.terms.validUntil}`, margin, y);
  y += 5;
  doc.text(`Условия оплаты: ${kp.terms.paymentTerms}`, margin, y);
  y += 5;
  if (kp.terms.projectSchedule) {
    doc.text(`График реализации: ${kp.terms.projectSchedule}`, margin, y);
    y += 5;
  }

  // === SIGNATURE ===
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(51);
  doc.text("С уважением,", margin, y);
  y += 6;
  doc.text("Директор ООО СЗПК «Пласт-Металл Про»", margin, y);
  y += 8;
  doc.setTextColor(153);
  doc.text("_________________ / _________________ /", margin, y);

  // === FOOTER ===
  const footerY = ph - 15;
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 4, pw - margin, footerY - 4);
  doc.setFontSize(7);
  doc.setTextColor(153);
  doc.text("ООО СЗПК «Пласт-Металл Про»  |  ИНН: 7806634460  |  Ленинградская обл., д. Разметелево, ул. Строителей 27", pw / 2, footerY, { align: "center" });
  doc.text("Тел.: +7 963 322-55-40  |  E-mail: osobenkov@list.ru", pw / 2, footerY + 4, { align: "center" });

  doc.save(`${kp.number}_КП.pdf`);
}
