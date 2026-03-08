

## Plan: Add "Ёмкости подземные из спиральновитой трубы" Subcategory Page

### What We're Building

A new dedicated landing page for the underground containers subcategory (item "e3" in catalog: "Ёмкости подземные") at `/catalog/emkosti/podzemnye`. This is a full content page similar to EmkostiPage but focused on spiral-wound pipe underground containers.

### Changes

#### 1. Copy uploaded images to project
- `alexander-tortsev-9-1.jpg` → `public/images/emkosti-podzemnye-1.jpg`
- `alexander-tortsev-8-4.jpg` → `public/images/emkosti-podzemnye-2.jpg`
- `yomkosti-i-rezervuaryi.png` → `public/images/emkosti-podzemnye-3.png`

#### 2. Create data file `src/data/podzemnyeProducts.ts`
Size table (from polycorr.ru reference, 12 rows):

| Объём, м³ | Ø корпуса, мм | Длина (L), мм |
|-----------|---------------|---------------|
| 20 | 2400 | 4500 |
| 25 | 2400 | 5600 |
| 30 | 2400 | 6700 |
| 40 | 2400 | 8800 |
| 50 | 2400 | 11000 |
| 60 | 3000 | 8500 |
| 70 | 3000 | 9900 |
| 80 | 3000 | 11400 |
| 90 | 3200 | 11200 |
| 100 | 3200 | 12500 |
| 120 | 3500 | 12500 |
| 150 | 3600 | 14700 |

#### 3. Create `src/pages/EmkostiPodzemnye.tsx`
Full landing page with all provided text structured into sections:
- **Hero**: company name, title "Подземные ёмкости из спиральновитых труб", 3 product images in grid
- **Intro**: description + "Почему выбирают нас" checklist (6 items)
- **Раздел 1 — Назначение**: 8 application areas as card grid
- **Раздел 2 — Технология и материалы**: materials (ПНД, PP, армированные), key specs (diameter, length, pressure, temperature, ring stiffness, seismic), advantages of spiral-wound construction
- **Раздел 3 — Виды и модификации**: accordion sections (по назначению, по конструкции, по способу монтажа, дополнительные опции)
- **Типоразмерный ряд**: table from the data file
- **Раздел 4 — Преимущества сотрудничества**: 6 advantage cards
- **CTA form**: contact form (name, phone, email, description)

#### 4. Update `src/App.tsx`
Add route: `/catalog/emkosti/podzemnye` → `EmkostiPodzemnye`

#### 5. Update `src/data/catalog.ts`
Add `externalPath: "/catalog/emkosti/podzemnye"` to the "e3" subcategory entry so clicking it navigates to the dedicated page.

### Files
- **Copy**: 3 images to `public/images/`
- **Create**: `src/data/podzemnyeProducts.ts`, `src/pages/EmkostiPodzemnye.tsx`
- **Modify**: `src/App.tsx`, `src/data/catalog.ts`

