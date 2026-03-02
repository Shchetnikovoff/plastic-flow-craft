import { jsPDF } from "jspdf";
import type { ProductSize, MaterialColor } from "@/data/products";

interface FullPagePdfOptions {
  sizes: ProductSize[];
  materialName: string;
  connectionName: string;
  colorName?: string;
  colors?: MaterialColor[];
  workingTemp?: string;
  chemicalResistance?: string;
  articleExample?: string;
  articleSegments?: Array<{ value: string; label: string; desc: string }>;
}

export function generateFullPagePdf(options: FullPagePdfOptions) {
  const {
    sizes, materialName, connectionName, colorName,
    colors, workingTemp, chemicalResistance,
    articleSegments,
  } = options;

  const doc = new jsPDF({ orientation: "landscape" });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const margin = 20;

  const drawFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text(
      "ООО СЗПК «Пласт-Металл Про» | +7 963 322-55-40 | osobenkov@list.ru",
      pw / 2, ph - 8, { align: "center" }
    );
  };

  const checkPage = (y: number, need: number) => {
    if (y + need > ph - 20) {
      drawFooter();
      doc.addPage();
      return 20;
    }
    return y;
  };

  // === PAGE 1: Title ===
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 95);
  doc.text("Каталог продукции", pw / 2, 22, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(60);
  doc.text("Отвод вентиляционный круглого сечения 90°", pw / 2, 32, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(100);
  const sub = `${materialName} — ${connectionName}${colorName ? ` — ${colorName}` : ""}`;
  doc.text(sub, pw / 2, 40, { align: "center" });

  // === Description ===
  let y = 52;
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 95);
  doc.text("Описание", margin, y);
  y += 7;
  doc.setFontSize(9);
  doc.setTextColor(60);
  const descText = "Отвод вентиляционный круглого сечения служит для плавного поворота системы под углом 90°. Обеспечивает надёжное соединение элементов вентиляционной системы благодаря раструбному типу соединения.";
  const descLines = doc.splitTextToSize(descText, pw - margin * 2);
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 8;

  // === Specifications Grid ===
  y = checkPage(y, 30);
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 95);
  doc.text("Характеристики", margin, y);
  y += 7;

  const specItems = [
    { label: "Диаметр", value: "100–1200 мм" },
    { label: "Соединение", value: connectionName },
    { label: "Стенка", value: "3–10 мм" },
    { label: "Угол", value: "90°" },
  ];

  doc.setFontSize(9);
  const colW = (pw - margin * 2) / 4;
  for (let i = 0; i < specItems.length; i++) {
    const sx = margin + i * colW;
    doc.setDrawColor(200);
    doc.setFillColor(248, 249, 252);
    doc.rect(sx, y, colW, 14, "FD");
    doc.setTextColor(120);
    doc.text(specItems[i].label, sx + 4, y + 5);
    doc.setTextColor(30);
    doc.setFont("helvetica", "bold");
    doc.text(specItems[i].value, sx + 4, y + 11);
    doc.setFont("helvetica", "normal");
  }
  y += 20;

  // === Material characteristics ===
  if (workingTemp || chemicalResistance) {
    y = checkPage(y, 30);
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 95);
    doc.text("Характеристики пластика", margin, y);
    y += 7;

    doc.setFontSize(9);
    const halfW = (pw - margin * 2) / 2;

    if (workingTemp) {
      doc.setDrawColor(200);
      doc.setFillColor(248, 249, 252);
      doc.rect(margin, y, halfW, 14, "FD");
      doc.setTextColor(120);
      doc.text("Рабочая температура", margin + 4, y + 5);
      doc.setTextColor(30);
      doc.setFont("helvetica", "bold");
      doc.text(workingTemp, margin + 4, y + 11);
      doc.setFont("helvetica", "normal");
    }

    if (chemicalResistance) {
      doc.setDrawColor(200);
      doc.setFillColor(248, 249, 252);
      doc.rect(margin + halfW, y, halfW, 14, "FD");
      doc.setTextColor(120);
      doc.text("Химическая стойкость", margin + halfW + 4, y + 5);
      doc.setTextColor(30);
      doc.setFont("helvetica", "bold");
      const crLines = doc.splitTextToSize(chemicalResistance, halfW - 8);
      doc.text(crLines[0], margin + halfW + 4, y + 11);
      doc.setFont("helvetica", "normal");
    }
    y += 20;
  }

  // === Available colors ===
  if (colors && colors.length > 1) {
    y = checkPage(y, 20);
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 95);
    doc.text("Доступные цвета:", margin, y);
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(60);
    for (const c of colors) {
      y = checkPage(y, 6);
      doc.text(`• ${c.name} (${c.ral}) — ${c.application}`, margin + 4, y);
      y += 5;
    }
    y += 5;
  }

  // === Article decoding ===
  if (articleSegments && articleSegments.length > 0) {
    y = checkPage(y, 25);
    doc.setFontSize(12);
    doc.setTextColor(30, 58, 95);
    doc.text("Расшифровка артикула", margin, y);
    y += 7;

    doc.setFontSize(9);
    const segW = (pw - margin * 2) / articleSegments.length;
    for (let i = 0; i < articleSegments.length; i++) {
      const seg = articleSegments[i];
      const sx = margin + i * segW;
      doc.setDrawColor(200);
      doc.setFillColor(248, 249, 252);
      doc.rect(sx, y, segW, 18, "FD");
      doc.setTextColor(30);
      doc.setFont("helvetica", "bold");
      doc.text(seg.value, sx + segW / 2, y + 6, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 58, 95);
      doc.setFontSize(7);
      doc.text(seg.label, sx + segW / 2, y + 11, { align: "center" });
      doc.setTextColor(100);
      doc.text(seg.desc, sx + segW / 2, y + 15, { align: "center" });
      doc.setFontSize(9);
    }
    y += 24;
  }

  // === Sizes table ===
  y = checkPage(y, 20);
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 95);
  doc.text("Технические характеристики", margin, y);
  y += 8;

  const cols = [
    { label: "Артикул", width: 70, align: "left" as const },
    { label: "DN, мм", width: 30, align: "center" as const },
    { label: "S (стенка), мм", width: 40, align: "center" as const },
    { label: "L (длина), мм", width: 40, align: "center" as const },
    { label: "Sp (раструб), мм", width: 45, align: "center" as const },
  ];
  const tableW = cols.reduce((s, c) => s + c.width, 0);
  const rowH = 8;

  // Header
  doc.setFillColor(30, 58, 95);
  doc.rect(margin, y, tableW, rowH, "F");
  doc.setFontSize(9);
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  let x = margin;
  for (const col of cols) {
    const tx = col.align === "center" ? x + col.width / 2 : x + 3;
    doc.text(col.label, tx, y + 5.5, { align: col.align === "center" ? "center" : "left" });
    x += col.width;
  }
  y += rowH;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");

  // Rows
  for (let i = 0; i < sizes.length; i++) {
    y = checkPage(y, rowH);
    const size = sizes[i];

    if (i % 2 === 0) {
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, y, tableW, rowH, "F");
    }
    doc.setDrawColor(220);
    doc.rect(margin, y, tableW, rowH, "S");

    const values = [
      size.article,
      String(size.diameter),
      String(size.wallThickness),
      size.availableLength != null ? String(size.availableLength) : "—",
      String(size.socketThickness),
    ];

    x = margin;
    doc.setFontSize(9);
    for (let j = 0; j < cols.length; j++) {
      const col = cols[j];
      const tx = col.align === "center" ? x + col.width / 2 : x + 3;
      doc.text(values[j], tx, y + 5.5, { align: col.align === "center" ? "center" : "left" });
      x += col.width;
    }
    y += rowH;
  }

  drawFooter();

  const connShort = connectionName.toLowerCase().replace(/\s/g, "");
  doc.save(`Каталог_${connShort}_${materialName.substring(0, 20)}.pdf`);
}
