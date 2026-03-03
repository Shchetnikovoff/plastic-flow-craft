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

export function getRazdvizhnoySizes(materialName: string, colorCode: string): RazdvizhnoySize[] {
  const mat = materials.find((m) => m.name === materialName);
  if (!mat) return [];
  const specs = materialSpecs[materialName];
  const hasMultipleColors = specs && specs.colors.length > 1;

  return baseSizes.map((item) => ({
    diameter: item.diameter,
    wallThickness: item.wallThickness,
    lMin: 1000,
    lMax: 1800,
    socket: item.socketThickness,
    article: hasMultipleColors
      ? `РЭ-${mat.code}-${colorCode}-${item.diameter}`
      : `РЭ-${mat.code}-${item.diameter}`,
  }));
}
