export interface FfuModel {
  name: string;
  capacity: string;
  power: string;
  dimensions: string;
  massDry: string;
  massWet: string;
}

export const ffuModels: FfuModel[] = [
  { name: "ФФУ-1К", capacity: "1", power: "2,3", dimensions: "1180×1100×1440", massDry: "0,25", massWet: "0,63" },
  { name: "ФФУ-2М", capacity: "2", power: "2,3", dimensions: "1450×1330×1720", massDry: "0,37", massWet: "1,0" },
  { name: "ФФУ-4М", capacity: "4", power: "4,2", dimensions: "1785×1530×1700", massDry: "0,65", massWet: "2,28" },
  { name: "ФФУ-6М", capacity: "6", power: "3,5", dimensions: "2200×1785×1760", massDry: "0,94", massWet: "3,86" },
  { name: "ФФУ-10", capacity: "10", power: "5,9", dimensions: "2620×1850×2300", massDry: "1,85", massWet: "7,0" },
  { name: "ФФУ-15", capacity: "15", power: "7,9", dimensions: "3440×2220×2260", massDry: "2,66", massWet: "10,5" },
  { name: "ФФУ-20", capacity: "20", power: "7,9", dimensions: "3840×2220×2350", massDry: "2,95", massWet: "12,9" },
  { name: "ФФУ-30", capacity: "30", power: "15,8", dimensions: "5600×2400×2470", massDry: "3,89", massWet: "17,64" },
  { name: "ФФУ-40", capacity: "40", power: "15,8", dimensions: "6750×2400×2470", massDry: "4,0", massWet: "23,0" },
  { name: "ФФУ-50", capacity: "50", power: "19", dimensions: "7430×2400×2530", massDry: "4,7", massWet: "23,0" },
  { name: "ФФУ-65", capacity: "65", power: "18,5", dimensions: "6500×4700×3000", massDry: "8,5", massWet: "36,0" },
  { name: "ФФУ-80", capacity: "80", power: "31,5", dimensions: "7200×5200×2500", massDry: "9,6", massWet: "42,6" },
  { name: "ФФУ-100", capacity: "100", power: "42", dimensions: "9600×5600×2585", massDry: "12,2", massWet: "45,6" },
];
