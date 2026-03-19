

## Plan: Replace sludge dewatering section image with uploaded render

### What changes
1. Copy the uploaded image to `public/images/obezvozhivatel-real-3d-new.png`
2. Update `src/data/catalog.ts` line 54 — change image path from `/images/obezvozhivatel-real-3d.png` to the new file
3. Update `src/pages/Vodoochistka.tsx` if it references the old image for this section
4. The uploaded image already has a light grey tone consistent with RAL 7032 — no color processing needed

### Files to modify
- **`public/images/`** — copy uploaded image
- **`src/data/catalog.ts`** — update image path for "Мешочный обезвоживатель осадка" (line 54)
- **`src/pages/Vodoochistka.tsx`** — update image reference if present in modifications section

