import { jsPDF } from "jspdf";
import { loadImageAsBase64 } from "./imageUtils";
import { registerCyrillicFont } from "./pdfFonts";

export interface LetterheadProductData {
  model: string;
  article: string;
  specs: [string, string][];
}

export async function generateLetterheadPdf(product?: LetterheadProductData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  await registerCyrillicFont(doc);
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Load logo
  let logoData: string | null = null;
  try {
    logoData = await loadImageAsBase64("/images/logo.png");
  } catch { /* skip */ }

  // === HEADER ===
  let y = 15;
  if (logoData) {
    doc.addImage(logoData, "PNG", margin, y - 5, 28, 13);
  }

  // Company name
  doc.setFontSize(11);
  doc.setTextColor(30, 58, 95);
  doc.setFont("PTSans", "bold");
  doc.text("ООО СЗПК «Пласт-Металл Про»", margin + 32, y + 1);

  // Contact info right-aligned
  doc.setFontSize(8);
  doc.setTextColor(102);
  doc.setFont("PTSans", "normal");
  doc.text("+7 963 322-55-40  |  osobenkov@list.ru", pw - margin, y + 1, { align: "right" });

  y += 10;

  // Blue separator line
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

  if (product) {
    // === Product info block ===
    const contentW = pw - margin * 2;

    // Product model title
    doc.setFont("PTSans", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 58, 95);
    doc.text(product.model, margin, y);
    y += 7;

    // Article
    doc.setFont("PTSans", "normal");
    doc.setFontSize(10);
    doc.setTextColor(102);
    doc.text(`Артикул: ${product.article}`, margin, y);
    y += 9;

    // Specs table
    const colLabel = contentW * 0.45;
    const colValue = contentW * 0.55;
    const rowH = 7;

    // Table header
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
      // Check page overflow
      if (y + rowH > ph - 60) {
        doc.addPage();
        y = 20;
      }

      const bg = i % 2 === 0;
      if (bg) {
        doc.setFillColor(245, 247, 250);
        doc.rect(margin, y, contentW, rowH, "F");
      }

      // Row borders
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

    // Quantity / price placeholder
    doc.setFont("PTSans", "normal");
    doc.setFontSize(10);
    doc.setTextColor(51);
    doc.text("Количество: __________ шт.", margin, y);
    y += 7;
    doc.text("Стоимость: __________________ руб. (без НДС)", margin, y);
    y += 7;
    doc.text("Стоимость с НДС (20%): __________________ руб.", margin, y);
    y += 10;

    // Terms
    doc.setFontSize(9);
    doc.setTextColor(102);
    doc.text("Срок изготовления: 10–25 рабочих дней с момента оплаты.", margin, y);
    y += 5;
    doc.text("Условия оплаты: 70% предоплата, 30% перед отгрузкой.", margin, y);
    y += 5;
    doc.text("Срок действия предложения: 30 календарных дней.", margin, y);
  } else {
    // Empty lines for content (legacy fallback)
    doc.setDrawColor(230);
    for (let i = 0; i < 18; i++) {
      doc.line(margin, y, pw - margin, y);
      y += 8;
    }
  }

  // === Signature ===
  y = ph - 55;
  doc.setTextColor(51);
  doc.setFontSize(11);
  doc.setFont("PTSans", "normal");
  doc.text("С уважением,", margin, y);
  y += 7;
  doc.text("Директор ООО СЗПК «Пласт-Металл Про»", margin, y);
  y += 10;
  doc.setTextColor(153);
  doc.text("_________________ / _________________ /", margin, y);

  // === FOOTER ===
  const footerY = ph - 15;
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY - 4, pw - margin, footerY - 4);

  doc.setFontSize(7);
  doc.setTextColor(153);
  doc.setFont("PTSans", "normal");
  doc.text(
    "ООО СЗПК «Пласт-Металл Про»  |  ИНН: 7806634460  |  Ленинградская обл., д. Разметелево, ул. Строителей 27",
    pw / 2,
    footerY,
    { align: "center" }
  );
  doc.text(
    "Тел.: +7 963 322-55-40  |  E-mail: osobenkov@list.ru",
    pw / 2,
    footerY + 4,
    { align: "center" }
  );

  const filename = product
    ? `КП_${product.article.replace(/\./g, "_")}.pdf`
    : "Коммерческое_предложение_ПластМеталлПро.pdf";
  doc.save(filename);
}
