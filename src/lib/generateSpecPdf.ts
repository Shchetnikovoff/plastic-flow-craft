import { jsPDF } from "jspdf";
import type { ContactFormData } from "@/components/ContactFormFields";
import { loadImageAsBase64 } from "./imageUtils";

interface ProductSpec {
  article: string;
  diameter: number;
  wallThickness: number;
  socketThickness: number;
  availableLength: number | null;
  connectionName: string;
  materialName: string;
  workingTemp?: string;
  chemicalResistance?: string;
  colorName?: string;
  colorRal?: string;
}

export async function generateSpecPdf(product: ProductSpec, contact: ContactFormData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Load logo
  let logoData: string | null = null;
  try {
    logoData = await loadImageAsBase64("/images/logo.png");
  } catch { /* skip logo if failed */ }

  // Header with logo
  if (logoData) {
    doc.addImage(logoData, "PNG", 20, 8, 35, 16);
  }
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text("ООО СЗПК «Пласт-Металл Про»", pageWidth - 20, 14, { align: "right" });
  doc.text("+7 963 322-55-40 | osobenkov@list.ru", pageWidth - 20, 18, { align: "right" });

  // Title
  doc.setFontSize(18);
  doc.setTextColor(30, 58, 95);
  doc.text("Спецификация изделия", pageWidth / 2, 38, { align: "center" });

  // Article
  doc.setFontSize(14);
  doc.setTextColor(60);
  doc.text(product.article, pageWidth / 2, 48, { align: "center" });

  // Separator
  doc.setDrawColor(200);
  doc.line(20, 53, pageWidth - 20, 53);

  // Product details
  doc.setFontSize(11);
  doc.setTextColor(0);
  let y = 64;
  const labelX = 25;
  const valueX = 95;

  const rows: [string, string][] = [
    ["Наименование", "Отвод вентиляционный 90°"],
    ["Артикул", product.article],
    ["Диаметр (DN)", `${product.diameter} мм`],
    ["Соединение", product.connectionName],
    ["Толщина стенки (S)", `${product.wallThickness} мм`],
    ["Толщина раструба (Sp)", `${product.socketThickness} мм`],
    ["Длина (L)", product.availableLength ? `${product.availableLength} мм` : "—"],
    ["Угол", "90°"],
    ["Материал", product.materialName],
  ];

  if (product.workingTemp) {
    rows.push(["Рабочая температура", product.workingTemp]);
  }
  if (product.chemicalResistance) {
    rows.push(["Химическая стойкость", product.chemicalResistance]);
  }
  if (product.colorName) {
    rows.push(["Цвет", `${product.colorName}${product.colorRal && product.colorRal !== "—" ? ` (${product.colorRal})` : ""}`]);
  }

  for (const [label, value] of rows) {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, labelX, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, valueX, y);
    y += 8;
  }

  // Contact info section
  y += 10;
  doc.setDrawColor(200);
  doc.line(20, y, pageWidth - 20, y);
  y += 12;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Контактные данные заказчика", labelX, y);
  y += 10;
  doc.setFontSize(11);

  const contactRows: [string, string][] = [
    ["Имя", contact.name.trim()],
    ["Email", contact.email.trim()],
    ["Телефон", contact.phone.trim()],
    ["ИНН организации", contact.inn.trim()],
  ];

  for (const [label, value] of contactRows) {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, labelX, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, valueX, y);
    y += 8;
  }

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(128);
  doc.text(
    "ООО СЗПК «Пласт-Металл Про» | +7 963 322-55-40 | osobenkov@list.ru",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" }
  );

  doc.save(`${product.article}_specification.pdf`);
}