

## Plan: Restructure site to match new 7-category structure

### New structure (from spreadsheet)

| # | Category | Subcategories | Has dedicated page? |
|---|----------|--------------|-------------------|
| 1 | Ёмкости | 9 items (1.1-1.9) | Yes (EmkostiPage) |
| 2 | Водоочистка | 8 items (2.1-2.8) | Yes (Vodoochistka) |
| 3 | КНС | 2 items (3.1-3.2) | Yes (KnsPage) |
| 4 | Химические реакторы | 2 items (4.1-4.2) | Yes (ReaktoryPage) |
| 5 | Гидрометаллургия | 4 items (5.1-5.4) | Yes (GidrometallurgiyaPage) |
| 6 | Газоочистка | 4 items (6.1-6.4) | Yes (GazoochistkaPage) |
| 7 | Вентиляция | 2 groups (7.1-7.2) | Yes (VentilyatsiyaPage) |

### Categories to REMOVE
- Гальваника → delete route, page stays as orphan (can delete later)
- Водоподготовка → delete route + page
- Лабораторная мебель → delete route + page
- Шкафы управления → delete route + page
- Услуги → delete route + page

### Changes

#### 1. `src/data/catalog.ts` — Full rewrite of catalog array
Replace the 12-category array with 7 categories matching the spreadsheet exactly. All subcategories listed, with `externalPath` for those that have dedicated pages, without for those that don't (they'll show description cards via CatalogPage).

**Ёмкости subs:**
- 1.1 Цилиндрические вертикальные → `/catalog/emkosti/konfigurator` (existing)
- 1.2 Цилиндрические горизонтальные → `/catalog/emkosti/konfigurator` (existing)
- 1.3 Подземные → `/catalog/emkosti/podzemnye` (existing)
- 1.4 Прямоугольные → `/catalog/emkosti/pryamougolnye` (existing)
- 1.5 Пожарные → `/catalog/emkosti/pozharnye` (existing)
- 1.6 Для сейсмоактивных районов → no page (description only)
- 1.7 Для щелочи → `/catalog/emkosti/kisloty-shchelochi` (existing)
- 1.8 Для кислоты → `/catalog/emkosti/kisloty-shchelochi` (existing)
- 1.9 Переливные для бассейнов → no page (description only)

**Водоочистка subs:**
- 2.1 ФФУ → existing page
- 2.2 Ламельный отстойник → existing page
- 2.3 Мешочный обезвоживатель → existing page
- 2.4 Станция приготовления коагулянта → existing dozirovaniya page
- 2.5 Станция приготовления флоакулянта → no page (description only)
- 2.6 Жироуловители → existing page
- 2.7 КОС ливневых сточных вод → existing los page
- 2.8 Шкафы и стойки дозирования → existing page

**КНС subs:** both description-only (no pages yet)
**Реакторы subs:** both description-only
**Гидрометаллургия subs:** all 4 description-only
**Газоочистка subs:** all 4 have existing pages ✓
**Вентиляция subs:**
- 7.1 Круглого сечения → `/catalog/ventilyatsiya` with existing sub-pages (отвод, тройник, раздвижной, воздуховод as nested items)
- 7.2 Квадратного сечения → description only

#### 2. `src/App.tsx` — Remove routes for deleted categories
Remove routes for: `/catalog/galvanika`, `/catalog/vodopodgotovka`, `/catalog/labmebel`, `/catalog/shkafy-upravleniya`, `/catalog/uslugi` and their imports.

#### 3. Category pages with subcategories — Re-add catalog grid sections
For KnsPage, ReaktoryPage, GidrometallurgiyaPage — add back the subcategory grid section (sidebar + cards) that was removed in the previous step. Use `findCategory()` to get subcategories from catalog data.

#### 4. EmkostiPage — Update subcategory rendering
The subcategories list changed (now 9 items instead of 4). The page already uses `findCategory("emkosti")` so it will pick up new data automatically — just verify the rendering.

#### 5. Vodoochistka page — Update subcategory rendering
Renamed items (Станция дозирования → Станция приготовления коагулянта, ЛОС → КОС). Add new item 2.5. Page uses `findCategory` so data changes propagate.

#### 6. VentilyatsiyaPage — Restructure
Change from 4 circular items to 2 top-level groups (круглого/квадратного сечения). Circular section links to existing pages. Square section shows description card.

### Files modified
- `src/data/catalog.ts` — full catalog restructure
- `src/App.tsx` — remove 5 routes + imports
- `src/pages/KnsPage.tsx` — add subcategory grid
- `src/pages/ReaktoryPage.tsx` — add subcategory grid
- `src/pages/GidrometallurgiyaPage.tsx` — add subcategory grid
- `src/pages/VentilyatsiyaPage.tsx` — restructure to 2 groups
- `src/pages/EmkostiPage.tsx` — verify/update sub rendering
- `src/pages/Vodoochistka.tsx` — verify/update sub rendering

