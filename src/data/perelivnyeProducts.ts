export interface PerelivnayaProduct {
  article: string;
  poolVolume: number;
  length: number;
  width: number;
  height: number;
  label: string;
}

export const perelivnyeProducts: PerelivnayaProduct[] = [
  { article: "ПЕ-PP-15", poolVolume: 15, length: 1500, width: 1000, height: 1500, label: "до 15 м³" },
  { article: "ПЕ-PP-30", poolVolume: 30, length: 2500, width: 1000, height: 1500, label: "до 30 м³" },
  { article: "ПЕ-PP-50", poolVolume: 50, length: 3000, width: 1500, height: 1500, label: "до 50 м³" },
  { article: "ПЕ-PP-70", poolVolume: 70, length: 3000, width: 2000, height: 1500, label: "до 70 м³" },
  { article: "ПЕ-PP-90", poolVolume: 90, length: 3000, width: 2500, height: 1500, label: "до 90 м³" },
  { article: "ПЕ-PP-110", poolVolume: 110, length: 4000, width: 2500, height: 1500, label: "до 110 м³" },
  { article: "ПЕ-PP-150", poolVolume: 150, length: 5000, width: 2500, height: 1500, label: "до 150 м³" },
  { article: "ПЕ-PP-200", poolVolume: 200, length: 6000, width: 3000, height: 1500, label: "до 200 м³" },
  { article: "ПЕ-PP-250", poolVolume: 250, length: 6000, width: 4000, height: 1500, label: "до 250 м³" },
  { article: "ПЕ-PP-300", poolVolume: 300, length: 7000, width: 4000, height: 1500, label: "до 300 м³" },
];
