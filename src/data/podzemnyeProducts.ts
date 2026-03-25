export interface PodzemnyeProduct {
  article: string;
  volume: number;
  diameter: number;
  length: number;
}

export const podzemnyeProducts: PodzemnyeProduct[] = [
  { article: "СЗПК.ЕСВП.20", volume: 20, diameter: 2400, length: 4500 },
  { article: "СЗПК.ЕСВП.25", volume: 25, diameter: 2400, length: 5600 },
  { article: "СЗПК.ЕСВП.30", volume: 30, diameter: 2400, length: 6700 },
  { article: "СЗПК.ЕСВП.40", volume: 40, diameter: 2400, length: 8800 },
  { article: "СЗПК.ЕСВП.50", volume: 50, diameter: 2400, length: 11000 },
  { article: "СЗПК.ЕСВП.60", volume: 60, diameter: 3000, length: 8500 },
  { article: "СЗПК.ЕСВП.70", volume: 70, diameter: 3000, length: 9900 },
  { article: "СЗПК.ЕСВП.80", volume: 80, diameter: 3000, length: 11400 },
  { article: "СЗПК.ЕСВП.90", volume: 90, diameter: 3200, length: 11200 },
  { article: "СЗПК.ЕСВП.100", volume: 100, diameter: 3200, length: 12500 },
  { article: "СЗПК.ЕСВП.120", volume: 120, diameter: 3500, length: 12500 },
  { article: "СЗПК.ЕСВП.150", volume: 150, diameter: 3600, length: 14700 },
];
