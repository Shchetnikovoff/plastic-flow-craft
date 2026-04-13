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

  // Load logo
  let logoData: string | null = null;
  try {
    logoData = await loadImageAsBase64("/images/logo.png");
  } catch { /* skip */ }

  // Helper: ensure space, add page if needed
  const ensureSpace = (needed: number) => {
    if (y + needed > ph - 60) {
      doc.addPage();
      y = 20;
    }
  };

  // === HEADER ===
  let y = 15;
  if (logoData) {
    doc.addImage(logoData, "PNG", margin, y - 8, 42, 20);
  }

  doc.setFontSize(13);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("ООО СЗПК «Пласт-Металл Про»", margin + 46, y + 1);

  doc.setFontSize(8);
  doc.setTextColor(102);
  doc.setFont("PTSans", "normal");
  doc.text("+7 963 322-55-40  |  osobenkov@list.ru", pw - margin, y + 1, { align: "right" });
  doc.text("Ленинградская обл., д. Разметелево, ул. Строителей 27", pw - margin, y + 5, { align: "right" });

  y += 16;

  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pw - margin, y);
  y += 12;

  // === TITLE ===
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ", pw / 2, y, { align: "center" });
  y += 14;

  // === Date line ===
  doc.setFontSize(11);
  doc.setTextColor(51);
  doc.setFont("PTSans", "normal");
  doc.text("Дата: «____» ______________ 20____ г.", margin, y);
  doc.text("№ ___________", pw - margin, y, { align: "right" });
  y += 10;

  // === Recipient ===
  doc.setFont("PTSans", "bold");
  doc.text("Кому: ", margin, y);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(153);
  doc.text("_______________________________________________", margin + 15, y);
  y += 8;

  doc.setTextColor(51);
  doc.setFont("PTSans", "bold");
  doc.text("Организация: ", margin, y);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(153);
  doc.text("________________________________________", margin + 30, y);
  y += 12;

  // === Greeting ===
  doc.setTextColor(51);
  doc.setFont("PTSans", "normal");
  doc.text("Уважаемый(ая) ___________________________!", margin, y);
  y += 10;

  // === Body ===
  doc.setTextColor(51);
  doc.text(
    "ООО СЗПК «Пласт-Металл Про» предлагает Вашему вниманию следующую продукцию:",
    margin,
    y
  );
  y += 10;

  // ===== MULTI-PRODUCT MODE =====
  if (multiProducts && multiProducts.length > 0) {
    const rowH = 7;

    multiProducts.forEach((p, idx) => {
      ensureSpace(30);

      // Product number + title
      doc.setFont("PTSans", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 58, 95);
      doc.text(`${idx + 1}. ${p.model}`, margin, y);
      y += 6;

      doc.setFont("PTSans", "normal");
      doc.setFontSize(9);
      doc.setTextColor(102);
      doc.text(`Артикул: ${p.article}`, margin + 5, y);
      y += 7;

      // Mini specs table
      const colLabel = contentW * 0.45;

      doc.setFillColor(30, 58, 95);
      doc.rect(margin, y, contentW, rowH, "F");
      doc.setFont("PTSans", "bold");
      doc.setFontSize(8);
      doc.setTextColor(255);
      doc.text("Характеристика", margin + 3, y + 5);
      doc.text("Значение", margin + colLabel + 3, y + 5);
      y += rowH;

      doc.setFont("PTSans", "normal");
      doc.setFontSize(8);

      p.specs.forEach(([label, value], i) => {
        ensureSpace(rowH);
        if (i % 2 === 0) {
          doc.setFillColor(245, 247, 250);
          doc.rect(margin, y, contentW, rowH, "F");
        }
        doc.setDrawColor(220);
        doc.setLineWidth(0.2);
        doc.line(margin, y + rowH, margin + contentW, y + rowH);
        doc.setTextColor(51);
        doc.text(label, margin + 3, y + 5);
        doc.setTextColor(30, 30, 30);
        doc.text(value, margin + colLabel + 3, y + 5);
        y += rowH;
      });

      y += 3;

      // Quantity + price line
      doc.setFontSize(9);
      doc.setTextColor(51);
      const qty = p.quantity ?? 0;
      const price = p.pricePerUnit ?? 0;

      const qtyText = qty > 0 ? `${qty} шт.` : "____ шт.";
      const priceText = price > 0 ? `${fmt(price)} руб.` : "________ руб.";
      const sumText = qty > 0 && price > 0 ? `${fmt(qty * price)} руб.` : "________ руб.";

      doc.setFont("PTSans", "normal");
      doc.text(`Кол-во: ${qtyText}    Цена: ${priceText}    Сумма: ${sumText}`, margin + 5, y);
      y += 8;

      // Separator between products
      if (idx < multiProducts.length - 1) {
        doc.setDrawColor(200);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pw - margin, y);
        y += 6;
      }
    });

    // Grand total
    y += 4;
    ensureSpace(25);
    const grandTotal = multiProducts.reduce((s, p) => s + (p.quantity ?? 0) * (p.pricePerUnit ?? 0), 0);

    if (grandTotal > 0) {
      doc.setDrawColor(30, 58, 95);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pw - margin, y);
      y += 7;

      doc.setFont("PTSans", "bold");
      doc.setFontSize(11);
      doc.setTextColor(51);
      doc.text(`Итого без НДС: ${fmt(grandTotal)} руб.`, margin, y);
      y += 7;
      doc.text(`Итого с НДС (20%): ${fmt(grandTotal * 1.2)} руб.`, margin, y);
      y += 10;
    }

    // Terms
    doc.setFont("PTSans", "normal");
    doc.setFontSize(9);
    doc.setTextColor(102);
    doc.text("Срок изготовления: 10–25 рабочих дней с момента оплаты.", margin, y);
    y += 5;
    doc.text("Условия оплаты: 70% предоплата, 30% перед отгрузкой.", margin, y);
    y += 5;
    doc.text("Срок действия предложения: 30 календарных дней.", margin, y);

  // ===== SINGLE PRODUCT MODE =====
  } else if (product) {
    // Product model title
    doc.setFont("PTSans", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 58, 95);
    doc.text(product.model, margin, y);
    y += 7;

    doc.setFont("PTSans", "normal");
    doc.setFontSize(10);
    doc.setTextColor(102);
    doc.text(`Артикул: ${product.article}`, margin, y);
    y += 9;

    // Specs table
    const colLabel = contentW * 0.45;
    const rowH = 7;

    doc.setFillColor(30, 58, 95);
    doc.rect(margin, y, contentW, rowH, "F");
    doc.setFont("PTSans", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255);
    doc.text("Характеристика", margin + 3, y + 5);
    doc.text("Значение", margin + colLabel + 3, y + 5);
    y += rowH;

    doc.setFont("PTSans", "normal");
    doc.setFontSize(9);

    product.specs.forEach(([label, value], i) => {
      ensureSpace(rowH);
      if (i % 2 === 0) {
        doc.setFillColor(245, 247, 250);
        doc.rect(margin, y, contentW, rowH, "F");
      }
      doc.setDrawColor(220);
      doc.setLineWidth(0.2);
      doc.line(margin, y + rowH, margin + contentW, y + rowH);
      doc.setTextColor(51);
      doc.text(label, margin + 3, y + 5);
      doc.setTextColor(30, 30, 30);
      doc.text(value, margin + colLabel + 3, y + 5);
      y += rowH;
    });

    y += 6;

    // Quantity / price
    const qty = product.quantity ?? 0;
    const price = product.pricePerUnit ?? 0;
    const total = qty * price;
    const totalVat = total * 1.2;

    doc.setFont("PTSans", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51);

    doc.text(qty > 0 ? `Количество: ${qty} шт.` : "Количество: __________ шт.", margin, y);
    y += 7;

    if (price > 0) {
      doc.text(`Стоимость за единицу: ${fmt(price)} руб. (без НДС)`, margin, y);
      y += 7;
      doc.text(`Итого: ${fmt(total)} руб. (без НДС)`, margin, y);
      y += 7;
      doc.setFont("PTSans", "bold");
      doc.text(`Итого с НДС (20%): ${fmt(totalVat)} руб.`, margin, y);
      doc.setFont("PTSans", "normal");
    } else {
      doc.text("Стоимость: __________________ руб. (без НДС)", margin, y);
      y += 7;
      doc.text("Стоимость с НДС (20%): __________________ руб.", margin, y);
    }
    y += 10;

    doc.setFontSize(9);
    doc.setTextColor(102);
    doc.text("Срок изготовления: 10–25 рабочих дней с момента оплаты.", margin, y);
    y += 5;
    doc.text("Условия оплаты: 70% предоплата, 30% перед отгрузкой.", margin, y);
    y += 5;
    doc.text("Срок действия предложения: 30 календарных дней.", margin, y);

  // ===== BLANK MODE =====
  } else {
    doc.setDrawColor(230);
    for (let i = 0; i < 18; i++) {
      doc.line(margin, y, pw - margin, y);
      y += 8;
    }
  }

  // === Signature ===
  // Place signature at bottom or after content, whichever is lower
  const sigY = Math.max(y + 15, ph - 55);
  if (sigY > ph - 30) {
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
  doc.text("Директор ООО СЗПК «Пласт-Металл Про»", margin, y);
  y += 10;
  doc.setTextColor(153);
  doc.text("_________________ / _________________ /", margin, y);

  // === FOOTER (on every page) ===
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const footerY = ph - 15;
    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 4, pw - margin, footerY - 4);

    doc.setFontSize(7);
    doc.setTextColor(153);
    doc.setFont("PTSans", "normal");
    doc.text(
      "ООО СЗПК «Пласт-Металл Про»  |  ИНН: 7806634460  |  Ленинградская обл., д. Разметелево, ул. Строителей 27",
      pw / 2, footerY, { align: "center" }
    );
    doc.text(
      "Тел.: +7 963 322-55-40  |  E-mail: osobenkov@list.ru",
      pw / 2, footerY + 4, { align: "center" }
    );

    if (totalPages > 1) {
      doc.text(`Стр. ${p} из ${totalPages}`, pw - margin, footerY - 8, { align: "right" });
    }
  }

  const filename = multiProducts && multiProducts.length > 0
    ? "КП_ПластМеталлПро.pdf"
    : product
      ? `КП_${product.article.replace(/\./g, "_")}.pdf`
      : "Коммерческое_предложение_ПластМеталлПро.pdf";
  doc.save(filename);
}
