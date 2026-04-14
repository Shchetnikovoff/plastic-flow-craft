export interface ScrubberHorizProduct {
  article: string;
  model: string;
  flow: number;
  flowFormatted: string;
  diameter: number;
  dimensions: string;
  name: string;
  images: string[];
}

const defaultImages = [
  "/images/skrubber-goriz-render.png",
  "/images/skrubber-goriz-chertezh.webp",
  "/images/skrubber-vert-real-1.jpg",
  "/images/skrubber-vert-real-2.jpg",
];

export const scrubberHorizProducts: ScrubberHorizProduct[] = [
  { article: "СЗПК.СГ.500", model: "СГ-0.5", flow: 500, flowFormatted: "500", diameter: 160, dimensions: "2250×1050×1550", name: "Скруббер горизонтальный СГ-0.5 (500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.1000", model: "СГ-1", flow: 1000, flowFormatted: "1 000", diameter: 170, dimensions: "2250×1050×1550", name: "Скруббер горизонтальный СГ-1 (1 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.1500", model: "СГ-1.5", flow: 1500, flowFormatted: "1 500", diameter: 190, dimensions: "2250×1050×1550", name: "Скруббер горизонтальный СГ-1.5 (1 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.2000", model: "СГ-2", flow: 2000, flowFormatted: "2 000", diameter: 230, dimensions: "2250×1150×1650", name: "Скруббер горизонтальный СГ-2 (2 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.2500", model: "СГ-2.5", flow: 2500, flowFormatted: "2 500", diameter: 260, dimensions: "2250×1150×1650", name: "Скруббер горизонтальный СГ-2.5 (2 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.3000", model: "СГ-3", flow: 3000, flowFormatted: "3 000", diameter: 290, dimensions: "2400×1400×1800", name: "Скруббер горизонтальный СГ-3 (3 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.4000", model: "СГ-4", flow: 4000, flowFormatted: "4 000", diameter: 320, dimensions: "2400×1450×1800", name: "Скруббер горизонтальный СГ-4 (4 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.5000", model: "СГ-5", flow: 5000, flowFormatted: "5 000", diameter: 370, dimensions: "2400×1450×1850", name: "Скруббер горизонтальный СГ-5 (5 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.6000", model: "СГ-6", flow: 6000, flowFormatted: "6 000", diameter: 425, dimensions: "2525×1500×1900", name: "Скруббер горизонтальный СГ-6 (6 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.8000", model: "СГ-8", flow: 8000, flowFormatted: "8 000", diameter: 475, dimensions: "2575×1600×1990", name: "Скруббер горизонтальный СГ-8 (8 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.10000", model: "СГ-10", flow: 10000, flowFormatted: "10 000", diameter: 525, dimensions: "2725×1650×2015", name: "Скруббер горизонтальный СГ-10 (10 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.12000", model: "СГ-12", flow: 12000, flowFormatted: "12 000", diameter: 580, dimensions: "2800×1700×2100", name: "Скруббер горизонтальный СГ-12 (12 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.16000", model: "СГ-16", flow: 16000, flowFormatted: "16 000", diameter: 650, dimensions: "2850×1750×2200", name: "Скруббер горизонтальный СГ-16 (16 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.20000", model: "СГ-20", flow: 20000, flowFormatted: "20 000", diameter: 720, dimensions: "2900×1800×2300", name: "Скруббер горизонтальный СГ-20 (20 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.25000", model: "СГ-25", flow: 25000, flowFormatted: "25 000", diameter: 850, dimensions: "3450×2000×2400", name: "Скруббер горизонтальный СГ-25 (25 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.30000", model: "СГ-30", flow: 30000, flowFormatted: "30 000", diameter: 950, dimensions: "3600×2200×2500", name: "Скруббер горизонтальный СГ-30 (30 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.40000", model: "СГ-40", flow: 40000, flowFormatted: "40 000", diameter: 1050, dimensions: "3600×2350×2700", name: "Скруббер горизонтальный СГ-40 (40 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.50000", model: "СГ-50", flow: 50000, flowFormatted: "50 000", diameter: 1150, dimensions: "3700×2350×2800", name: "Скруббер горизонтальный СГ-50 (50 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СГ.60000", model: "СГ-60", flow: 60000, flowFormatted: "60 000", diameter: 1250, dimensions: "3700×2350×3000", name: "Скруббер горизонтальный СГ-60 (60 000 м³/ч)", images: defaultImages },
];
