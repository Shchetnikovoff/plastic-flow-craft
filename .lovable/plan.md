

## Plan: Enlarge FFU product card image to fill window width

**Problem**: The FFU product image is constrained inside a 2-column grid (`md:grid-cols-2`) with `aspect-[4/3]`, making it small relative to the page width.

**Change** (`src/pages/Product.tsx`, lines 534-540):
- Move the image above the 2-column grid so it spans the full `max-w-[960px]` container width
- Remove `aspect-[4/3]` constraint, use a larger responsive container
- Keep `object-contain` and padding so the image scales naturally without cropping

**Result**: The FFU product image will display at full page width, similar to hero images on other pages, before the specs/cart section below.

