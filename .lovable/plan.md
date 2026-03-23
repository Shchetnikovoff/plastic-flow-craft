

## Plan: Add "На высоких ложементах" subtype to horizontal tanks

### What
Add a second subtype card to the horizontal tanks landing page and create a new sub-page with the product table (17 models, ЕГППЛВ series). Save uploaded images (2 product photos + 1 schema) to `public/images/`.

### Files to create/modify

#### 1. Copy uploaded images to `public/images/`
- `EGTS-vysokie-lozhementy-

<lov-plan>

## Plan: Add "На высоких ложементах" subtype to horizontal tanks

### What
Add a second subtype card to the horizontal tanks landing page and create a new sub-page with the product table (17 models, ЕГППЛВ series). Save uploaded images (2 product photos + 1 schema) to `public/images/`.

### Files to create/modify

#### 1. Copy uploaded images to `public/images/`
- `EGTS-vysokie-lozhementy-1.jpg` → `public/images/egts-vysokie-lozhementy-1.jpg`
- `EGTS-vysokie-lozhementy-2.jpg` → `public/images/egts-vysokie-lozhementy-2.jpg`
- `EGTS-na-vysokih-lozhementah-1.jpg` → `public/images/egts-vysokie-schema.jpg`
- Remove branding text from product photos before saving.

#### 2. Update `src/pages/EmkostiGorizontalnye.tsx`
Add second entry to `subtypes` array:
```
{
  id: "vysokie-lozhementy",
  name: "Стандартная на высоких ложементах",
  image: "/images/egts-vysokie-lozhementy-1.jpg",
  path: "/catalog/emkosti/gorizontalnye/vysokie-lozhementy",
  description: "Горизонтальная цилиндрическая ёмкость с плоской крышей и плоским дном на высоких ложементах. Объём от 1 000 до 50 000 литров.",
}
```

#### 3. Create `src/pages/EmkostiGorizontalnyeVysokie.tsx`
Clone structure from `EmkostiGorizontalnyeStandard.tsx`:
- Breadcrumbs: Каталог → Ёмкости → Горизонтальные → На высоких ложементах
- Hero with 2 photos (product + schema)
- Anchor nav, description section, model table with 17 rows:

| Артикул | Объём | Ø | L |
|---------|-------|---|---|
| СЗПК.ЕГППЛВ.1000 | 1000 | 940 | 1500 |
| ... | ... | ... | ... |
| СЗПК.ЕГППЛВ.50000 | 50000 | 3050 | 7000 |

- Clickable rows → `/product/{article}`
- CTA form + PageFooter

#### 4. Update `src/App.tsx`
- Import `EmkostiGorizontalnyeVysokie`
- Add route: `/catalog/emkosti/gorizontalnye/vysokie-lozhementy`

#### 5. Update `src/pages/Product.tsx`
- Add `egpplv` category handling for images and schema (use `egts-vysokie-lozhementy-2.jpg` as product image, `egts-vysokie-schema.jpg` as schema)

