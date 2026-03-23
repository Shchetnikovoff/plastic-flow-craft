

## Plan: Process EVPP images and add schema to product cards

**What:** Clean up the hero image on the EVPP page (remove "СВ ПОЛИМЕР" watermark, apply corporate RAL 7032 color), and add the technical schema to individual EVPP product cards in `Product.tsx`.

### Changes

**1. Reprocess hero image `public/images/evpp-flat-hero.png`**
- Use AI image generation to remove the "СВ ПОЛИМЕР" watermark/logo
- Recolor the tank body to RAL 7032 (#CBCEC0) grey, structural elements to RAL 7024 (#3A3D3F)
- Save clean version back to `public/images/evpp-flat-hero.png`

**2. Update `src/pages/Product.tsx` — add schema to EVPP product cards**
- In `parseEmkostArticle()` (line ~47), when `cat.id === "evpp-flat"`, return an additional `schemaImage` field pointing to `/images/evpp-flat-schema.png`
- In the emkost product card rendering (lines 321-348), add the schema image below the main product photo when `schemaImage` is present — displayed as a secondary image in the gallery area
- Use `ImageGalleryWithLightbox` component (already exists) to show both the product photo and schema as a 2-image gallery with lightbox support

**3. Update `parseEmkostArticle` return type** to include optional `schemaImage?: string` field, and update the rendering block to show a gallery when multiple images are available instead of a single `<img>`.

### Files modified
- `public/images/evpp-flat-hero.png` — cleaned and recolored
- `src/pages/Product.tsx` — gallery with schema for EVPP cards

