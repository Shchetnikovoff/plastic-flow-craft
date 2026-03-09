

## Plan: Remove empty subcategories from catalog

### Problem
Subcategories without `externalPath` only show a text description card when clicked — the user considers these "empty" and wants them removed. Only subcategories with actual dedicated pages should remain.

### What stays (has `externalPath`)
- **Водоочистка**: v2-v9 (all 7 items) — all have dedicated pages
- **Вентиляция круглого сечения**: ve1-ve4 — all link to real pages
- **Газоочистка**: go1-go4 — all have dedicated pages
- **Ёмкости**: e3-e6 — all have dedicated pages

### What gets removed (no `externalPath`)
- **Гальваника**: all 8 subcategories (g1-g3, g5-g9) — remove entire subcategories array content
- **Водоподготовка**: vp1 — remove, leaves empty category
- **Вентиляция прямоугольного сечения**: ve5-ve8 — remove these 4 items
- **Реакторы**: r1-r3 — remove all
- **Гидрометаллургия**: gm1-gm4 — remove all
- **КНС**: k1-k2 — remove all
- **Лабмебель**: l1-l8 — remove all
- **Шкафы управления**: su1-su3 — remove all
- **Услуги**: u1-u4 — remove all

### Changes

#### 1. `src/data/catalog.ts`
- Remove all subcategory entries without `externalPath`
- Categories with zero remaining subcategories (Гальваника, Водоподготовка, Реакторы, Гидрометаллургия, КНС, Лабмебель, Шкафы управления, Услуги) — keep as empty arrays so the category pages still work

#### 2. Category pages with now-empty subcategory lists
Remove the "Каталог" sidebar/card section from these 8 pages since there are no subcategories to display:
- `src/pages/GalvanikaPage.tsx` — remove lines 165-189 (catalog section)
- `src/pages/VodopodgotovkaPage.tsx` — remove catalog section
- `src/pages/ReaktoryPage.tsx` — remove catalog section
- `src/pages/GidrometallurgiyaPage.tsx` — remove catalog section
- `src/pages/KnsPage.tsx` — remove catalog section
- `src/pages/LabMebelPage.tsx` — remove catalog section
- `src/pages/ShkafyUpravleniyaPage.tsx` — remove catalog section
- `src/pages/UslugiPage.tsx` — remove catalog section

Also remove unused imports (`findCategory`, `ImageOff`, `selectedSubId` state) from these files.

#### 3. `src/pages/VentilyatsiyaPage.tsx`
Remove the 4 rectangular-section subcategories (ve5-ve8) from the displayed list — keep only circular section items.

### Files modified
- `src/data/catalog.ts`
- 8 category page files (remove catalog sidebar sections)
- `src/pages/VentilyatsiyaPage.tsx` (if it renders subcategories)

