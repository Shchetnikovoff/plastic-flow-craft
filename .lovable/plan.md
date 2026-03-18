

## Plan: Clickable FFU Table Rows + Product Cards with PDF/KP Export

### What changes

**1. Make FFU table rows clickable** (`VodoochistkaFfu.tsx`)
- Add `useNavigate` and make each `<TableRow>` in the models table clickable, navigating to `/product/ФФУ-1К`, `/product/ФФУ-2М`, etc.
- Add cursor-pointer styling and hover highlight

**2. Add FFU product parsing in `Product.tsx`**
- Add a `parseFfuArticle(article)` function that matches articles starting with "ФФУ-"
- Look up model data from a shared models array (capacity, power, dimensions, massDry)
- Return product card data: title, image (use `/images/ffu-real-3d.png` — the catalog image 2.1), description, specs
- Render a product detail card with: image, model name, specs grid (capacity, dimensions, mass, power), description
- Add "В корзину" button, quantity selector
- Add "Скачать спецификацию (PDF)" button using existing `generateSpecPdf` with FFU-specific fields
- Add "Скачать КП (PDF)" button using existing `generateLetterheadPdf` pattern
- Breadcrumbs: Каталог → Водоочистка → ФФУ → {model name}

**3. FFU-specific PDF spec generation**
- Reuse existing `generateSpecPdf` — pass FFU-specific fields (model name, capacity, dimensions, power, mass) instead of diameter/wall thickness
- For the commercial proposal (KP), create a dedicated `generateFfuKpPdf` function or adapt `generateLetterheadPdf` to accept FFU product data and output a branded KP document with company header, product details table, and footer

### Files to modify
- `src/pages/VodoochistkaFfu.tsx` — clickable rows + export models data
- `src/pages/Product.tsx` — add FFU article parser + product card rendering
- `src/lib/generateSpecPdf.ts` — adapt to support FFU product type (flexible field names)

### Technical details
- Models data will be extracted to a shared export from `VodoochistkaFfu.tsx` or a new `src/data/ffuProducts.ts` for reuse in both files
- Article format: model name directly (e.g. "ФФУ-1К", "ФФУ-10")
- Product card image: `/images/ffu-real-3d.png` (the 2.1 catalog subcategory image)

