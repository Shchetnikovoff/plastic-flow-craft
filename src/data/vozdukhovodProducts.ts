import { materials, materialSpecs } from "./products";

export interface VozdukhovodSize {
  diameter: number;
  wallThickness: number;
  availableLengths: number[];
  socketThickness: number;
  article: string;
}

export const vozdukhovodBaseSizes = [
  { diameter: 100, wallThickness: 2, socketThickness: 2 },
  { diameter: 125, wallThickness: 2, socketThickness: 2 },
  { diameter: 160, wallThickness: 2, socketThickness: 2 },
  { diameter: 180, wallThickness: 2, socketThickness: 2 },
  { diameter: 200, wallThickness: 3, socketThickness: 3 },
  { diameter: 225, wallThickness: 3, socketThickness: 3 },
  { diameter: 250, wallThickness: 3, socketThickness: 3 },
  { diameter: 280, wallThickness: 3, socketThickness: 3 },
  { diameter: 315, wallThickness: 3, socketThickness: 3 },
  { diameter: 355, wallThickness: 3, socketThickness: 3 },
  { diameter: 400, wallThickness: 3, socketThickness: 3 },
  { diameter: 450, wallThickness: 3, socketThickness: 3 },
  { diameter: 500, wallThickness: 5, socketThickness: 3 },
  { diameter: 560, wallThickness: 5, socketThickness: 5 },
  { diameter: 600, wallThickness: 5, socketThickness: 5 },
  { diameter: 630, wallThickness: 5, socketThickness: 5 },
  { diameter: 700, wallThickness: 5, socketThickness: 5 },
  { diameter: 710, wallThickness: 8, socketThickness: 8 },
  { diameter: 800, wallThickness: 8, socketThickness: 8 },
  { diameter: 900, wallThickness: 10, socketThickness: 10 },
  { diameter: 1000, wallThickness: 10, socketThickness: 10 },
  { diameter: 1200, wallThickness: 10, socketThickness: 10 },
];

export const vozdukhovodAvailableLengths = [500, 1000, 1500, 2000];

export const vozdukhovodImages = [
  "/images/vozdukhovod-2.png",
  "/images/vozdukhovod-3.png",
  "/images/vozdukhovod-4.png",
  "/images/vozdukhovod-5.png",
];

export const vozdukhovodSchemaImage = "/images/vozdukhovod-schema.png";

export function getVozdukhovodSizes(materialName: string, colorCode: string): VozdukhovodSize[] {
  const mat = materials.find((m) => m.name === materialName);
  if (!mat) return [];
  const specs = materialSpecs[materialName];
  const hasMultipleColors = specs && specs.colors.length > 1;

  return vozdukhovodBaseSizes.map((item) => ({
    diameter: item.diameter,
    wallThickness: item.wallThickness,
    availableLengths: vozdukhovodAvailableLengths,
    socketThickness: item.socketThickness,
    article: hasMultipleColors
      ? `СЗПК.ВК.${mat.code}.${colorCode}.${item.diameter}`
      : `СЗПК.ВК.${mat.code}.${item.diameter}`,
  }));
}
