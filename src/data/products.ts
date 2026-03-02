export interface ProductSize {
  diameter: number;
  wallThickness: number;
  availableLength: number | null;
  socketThickness: number;
  article: string;
}

export const productSizes: ProductSize[] = [
  { diameter: 100, wallThickness: 2, availableLength: null, socketThickness: 2 },
  { diameter: 125, wallThickness: 2, availableLength: null, socketThickness: 2 },
  { diameter: 160, wallThickness: 2, availableLength: null, socketThickness: 2 },
  { diameter: 180, wallThickness: 2, availableLength: null, socketThickness: 2 },
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
].map((item) => ({
  ...item,
  article: `ОТВ-90-PPC-${item.diameter}`,
}));

export const productImages = [
  "/images/product-1.png",
  "/images/product-2.png",
  "/images/product-3.png",
  "/images/product-4.png",
  "/images/product-5.png",
];
