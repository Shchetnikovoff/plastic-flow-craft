import { jsPDF } from "jspdf";
import { registerCyrillicFont } from "./pdfFonts";
import { loadImageAsBase64 } from "./imageUtils";

export interface LosOprosnyData {
  losType: string;
  wastewaterType: string;
  throughput: number;
  groundwaterLevel: string;
  installDepth: string;
  inletPipeDiam: string;
  inletPipeDepth: string;
  outletPipeDiam: string;
  outletPipeDepth: string;
  objectType: string;
  soilType: string;
  additionalNotes: string;
  recommendedModel: string;
  recommendedArticle: string;
  recommendedDiameter: number;
  recommendedLength: number;
  recommendedPipes: number;
  contact: { company: string; person: string; phone: string; email: string; address: string };
}

export async function generateLosOprosnyList(data: LosOprosnyData) {
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

  // Header
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

  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.8);
  doc.line(leftM, y, rightM, y);
  y += 10;

  // Title
  doc.setFontSize(16);
  doc.setFont("PTSans", "bold");
  doc.setTextColor(30, 58, 95);
  doc.text("Опросный лист", pw / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text("на заказ локального очистного сооружения (ЛОС)", pw / 2, y, { align: "center" });
  y += 4;

  doc.setFontSize(8);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(128);
  const dateStr = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
  doc.text(`Дата формирования: ${dateStr}`, pw / 2, y, { align: "center" });
  y += 10;

  // Helpers
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

  // 1. Recommended model
  sectionTitle("1. Рекомендованная модель");
  row("Тип оборудования:", data.losType);
  row("Модель:", data.recommendedModel);
  row("Артикул:", data.recommendedArticle);
  twoCol("Диаметр (D):", `${data.recommendedDiameter} мм`, "Длина (L):", `${data.recommendedLength} мм`);
  twoCol("Производительность:", `${data.throughput} л/с`, "Ø трубопроводов:", `${data.recommendedPipes} мм`);
  y += 2;

  // 2. Wastewater type
  sectionTitle("2. Характеристики стоков");
  row("Тип стоков:", data.wastewaterType);
  row("Производительность:", `${data.throughput} л/с`);
  y += 2;

  // 3. Object
  sectionTitle("3. Объект и условия монтажа");
  row("Тип объекта:", data.objectType || "—");
  row("Тип грунта:", data.soilType || "—");
  twoCol("Уровень грунтовых вод:", data.groundwaterLevel || "—", "Глубина установки:", data.installDepth ? `${data.installDepth} м` : "—");
  y += 2;

  // 4. Pipelines
  sectionTitle("4. Параметры трубопроводов");
  twoCol("Подвод. труба (d1):", data.inletPipeDiam ? `${data.inletPipeDiam} мм` : "—", "Глубина подвода:", data.inletPipeDepth ? `${data.inletPipeDepth} м` : "—");
  twoCol("Отвод. труба (d2):", data.outletPipeDiam ? `${data.outletPipeDiam} мм` : "—", "Глубина отвода:", data.outletPipeDepth ? `${data.outletPipeDepth} м` : "—");
  y += 2;

  // 5. Additional
  if (data.additionalNotes) {
    sectionTitle("5. Дополнительные требования");
    doc.setFontSize(9);
    doc.setFont("PTSans", "normal");
    doc.setTextColor(30);
    const lines = doc.splitTextToSize(data.additionalNotes, rightM - leftM - 4);
    doc.text(lines, leftM + 2, y);
    y += lines.length * 5 + 4;
  }

  // 6. Contact
  sectionTitle(data.additionalNotes ? "6. Контактные данные заказчика" : "5. Контактные данные заказчика");
  const c = data.contact;
  row("Заказчик:", c.company || "—");
  row("Контактное лицо:", c.person || "—");
  twoCol("Телефон:", c.phone || "—", "E-mail:", c.email || "—");
  row("Адрес объекта:", c.address || "—");

  // Footer
  y = doc.internal.pageSize.getHeight() - 16;
  doc.setDrawColor(200);
  doc.setLineWidth(0.3);
  doc.line(leftM, y, rightM, y);
  y += 5;
  doc.setFontSize(7);
  doc.setFont("PTSans", "normal");
  doc.setTextColor(160);
  doc.text("ООО СЗПК «Пласт-Металл Про» · ИНН 5408025581 · +7 963 322-55-40 · osobenkov@list.ru", pw / 2, y, { align: "center" });

  const safeName = data.recommendedModel.replace(/\s+/g, "_").replace(/[/\\]/g, "-");
  doc.save(`Опросный_лист_ЛОС_${safeName}.pdf`);
}
