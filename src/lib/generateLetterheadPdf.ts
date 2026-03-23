import { jsPDF } from "jspdf";
import { loadImageAsBase64 } from "./imageUtils";
import { registerFonts } from "./pdfFonts";

export async function generateLetterheadPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  registerFonts(doc);
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
  doc.setFont("Roboto", "bold");
  doc.text("ООО СЗПК «Пласт-Металл Про»", margin + 32, y + 1);

  // Contact info right-aligned
  doc.setFontSize(8);
  doc.setTextColor(102);
  doc.setFont("Roboto", "normal");
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
  doc.setFont("Roboto", "bold");
  doc.text("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ", pw / 2, y, { align: "center" });
  y += 14;

  // === Date line ===
  doc.setFontSize(11);
  doc.setTextColor(51);
  doc.setFont("Roboto", "normal");
  doc.text("Дата: «____» ______________ 20____ г.", margin, y);
  doc.text("№ ___________", pw - margin, y, { align: "right" });
  y += 10;

  // === Recipient ===
  doc.setFont("Roboto", "bold");
  doc.text("Кому: ", margin, y);
  doc.setFont("Roboto", "normal");
  doc.setTextColor(153);
  doc.text("_______________________________________________", margin + 15, y);
  y += 8;

  doc.setTextColor(51);
  doc.setFont("Roboto", "bold");
  doc.text("Организация: ", margin, y);
  doc.setFont("Roboto", "normal");
  doc.setTextColor(153);
  doc.text("________________________________________", margin + 30, y);
  y += 12;

  // === Greeting ===
  doc.setTextColor(51);
  doc.setFont("Roboto", "normal");
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

  // Empty lines for content
  doc.setDrawColor(230);
  for (let i = 0; i < 18; i++) {
    doc.line(margin, y, pw - margin, y);
    y += 8;
  }

  // === Signature ===
  y = ph - 55;
  doc.setTextColor(51);
  doc.setFontSize(11);
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
  doc.setFont("Roboto", "normal");
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

  doc.save("Коммерческое_предложение_ПластМеталлПро.pdf");
}
