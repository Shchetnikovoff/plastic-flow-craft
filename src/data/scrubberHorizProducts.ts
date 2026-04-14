export interface ScrubberHorizProduct {
  article: string;
  model: string;
  flow: number;
  flowFormatted: string;
  dimensions: string;
  name: string;
  images: string[];
}

const defaultImages = [
  "/images/skrubber-vert-real-1.jpg",
  "/images/skrubber-vert-real-2.jpg",
  "/images/skrubber-vertikalnyj-1.jpg",
  "/images/skrubber-vertikalnyj-2.jpg",
];

export const scrubberHorizProducts: ScrubberHorizProduct[] = [
  { article: "СЗПК.СГ.500", model: "СГ-0.5", flow: 500, flowFormatted: "500", dimensions: "2200×1100×1300", name: "Скруббер горизонтальный СГ-0.5 (500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.1000", model: "СГ-1", flow: 1000, flowFormatted: "1 000", dimensions: "2400×1200×1400", name: "Скруббер горизонтальный СГ-1 (1 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.2000", model: "СГ-2", flow: 2000, flowFormatted: "2 000", dimensions: "2800×1400×1500", name: "Скруббер горизонтальный СГ-2 (2 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.3000", model: "СГ-3", flow: 3000, flowFormatted: "3 000", dimensions: "3200×1500×1600", name: "Скруббер горизонтальный СГ-3 (3 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.5000", model: "СГ-5", flow: 5000, flowFormatted: "5 000", dimensions: "3600×1700×1800", name: "Скруббер горизонтальный СГ-5 (5 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.8000", model: "СГ-8", flow: 8000, flowFormatted: "8 000", dimensions: "4200×1900×2000", name: "Скруббер горизонтальный СГ-8 (8 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.10000", model: "СГ-10", flow: 10000, flowFormatted: "10 000", dimensions: "4600×2100×2200", name: "Скруббер горизонтальный СГ-10 (10 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.15000", model: "СГ-15", flow: 15000, flowFormatted: "15 000", dimensions: "5200×2400×2400", name: "Скруббер горизонтальный СГ-15 (15 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.20000", model: "СГ-20", flow: 20000, flowFormatted: "20 000", dimensions: "5800×2600×2600", name: "Скруббер горизонтальный СГ-20 (20 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.30000", model: "СГ-30", flow: 30000, flowFormatted: "30 000", dimensions: "6400×2900×2800", name: "Скруббер горизонтальный СГ-30 (30 000 м³/ч)", images: defaultImages },
];
