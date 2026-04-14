export interface FvgProduct {
  article: string;
  model: string;
  flow: string;
  area: string;
  maxConc: string;
  rStart: string;
  rEnd: string;
  efficiency: string;
  dimensions: { L: string; L1: string; H: string; H1: string; H2: string; D: string; D1: string; D2: string };
  name: string;
  images: string[];
}

const defaultImages = [
  "/images/fvg-render-clean.png",
  "/images/fvg-real-1.png",
  "/images/fvg-real-2.png",
];

export const fvgProducts: FvgProduct[] = [
  {
    article: "СЗПК.ФВГ.037",
    model: "ФВГ-0,37",
    flow: "2 500–5 000",
    area: "0,37",
    maxConc: "10",
    rStart: "350",
    rEnd: "700",
    efficiency: "≥ 96",
    dimensions: { L: "1050", L1: "480", H: "1000", H1: "600", H2: "700", D: "355", D1: "355", D2: "450" },
    name: "Фильтр волокнистый гальванический ФВГ-0,37 (2 500–5 000 м³/ч)",
    images: defaultImages,
  },
  {
    article: "СЗПК.ФВГ.074",
    model: "ФВГ-0,74",
    flow: "5 000–10 000",
    area: "0,74",
    maxConc: "10",
    rStart: "350",
    rEnd: "700",
    efficiency: "≥ 96",
    dimensions: { L: "1100", L1: "480", H: "1000", H1: "600", H2: "700", D: "400", D1: "400", D2: "700" },
    name: "Фильтр волокнистый гальванический ФВГ-0,74 (5 000–10 000 м³/ч)",
    images: defaultImages,
  },
  {
    article: "СЗПК.ФВГ.160",
    model: "ФВГ-1,6",
    flow: "10 000–20 000",
    area: "1,6",
    maxConc: "10",
    rStart: "350",
    rEnd: "700",
    efficiency: "≥ 96",
    dimensions: { L: "1150", L1: "480", H: "1200", H1: "830", H2: "900", D: "400", D1: "400", D2: "950" },
    name: "Фильтр волокнистый гальванический ФВГ-1,6 (10 000–20 000 м³/ч)",
    images: defaultImages,
  },
  {
    article: "СЗПК.ФВГ.320",
    model: "ФВГ-3,2",
    flow: "20 000–40 000",
    area: "3,2",
    maxConc: "10",
    rStart: "350",
    rEnd: "700",
    efficiency: "≥ 96",
    dimensions: { L: "1350", L1: "480", H: "1250", H1: "830", H2: "950", D: "630", D1: "630", D2: "1050" },
    name: "Фильтр волокнистый гальванический ФВГ-3,2 (20 000–40 000 м³/ч)",
    images: defaultImages,
  },
  {
    article: "СЗПК.ФВГ.640",
    model: "ФВГ-6,4",
    flow: "60 000–80 000",
    area: "6,4",
    maxConc: "10",
    rStart: "350",
    rEnd: "700",
    efficiency: "≥ 96",
    dimensions: { L: "1600", L1: "480", H: "2000", H1: "1550", H2: "2000", D: "1300", D1: "1300", D2: "1800" },
    name: "Фильтр волокнистый гальванический ФВГ-6,4 (60 000–80 000 м³/ч)",
    images: defaultImages,
  },
];
