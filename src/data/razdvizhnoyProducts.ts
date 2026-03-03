import { materials, materialSpecs, baseSizes } from "./products";

export interface RazdvizhnoySize {
  diameter: number;
  wallThickness: number;
  lMin: number;
  lMax: number;
  socket: number;
  article: string;
}

export const razdvizhnoyImages = [
  "/images/razdvizhnoy-1.png",
  "/images/razdvizhnoy-2.png",
  "/images/razdvizhnoy-3.png",
  "/images/razdvizhnoy-4.png",
  "/images/razdvizhnoy-5.png",
];

export const razdvizhnoyFlanecImages = [
  "/images/razdvizhnoy-flanec-1.png",
  "/images/razdvizhnoy-flanec-2.png",
  "/images/razdvizhnoy-flanec-3.png",
  "/images/razdvizhnoy-flanec-4.png",
  "/images/razdvizhnoy-flanec-5.png",
];

export function getRazdvizhnoySizes(materialName: string, colorCode: string, connectionType: "rastrub" | "flanec" = "rastrub"): RazdvizhnoySize[] {
  const mat = materials.find((m) => m.name === materialName);
  if (!mat) return [];
  const specs = materialSpecs[materialName];
  const hasMultipleColors = specs && specs.colors.length > 1;
  const prefix = connectionType === "flanec" ? "РЭ-Ф" : "РЭ";

  return baseSizes.map((item) => ({
    diameter: item.diameter,
    wallThickness: item.wallThickness,
    lMin: 1000,
    lMax: 1800,
    socket: item.socketThickness,
    article: hasMultipleColors
      ? `${prefix}-${mat.code}-${colorCode}-${item.diameter}`
      : `${prefix}-${mat.code}-${item.diameter}`,
  }));
}
