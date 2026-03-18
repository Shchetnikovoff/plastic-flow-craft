

## Plan: Add articles and clickable product cards for overflow tanks

### What we're building
1. Add unique article codes to each overflow tank model
2. Make table rows clickable, linking to `/product/:article`
3. Product detail page shows article, description, image, and specs

### Changes

**1. `src/data/perelivnyeProducts.ts`** — Add `article` field to each product

Article format: `ПЕ-PP-{poolVolume}` (e.g., `ПЕ-PP-15`, `ПЕ-PP-300`)

```ts
export interface PerelivnayaProduct {
  article: string;       // NEW
  poolVolume: number;
  length: number;
  width: number;
  height: number;
  label: string;
}
```

Each of the 10 items gets a unique article like `ПЕ-PP-15`, `ПЕ-PP-30`, ..., `ПЕ-PP-300`.

**2. `src/pages/EmkostiPerelivnye.tsx`** — Add article column to table, make rows clickable

- Add "Артикул" column to the table header
- Wrap each `TableRow` with `Link` to `/product/{article}`
- Add hover styling and cursor pointer

**3. `src/pages/Product.tsx`** — Add perelivnye product lookup

Add a `parsePerelivnayaArticle` function that:
- Checks if article starts with `ПЕ-`
- Finds the matching product in `perelivnyeProducts`
- Returns product data with title, description, image (`/images/emkost-perelivnaya-bassein.jpg`), and specs (dimensions, material PP-H)

Integrate it into the existing `parseEmkostArticle` flow so the `/product/:article` route renders the card with:
- Article code
- Short description ("Переливная ёмкость для бассейна до X м³, полипропилен PP-H, размеры L×W×H мм")
- Hero image from the parent page
- Technical specs grid

