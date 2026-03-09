

## Plan: Redesign CatalogPage to match unified template style

### What changes
Restyle the root `/catalog` page (the "no categorySlug" branch in `CatalogPage.tsx`, lines 23-49) to match the look of other landing pages like EmkostiPage.

### Changes in `src/pages/CatalogPage.tsx`

**Root catalog view (lines 23-49) — replace with:**

1. **Hero section**: Company label "ООО СЗПК «Пласт-Металл ПРО»", H1 "Каталог продукции", subtitle about full range of polymer equipment, CTA button "Получить расчёт стоимости"
2. **Category grid**: Keep existing 3-col grid but enhance cards — add category images (use first subcategory image or a generic icon), improve spacing and hover states
3. **CTA form**: Same contact form as other pages (name, phone, email, description) with 3-col layout
4. **PageFooter**: Replace inline footer with shared `PageFooter` component

**Also fix the category detail view (lines 105-294):**
- Replace inline footer (lines 286-291) with `PageFooter` component for consistency

### Single file modified
- `src/pages/CatalogPage.tsx`

