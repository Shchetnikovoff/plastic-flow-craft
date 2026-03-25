

## Plan: Make Rectangular Tanks Table Interactive with Product Cards

### What changes

**1. `src/data/pryamougolnyeProducts.ts`** — Add `article` field
- Add `article` field to `PryamougolnyeProduct` interface
- Article format: `СЗПК.ЕПО.{volume}` (Ёмкость Прямоугольная в Обрешётке)
- Example: `СЗПК.ЕПО.1000`, `СЗПК.ЕПО.50000`

**2. `src/pages/EmkostiPryamougolnye.tsx`** — Move table up, make rows clickable
- Move the "Типоразмерный ряд" section (id="modeli", lines 334-365) up to right after the nav section (after line 219), before "Описание"
- Update nav anchor order to reflect new position: Модели first
- Add `useNavigate` import
- In `ProductTable` component: add article column, make rows clickable with `onClick={() => navigate(/product/${article})}`, add hover styles and cursor-pointer
- Remove the duplicate "Таблица типоразмеров" section at the bottom (lines 386-410) since it's redundant
- Pass material type (pp/pnd) to ProductTable to generate correct article suffix

**3. `src/pages/Product.tsx`** — Add rectangular tank product recognition
- Import `pryamougolnyeProducts`
- Add lookup block for `СЗПК.ЕПО.` prefix
- Return product with: title "Ёмкость прямоугольная в обрешётке {volume} л", `emkostType: "rectangular"`, `rectDims` with length/width/height, image, breadcrumb back to `/catalog/emkosti/pryamougolnye`
- PDF spec and KP downloads work automatically via existing infrastructure

### Technical detail

Article format uses volume as identifier since it's unique in the data. The ProductTable component receives a `materialSuffix` prop ("ПП" or "ПНД") to construct the full article, but both tabs navigate to the same product data (dimensions are identical). The product resolver returns `rectDims` for proper display of L×W×H instead of diameter.

