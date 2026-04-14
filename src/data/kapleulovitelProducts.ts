export interface KapleulovitelProduct {
  article: string;
  model: string;
  series: string;
  flow: string;
  D: string;
  A: string;
  B: string;
  V: string;
  mass: string;
  name: string;
  images: string[];
}

const defaultImages = [
  "/images/kapleulovitel-hero-1.png",
  "/images/kapleulovitel-hero-2.png",
];

export const kapleulovitelProducts: KapleulovitelProduct[] = [
  { article: "СЗПК.КУ1.300", model: "КУ.1-300", series: "КУ.1", flow: "300", D: "от 125 до 250", A: "от 672 до 532", B: "308", V: "299", mass: "6", name: "Каплеуловитель КУ.1-300 (300 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.500", model: "КУ.1-500", series: "КУ.1", flow: "500", D: "от 125 до 250", A: "от 732 до 532", B: "308", V: "402", mass: "7", name: "Каплеуловитель КУ.1-500 (500 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.900", model: "КУ.1-900", series: "КУ.1", flow: "900", D: "от 160 до 400", A: "от 732 до 532", B: "408", V: "432", mass: "9", name: "Каплеуловитель КУ.1-900 (900 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.1400", model: "КУ.1-1400", series: "КУ.1", flow: "1 400", D: "от 200 до 400", A: "от 932 до 532", B: "408", V: "592", mass: "12", name: "Каплеуловитель КУ.1-1400 (1 400 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.2200", model: "КУ.1-2200", series: "КУ.1", flow: "2 200", D: "от 250 до 400", A: "от 932 до 532", B: "708", V: "502", mass: "16", name: "Каплеуловитель КУ.1-2200 (2 200 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.3400", model: "КУ.1-3400", series: "КУ.1", flow: "3 400", D: "от 315 до 630", A: "от 932 до 532", B: "708", V: "682", mass: "19", name: "Каплеуловитель КУ.1-3400 (3 400 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.5500", model: "КУ.1-5500", series: "КУ.1", flow: "5 500", D: "от 400 до 710", A: "от 1132 до 532", B: "714", V: "1002", mass: "29", name: "Каплеуловитель КУ.1-5500 (5 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.6900", model: "КУ.1-6900", series: "КУ.1", flow: "6 900", D: "от 450 до 710", A: "от 1332 до 532", B: "714", V: "1232", mass: "35", name: "Каплеуловитель КУ.1-6900 (6 900 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.8500", model: "КУ.1-8500", series: "КУ.1", flow: "8 500", D: "от 500 до 630", A: "от 1532 до 530", B: "714", V: "1472", mass: "42", name: "Каплеуловитель КУ.1-8500 (8 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.10700", model: "КУ.1-10700", series: "КУ.1", flow: "10 700", D: "от 560 до 800", A: "от 1332 до 532", B: "1314", V: "982", mass: "45", name: "Каплеуловитель КУ.1-10700 (10 700 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.13500", model: "КУ.1-13500", series: "КУ.1", flow: "13 500", D: "от 630 до 1100", A: "от 1232 до 532", B: "1314", V: "1202", mass: "50", name: "Каплеуловитель КУ.1-13500 (13 500 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.17000", model: "КУ.1-17000", series: "КУ.1", flow: "17 000", D: "от 710 до 1250", A: "от 1332 до 532", B: "1314", V: "1472", mass: "59", name: "Каплеуловитель КУ.1-17000 (17 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.22000", model: "КУ.1-22000", series: "КУ.1", flow: "22 000", D: "от 800 до 1250", A: "от 1632 до 532", B: "1314", V: "1852", mass: "74", name: "Каплеуловитель КУ.1-22000 (22 000 м³/ч)", images: defaultImages },
  { article: "СЗПК.КУ1.27500", model: "КУ.1-27500", series: "КУ.1", flow: "27 500", D: "от 900 до 1250", A: "от 2032 до 532", B: "1314", V: "2282", mass: "92", name: "Каплеуловитель КУ.1-27500 (27 500 м³/ч)", images: defaultImages },
  // КУ.6 series
  { article: "СЗПК.КУ6.125", model: "КУ.6-125", series: "КУ.6", flow: "125", D: "100–125", A: "530", B: "150", V: "174", mass: "1,5", name: "Каплеуловитель КУ.6-125 (125 м³/ч)", images: defaultImages },
];
