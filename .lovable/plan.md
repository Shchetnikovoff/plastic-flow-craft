

## Plan: Restructure all category landing pages to match EmkostiPage template

### Reference structure (EmkostiPage)
1. Breadcrumbs
2. Hero (company label → H1 → subtitle → CTA button → 2 hero images)
3. Intro (description + "Почему выбирают нас" checklist)
4. Section: Назначение (application cards grid)
5. Section: Материалы (material spec cards)
6. Section: Виды и модификации (accordion)
7. CTA link card (optional, e.g. to configurator)
8. Преимущества сотрудничества (icon cards 3-col)
9. **Subcategories grid** (sidebar nav + image cards from catalog data)
10. CTA Form
11. PageFooter

### Current state
- **EmkostiPage** — reference ✅
- **Vodoochistka** — similar structure but **missing subcategories grid** at bottom
- **10 other categories** (Гальваника, Газоочистка, Водоподготовка, Вентиляция, Реакторы, Гидрометаллургия, КНС, Лабмебель, Шкафы управления, Услуги) — no dedicated landing pages, only generic CatalogPage view

### Changes

#### Phase 1: Restructure Vodoochistka (1 file)
- Add subcategories grid section (sidebar + image cards) before CTA form, pulling data from `findCategory("vodoochistka")`
- Keep all existing content sections unchanged

#### Phase 2: Create 10 new category landing pages
Each page follows the EmkostiPage template with category-specific content:

| # | Category | File | Content focus |
|---|----------|------|---------------|
| 1 | Гальваника | `GalvanikaPage.tsx` | Гальванические линии, ванны, оборудование |
| 2 | Газоочистка | `GazoochistkaPage.tsx` | Скрубберы, ФВГ, каплеуловители |
| 3 | Водоподготовка | `VodopodgotovkaPage.tsx` | Обратный осмос, системы подготовки воды |
| 4 | Вентиляция | `VentilyatsiyaPage.tsx` | Воздуховоды, отводы, тройники из полипропилена |
| 5 | Химические реакторы | `ReaktoryPage.tsx` | Реакторы из PP, PE, для гидрометаллургии |
| 6 | Гидрометаллургия | `GidrometallurgiyaPage.tsx` | Реакторы осаждения, нутч-фильтры, выщелачивание |
| 7 | КНС | `KnsPage.tsx` | КНС в корпусе SVT и из полипропилена |
| 8 | Лабораторная мебель | `LabMebelPage.tsx` | Мебель, шкафы, мойки из полипропилена |
| 9 | Шкафы управления | `ShkafyUpravleniyaPage.tsx` | Шкафы для гальваники, очистных, насосов |
| 10 | Услуги | `UslugiPage.tsx` | Проектирование, монтаж, пусконаладка |

Each page will include:
- Breadcrumbs (Каталог → Категория)
- Hero with 2 generated images + CTA
- Intro + "Почему выбирают нас"
- 2-3 content sections relevant to the category
- Преимущества сотрудничества
- Subcategories grid (from catalog data)
- CTA form + PageFooter

#### Phase 3: Routing updates (`App.tsx`)
Add 10 new routes before the generic `/catalog/:categorySlug` catch:
```
/catalog/galvanika → GalvanikaPage
/catalog/gazoochistka → GazoochistkaPage
/catalog/vodopodgotovka → VodopodgotovkaPage
/catalog/ventilyatsiya → VentilyatsiyaPage
/catalog/reaktory → ReaktoryPage
/catalog/gidrometallurgiya → GidrometallurgiyaPage
/catalog/kns → KnsPage
/catalog/labmebel → LabMebelPage
/catalog/shkafy-upravleniya → ShkafyUpravleniyaPage
/catalog/uslugi → UslugiPage
```

#### Phase 4: Generate hero images
20 new hero images (2 per category) + update existing if needed.

### Files
- **Modify**: `src/pages/Vodoochistka.tsx`, `src/App.tsx`
- **Create**: 10 new page files in `src/pages/`
- **Create**: ~20 hero images in `public/images/`

### Note
This is a large task. I recommend implementing it in 2-3 batches to keep changes manageable. Content for each page will be generated based on the category's products and subcategories, matching the industrial polypropylene/polyethylene equipment theme of the site.

