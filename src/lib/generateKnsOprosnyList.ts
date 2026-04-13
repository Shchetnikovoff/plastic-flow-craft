import { jsPDF } from "jspdf";
import { registerCyrillicFont } from "./pdfFonts";
import { loadImageAsBase64 } from "./imageUtils";

interface PipelineParams {
  count: string;
  diameter: string;
  material: string;
  depth: string;
}

export interface KnsOprosnyData {
  wastewaterType: string;
  material: string;
  flow: number;
  head: number;
  pumpScheme: string;
  inletPipe: PipelineParams;
  outletPipe: PipelineParams;
  equipment: string[];
  recommendedModel: string;
  recommendedArticle: string;
  recommendedDiameter: number;
  recommendedHeight: number;
  recommendedPumpCount: number;
  recommendedPumpPower: number;
}

export async function generateKnsOprosnyList(data: KnsOprosnyData) {
  const doc = new jsPDF();
  await registerCyrillicFont(doc);
  const pw = doc.internal.pageSize.getWidth();
  const leftM = 20;
  const rightM = pw - 20;
  let y = 12;

  // Load logo
  let logoData: string | null = null;
  try {
    logoData = await loadImageAsBase64("/images/logo.png");
  } catch { /* skip */ }

  // ── Header ──
  if (logoData) {
    doc.addImage(logoData, "PNG", leftM, y, 35, 16);
  }
  doc.setFontSize(8);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(128);
  doc.text("ООО СЗПК «Пласт-Металл Про»", rightM, y + 6, { align: "right" });
  doc.text("+7 963 322-55-40 | osobenkov@list.ru", rightM, y + 10, { align: "right" });
  doc.text("www.szpk-plast.ru", rightM, y + 14, { align: "right" });
  y += 24;

  // Separator
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.8);
  doc.line(leftM, y, rightM, y);
  y += 10;

  // ── Title ──
  doc.setFontSize(16);
  doc.setFont("PTSans", "bold");
  doc.setTextColor(30, 58, 95);
  doc.text("Опросный лист", pw / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text("на заказ канализационной насосной станции (КНС)", pw / 2, y, { align: "center" });
  y += 4;

  // Date
  doc.setFontSize(8);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(128);
  const dateStr = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
  doc.text(`Дата формирования: ${dateStr}`, pw / 2, y, { align: "center" });
  y += 10;

  // ── Helper functions ──
  const sectionTitle = (title: string) => {
    doc.setFontSize(10);
    doc.setFont("PTSans", "bold");
    doc.setTextColor(30, 58, 95);
    doc.text(title, leftM, y);
    y += 1.5;
    doc.setDrawColor(30, 58, 95);
    doc.setLineWidth(0.3);
    doc.line(leftM, y, rightM, y);
    y += 6;
  };

  const row = (label: string, value: string) => {
    doc.setFontSize(9);
    doc.setFont("PTSans", "bold");
    doc.setTextColor(60);
    doc.text(label, leftM + 2, y);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(30);
    doc.text(value || "—", 95, y);
    y += 6;
  };

  const twoCol = (l1: string, v1: string, l2: string, v2: string) => {
    doc.setFontSize(9);
    doc.setFont("PTSans", "bold");
    doc.setTextColor(60);
    doc.text(l1, leftM + 2, y);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(30);
    doc.text(v1 || "—", 72, y);

    doc.setFont("PTSans", "bold");
    doc.setTextColor(60);
    doc.text(l2, pw / 2 + 5, y);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(30);
    doc.text(v2 || "—", pw / 2 + 55, y);
    y += 6;
  };

  // ── 1. Recommended model ──
  sectionTitle("1. Рекомендованная модель");
  row("Модель:", data.recommendedModel);
  row("Артикул:", data.recommendedArticle);
  twoCol("Диаметр корпуса (D):", `${data.recommendedDiameter} мм`, "Высота корпуса (H):", `${data.recommendedHeight} мм`);
  twoCol("Производительность (Q):", `${data.flow} м³/ч`, "Требуемый напор (H):", `${data.head} м`);
  y += 2;

  // ── 2. Wastewater ──
  sectionTitle("2. Тип перекачиваемых сточных вод");
  row("Тип стоков:", data.wastewaterType);
  y += 2;

  // ── 3. Material ──
  sectionTitle("3. Материал корпуса КНС");
  row("Материал:", data.material);
  y += 2;

  // ── 4. Pump scheme ──
  sectionTitle("4. Рабочая схема");
  row("Схема насосов:", data.pumpScheme);
  twoCol("Кол-во насосов:", `${data.recommendedPumpCount} шт.`, "Мощность насосов:", `${data.recommendedPumpPower} кВт`);
  y += 2;

  // ── 5. Pipelines ──
  sectionTitle("5. Подводящий трубопровод");
  twoCol("Количество:", `${data.inletPipe.count} шт.`, "Диаметр (d1):", data.inletPipe.diameter ? `${data.inletPipe.diameter} мм` : "—");
  twoCol("Материал:", data.inletPipe.material || "—", "Глубина заложения (H1):", data.inletPipe.depth ? `${data.inletPipe.depth} м` : "—");
  y += 2;

  sectionTitle("6. Напорный трубопровод");
  twoCol("Количество:", `${data.outletPipe.count} шт.`, "Диаметр (d2):", data.outletPipe.diameter ? `${data.outletPipe.diameter} мм` : "—");
  twoCol("Материал:", data.outletPipe.material || "—", "Глубина заложения (H2):", data.outletPipe.depth ? `${data.outletPipe.depth} м` : "—");
  y += 2;

  // ── 7. Equipment ──
  sectionTitle("7. Дополнительное оборудование");
  if (data.equipment.length === 0) {
    doc.setFontSize(9);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(128);
    doc.text("Не выбрано", leftM + 2, y);
    y += 6;
  } else {
    for (const eq of data.equipment) {
      doc.setFontSize(9);
      doc.setFont("PTSans", "normal");
      doc.setTextColor(30);
      doc.text(`✓  ${eq}`, leftM + 2, y);
      y += 5.5;
    }
  }
  y += 4;

  // ── Contact fields (blank) ──
  sectionTitle("8. Контактные данные заказчика");
  const blankRow = (label: string) => {
    doc.setFontSize(9);
    doc.setFont("PTSans", "bold");
    doc.setTextColor(60);
    doc.text(label, leftM + 2, y);
    doc.setDrawColor(180);
    doc.setLineWidth(0.2);
    doc.line(80, y, rightM, y);
    y += 8;
  };
  blankRow("Заказчик:");
  blankRow("Контактное лицо:");
  blankRow("Телефон / E-mail:");
  blankRow("Адрес объекта:");

  // ── Footer ──
  y = doc.internal.pageSize.getHeight() - 16;
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(leftM, y, rightM, y);
  y += 5;
  doc.setFontSize(7);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(160);
  doc.text("ООО СЗПК «Пласт-Металл Про» · ИНН 5408025581 · +7 963 322-55-40 · osobenkov@list.ru", pw / 2, y, { align: "center" });

  doc.save(`Опросный_лист_КНС_${data.recommendedModel.replace(/\s+/g, "_")}.pdf`);
}
