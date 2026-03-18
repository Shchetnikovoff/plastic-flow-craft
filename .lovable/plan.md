

## Plan: Replace Водоочистка Category Image

### What
Replace the main catalog image for the "Водоочистка" section with the uploaded 3D render of a water treatment complex, recolored to match the established color standard:
- **Корпуса и ёмкости** → Серый RAL 7032 (light grey, ~RGB 189,185,176)
- **Каркасы и рамы** → Графит RAL 7024 (dark grey, ~RGB 74,74,74)

### Steps

1. **Recolor the image** using AI image generation (Nano banana 2) — instruct the model to recolor the dark equipment bodies and white tanks to Grey RAL 7032, and keep/darken structural frames to graphite RAL 7024. Preserve blue accents (motors, pipes) and the light background.

2. **Save the result** as `public/images/vodoochistka-collage-hero.png`.

3. **Update `src/data/catalog.ts`** — add `image: "/images/vodoochistka-collage-hero.png"` to the `vodoochistka` category object (same pattern as `emkosti` category already has).

### Files Modified
- `public/images/vodoochistka-collage-hero.png` — new asset
- `src/data/catalog.ts` — add category-level image field

