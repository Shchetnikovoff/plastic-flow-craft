

## Plan: Replace Hero Images with Collage

### What Changes
Remove the first hero image (`emkosti-hero-1.png`) from the EmkostiPage hero section and replace the two-image grid with a single collage that combines the second hero image (`emkosti-hero-2.png`) with the main images from all 9 емкости subsections.

### File Changes

**`src/pages/EmkostiPage.tsx`** (lines 116-124):
- Remove the 2-column grid with two separate images
- Replace with a single-column collage layout: a CSS grid showing the second hero image prominently (larger, spanning full width or half) alongside thumbnails of all 9 subsection main images arranged in a compact mosaic/grid
- Images sourced from catalog data (lines 34-42 of catalog.ts):
  1. `/images/emkosti-vert-pp-group.png`
  2. `/images/emkost-horiz-group.png`
  3. `/images/emkosti-podzemnye-1.jpg`
  4. `/images/emkost-pryam-pp-1.png`
  5. `/images/emkost-pryam-pp-2.png`
  6. `/images/emkosti-sejsmicheskie.png`
  7. `/images/emkosti-shchelochi-thumb.png`
  8. `/images/emkosti-kisloty-thumb.png`
  9. `/images/emkost-perelivnaya-bassein.jpg`
- Layout: Hero image (`emkosti-hero-2.png`) takes ~50% width on left, right side shows a 3x3 grid of the 9 subsection thumbnails
- All images use `object-contain` with rounded borders per design standard

