

## Plan: Update reagent station images with uploaded photo in RAL 7032

**What:** Replace all reagent preparation station images with the uploaded photo, recolored to the standard Grey RAL 7032 body / Graphite RAL 7024 frame scheme.

### Changes

**1. Copy uploaded image** to `public/images/spr-hero-ral7032.jpg`

**2. Recolor using AI image editing** — Edit the uploaded photo to apply Grey RAL 7032 (#CBCEC0) body and Graphite RAL 7024 (#3A3D3F) frame/pipes, matching the unified industrial color standard.

**3. `src/data/catalog.ts`** (line 55) — Update catalog thumbnail:
- Change `image: "/images/vodoochistka-koagulyant-real.png"` → `image: "/images/spr-hero-ral7032.jpg"`

**4. `src/pages/VodoochistkaDozirovanie.tsx`** (lines 175-176) — Update hero images:
- Replace both `dozirovanie-hero-real.jpg` references with `spr-hero-ral7032.jpg`

**5. `src/pages/Product.tsx`** (line 938) — Update product card gallery:
- Replace `vodoochistka-koagulyant-real.png` and `dozirovanie-hero-real.jpg` with the new image

