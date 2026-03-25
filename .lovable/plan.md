

## Plan: Dynamic Tables with Material/Color Articles for Rectangular Tanks

### What changes

**1. `src/pages/EmkostiPryamougolnye.tsx`** — Replace static PP/PND tabs with material & color selector above the table
- Remove `Tabs` with PP/PND tabs and their image grids
- Add material selector badges (PPC, PE100, PPH, PPs) and color picker cards (same style as calculator)
- `ProductTable` receives `materialCode` and `colorCode` props
- Table articles become dynamic: `СЗПК.ЕПО.{matCode}.{colorCode}.{volume}` (or without color for PE100)
- Each row navigates to `/product/СЗПК.ЕПО.PPC.7032.1000` etc.
- Add `ArticleBreakdown` above the table showing the article format explanation

**2. `src/pages/Product.tsx`** — Extend `parseExtendedEmkostArticle` to handle rectangular tanks
- When `typePrefix === "ЕПО"`, search `pryamougolnyeProducts` by volume (strip material/color from article to find base product)
- Return proper product data with `materialCode`, `colorLabel`, `rectDims`, image, and breadcrumb
- Pick image based on color code using existing `colorImages` mapping (grey, blue, white, black)

**3. `src/data/pryamougolnyeProducts.ts`** — No changes needed (base articles remain as-is for backward compat)

### How the table works

User selects material (e.g. PPH) and color (e.g. RAL 5012 Blue) → table shows 16 rows with articles like `СЗПК.ЕПО.PPH.5012.1000` through `СЗПК.ЕПО.PPH.5012.50000` → click navigates to product card → Product.tsx resolves the extended article, shows ArticleBreakdown with material/color segments.

### Scope
- 2 files modified
- No new components needed

