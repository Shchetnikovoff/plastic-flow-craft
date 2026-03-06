

## Plan: Redesign Galvanika Category Page Layout

The screenshot shows a two-column layout for the Galvanika page: a numbered sidebar list of subcategories on the left, and a grid of product image cards with captions on the right. Above the content is a description line. I'll replicate this structure using our existing design system.

### Changes

#### 1. Add `description` and `image` fields to catalog data (`src/data/catalog.ts`)
- Add optional `description` field to `CatalogCategory` interface (for the tagline "Гальваническое оборудование. Проектирование, производство и монтаж.")
- Add optional `image` field to `CatalogSubcategory` interface (placeholder path for future product photos)
- Fill in the Galvanika category with description and placeholder image paths

#### 2. Redesign the category page for Galvanika (`src/pages/CatalogPage.tsx`)
Modify the category detail view (when `categorySlug` is set but no `subSlug`) to render a richer layout when the category has images/description:

- **Description banner** at the top under breadcrumbs: category name + description text
- **Two-column layout** (sidebar + grid):
  - **Left sidebar**: Numbered list of subcategories (1.1, 1.2, etc.) as clickable links, styled as a compact navigation list
  - **Right content area**: Grid of subcategory cards (2 columns on desktop, 1 on mobile), each showing a placeholder image area (with a Construction/ImageOff icon since we don't have real photos yet) and the numbered subcategory name as a caption below
- On mobile: sidebar collapses above the grid (stacked layout)

This keeps the existing card-based layout as a fallback for categories without images, while Galvanika (and future categories) get the richer visual treatment matching the screenshot's structure.

### Files to modify
- `src/data/catalog.ts` — add `description` to interface and Galvanika data
- `src/pages/CatalogPage.tsx` — implement the two-column layout with sidebar + image grid

