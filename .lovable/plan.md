

## Plan: Create Horizontal Cylindrical Tanks subsection

### What
Create a landing page for "Ёмкости цилиндрические горизонтальные" and its first sub-page "Стандартная на низких ложементах" with the product table from the uploaded image. Copy uploaded product photos and schema to the project.

### Files to create/modify

#### 1. Copy uploaded images to `public/images/`
- `EGTS-standartnaya-1.jpg` → `public/images/egts-standartnaya-1.jpg`
- `EGTS-standartnaya-3.jpg` → `public/images/egts-standartnaya-3.jpg`
- `EGTS-standart-1.jpg` → `public/images/egts-standart-schema.jpg`

#### 2. Create `src/pages/EmkostiGorizontalnye.tsx`
Landing page for horizontal tanks (pattern: `EmkostiVertikalnye.tsx`):
- Breadcrumbs: Каталог → Ёмкости → Цилиндрические горизонтальные
- Hero section with title, description, uploaded photos
- Subtypes grid with card linking to `/catalog/emkosti/gorizontalnye/standartnaya`
- CTA form + PageFooter

#### 3. Create `src/pages/EmkostiGorizontalnyeStandard.tsx`
Sub-page for standard horizontal tanks (pattern: `EmkostiEvpp.tsx`):
- Breadcrumbs: Каталог → Ёмкости → Горизонтальные → Стандартная
- Hero with title + 2 photos (product + schema)
- Anchor nav (Описание, Модельный ряд, Заявка)
- Description section about standard horizontal tanks on low saddles
- Model table with 17 rows from uploaded data:

```text
ЕГППЛСТ-1000   1000   940   1500
ЕГППЛСТ-2000   2000   1330  1500
...
ЕГППЛСТ-50000  50000  3050  7000
```

Note: Column headers use "L, мм" instead of "H, мм" (length, not height)
- Clickable rows → `/product/{article}`
- CTA form + PageFooter

#### 4. Update `src/App.tsx`
- Import both new pages
- Add routes:
  - `/catalog/emkosti/gorizontalnye` → `EmkostiGorizontalnye`
  - `/catalog/emkosti/gorizontalnye/standartnaya` → `EmkostiGorizontalnyeStandard`

#### 5. Update `src/data/catalog.ts`
- Add `externalPath: "/catalog/emkosti/gorizontalnye"` to the `e2` subcategory entry

