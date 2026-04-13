import { jsPDF } from "jspdf";
import { loadImageAsBase64 } from "./imageUtils";
import { registerCyrillicFont } from "./pdfFonts";

export interface LetterheadProductData {
  model: string;
  article: string;
  specs: [string, string][];
  quantity?: number;
  pricePerUnit?: number;
}

const fmt = (n: number) =>
  n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export async function generateLetterheadPdf(
  product?: LetterheadProductData,
  multiProducts?: LetterheadProductData[]
) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  await registerCyrillicFont(doc);
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pw - margin * 2;
  const labelX = margin + 5;
  const valueX = margin + 80;

  // Load images
  let logoData: string | null = null;
  let stampData: string | null = null;
  let signatureData: string | null = null;
  try { logoData = await loadImageAsBase64("/images/logo.png"); } catch { /* skip */ }
  try { stampData = await loadImageAsBase64("/images/stamp.png"); } catch { /* skip */ }
  try { signatureData = await loadImageAsBase64("/images/signature.png"); } catch { /* skip */ }

  const ensureSpace = (needed: number) => {
    if (y + needed > ph - 40) {
      doc.addPage();
      y = 20;
    }
  };

  // === HEADER (spec style) ===
  let y = 14;
  if (logoData) {
    doc.addImage(logoData, "PNG", margin, y - 5, 35, 16);
  }
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.setFont("PTSans", "normal");
  doc.text("ООО СЗПК «Пласт-Металл Про»", pw - margin, y, { align: "right" });
  doc.text("+7 963 322-55-40 | osobenkov@list.ru", pw - margin, y + 4, { align: "right" });
  doc.text("Ленинградская обл., д. Разметелево, ул. Строителей 27", pw - margin, y + 8, { align: "right" });

  // === TITLE ===
  y = 38;
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("Коммерческое предложение", pw / 2, y, { align: "center" });

  // === Date / Number ===
  y += 10;
  doc.setFontSize(10);
  doc.setTextColor(60);
  doc.setFont("PTSans", "normal");
  doc.text("Дата: «____» ______________ 20____ г.        № ___________", pw / 2, y, { align: "center" });

  // Separator
  y += 5;
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pw - margin, y);
  y += 10;

  // === Recipient block ===
  const recipientRows: [string, string][] = [
    ["Кому", "_______________________________________________"],
    ["Организация", "_______________________________________________"],
  ];
  doc.setFontSize(11);
  for (const [label, value] of recipientRows) {
    doc.setFont("PTSans", "bold");
    doc.setTextColor(0);
    doc.text(`${label}:`, labelX, y);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(153);
    doc.text(value, valueX, y);
    y += 8;
  }
  y += 4;

  // === Body intro ===
  doc.setTextColor(51);
  doc.setFont("PTSans", "normal");
  doc.setFontSize(10);
  doc.text("ООО СЗПК «Пласт-Металл Про» предлагает Вашему вниманию следующую продукцию:", margin, y);
  y += 10;

  // ===== RENDER PRODUCT(S) =====
  const renderProduct = (p: LetterheadProductData, idx?: number) => {
    ensureSpace(30);

    // Product title
    doc.setFont("PTSans", "bold");
    doc.setFontSize(14);
    doc.setTextColor(30, 58, 95);
    const title = idx !== undefined ? `${idx + 1}. ${p.model}` : p.model;
    doc.text(title, pw / 2, y, { align: "center" });
    y += 7;

    // Article
    doc.setFontSize(11);
    doc.setTextColor(60);
    doc.setFont("PTSans", "normal");
    doc.text(p.article, pw / 2, y, { align: "center" });
    y += 5;

    // Separator
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pw - margin, y);
    y += 8;

    // Specs rows (spec style: bold label, normal value)
    doc.setFontSize(11);
    for (const [label, value] of p.specs) {
      ensureSpace(8);
      doc.setFont("PTSans", "bold");
      doc.setTextColor(0);
      doc.text(`${label}:`, labelX, y);
      doc.setFont("PTSans", "normal");
      doc.text(value, valueX, y);
      y += 8;
    }

    // Quantity / price
    y += 2;
    const qty = p.quantity ?? 0;
    const price = p.pricePerUnit ?? 0;

    doc.setFont("PTSans", "bold");
    doc.setTextColor(0);
    doc.text("Количество:", labelX, y);
    doc.setFont("PTSans", "normal");
    doc.text(qty > 0 ? `${qty} шт.` : "__________ шт.", valueX, y);
    y += 8;

    if (price > 0) {
      doc.setFont("PTSans", "bold");
      doc.text("Цена за единицу:", labelX, y);
      doc.setFont("PTSans", "normal");
      doc.text(`${fmt(price)} руб. (без НДС)`, valueX, y);
      y += 8;

      const total = qty * price;
      if (total > 0) {
        doc.setFont("PTSans", "bold");
        doc.text("Итого:", labelX, y);
        doc.setFont("PTSans", "normal");
        doc.text(`${fmt(total)} руб. (без НДС)`, valueX, y);
        y += 8;

        doc.setFont("PTSans", "bold");
        doc.text("Итого с НДС (20%):", labelX, y);
        doc.text(`${fmt(total * 1.2)} руб.`, valueX, y);
        y += 8;
      }
    } else {
      doc.setFont("PTSans", "bold");
      doc.text("Стоимость:", labelX, y);
      doc.setFont("PTSans", "normal");
      doc.setTextColor(153);
      doc.text("__________________ руб. (без НДС)", valueX, y);
      y += 8;
    }
  };

  if (multiProducts && multiProducts.length > 0) {
    multiProducts.forEach((p, idx) => {
      renderProduct(p, idx);
      if (idx < multiProducts.length - 1) {
        y += 4;
        doc.setDrawColor(200);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pw - margin, y);
        y += 8;
      }
    });

    // Grand total
    const grandTotal = multiProducts.reduce((s, p) => s + (p.quantity ?? 0) * (p.pricePerUnit ?? 0), 0);
    if (grandTotal > 0) {
      y += 4;
      ensureSpace(20);
      doc.setDrawColor(30, 58, 95);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pw - margin, y);
      y += 8;

      doc.setFont("PTSans", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 95);
      doc.text(`Итого без НДС: ${fmt(grandTotal)} руб.`, labelX, y);
      y += 8;
      doc.text(`Итого с НДС (20%): ${fmt(grandTotal * 1.2)} руб.`, labelX, y);
      y += 10;
    }
  } else if (product) {
    renderProduct(product);
  } else {
    // Blank mode
    doc.setDrawColor(230);
    for (let i = 0; i < 18; i++) {
      doc.line(margin, y, pw - margin, y);
      y += 8;
    }
  }

  // === Terms ===
  y += 6;
  ensureSpace(25);
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pw - margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("PTSans", "bold");
  doc.setTextColor(0);
  doc.text("Условия поставки", labelX, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(51);

  const terms: [string, string][] = [
    ["Срок изготовления", "10–25 рабочих дней с момента оплаты"],
    ["Условия оплаты", "70% предоплата, 30% перед отгрузкой"],
    ["Срок действия", "30 календарных дней"],
  ];
  for (const [label, value] of terms) {
    doc.setFont("PTSans", "bold");
    doc.setTextColor(0);
    doc.text(`${label}:`, labelX, y);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(51);
    doc.text(value, valueX, y);
    y += 7;
  }

  // === Signature block ===
  const sigBlockH = 40;
  const sigY = Math.max(y + 12, ph - 60);
  if (sigY + sigBlockH > ph - 20) {
    doc.addPage();
    y = 30;
  } else {
    y = sigY;
  }

  doc.setTextColor(51);
  doc.setFontSize(11);
  doc.setFont("PTSans", "normal");
  doc.text("С уважением,", margin, y);
  y += 7;
  doc.text("Генеральный директор ООО СЗПК «Пласт-Металл Про»", margin, y);
  y += 5;

  if (signatureData) {
    doc.addImage(signatureData, "PNG", margin + 2, y - 2, 35, 17);
  }
  if (stampData) {
    doc.addImage(stampData, "PNG", margin + 55, y - 12, 30, 30);
  }

  y += 18;
  doc.setTextColor(51);
  doc.setFontSize(10);
  doc.setFont("PTSans", "normal");
  doc.text("_________________ / А.В. Особенкова /", margin, y);

  // === FOOTER (on every page) ===
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const footerY = ph - 10;

    doc.setFontSize(9);
    doc.setTextColor(128);
    doc.setFont("PTSans", "normal");
    doc.text(
      "ООО СЗПК «Пласт-Металл Про» | ИНН: 7806634460 | +7 963 322-55-40 | osobenkov@list.ru",
      pw / 2, footerY, { align: "center" }
    );

    if (totalPages > 1) {
      doc.text(`Стр. ${p} из ${totalPages}`, pw - margin, footerY - 5, { align: "right" });
    }
  }

  const filename = multiProducts && multiProducts.length > 0
    ? "КП_ПластМеталлПро.pdf"
    : product
      ? `КП_${product.article.replace(/\./g, "_")}.pdf`
      : "Коммерческое_предложение_ПластМеталлПро.pdf";
  doc.save(filename);
}
