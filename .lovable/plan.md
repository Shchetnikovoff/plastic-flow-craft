

## Plan: Unify styling across the site

After reviewing all pages and components, here are the inconsistencies found and proposed fixes:

### 1. Responsive padding on Product page
`Index.tsx` uses `px-4 sm:px-6 py-6 sm:py-8` but `Product.tsx` uses fixed `px-6 py-8` (breaks on narrow screens).
**Fix**: Update Product.tsx main containers to use `px-4 sm:px-6 py-6 sm:py-8`.

### 2. Section heading sizes
- Index.tsx: `text-lg font-bold uppercase tracking-wide` for all h2
- Product.tsx: `text-xl font-bold` for h1, `text-sm font-bold uppercase tracking-wide` for h2
- Table title in Index: `text-sm font-bold uppercase` (smaller than other h2s)

**Fix**: Standardize all section headings:
- Page title (h1): `text-xl sm:text-2xl font-bold`
- Section headings (h2): `text-base font-bold uppercase tracking-wide`
- Table sub-title: same as h2 but `text-center`

### 3. Section bottom margins
Index.tsx mixes `mb-8 sm:mb-10`, `mb-10`, `mb-4`. 
**Fix**: Use consistent `mb-8` for all major sections, `mb-4` for sub-sections.

### 4. Header logo size
`md:h-56` (224px) is excessively tall — dominates the viewport.
**Fix**: Cap at `md:h-40` (160px) for a more balanced header.

### 5. Unused components cleanup
`ProductTable.tsx` and `ProductGallery.tsx` use old data imports (`productSizes`, `productImages`) and aren't referenced from any page. They appear to be legacy.
**Fix**: No change (out of scope), but worth noting.

### Files to edit
- **`src/pages/Index.tsx`** — normalize heading sizes, consistent margins
- **`src/pages/Product.tsx`** — add responsive padding, align heading styles
- **`src/components/Header.tsx`** — reduce max logo height

