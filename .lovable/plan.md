

## Plan: Replace image for "Ёмкость для щелочи" (e7)

### Changes

1. **Copy uploaded image** to `public/images/emkosti-shchelochi-real.jpg`

2. **Update `src/data/catalog.ts` line 37** — change `image` from `/images/emkosti-shchelochi-thumb.png` to `/images/emkosti-shchelochi-real.jpg`

### Files
- **Copy**: `user-uploads://Вертикальные_емкости_из_ПНД_для_щелочи.jpg` → `public/images/emkosti-shchelochi-real.jpg`
- **Modify**: `src/data/catalog.ts` (line 37, image path only)

