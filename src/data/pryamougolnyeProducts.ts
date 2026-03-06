export interface PryamougolnyeProduct {
  volume: number; // litres
  dimensions: string; // ДхШхВ мм
  length: number;
  width: number;
  height: number;
}

export const pryamougolnyeProducts: PryamougolnyeProduct[] = [
  { volume: 1000, dimensions: "1000×1000×1000", length: 1000, width: 1000, height: 1000 },
  { volume: 2000, dimensions: "2000×1000×1000", length: 2000, width: 1000, height: 1000 },
  { volume: 3000, dimensions: "2100×1200×1200", length: 2100, width: 1200, height: 1200 },
  { volume: 4000, dimensions: "1800×1500×1500", length: 1800, width: 1500, height: 1500 },
  { volume: 5000, dimensions: "2300×1500×1500", length: 2300, width: 1500, height: 1500 },
  { volume: 6000, dimensions: "2700×1500×1500", length: 2700, width: 1500, height: 1500 },
  { volume: 8000, dimensions: "3600×1500×1500", length: 3600, width: 1500, height: 1500 },
  { volume: 10000, dimensions: "4500×1500×1500", length: 4500, width: 1500, height: 1500 },
  { volume: 15000, dimensions: "4700×1800×1800", length: 4700, width: 1800, height: 1800 },
  { volume: 20000, dimensions: "5000×2000×2000", length: 5000, width: 2000, height: 2000 },
  { volume: 25000, dimensions: "6300×2000×2000", length: 6300, width: 2000, height: 2000 },
  { volume: 30000, dimensions: "6000×2250×2250", length: 6000, width: 2250, height: 2250 },
  { volume: 35000, dimensions: "7300×2400×2000", length: 7300, width: 2400, height: 2000 },
  { volume: 40000, dimensions: "8400×2400×2000", length: 8400, width: 2400, height: 2000 },
  { volume: 45000, dimensions: "9400×2400×2000", length: 9400, width: 2400, height: 2000 },
  { volume: 50000, dimensions: "10500×2400×2000", length: 10500, width: 2400, height: 2000 },
];
