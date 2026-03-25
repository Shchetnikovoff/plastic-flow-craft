

## Plan: Use Vertical Render in Product Cards

Currently, when clicking a vertical tank row in the table, the product card page (`Product.tsx`, line 374) shows a horizontal render (`emkost-pryam-goriz-render-grey.png`) with CSS hue-rotate filters for color variants. This needs to be replaced with the actual vertical color-specific images.

### Changes

**`src/pages/Product.tsx`** (lines 362-375):
- Replace the single `epovImage` with a color-based lookup using the same images from the vertical tanks page:
  - `7032` → `/images/emkost-pryam-vert-gray.png`
  - `5012` → `/images/emkost-pryam-vert-blue.png`
  - `9003` → `/images/emkost-pryam-vert-white.png`
  - `""` (PE100) → `/images/emkost-pryam-vert-black.png`
- Remove `epovColorFilters` and `epovImageFilter` — no CSS filters needed since we have dedicated images per color
- Set `imageFilter` to `undefined` in the returned object

