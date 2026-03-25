

## Plan: Remove First Hero Image on Vertical Tanks Page

The page `EmkostiPryamougolnyeVertikalnye.tsx` has two hero images in a 2-column grid (lines 238-245). The first image (`emkost-pryam-vert-hero.png`, line 240) shows a horizontal tank and needs to be removed, leaving only the second (correct vertical) render.

### Changes

**`src/pages/EmkostiPryamougolnyeVertikalnye.tsx`** (lines 238-245):
- Remove the first `<div>` with the horizontal tank image
- Change the grid from `grid-cols-2` to a single centered image container
- Keep only the second image (the color-reactive vertical render)

