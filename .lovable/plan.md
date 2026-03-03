

## Plan: Add РЭ (Раздвижной элемент) support to /product/:article

### Changes in `src/pages/Product.tsx`

**1. Add imports**
- Import `razdvizhnoyImages` and `getRazdvizhnoySizes` from `@/data/razdvizhnoyProducts`

**2. Add РЭ parsing block in `parseArticle()` (before the elbow parser)**
- Format: `РЭ-MATERIAL[-COLOR]-DIAMETER`
- Extract material, optional color, diameter
- Look up size from `getRazdvizhnoySizes` to get `lMin`, `lMax`, `wallThickness`, `socket`
- Return with `productType: "razdvizhnoy"`, `connectionType: "rastrub"`, plus a new `razdvizhnoySize` field containing `{ lMin, lMax }`

**3. Update rendering logic**
- Set `isRazdvizhnoy = productType === "razdvizhnoy"` alongside existing `isTroynik`
- **Title**: Show "Раздвижной элемент вентиляционный" when `isRazdvizhnoy`
- **Breadcrumb**: Link back to `/razdvizhnoy` when `isRazdvizhnoy`
- **Images**: Use `razdvizhnoyImages` when `isRazdvizhnoy`
- **Specs grid**: When `isRazdvizhnoy`, show L min and L max cells instead of single "Длина (L)" and hide "Угол" / "Толщина раструба" rows (show socket thickness but not angle)
- Replace the single "Длина (L)" cell with two cells: "L min" (1000 мм) and "L max" (1800 мм)

