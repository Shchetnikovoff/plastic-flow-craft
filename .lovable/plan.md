

## Plan: Add color selection to perelivnye product cards and generate color-coded articles

### Current state
- Articles: `ПЕ-PP-15`, `ПЕ-PP-30`, etc. (no color code)
- Product detail page (`Product.tsx`) parses `ПЕ-` prefix, finds item in `perelivnyeProducts`, renders a static card with no color choice
- Catalog page (`EmkostiPerelivnye.tsx`) already has color selection but it's decorative only

### Changes

**1. `src/data/perelivnyeProducts.ts`** — add color to data model
- Add `colorCode` and `colorName` fields to `PerelivnayaProduct`
- Define `ppColors` array (shared constant): `{ code: "7032", name: "Серый", hex: "#b5b0a1", ral: "RAL 7032", application: "внутри помещения" }` and `{ code: "5012", name: "Голубой", hex: "#0089bf", ral: "RAL 5012", application: "улица, УФ-защита" }`
- Duplicate each of the 10 products into 2 color variants: `ПЕ-PP-7032-15` / `ПЕ-PP-5012-15`, etc. (20 total)
- Export a helper to get base sizes (unique by poolVolume, without color)

**2. `src/pages/EmkostiPerelivnye.tsx`** — use shared colors, filter table by selected color
- Import `ppColors` from data instead of local definition
- Filter `perelivnyeProducts` by `selectedColor.code` before rendering table rows
- Table rows now link to color-specific articles (e.g., `/product/ПЕ-PP-7032-50`)

**3. `src/pages/Product.tsx`** — add color picker to perelivnaya product card
- Update `parseEmkostArticle` to parse new format `ПЕ-PP-{COLOR}-{VOLUME}`
- Extract color code from article, find matching `ppColor`
- Add `selectedColor` state inside the emkost rendering block for perelivnye
- Render color picker cards (same UI as on catalog page) between subtitle and characteristics grid
- When user switches color, navigate to the corresponding article (e.g., from `ПЕ-PP-7032-50` to `ПЕ-PP-5012-50`)
- Show color name and RAL in the characteristics grid

### Article format
```text
ПЕ-PP-7032-50
│   │  │    └─ Pool volume (м³)
│   │  └────── RAL color code
│   └───────── Material (PP)
└───────────── Type (Переливная Ёмкость)
```

