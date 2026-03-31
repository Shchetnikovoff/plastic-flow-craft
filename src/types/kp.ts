export interface KPProductItem {
  id: string;
  type: "product";
  article: string;
  name: string;
  imageUrl: string;
  specs: Record<string, string>;
  quantity: number;
  pricePerUnit: number;
}

export interface KPCustomItem {
  id: string;
  type: "custom";
  name: string;
  description?: string;
  quantity: number;
  pricePerUnit: number;
}

export type KPItem = KPProductItem | KPCustomItem;

export interface KPTerms {
  productionDays: number;
  warrantyMonths: number;
  validUntil: string;
  paymentTerms: string;
  projectSchedule?: string;
}

export interface KPClient {
  name: string;
  organization: string;
  inn?: string;
  email?: string;
  phone?: string;
}

export type KPStatus = "draft" | "sent" | "accepted" | "rejected";

export interface KPDocument {
  id: string;
  number: string;
  date: string;
  client: KPClient;
  items: KPItem[];
  terms: KPTerms;
  status: KPStatus;
  totalWithoutVat: number;
  vat: number;
  totalWithVat: number;
  createdAt: string;
  updatedAt: string;
}

export interface KPTotals {
  totalWithoutVat: number;
  vat: number;
  totalWithVat: number;
}

export function computeKPTotals(items: KPItem[]): KPTotals {
  const totalWithoutVat = items.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );
  const vat = Math.round(totalWithoutVat * 0.2);
  return { totalWithoutVat, vat, totalWithVat: totalWithoutVat + vat };
}

export function generateKPNumber(year: number, counter: number): string {
  return `КП-${year}-${String(counter).padStart(4, "0")}`;
}
