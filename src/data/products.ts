export type ConnectionType = "rastrub" | "flanec";

export interface ConnectionInfo {
  id: ConnectionType;
  name: string;
  articlePrefix: string;
}

export const connectionTypes: ConnectionInfo[] = [
  { id: "rastrub", name: "Раструб", articlePrefix: "ОТВ" },
  { id: "flanec", name: "Фланец", articlePrefix: "ОТВФ" },
];

export interface ProductSize {
  diameter: number;
  wallThickness: number;
  availableLength: number | null;
  socketThickness: number;
  article: string;
}

export interface MaterialInfo {
  name: string;
  code: string;
}

export const materials: MaterialInfo[] = [
  { name: "Листовой полипропилен блок-сополимер (PPC)", code: "PPC" },
  { name: "Листовой полиэтилен (PE 100)", code: "PE100" },
  { name: "Листовой полипропилен гомополимер (PPH)", code: "PPH" },
  { name: "Листовой полипропилен, не распространяющий горение (PPs)", code: "PPs" },
];

const baseSizes = [
  { diameter: 200, wallThickness: 3, availableLength: 200, socketThickness: 3 },
  { diameter: 225, wallThickness: 3, availableLength: 225, socketThickness: 3 },
  { diameter: 250, wallThickness: 3, availableLength: 250, socketThickness: 3 },
  { diameter: 280, wallThickness: 3, availableLength: 280, socketThickness: 3 },
  { diameter: 315, wallThickness: 3, availableLength: 315, socketThickness: 3 },
  { diameter: 355, wallThickness: 3, availableLength: 355, socketThickness: 3 },
  { diameter: 400, wallThickness: 3, availableLength: 400, socketThickness: 3 },
  { diameter: 450, wallThickness: 3, availableLength: 450, socketThickness: 3 },
  { diameter: 500, wallThickness: 5, availableLength: 500, socketThickness: 5 },
  { diameter: 560, wallThickness: 5, availableLength: 560, socketThickness: 5 },
  { diameter: 600, wallThickness: 5, availableLength: 600, socketThickness: 5 },
  { diameter: 630, wallThickness: 5, availableLength: 630, socketThickness: 5 },
  { diameter: 700, wallThickness: 5, availableLength: 700, socketThickness: 5 },
  { diameter: 710, wallThickness: 8, availableLength: 710, socketThickness: 8 },
  { diameter: 800, wallThickness: 8, availableLength: 800, socketThickness: 8 },
  { diameter: 900, wallThickness: 10, availableLength: 900, socketThickness: 10 },
  { diameter: 1000, wallThickness: 10, availableLength: 1000, socketThickness: 10 },
  { diameter: 1200, wallThickness: 10, availableLength: 1200, socketThickness: 10 },
];

export const productSizesByMaterial: Record<string, ProductSize[]> = Object.fromEntries(
  materials.map((mat) => [
    mat.name,
    baseSizes.map((item) => ({
      ...item,
      article: `ОТВ-90-${mat.code}-${item.diameter}`,
    })),
  ])
);

// Generate sizes with color code in article for multi-color materials
export function getSizesForColor(materialName: string, colorCode: string, connectionType: ConnectionType = "rastrub"): ProductSize[] {
  const mat = materials.find((m) => m.name === materialName);
  if (!mat) return [];
  const specs = materialSpecs[materialName];
  const hasMultipleColors = specs && specs.colors.length > 1;
  const conn = connectionTypes.find((c) => c.id === connectionType);
  const prefix = conn?.articlePrefix || "ОТВ";
  return baseSizes.map((item) => ({
    ...item,
    article: hasMultipleColors
      ? `${prefix}-90-${mat.code}-${colorCode}-${item.diameter}`
      : `${prefix}-90-${mat.code}-${item.diameter}`,
  }));
}

// Keep backward compat
export const productSizes = productSizesByMaterial[materials[0].name];

export interface MaterialColor {
  name: string;
  ral: string;
  hex: string;
  colorCode: string;
  application: string;
}

export interface MaterialSpecs {
  workingTemp: string;
  chemicalResistance: string;
  colors: MaterialColor[];
}

export const materialSpecs: Record<string, MaterialSpecs> = {
  "Листовой полипропилен блок-сополимер (PPC)": {
    workingTemp: "от −10 до +100 °C",
    chemicalResistance: "кислоты, щёлочи, соли",
    colors: [
      { name: "Серый", ral: "RAL 7032", hex: "#B8B799", colorCode: "7032", application: "внутри помещения" },
      { name: "Натуральный", ral: "RAL 9003", hex: "#F4F8F4", colorCode: "9003", application: "внутри помещения" },
      { name: "Голубой", ral: "RAL 5012", hex: "#3B83BD", colorCode: "5012", application: "улица, УФ-защита" },
    ],
  },
  "Листовой полиэтилен (PE 100)": {
    workingTemp: "от −60 до +80 °C",
    chemicalResistance: "кислоты, щёлочи, солевые растворы, спирты",
    colors: [
      { name: "Чёрный", ral: "—", hex: "#1C1C1C", colorCode: "", application: "улица и помещение, морозостоек" },
    ],
  },
  "Листовой полипропилен гомополимер (PPH)": {
    workingTemp: "от −5 до +100 °C (хрупкость ниже −15 °C, не для холодного климата)",
    chemicalResistance: "кислоты, щёлочи, соли",
    colors: [
      { name: "Серый", ral: "RAL 7032", hex: "#B8B799", colorCode: "7032", application: "внутри помещения" },
    ],
  },
  "Листовой полипропилен, не распространяющий горение (PPs)": {
    workingTemp: "от 0 до +100 °C",
    chemicalResistance: "кислоты, щёлочи, соли",
    colors: [
      { name: "Серый", ral: "RAL 7032", hex: "#B8B799", colorCode: "7032", application: "внутри помещения" },
    ],
  },
};

export const productImages = [
  "/images/product-1.png",
  "/images/product-2.png",
  "/images/product-3.png",
  "/images/product-4.png",
  "/images/product-5.png",
];
