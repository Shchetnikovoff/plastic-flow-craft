export interface SorbtsionnayaProduct {
  article: string;
  name: string;
  volume: number;      // м³
  diam: number;        // мм
  height: number;      // мм
  bottomType: string;
  material: string;
}

export const sorbtsionnyeProducts: SorbtsionnayaProduct[] = [
  { article: "СК-0,1-400 ПП", name: "Сорбционная колонна СК-0,1-400 ПП", volume: 0.1, diam: 400, height: 1000, bottomType: "Конусное", material: "PP-H" },
  { article: "СК-0,3-500 ПП", name: "Сорбционная колонна СК-0,3-500 ПП", volume: 0.3, diam: 500, height: 1500, bottomType: "Конусное", material: "PP-H" },
  { article: "СК-0,5-600 ПП", name: "Сорбционная колонна СК-0,5-600 ПП", volume: 0.5, diam: 600, height: 1800, bottomType: "Конусное", material: "PP-H" },
  { article: "СК-1,0-800 ПП", name: "Сорбционная колонна СК-1,0-800 ПП", volume: 1.0, diam: 800, height: 2200, bottomType: "Конусное", material: "PP-H" },
  { article: "СК-2,0-1000 ПП", name: "Сорбционная колонна СК-2,0-1000 ПП", volume: 2.0, diam: 1000, height: 2800, bottomType: "Конусное", material: "PP-H" },
  { article: "СК-3,0-1200 ПП", name: "Сорбционная колонна СК-3,0-1200 ПП", volume: 3.0, diam: 1200, height: 3000, bottomType: "Наклонное", material: "PP-H" },
  { article: "СК-5,0-1400 ПП", name: "Сорбционная колонна СК-5,0-1400 ПП", volume: 5.0, diam: 1400, height: 3500, bottomType: "Наклонное", material: "PP-H" },
  { article: "СК-8,0-1600 ПП", name: "Сорбционная колонна СК-8,0-1600 ПП", volume: 8.0, diam: 1600, height: 4200, bottomType: "Наклонное", material: "PP-H" },
  { article: "СК-10-1800 ПП", name: "Сорбционная колонна СК-10-1800 ПП", volume: 10.0, diam: 1800, height: 4500, bottomType: "Плоское", material: "PP-H" },
  { article: "СК-15-2000 ПП", name: "Сорбционная колонна СК-15-2000 ПП", volume: 15.0, diam: 2000, height: 5000, bottomType: "Плоское", material: "PP-H" },
  { article: "СК-20-2200 ПП", name: "Сорбционная колонна СК-20-2200 ПП", volume: 20.0, diam: 2200, height: 5500, bottomType: "Плоское", material: "PP-H" },
  { article: "СК-30-2500 ПП", name: "Сорбционная колонна СК-30-2500 ПП", volume: 30.0, diam: 2500, height: 6500, bottomType: "Плоское", material: "PP-H" },
];
