

## Plan: Replace all "Раздел в разработке" placeholders with real content

### Problem
36 subcategories across 9 categories show "Раздел в разработке. Информация появится в ближайшее время." when clicked in the sidebar or visited directly. This includes all subcategories without `externalPath`.

### Solution
Add a `description` field to `CatalogSubcategory` interface and populate it for every subcategory. Then update the 5 files that render the placeholder to display the description instead.

### Changes

#### 1. Update `src/data/catalog.ts`
- Add `description?: string` to the `CatalogSubcategory` interface
- Add descriptions for all 36 subcategories without `externalPath`, plus existing ones for completeness. Descriptions will be 1-2 sentences about what the product/service is, materials, and key specs — matching the industrial tone of the site.

Subcategories to fill (no `externalPath`):
- **Гальваника (8):** g1-g3, g5-g9
- **Водоподготовка (1):** vp1
- **Вентиляция прямоугольная (4):** ve5-ve8
- **Реакторы (3):** r1-r3
- **Гидрометаллургия (4):** gm1-gm4
- **КНС (2):** k1-k2
- **Лабмебель (8):** l1-l8
- **Шкафы управления (3):** su1-su3
- **Услуги (4):** u1-u4

#### 2. Update 5 page files to show description instead of placeholder
Replace `"Раздел в разработке..."` with `{sub.description || "Описание уточняйте по запросу."}` in:
- `src/pages/CatalogPage.tsx` (lines 147, 243)
- `src/pages/GalvanikaPage.tsx` (line 179)
- `src/pages/GazoochistkaPage.tsx` (line 115)
- `src/pages/EmkostiPage.tsx` (line 309)
- `src/pages/Vodoochistka.tsx` (line 363)

Also add a "Запросить расчёт" button linking to the CTA form for subcategories without `externalPath`.

### Files
- **Modify**: `src/data/catalog.ts`, `src/pages/CatalogPage.tsx`, `src/pages/GalvanikaPage.tsx`, `src/pages/GazoochistkaPage.tsx`, `src/pages/EmkostiPage.tsx`, `src/pages/Vodoochistka.tsx`

