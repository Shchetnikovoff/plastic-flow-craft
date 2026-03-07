

## Plan: Clean up catalog structure — keep only ready subcategories

### Goal
Simplify the catalog data to match the schema: each category shows only subcategories that have (or will have) dedicated pages. Remove placeholder/unfinished items to avoid confusion as we build out sections.

### Changes

#### 1. `src/data/catalog.ts` — trim Ёмкости to 3 ready subcategories

Remove subcategories e1, e2, e6, e7, e8, e9, e10. Keep only:
- **e3** — Ёмкости подземные (has page at `/catalog/emkosti/podzemnye`)
- **e4** — Ёмкости прямоугольные (has page at `/catalog/emkosti/pryamougolnye`)
- **e5** — Ёмкости пожарные (has page at `/catalog/emkosti/pozharnye`)

All three already have `externalPath` and `image` set — tiles will link directly to their pages.

#### 2. No other file changes needed

The CatalogPage rendering already handles `externalPath` links and image display. EmkostiPage (`/catalog/emkosti`) also reads from this same catalog data, so it will automatically show only 3 tiles.

### Navigation flow (matches schema)
```text
Каталог → Ёмкости (3 плитки) → клик → Посадочная страница с описанием + таблица типоразмеров
```

### Files modified
- `src/data/catalog.ts` — remove 7 subcategories from емкости, keep 3

