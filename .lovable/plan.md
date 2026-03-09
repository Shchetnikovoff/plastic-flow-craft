

## Plan: Create combined "Ёмкости для кислот и щелочей" landing page

### What we're building
A new landing page at `/catalog/emkosti/kisloty-shchelochi` that combines acid and alkali containers into one section, following the established Vodoochistka template structure. No product table for now.

### Changes

#### 1. Create `src/pages/EmkostiKislotyShchelochi.tsx`
Full landing page following the unified template:
- **Breadcrumbs**: Каталог → Ёмкости → Ёмкости для кислот и щелочей
- **Hero**: company label, H1 "Химически стойкие ёмкости для кислот и щелочей", subtitle, CTA button, 2-image grid
- **Intro**: description + 6-item "Почему выбирают нас" checklist
- **Раздел 1 — Назначение**: 8 application areas as list/cards
- **Раздел 2 — Материалы**: PP, ПНД/HDPE, ПВХ specs + chemical compatibility table (4 substances × 3 materials)
- **Раздел 3 — Виды и модификации**: accordion sections (по форме, по объёму, по типу установки, комплектация, дополнительные опции)
- **Раздел 4 — Преимущества сотрудничества**: 7 advantage cards (3-col grid)
- **CTA form** + **PageFooter**

#### 2. Generate 2 hero images + 1 thumbnail
- `emkosti-kisloty-hero-1.png` — industrial polypropylene tank for acid storage
- `emkosti-kisloty-hero-2.png` — chemical-resistant polymer container for alkali
- `emkosti-kisloty-thumb.png` — catalog thumbnail

#### 3. Update `src/data/catalog.ts`
Add new subcategory to the "emkosti" section:
```
{ id: "e6", name: "Ёмкости для кислот и щелочей", slug: "kisloty-shchelochi",
  externalPath: "/catalog/emkosti/kisloty-shchelochi", image: "/images/emkosti-kisloty-thumb.png" }
```

#### 4. Update `src/App.tsx`
Add route: `/catalog/emkosti/kisloty-shchelochi` → `EmkostiKislotyShchelochi`

### Files
- **Create**: `src/pages/EmkostiKislotyShchelochi.tsx`
- **Create**: 3 images in `public/images/`
- **Modify**: `src/data/catalog.ts`, `src/App.tsx`

