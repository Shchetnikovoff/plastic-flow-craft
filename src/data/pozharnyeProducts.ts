export interface PozharnyeRectProduct {
  article: string;
  volume: number;
  length: number;
  width: number;
  height: number;
}

export interface PozharnyePodzemProduct {
  article: string;
  volumeM3: number;
  diameter: number;
  length: number;
}

export interface PozharnyeHorizProduct {
  article: string;
  volume: number;
  diameter: number;
  length: number;
}

export const pozharnyeRect: PozharnyeRectProduct[] = [
  { article: "ЕПП-1000", volume: 1000, length: 1000, width: 1000, height: 1000 },
  { article: "ЕПП-2000", volume: 2000, length: 2000, width: 1000, height: 1000 },
  { article: "ЕПП-3000", volume: 3000, length: 2100, width: 1200, height: 1200 },
  { article: "ЕПП-4000", volume: 4000, length: 1800, width: 1500, height: 1500 },
  { article: "ЕПП-5000", volume: 5000, length: 2300, width: 1500, height: 1500 },
  { article: "ЕПП-6000", volume: 6000, length: 2700, width: 1500, height: 1500 },
  { article: "ЕПП-8000", volume: 8000, length: 3600, width: 1500, height: 1500 },
  { article: "ЕПП-10000", volume: 10000, length: 4500, width: 1500, height: 1500 },
  { article: "ЕПП-15000", volume: 15000, length: 4700, width: 1800, height: 1800 },
  { article: "ЕПП-20000", volume: 20000, length: 5000, width: 2000, height: 2000 },
  { article: "ЕПП-25000", volume: 25000, length: 6300, width: 2000, height: 2000 },
  { article: "ЕПП-30000", volume: 30000, length: 6000, width: 2250, height: 2250 },
  { article: "ЕПП-35000", volume: 35000, length: 7300, width: 2400, height: 2000 },
  { article: "ЕПП-40000", volume: 40000, length: 8400, width: 2400, height: 2000 },
  { article: "ЕПП-45000", volume: 45000, length: 9400, width: 2400, height: 2000 },
  { article: "ЕПП-50000", volume: 50000, length: 10500, width: 2400, height: 2000 },
];

export const pozharnyePodzem: PozharnyePodzemProduct[] = [
  { article: "ЕПП-ПДЗ-20", volumeM3: 20, diameter: 2400, length: 4500 },
  { article: "ЕПП-ПДЗ-25", volumeM3: 25, diameter: 2400, length: 5600 },
  { article: "ЕПП-ПДЗ-30", volumeM3: 30, diameter: 2400, length: 6700 },
  { article: "ЕПП-ПДЗ-40", volumeM3: 40, diameter: 2400, length: 8800 },
  { article: "ЕПП-ПДЗ-50", volumeM3: 50, diameter: 2400, length: 11000 },
  { article: "ЕПП-ПДЗ-60", volumeM3: 60, diameter: 3000, length: 8500 },
  { article: "ЕПП-ПДЗ-70", volumeM3: 70, diameter: 3000, length: 9900 },
  { article: "ЕПП-ПДЗ-80", volumeM3: 80, diameter: 3000, length: 11400 },
  { article: "ЕПП-ПДЗ-90", volumeM3: 90, diameter: 3200, length: 11200 },
  { article: "ЕПП-ПДЗ-100", volumeM3: 100, diameter: 3200, length: 12500 },
  { article: "ЕПП-ПДЗ-120", volumeM3: 120, diameter: 3500, length: 12500 },
  { article: "ЕПП-ПДЗ-150", volumeM3: 150, diameter: 3600, length: 14700 },
];

export const pozharnyeHoriz: PozharnyeHorizProduct[] = [
  { article: "ЕПП-Г-1000", volume: 1000, diameter: 940, length: 1500 },
  { article: "ЕПП-Г-2000", volume: 2000, diameter: 1330, length: 1500 },
  { article: "ЕПП-Г-3000", volume: 3000, diameter: 1600, length: 1500 },
  { article: "ЕПП-Г-4000", volume: 4000, diameter: 1600, length: 2000 },
  { article: "ЕПП-Г-5000", volume: 5000, diameter: 1700, length: 2300 },
  { article: "ЕПП-Г-6000", volume: 6000, diameter: 1850, length: 2300 },
  { article: "ЕПП-Г-8000", volume: 8000, diameter: 2260, length: 2000 },
  { article: "ЕПП-Г-10000", volume: 10000, diameter: 2350, length: 2350 },
  { article: "ЕПП-Г-12000", volume: 12000, diameter: 2350, length: 2800 },
  { article: "ЕПП-Г-15000", volume: 15000, diameter: 2350, length: 3500 },
  { article: "ЕПП-Г-20000", volume: 20000, diameter: 2380, length: 4500 },
  { article: "ЕПП-Г-25000", volume: 25000, diameter: 2370, length: 5700 },
  { article: "ЕПП-Г-30000", volume: 30000, diameter: 2400, length: 6650 },
  { article: "ЕПП-Г-35000", volume: 35000, diameter: 3050, length: 4800 },
  { article: "ЕПП-Г-40000", volume: 40000, diameter: 3050, length: 5600 },
  { article: "ЕПП-Г-45000", volume: 45000, diameter: 3050, length: 6200 },
  { article: "ЕПП-Г-50000", volume: 50000, diameter: 3050, length: 7000 },
];
