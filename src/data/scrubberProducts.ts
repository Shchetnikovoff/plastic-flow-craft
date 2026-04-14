export interface ScrubberProduct {
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

export const scrubberProducts: ScrubberProduct[] = [
  { article: "СЗПК.СН.100", model: "СН-0.1", flow: 100, flowFormatted: "100", dimensions: "1050×1550×3900", name: "Скруббер вертикальный СН-0.1 (100 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.500", model: "СН-0.5", flow: 500, flowFormatted: "500", dimensions: "1050×1550×4000", name: "Скруббер вертикальный СН-0.5 (500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.1000", model: "СН-1", flow: 1000, flowFormatted: "1 000", dimensions: "1050×1550×4100", name: "Скруббер вертикальный СН-1 (1 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.1500", model: "СН-1.5", flow: 1500, flowFormatted: "1 500", dimensions: "1050×1650×4200", name: "Скруббер вертикальный СН-1.5 (1 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.2000", model: "СН-2", flow: 2000, flowFormatted: "2 000", dimensions: "1150×1700×4400", name: "Скруббер вертикальный СН-2 (2 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.3000", model: "СН-3", flow: 3000, flowFormatted: "3 000", dimensions: "1250×1790×4600", name: "Скруббер вертикальный СН-3 (3 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.4000", model: "СН-4", flow: 4000, flowFormatted: "4 000", dimensions: "1350×1900×4700", name: "Скруббер вертикальный СН-4 (4 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.5000", model: "СН-5", flow: 5000, flowFormatted: "5 000", dimensions: "1450×2000×4890", name: "Скруббер вертикальный СН-5 (5 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.6000", model: "СН-6", flow: 6000, flowFormatted: "6 000", dimensions: "1550×2150×5200", name: "Скруббер вертикальный СН-6 (6 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.8000", model: "СН-8", flow: 8000, flowFormatted: "8 000", dimensions: "1680×2300×5400", name: "Скруббер вертикальный СН-8 (8 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.10000", model: "СН-10", flow: 10000, flowFormatted: "10 000", dimensions: "1800×2400×5600", name: "Скруббер вертикальный СН-10 (10 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.12000", model: "СН-12", flow: 12000, flowFormatted: "12 000", dimensions: "2000×2550×5790", name: "Скруббер вертикальный СН-12 (12 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.15000", model: "СН-15", flow: 15000, flowFormatted: "15 000", dimensions: "2150×2850×5910", name: "Скруббер вертикальный СН-15 (15 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.20000", model: "СН-20", flow: 20000, flowFormatted: "20 000", dimensions: "2390×3100×6100", name: "Скруббер вертикальный СН-20 (20 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.25000", model: "СН-25", flow: 25000, flowFormatted: "25 000", dimensions: "2600×3250×6400", name: "Скруббер вертикальный СН-25 (25 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.30000", model: "СН-30", flow: 30000, flowFormatted: "30 000", dimensions: "3000×3600×6700", name: "Скруббер вертикальный СН-30 (30 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.СН.40000", model: "СН-40", flow: 40000, flowFormatted: "40 000", dimensions: "3180×3780×7400", name: "Скруббер вертикальный СН-40 (40 000 м³/ч)", images: defaultImages },
];
