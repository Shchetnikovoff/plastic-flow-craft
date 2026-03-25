

## Plan: Make Underground Tanks Table Interactive with Product Cards

### What changes

**1. `src/data/podzemnyeProducts.ts`** — Add `article` field to each product
- Article format: `СЗПК.ЕСВП.{volume}` (Ёмкость Спиральновитая Подземная)
- Example: `СЗПК.ЕСВП.20`, `СЗПК.ЕСВП.150`

**2. `src/pages/EmkostiPodzemnye.tsx`** — Move table up and make rows clickable
- Move the "Типоразмерный ряд" section from after "Модификации" to right after the hero/nav section (before "Описание")
- Add article column to the table
- Add `useNavigate`, make each `TableRow` clickable with `onClick={() => navigate(/product/${article})}`
- Add hover styles and visual cues (underlined article, cursor-pointer)
- Update nav anchor order to reflect new position

**3. `src/pages/Product.tsx`** — Add underground tank product recognition
- Import `podzemnyeProducts` from data file
- Add a lookup block in the product resolver (similar to `pozharnyePodzem` handler)
- Return product data with: title "Ёмкость подземная из СВТ {volume} м³", image, dimensions, breadcrumb back to `/catalog/emkosti/podzemnye`
- PDF spec and commercial proposal downloads will work automatically via existing infrastructure

### Technical detail

The article lookup in Product.tsx follows the established pattern — search the data array by article, return a standardized product object with `productType: "emkost"`, `emkostType: "underground"`. The existing PDF generation (`generateSpecPdf`, `generateLetterheadPdf`) and download buttons already handle this product type, so no additional PDF work is needed.

