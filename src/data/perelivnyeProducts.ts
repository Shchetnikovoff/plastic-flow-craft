export interface PpColor {
  code: string;
  name: string;
  hex: string;
  ral: string;
  application: string;
}

export const ppColors: PpColor[] = [
  { code: "7032", name: "Серый", hex: "#b5b0a1", ral: "RAL 7032", application: "внутри помещения" },
  { code: "5012", name: "Голубой", hex: "#0089bf", ral: "RAL 5012", application: "улица, УФ-защита" },
];

export interface PerelivnayaProduct {
  article: string;
  poolVolume: number;
  length: number;
  width: number;
  height: number;
  label: string;
  colorCode: string;
  colorName: string;
}

interface BaseSize {
  poolVolume: number;
  length: number;
  width: number;
  height: number;
  label: string;
}

const baseSizes: BaseSize[] = [
  { poolVolume: 15, length: 1500, width: 1000, height: 1500, label: "до 15 м³" },
  { poolVolume: 30, length: 2500, width: 1000, height: 1500, label: "до 30 м³" },
  { poolVolume: 50, length: 3000, width: 1500, height: 1500, label: "до 50 м³" },
  { poolVolume: 70, length: 3000, width: 2000, height: 1500, label: "до 70 м³" },
  { poolVolume: 90, length: 3000, width: 2500, height: 1500, label: "до 90 м³" },
  { poolVolume: 110, length: 4000, width: 2500, height: 1500, label: "до 110 м³" },
  { poolVolume: 150, length: 5000, width: 2500, height: 1500, label: "до 150 м³" },
  { poolVolume: 200, length: 6000, width: 3000, height: 1500, label: "до 200 м³" },
  { poolVolume: 250, length: 6000, width: 4000, height: 1500, label: "до 250 м³" },
  { poolVolume: 300, length: 7000, width: 4000, height: 1500, label: "до 300 м³" },
];

export const perelivnyeProducts: PerelivnayaProduct[] = baseSizes.flatMap((s) =>
  ppColors.map((c) => ({
    article: `ПЕ-PP-${c.code}-${s.poolVolume}`,
    poolVolume: s.poolVolume,
    length: s.length,
    width: s.width,
    height: s.height,
    label: s.label,
    colorCode: c.code,
    colorName: c.name,
  }))
);
