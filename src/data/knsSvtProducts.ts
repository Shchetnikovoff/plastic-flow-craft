export interface KnsSvtProduct {
  model: string;
  article: string;
  diameter: number;
  height: number;
  flow: number;
  head: number;
  maxFlow: number;
  maxHead: number;
  pumpCount: number;
  pumpPower: number;
  material: string;
  price: number;
}

export const knsSvtProducts: KnsSvtProduct[] = [
  { model: "КНС 10-5", article: "СЗПК.КНС.ПЭ.10-5", diameter: 1300, height: 2700, flow: 10, head: 5, maxFlow: 16, maxHead: 10, pumpCount: 2, pumpPower: 0.55, material: "Полиэтилен", price: 638500 },
  { model: "КНС 10-10", article: "СЗПК.КНС.ПЭ.10-10", diameter: 1300, height: 2700, flow: 10, head: 10, maxFlow: 20, maxHead: 14, pumpCount: 2, pumpPower: 0.75, material: "Полиэтилен", price: 638500 },
  { model: "КНС 10-15", article: "СЗПК.КНС.ПЭ.10-15", diameter: 1300, height: 2900, flow: 10, head: 15, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "Полиэтилен", price: 676500 },
  { model: "КНС 15-10", article: "СЗПК.КНС.ПЭ.15-10", diameter: 1300, height: 2900, flow: 15, head: 10, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "Полиэтилен", price: 676500 },
  { model: "КНС 15-15", article: "СЗПК.КНС.ПЭ.15-15", diameter: 1300, height: 2900, flow: 15, head: 15, maxFlow: 26, maxHead: 21, pumpCount: 2, pumpPower: 1.5, material: "Полиэтилен", price: 693000 },
  { model: "КНС 20-10", article: "СЗПК.КНС.ПЭ.20-10", diameter: 1300, height: 2900, flow: 20, head: 10, maxFlow: 30, maxHead: 16, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 703000 },
  { model: "КНС 20-15", article: "СЗПК.КНС.ПЭ.20-15", diameter: 1300, height: 2900, flow: 20, head: 15, maxFlow: 30, maxHead: 18, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 703000 },
  { model: "КНС 10-20", article: "СЗПК.КНС.ПЭ.10-20", diameter: 1300, height: 2900, flow: 10, head: 20, maxFlow: 20, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 711000 },
  { model: "КНС 15-20", article: "СЗПК.КНС.ПЭ.15-20", diameter: 1300, height: 2900, flow: 15, head: 20, maxFlow: 21, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 711000 },
  { model: "КНС 15-25", article: "СЗПК.КНС.ПЭ.15-25", diameter: 1500, height: 3000, flow: 15, head: 25, maxFlow: 21, maxHead: 30, pumpCount: 2, pumpPower: 3.0, material: "Полиэтилен", price: 834000 },
  { model: "КНС 20-20", article: "СЗПК.КНС.ПЭ.20-20", diameter: 1500, height: 2800, flow: 20, head: 20, maxFlow: 30, maxHead: 25, pumpCount: 2, pumpPower: 3.0, material: "Полиэтилен", price: 846000 },
  { model: "КНС 20-25", article: "СЗПК.КНС.ПЭ.20-25", diameter: 1500, height: 3200, flow: 20, head: 25, maxFlow: 30, maxHead: 30, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 859000 },
  { model: "КНС 25-10", article: "СЗПК.КНС.ПЭ.25-10", diameter: 1500, height: 3200, flow: 25, head: 10, maxFlow: 32, maxHead: 15, pumpCount: 2, pumpPower: 1.5, material: "Полиэтилен", price: 916000 },
  { model: "КНС 25-20", article: "СЗПК.КНС.ПЭ.25-20", diameter: 1500, height: 3200, flow: 25, head: 20, maxFlow: 32, maxHead: 25, pumpCount: 2, pumpPower: 3.0, material: "Полиэтилен", price: 923000 },
  { model: "КНС 15-30", article: "СЗПК.КНС.ПЭ.15-30", diameter: 1300, height: 3000, flow: 15, head: 30, maxFlow: 21, maxHead: 38, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 939000 },
  { model: "КНС 25-25", article: "СЗПК.КНС.ПЭ.25-25", diameter: 1500, height: 3300, flow: 25, head: 25, maxFlow: 32, maxHead: 30, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 943000 },
  { model: "КНС 30-15", article: "СЗПК.КНС.ПЭ.30-15", diameter: 1500, height: 3400, flow: 30, head: 15, maxFlow: 35, maxHead: 23, pumpCount: 2, pumpPower: 3.0, material: "Полиэтилен", price: 979000 },
  { model: "КНС 20-30", article: "СЗПК.КНС.ПЭ.20-30", diameter: 1500, height: 3200, flow: 20, head: 30, maxFlow: 30, maxHead: 35, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 987000 },
  { model: "КНС 15-40", article: "СЗПК.КНС.ПЭ.15-40", diameter: 1500, height: 3100, flow: 15, head: 40, maxFlow: 21, maxHead: 45, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 992800 },
  { model: "КНС 40-10", article: "СЗПК.КНС.ПЭ.40-10", diameter: 1500, height: 3400, flow: 40, head: 10, maxFlow: 52, maxHead: 15, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 998000 },
  { model: "КНС 25-30", article: "СЗПК.КНС.ПЭ.25-30", diameter: 1500, height: 3300, flow: 25, head: 30, maxFlow: 32, maxHead: 34, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1027000 },
  { model: "КНС 30-20", article: "СЗПК.КНС.ПЭ.30-20", diameter: 1500, height: 3400, flow: 30, head: 20, maxFlow: 38, maxHead: 29, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1046000 },
  { model: "КНС 30-25", article: "СЗПК.КНС.ПЭ.30-25", diameter: 1500, height: 3400, flow: 30, head: 25, maxFlow: 38, maxHead: 29, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1046000 },
  { model: "КНС 30-10", article: "СЗПК.КНС.ПЭ.30-10", diameter: 1500, height: 3400, flow: 30, head: 10, maxFlow: 40, maxHead: 15, pumpCount: 2, pumpPower: 2.2, material: "Полиэтилен", price: 1056000 },
  { model: "КНС 40-15", article: "СЗПК.КНС.ПЭ.40-15", diameter: 1500, height: 3400, flow: 40, head: 15, maxFlow: 50, maxHead: 19, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 1102000 },
  { model: "КНС 40-20", article: "СЗПК.КНС.ПЭ.40-20", diameter: 1500, height: 3400, flow: 40, head: 20, maxFlow: 50, maxHead: 25, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1102000 },
  { model: "КНС 25-35", article: "СЗПК.КНС.ПЭ.25-35", diameter: 1500, height: 3300, flow: 25, head: 35, maxFlow: 32, maxHead: 39, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1114000 },
  { model: "КНС 50-15", article: "СЗПК.КНС.ПЭ.50-15", diameter: 1500, height: 3700, flow: 50, head: 15, maxFlow: 55, maxHead: 30, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1130000 },
  { model: "КНС 50-10", article: "СЗПК.КНС.ПЭ.50-10", diameter: 1500, height: 3400, flow: 50, head: 10, maxFlow: 62, maxHead: 15, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 1137000 },
  { model: "КНС 60-10", article: "СЗПК.КНС.ПЭ.60-10", diameter: 2000, height: 3600, flow: 60, head: 10, maxFlow: 80, maxHead: 16, pumpCount: 2, pumpPower: 4.0, material: "Полиэтилен", price: 1474000 },
  { model: "КНС 70-10", article: "СЗПК.КНС.ПЭ.70-10", diameter: 2000, height: 3650, flow: 70, head: 10, maxFlow: 95, maxHead: 16, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1500000 },
  { model: "КНС 60-15", article: "СЗПК.КНС.ПЭ.60-15", diameter: 2000, height: 3700, flow: 60, head: 15, maxFlow: 80, maxHead: 22, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1521000 },
  { model: "КНС 70-15", article: "СЗПК.КНС.ПЭ.70-15", diameter: 2000, height: 3700, flow: 70, head: 15, maxFlow: 85, maxHead: 25, pumpCount: 2, pumpPower: 5.5, material: "Полиэтилен", price: 1521000 },
  { model: "КНС 80-10", article: "СЗПК.КНС.ПЭ.80-10", diameter: 2000, height: 3650, flow: 80, head: 10, maxFlow: 95, maxHead: 20, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1524000 },
  { model: "КНС 80-15", article: "СЗПК.КНС.ПЭ.80-15", diameter: 2000, height: 3650, flow: 80, head: 15, maxFlow: 95, maxHead: 20, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1524000 },
  { model: "КНС 50-25", article: "СЗПК.КНС.ПЭ.50-25", diameter: 2000, height: 3600, flow: 50, head: 25, maxFlow: 65, maxHead: 30, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1543000 },
  { model: "КНС 60-20", article: "СЗПК.КНС.ПЭ.60-20", diameter: 2000, height: 3550, flow: 60, head: 20, maxFlow: 85, maxHead: 28, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1566000 },
  { model: "КНС 50-20", article: "СЗПК.КНС.ПЭ.50-20", diameter: 2000, height: 3600, flow: 50, head: 20, maxFlow: 60, maxHead: 25, pumpCount: 2, pumpPower: 7.5, material: "Полиэтилен", price: 1604000 },
];
