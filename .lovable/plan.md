

## Plan: Remove Watermarks from KNS PP Image and Apply Everywhere

### Goal
Remove the "СВ ПОЛИМЕР" watermarks from the uploaded 3D render of the polypropylene KNS, then use the cleaned image as the main visual across all KNS PP pages and product cards.

### Steps

1. **Process the uploaded image** — Copy `user-uploads://i-3.webp` to `/tmp/`, use the AI image editing skill to remove the two "СВ ПОЛИМЕР" watermarks (top and bottom of the cylinder), output a clean PNG.

2. **Save the cleaned image** — Copy the result to `public/images/kns-pp-cutaway-v3.jpg` (replacing the current generated image).

3. **Verify references are correct** — The following files already reference `kns-pp-cutaway-v3.jpg`:
   - `src/pages/KnsPpPage.tsx` (hero section)
   - `src/pages/Product.tsx` (product detail cards)
   - `src/data/catalog.ts` (catalog tile)
   
   No code changes needed if the filename stays the same.

4. **QA** — Visually inspect the cleaned image to confirm watermarks are fully removed and the render quality is preserved.

