

## Plan: Replace leaching unit image with uploaded render, recolor to industrial palette

### What needs to happen

1. **Copy uploaded image** to `public/images/gm-vyshchelach.png`, replacing the current placeholder.

2. **Recolor the image** using Canvas API processing (similar to the existing `src/lib/processImage.ts` pattern) to match the project's industrial color standard:
   - Equipment body: Grey RAL 7032 (~#B8B4A8)
   - The uploaded image is already mostly grey, so only the blue motor/gearbox accent needs to stay blue (it matches the project convention of blue accents for motors).
   - The body is already close to the correct grey tone. A light hue/saturation adjustment via Canvas API will unify it with the RAL 7032 standard used across the catalog.

3. **No code changes needed** — the image path `gm-vyshchelach.png` is already referenced in:
   - `src/data/catalog.ts` (subcategory card)
   - `src/pages/Product.tsx` (product detail pages + KP button)

### Steps

1. Copy `user-uploads://inpro-equipment-reac.jpg` to `public/images/gm-vyshchelach.png`
2. Write a Python script to adjust the image colors: desaturate the body toward RAL 7032 grey while preserving the blue motor accent
3. Overwrite the file with the recolored version
4. Verify the result visually

