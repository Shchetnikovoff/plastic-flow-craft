import * as XLSX from "xlsx";
import type { KPDocument } from "@/types/kp";

const STATUS_LABELS: Record<string, string> = {
  draft: "Черновик",
  sent: "Отправлено",
  accepted: "Принято",
  rejected: "Отклонено",
};

export function exportKPToExcel(documents: KPDocument[]): void {
  const data = documents.map((d) => ({
    "№ КП": d.number,
    "Дата": d.date,
    "Организация": d.client.organization,
    "Контакт": d.client.name,
    "ИНН": d.client.inn || "",
    "Позиций": d.items.length,
    "Сумма без НДС": d.totalWithoutVat,
    "НДС": d.vat,
    "Сумма с НДС": d.totalWithVat,
    "Статус": STATUS_LABELS[d.status] || d.status,
    "Создано": d.createdAt.split("T")[0],
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Реестр КП");
  XLSX.writeFile(wb, `Реестр_КП_${new Date().toISOString().split("T")[0]}.xlsx`);
}
