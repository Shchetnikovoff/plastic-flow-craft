export interface KnsPpProduct {
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

export const knsPpProducts: KnsPpProduct[] = [
  { model: "КНС-ПП 10-5", article: "КНС-ПП-10-5", diameter: 1300, height: 2700, flow: 10, head: 5, maxFlow: 16, maxHead: 10, pumpCount: 2, pumpPower: 0.55, material: "Полипропилен", price: 578500 },
  { model: "КНС-ПП 10-10", article: "КНС-ПП-10-10", diameter: 1300, height: 2700, flow: 10, head: 10, maxFlow: 20, maxHead: 14, pumpCount: 2, pumpPower: 0.75, material: "Полипропилен", price: 578500 },
  { model: "КНС-ПП 10-15", article: "КНС-ПП-10-15", diameter: 1300, height: 2900, flow: 10, head: 15, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "Полипропилен", price: 612000 },
  { model: "КНС-ПП 15-10", article: "КНС-ПП-15-10", diameter: 1300, height: 2900, flow: 15, head: 10, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "Полипропилен", price: 612000 },
  { model: "КНС-ПП 15-15", article: "КНС-ПП-15-15", diameter: 1300, height: 2900, flow: 15, head: 15, maxFlow: 26, maxHead: 21, pumpCount: 2, pumpPower: 1.5, material: "Полипропилен", price: 627000 },
  { model: "КНС-ПП 20-10", article: "КНС-ПП-20-10", diameter: 1300, height: 2900, flow: 20, head: 10, maxFlow: 30, maxHead: 16, pumpCount: 2, pumpPower: 2.2, material: "Полипропилен", price: 636000 },
  { model: "КНС-ПП 20-15", article: "КНС-ПП-20-15", diameter: 1300, height: 2900, flow: 20, head: 15, maxFlow: 30, maxHead: 18, pumpCount: 2, pumpPower: 2.2, material: "Полипропилен", price: 636000 },
  { model: "КНС-ПП 10-20", article: "КНС-ПП-10-20", diameter: 1300, height: 2900, flow: 10, head: 20, maxFlow: 20, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "Полипропилен", price: 643000 },
  { model: "КНС-ПП 15-20", article: "КНС-ПП-15-20", diameter: 1300, height: 2900, flow: 15, head: 20, maxFlow: 21, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "Полипропилен", price: 643000 },
  { model: "КНС-ПП 15-25", article: "КНС-ПП-15-25", diameter: 1500, height: 3000, flow: 15, head: 25, maxFlow: 21, maxHead: 30, pumpCount: 2, pumpPower: 3.0, material: "Полипропилен", price: 756000 },
  { model: "КНС-ПП 20-20", article: "КНС-ПП-20-20", diameter: 1500, height: 2800, flow: 20, head: 20, maxFlow: 30, maxHead: 25, pumpCount: 2, pumpPower: 3.0, material: "Полипропилен", price: 768000 },
  { model: "КНС-ПП 20-25", article: "КНС-ПП-20-25", diameter: 1500, height: 3200, flow: 20, head: 25, maxFlow: 30, maxHead: 30, pumpCount: 2, pumpPower: 4.0, material: "Полипропилен", price: 779000 },
];
