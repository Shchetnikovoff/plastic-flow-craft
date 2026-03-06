

## Analysis

Currently, the site already has configurators for 5 product types:
- **Index.tsx** — Отводы (4 angles: 15°, 30°, 45°, 60°)
- **Troynik.tsx** — Тройники
- **Razdvizhnoy.tsx** — Раздвижные элементы
- **Vozdukhovod.tsx** — Воздуховоды
- **EmkostiCatalog.tsx** — Ёмкости

All five already follow the same UI pattern: image gallery with lightbox, description + characteristics, selectors (material/color/type), size table with quantity controls and cart buttons. **They are already consistent.**

## What's left without configurators

The catalog has 12 top-level categories. Of these, only **Вентиляция** (4 products) and **Ёмкости** have configurators. The remaining 10 categories are:

1. Гальваника (8 subcategories)
2. Водоочистка (9 subcategories)
3. Водоподготовка (1 subcategory)
4. Газоочистка (4 subcategories)
5. Химические реакторы (3 subcategories)
6. Гидрометаллургия (4 subcategories)
7. КНС (2 subcategories)
8. Лабораторная мебель (8 subcategories)
9. Шкафы управления (3 subcategories)
10. Услуги (4 subcategories)

## The problem

These categories don't have configurators because **there's no product data for them** — no size tables, no articles, no images, no material specs. Creating configurators requires populating `src/data/` with real product dimensions, articles, and images for each subcategory. The UI component pattern is already proven and can be reused, but the data is the bottleneck.

## Recommendation

Yes, it's absolutely possible to create the same configurator for every category. The approach:

### 1. Create a universal `ProductConfigurator` component
Extract the shared UI into `src/components/ProductConfigurator.tsx` — a reusable component that accepts:
- `images: string[]`
- `description: string`
- `characteristics: { label: string; value: string }[]`
- `selectors: { label: string; options: { id: string; title: string }[]; selected: string; onChange: (id) => void }[]`
- `columns: { key: string; label: string }[]`
- `items: Record<string, any>[]`
- `onAddToCart: (article, qty) => void`

This eliminates the ~300 lines of duplicated code across Index, Troynik, Razdvizhnoy, Vozdukhovod, and EmkostiCatalog.

### 2. Create data files per category
For each new category, create a data file (e.g. `src/data/skrubberyProducts.ts`) with:
- Product groups/types
- Size tables (article, dimensions, specs)
- Image mappings

### 3. Create page wrappers
Each category page becomes a thin wrapper (~30 lines) that imports the data and passes it to `ProductConfigurator`.

## Suggested next step

Start with **one category** to validate the universal component pattern, then roll it out to the rest. Which category should we start with? The ones most likely to have standardized sizes (like gas cleaning equipment / scrubbers, or chemical reactors) would be the easiest.

Should I proceed with extracting the universal `ProductConfigurator` component from the existing pages first, then we can add new categories one by one as you provide the product data?

