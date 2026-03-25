

## Plan: Split Rectangular Tanks into Horizontal and Vertical Subtypes

### Overview
Transform the current rectangular tanks page into a landing page with two subtypes (like the vertical/horizontal cylindrical tanks sections), and create two new subtype pages. Generate vertical rectangular tank dimensions data.

### Changes

**1. New data file: `src/data/pryamougolnyeVertikalnyeProducts.ts`**
- New product array with prefix `СЗПК.ЕПОВ` (В = vertical)
- 12 sizes from 500 to 25,000 liters with realistic vertical proportions (height > width/length):

```text
 500 l:   600×600×1400
1000 l:   800×800×1600
1500 l:   900×900×1900
2000 l:  1000×1000×2000
3000 l:  1100×1100×2500
4000 l:  1200×1200×2800
5000 l:  1300×1300×3000
6000 l:  1400×1400×3100
8000 l:  1500×1500×3600
10000 l: 1600×1600×4000
15000 l: 1800×1800×4700
20000 l: 2000×2000×5000
25000 l: 2200×2200×5200
```

**2. Rename existing data: `src/data/pryamougolnyeProducts.ts`**
- Keep as-is. Existing products become the horizontal subtype (dimensions already have length >> height).

**3. Refactor `src/pages/EmkostiPryamougolnye.tsx`** — Convert to landing page
- Remove `RectProductTable` component and table-related code
- Add subtypes grid with two cards (same pattern as `EmkostiVertikalnye` / `EmkostiGorizontalnye`):
  - **Горизонтальные** → `/catalog/emkosti/pryamougolnye/gorizontalnye` — image: existing rect tank photo
  - **Вертикальные** → `/catalog/emkosti/pryamougolnye/vertikalnye` — image: existing rect tank photo (different angle)
- Keep hero, description sections, CTA form, advantages
- Remove "Модели" nav anchor, keep others

**4. New page: `src/pages/EmkostiPryamougolnyeGorizontalnye.tsx`**
- Move `RectProductTable` here (using `pryamougolnyeProducts` data with prefix `ЕПО`)
- Breadcrumb: Каталог → Ёмкости → Прямоугольные → Горизонтальные
- Include hero image, table, CTA form (same layout as `EmkostiGorizontalnyeStandard`)

**5. New page: `src/pages/EmkostiPryamougolnyeVertikalnye.tsx`**
- Same structure as horizontal, but uses `pryamougolnyeVertikalnyeProducts` with prefix `ЕПОВ`
- Breadcrumb: Каталог → Ёмкости → Прямоугольные → Вертикальные

**6. `src/App.tsx`** — Add routes
```
/catalog/emkosti/pryamougolnye/gorizontalnye
/catalog/emkosti/pryamougolnye/vertikalnye
```

**7. `src/pages/Product.tsx`** — Extend article parser
- Handle `ЕПОВ` prefix (vertical rectangular) — same logic as `ЕПО` but searching `pryamougolnyeVertikalnyeProducts`

**8. `src/data/catalog.ts`** — No changes needed (parent link stays the same)

### Scope
- 1 new data file
- 2 new page files
- 3 files modified (App.tsx, EmkostiPryamougolnye.tsx, Product.tsx)

