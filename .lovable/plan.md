

# Plan: Clickable rows + product cards for Lamella Settler

## Summary
Make table rows on the Lamella Settler page clickable (navigating to `/product/ОГ-1`, `/product/ОГ-2.5`, etc.), and add product detail card support in `Product.tsx` — following the exact same pattern used for FFU products. Each card will show the product image (latest lamella settler photo), specs grid, add-to-cart, PDF spec download, and commercial proposal download.

## Changes

### 1. Create shared data file `src/data/lamelnyjProducts.ts`
- Export `lamelnyjModels` array (move the `models` array from `VodoochistkaLamelnyj.tsx` into this shared file)
- Type: `{ name, capacity, dimensions, mass }`

### 2. Update `src/pages/VodoochistkaLamelnyj.tsx`
- Import `useNavigate` from react-router-dom
- Import `lamelnyjModels` from shared data file
- Make table rows clickable with `onClick={() => navigate(\`/product/\${encodeURIComponent(m.name)}\`)}`
- Add `cursor-pointer hover:bg-primary/5` styling and underline on model name (same as FFU)

### 3. Update `src/pages/Product.tsx`
- Import `lamelnyjModels` from shared data
- Add a new block (after FFU block) that handles `ОГ-` prefixed articles
- Product card includes:
  - **Image**: `/images/lamelnyj-thumb-new.png` (the latest uploaded photo)
  - **Breadcrumbs**: Каталог → Водоочистка → Ламельный отстойник → {article}
  - **Specs grid**: Производительность, Габариты, Масса сух./раб., Материал корпуса, Рабочая температура
  - **Add to cart** button with quantity control
  - **Download spec PDF** button (with contact form dialog, using `generateSpecPdf` with `extraRows`)
  - **Download commercial proposal** button (using `generateLetterheadPdf`)

### Technical Details
- Pattern is identical to the existing FFU product card (lines 470–626 in `Product.tsx`)
- Article prefix match: `article.startsWith("ОГ-")`
- Model lookup: `lamelnyjModels.find(m => m.name === article)`
- Spec PDF `extraRows`: Производительность, Габариты, Масса, Материал корпуса, Рабочая температура

