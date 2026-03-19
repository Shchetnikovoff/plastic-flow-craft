export interface LamelnyjModel {
  name: string;
  article: string;
  capacity: string;
  dimensions: string;
  mass: string;
}

function padCapacity(cap: string): string {
  return cap.replace(".", "-");
}

export const lamelnyjModels: LamelnyjModel[] = [
  { name: "ЛО-ПП-1", article: "СЗПК.ЛО.01.ПП", capacity: "1", dimensions: "1577×606×1715", mass: "170/670" },
  { name: "ЛО-ПП-2.5", article: "СЗПК.ЛО.2-5.ПП", capacity: "2.5", dimensions: "1720×1088×1715", mass: "360/1850" },
  { name: "ЛО-ПП-5", article: "СЗПК.ЛО.05.ПП", capacity: "5", dimensions: "2285×1088×2400", mass: "855/3410" },
  { name: "ЛО-ПП-10", article: "СЗПК.ЛО.10.ПП", capacity: "10", dimensions: "2295×2088×2400", mass: "1400/6800" },
  { name: "ЛО-ПП-15", article: "СЗПК.ЛО.15.ПП", capacity: "15", dimensions: "2780×2088×2400", mass: "1800/9900" },
  { name: "ЛО-ПП-20", article: "СЗПК.ЛО.20.ПП", capacity: "20", dimensions: "3790×2088×2400", mass: "2100/12900" },
  { name: "ЛО-ПП-25", article: "СЗПК.ЛО.25.ПП", capacity: "25", dimensions: "4260×2088×2400", mass: "2180/16000" },
  { name: "ЛО-ПП-32.5", article: "СЗПК.ЛО.32-5.ПП", capacity: "32.5", dimensions: "4700×2088×2400", mass: "2400/20100" },
  { name: "ЛО-ПП-40", article: "СЗПК.ЛО.40.ПП", capacity: "40", dimensions: "6500×2088×2400", mass: "3660/25700" },
  { name: "ЛО-ПП-50", article: "СЗПК.ЛО.50.ПП", capacity: "50", dimensions: "8620×2088×2400", mass: "4360/32000" },
  { name: "ЛО-ПП-65", article: "СЗПК.ЛО.65.ПП", capacity: "65", dimensions: "9600×2088×2400", mass: "4880/41000" },
  { name: "ЛО-ПП-80", article: "СЗПК.ЛО.80.ПП", capacity: "80", dimensions: "13200×2088×2400", mass: "7400/51500" },
  { name: "ЛО-ПП-100", article: "СЗПК.ЛО.100.ПП", capacity: "100", dimensions: "8620×4380×2400", mass: "8600/65000" },
];

/** Parse a lamella article like СЗПК.ЛО.01.ПП into segments for ArticleBreakdown */
export function parseLamelnyjArticle(article: string) {
  if (!article.startsWith("СЗПК.ЛО.")) return null;
  const parts = article.split(".");
  // СЗПК.ЛО.{capacity}.{material}
  if (parts.length < 4) return null;

  const capacityCode = parts[2]; // "01", "2-5", "32-5"
  const materialCode = parts[3]; // "ПП"

  const materialMap: Record<string, string> = {
    "ПП": "Полипропилен",
    "ПВХ": "Поливинилхлорид",
    "СП": "Стеклопластик",
  };

  // Find the model to get the real capacity
  const model = lamelnyjModels.find((m) => m.article === article);
  const capacity = model?.capacity || capacityCode.replace("-", ".");

  return {
    type: "ЛО",
    typeDesc: "Ламельный отстойник",
    materialCode,
    materialName: materialMap[materialCode] || materialCode,
    capacity,
    capacityCode,
  };
}
