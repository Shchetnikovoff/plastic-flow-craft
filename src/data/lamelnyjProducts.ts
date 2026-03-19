export interface LamelnyjModel {
  name: string;
  capacity: string;
  dimensions: string;
  mass: string;
}

export const lamelnyjModels: LamelnyjModel[] = [
  { name: "ЛО-ПП-1", capacity: "1", dimensions: "1577×606×1715", mass: "170/670" },
  { name: "ЛО-ПП-2.5", capacity: "2.5", dimensions: "1720×1088×1715", mass: "360/1850" },
  { name: "ЛО-ПП-5", capacity: "5", dimensions: "2285×1088×2400", mass: "855/3410" },
  { name: "ЛО-ПП-10", capacity: "10", dimensions: "2295×2088×2400", mass: "1400/6800" },
  { name: "ЛО-ПП-15", capacity: "15", dimensions: "2780×2088×2400", mass: "1800/9900" },
  { name: "ЛО-ПП-20", capacity: "20", dimensions: "3790×2088×2400", mass: "2100/12900" },
  { name: "ЛО-ПП-25", capacity: "25", dimensions: "4260×2088×2400", mass: "2180/16000" },
  { name: "ЛО-ПП-32.5", capacity: "32.5", dimensions: "4700×2088×2400", mass: "2400/20100" },
  { name: "ЛО-ПП-40", capacity: "40", dimensions: "6500×2088×2400", mass: "3660/25700" },
  { name: "ЛО-ПП-50", capacity: "50", dimensions: "8620×2088×2400", mass: "4360/32000" },
  { name: "ЛО-ПП-65", capacity: "65", dimensions: "9600×2088×2400", mass: "4880/41000" },
  { name: "ЛО-ПП-80", capacity: "80", dimensions: "13200×2088×2400", mass: "7400/51500" },
  { name: "ЛО-ПП-100", capacity: "100", dimensions: "8620×4380×2400", mass: "8600/65000" },
];

/** Parse a lamella article like ЛО-ПП-5 into segments for ArticleBreakdown */
export function parseLamelnyjArticle(article: string) {
  const parts = article.split("-");
  if (parts.length < 3 || parts[0] !== "ЛО") return null;

  const materialCode = parts[1]; // ПП
  const capacity = parts.slice(2).join("-"); // 5 or 32.5

  const materialMap: Record<string, string> = {
    "ПП": "Полипропилен",
    "ПВХ": "Поливинилхлорид",
    "СП": "Стеклопластик",
  };

  return {
    type: "ЛО",
    typeDesc: "Ламельный отстойник",
    materialCode,
    materialName: materialMap[materialCode] || materialCode,
    capacity,
  };
}
