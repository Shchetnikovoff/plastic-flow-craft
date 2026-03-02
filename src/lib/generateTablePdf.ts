import { jsPDF } from "jspdf";
import type { ProductSize } from "@/data/products";

interface TablePdfOptions {
  sizes: ProductSize[];
  materialName: string;
  connectionName: string;
  colorName?: string;
  workingTemp?: string;
  chemicalResistance?: string;
}

export function generateTablePdf(options: TablePdfOptions) {
  const { sizes, materialName, connectionName, colorName, workingTemp, chemicalResistance } = options;
  const doc = new jsPDF({ orientation: "landscape" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(16);
  doc.text("Технические характеристики", pageWidth / 2, 18, { align: "center" });

  // Subtitle
  doc.setFontSize(10);
  doc.setTextColor(100);
  const subtitle = `${materialName} — ${connectionName}${colorName ? ` — ${colorName}` : ""}`;
  doc.text(subtitle, pageWidth / 2, 26, { align: "center" });

  // Material specs
  let y = 34;
  if (workingTemp || chemicalResistance) {
    doc.setFontSize(9);
    doc.setTextColor(80);
    if (workingTemp) {
      doc.text(`Рабочая температура: ${workingTemp}`, 20, y);
      y += 5;
    }
    if (chemicalResistance) {
      doc.text(`Химическая стойкость: ${chemicalResistance}`, 20, y);
      y += 5;
    }
  }

  y += 4;
  doc.setTextColor(0);

  // Table header
  const cols = [
    { label: "Артикул", width: 70, align: "left" as const },
    { label: "DN, мм", width: 30, align: "center" as const },
    { label: "S (стенка), мм", width: 40, align: "center" as const },
    { label: "L (длина), мм", width: 40, align: "center" as const },
    { label: "Sp (раструб), мм", width: 45, align: "center" as const },
  ];

  const startX = 20;
  const rowHeight = 8;

  // Draw header
  doc.setFillColor(30, 58, 95); // primary-ish color
  doc.rect(startX, y, cols.reduce((s, c) => s + c.width, 0), rowHeight, "F");
  doc.setFontSize(9);
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");

  let x = startX;
  for (const col of cols) {
    const textX = col.align === "center" ? x + col.width / 2 : x + 3;
    doc.text(col.label, textX, y + 5.5, { align: col.align === "center" ? "center" : "left" });
    x += col.width;
  }

  y += rowHeight;
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");

  // Draw rows
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];

    // Check if we need a new page
    if (y + rowHeight > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 20;
    }

    // Alternate row bg
    if (i % 2 === 0) {
      doc.setFillColor(245, 247, 250);
      doc.rect(startX, y, cols.reduce((s, c) => s + c.width, 0), rowHeight, "F");
    }

    // Draw cell borders
    doc.setDrawColor(220);
    doc.rect(startX, y, cols.reduce((s, c) => s + c.width, 0), rowHeight, "S");

    doc.setFontSize(9);
    const values = [
      size.article,
      String(size.diameter),
      String(size.wallThickness),
      size.availableLength != null ? String(size.availableLength) : "—",
      String(size.socketThickness),
    ];

    x = startX;
    for (let j = 0; j < cols.length; j++) {
      const col = cols[j];
      const textX = col.align === "center" ? x + col.width / 2 : x + 3;
      doc.text(values[j], textX, y + 5.5, { align: col.align === "center" ? "center" : "left" });
      x += col.width;
    }

    y += rowHeight;
  }

  // Footer
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text(
    "ООО СЗПК «Пласт-Металл Про» | +7 963 322-55-40 | osobenkov@list.ru",
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: "center" }
  );

  const connShort = connectionName.toLowerCase().replace(/\s/g, "");
  doc.save(`Характеристики_${connShort}_${materialName.substring(0, 20)}.pdf`);
}
