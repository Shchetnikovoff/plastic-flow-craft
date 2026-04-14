export interface VyshchelachProduct {
  article: string;
  name: string;
  volume: number;      // м³
  diam: number;        // мм
  height: number;      // мм
  mixerType: string;
  heatingType: string;
  material: string;
}

export const vyshchelachProducts: VyshchelachProduct[] = [
  { article: "УВ-1,0-1000 ПП", name: "Установка выщелачивания УВ-1,0-1000 ПП", volume: 1.0, diam: 1000, height: 1500, mixerType: "Пропеллерная", heatingType: "Рубашка", material: "PP-H" },
  { article: "УВ-2,0-1200 ПП", name: "Установка выщелачивания УВ-2,0-1200 ПП", volume: 2.0, diam: 1200, height: 1800, mixerType: "Пропеллерная", heatingType: "Рубашка", material: "PP-H" },
  { article: "УВ-3,0-1400 ПП", name: "Установка выщелачивания УВ-3,0-1400 ПП", volume: 3.0, diam: 1400, height: 2000, mixerType: "Пропеллерная", heatingType: "Рубашка", material: "PP-H" },
  { article: "УВ-5,0-1600 ПП", name: "Установка выщелачивания УВ-5,0-1600 ПП", volume: 5.0, diam: 1600, height: 2500, mixerType: "Лопастная", heatingType: "Рубашка + змеевик", material: "PP-H" },
  { article: "УВ-8,0-1800 ПП", name: "Установка выщелачивания УВ-8,0-1800 ПП", volume: 8.0, diam: 1800, height: 3200, mixerType: "Лопастная", heatingType: "Рубашка + змеевик", material: "PP-H" },
  { article: "УВ-10-2000 ПП", name: "Установка выщелачивания УВ-10-2000 ПП", volume: 10.0, diam: 2000, height: 3500, mixerType: "Рамная", heatingType: "Рубашка + змеевик", material: "PP-H" },
  { article: "УВ-15-2200 ПП", name: "Установка выщелачивания УВ-15-2200 ПП", volume: 15.0, diam: 2200, height: 4000, mixerType: "Рамная", heatingType: "Рубашка + змеевик", material: "PP-H" },
  { article: "УВ-20-2500 ПП", name: "Установка выщелачивания УВ-20-2500 ПП", volume: 20.0, diam: 2500, height: 4200, mixerType: "Рамная", heatingType: "Паровой нагрев", material: "PP-H" },
  { article: "УВ-30-2800 ПП", name: "Установка выщелачивания УВ-30-2800 ПП", volume: 30.0, diam: 2800, height: 5000, mixerType: "Рамная", heatingType: "Паровой нагрев", material: "PP-H" },
  { article: "УВ-50-3200 ПП", name: "Установка выщелачивания УВ-50-3200 ПП", volume: 50.0, diam: 3200, height: 6500, mixerType: "Рамная", heatingType: "Паровой нагрев", material: "PP-H" },
];
