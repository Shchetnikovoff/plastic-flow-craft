

## Plan: Add Material & Color Calculator to Rectangular Tanks Page

### What changes

**New component: `src/components/configurator/RectangularTankCalculator.tsx`**

A dedicated calculator similar to `TankCalculator` but adapted for rectangular tanks:
- Volume slider (1,000–50,000 l) snapping to available volumes from `pryamougolnyeProducts`
- Material selector (PPC, PE100, PPH, PPs) using existing `materials`/`materialSpecs` from `src/data/products.ts`
- Color selector with swatches (grey RAL 7032, blue RAL 5012, white RAL 9003, black PE100)
- Image preview with color overlay (using `mixBlendMode: 'multiply'` tint approach since no separate rectangular tank color renders exist — base image from existing PP photos)
- Article breakdown showing: `СЗПК.ЕПО.{matCode}.{colorCode}.{volume}`
- Result card with dimensions (L×W×H) and "Перейти к товару" link
- No "tank type" selector (rectangular tanks have one shape)

**File: `src/pages/EmkostiPryamougolnye.tsx`**

- Import `RectangularTankCalculator`
- Add the calculator right after the nav section (line 219), before the "Типоразмерный ряд" table
- Add "Калькулятор" to the nav anchors

### Technical detail

The calculator uses `pryamougolnyeProducts` data for volume/dimension matching. Color tinting uses a semi-transparent overlay div with `mixBlendMode: 'multiply'` and the color's hex value over the base product image (`/images/emkost-pryam-pp-1.png`). For white, uses `screen` blend mode with lower opacity. For grey (default RAL 7032), no overlay. For black (PE100), higher opacity.

