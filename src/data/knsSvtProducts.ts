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
  { model: "КНС 10-5", article: "КНС-SVT-10-5", diameter: 1300, height: 2700, flow: 10, head: 5, maxFlow: 16, maxHead: 10, pumpCount: 2, pumpPower: 0.55, material: "SVT (стеклопластик)", price: 638500 },
  { model: "КНС 10-10", article: "КНС-SVT-10-10", diameter: 1300, height: 2700, flow: 10, head: 10, maxFlow: 20, maxHead: 14, pumpCount: 2, pumpPower: 0.75, material: "SVT (стеклопластик)", price: 638500 },
  { model: "КНС 10-15", article: "КНС-SVT-10-15", diameter: 1300, height: 2900, flow: 10, head: 15, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "SVT (стеклопластик)", price: 676500 },
  { model: "КНС 15-10", article: "КНС-SVT-15-10", diameter: 1300, height: 2900, flow: 15, head: 10, maxFlow: 24, maxHead: 19, pumpCount: 2, pumpPower: 1.1, material: "SVT (стеклопластик)", price: 676500 },
  { model: "КНС 15-15", article: "КНС-SVT-15-15", diameter: 1300, height: 2900, flow: 15, head: 15, maxFlow: 26, maxHead: 21, pumpCount: 2, pumpPower: 1.5, material: "SVT (стеклопластик)", price: 693000 },
  { model: "КНС 20-10", article: "КНС-SVT-20-10", diameter: 1300, height: 2900, flow: 20, head: 10, maxFlow: 30, maxHead: 16, pumpCount: 2, pumpPower: 2.2, material: "SVT (стеклопластик)", price: 703000 },
  { model: "КНС 20-15", article: "КНС-SVT-20-15", diameter: 1300, height: 2900, flow: 20, head: 15, maxFlow: 30, maxHead: 18, pumpCount: 2, pumpPower: 2.2, material: "SVT (стеклопластик)", price: 703000 },
  { model: "КНС 10-20", article: "КНС-SVT-10-20", diameter: 1300, height: 2900, flow: 10, head: 20, maxFlow: 20, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "SVT (стеклопластик)", price: 711000 },
  { model: "КНС 15-20", article: "КНС-SVT-15-20", diameter: 1300, height: 2900, flow: 15, head: 20, maxFlow: 21, maxHead: 25, pumpCount: 2, pumpPower: 2.2, material: "SVT (стеклопластик)", price: 711000 },
  { model: "КНС 15-25", article: "КНС-SVT-15-25", diameter: 1500, height: 3000, flow: 15, head: 25, maxFlow: 21, maxHead: 30, pumpCount: 2, pumpPower: 3.0, material: "SVT (стеклопластик)", price: 834000 },
  { model: "КНС 20-20", article: "КНС-SVT-20-20", diameter: 1500, height: 2800, flow: 20, head: 20, maxFlow: 30, maxHead: 25, pumpCount: 2, pumpPower: 3.0, material: "SVT (стеклопластик)", price: 846000 },
  { model: "КНС 20-25", article: "КНС-SVT-20-25", diameter: 1500, height: 3200, flow: 20, head: 25, maxFlow: 30, maxHead: 30, pumpCount: 2, pumpPower: 4.0, material: "SVT (стеклопластик)", price: 859000 },
];
