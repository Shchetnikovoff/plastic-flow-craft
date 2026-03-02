

## Plan: Add color swatches to material color cards

Add visual color circles/squares next to each color name in the "Доступные цвета" section, mapping RAL codes to hex values.

### Changes

**`src/data/products.ts`**
- Add `hex` field to `MaterialColor` interface
- Add hex values to all color entries:
  - Серый RAL 7032 → `#B8B799`
  - Натуральный RAL 9003 → `#F4F8F4`
  - Голубой RAL 5012 → `#3B83BD`
  - Чёрный → `#1C1C1C`

**`src/pages/Index.tsx`**
- In the color cards grid, add a colored circle (`w-5 h-5 rounded-full border`) before the color name, using `c.hex` as `backgroundColor`.

