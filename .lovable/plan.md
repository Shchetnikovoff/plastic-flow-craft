

## Plan: Add Nutch Filter product page with size table and images

### Overview
Create a dedicated page for "Нутч-фильтры" under the Hydrometallurgy section, with a product size table (13 models from the Excel data), the uploaded 3D render image, and article breakdown.

### Changes

**1. Copy uploaded image to project**
- Copy `user-uploads://nutch_filtr_vakuum_2.jpg` to `public/images/nutch-filtr-vakuum.jpg`

**2. Create data file `src/data/nutchFiltrProducts.ts`**
- 13 products from the Excel with columns: article, name, diameter (mm), filtration area (m²), suspension height (mm), suspension volume (L), filtrate height (mm), filtrate volume (L), perforation, price
- Two groups: standard (НФ-Л/НФ-П ... ПП) and compact (НФ-П ... ПП НК)

**3. Create page `src/pages/NutchFiltrPage.tsx`**
- Breadcrumb: Каталог > Гидрометаллургия > Нутч-фильтры
- Hero section with the uploaded image
- ArticleBreakdown component showing the decoding: НФ (Нутч-фильтр), Л/П (лабораторный/промышленный), area, diameter, material
- Product table with all 13 sizes, columns: Артикул, ∅ корпуса, Площадь фильтрации, Объём суспензии, Объём фильтрата, Перфорация, Цена
- CTA form section (same pattern as other pages)
- Follow the same layout pattern as KnsPpPage

**4. Update routing in `src/App.tsx`**
- Add route: `/catalog/gidrometallurgiya/nutch-filtr` → `NutchFiltrPage`

**5. Update catalog data in `src/data/catalog.ts`**
- Add `externalPath: "/catalog/gidrometallurgiya/nutch-filtr"` to subcategory `gm2` so the card links to the new page
- Update image to `/images/nutch-filtr-vakuum.jpg`

