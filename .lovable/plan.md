

## Plan: Regenerate all grease trap images in corporate RAL 7032/7024 colors

**What:** Generate new images for all grease trap types in the unified industrial color scheme (Grey RAL 7032 body, Graphite RAL 7024 frame/pipes) and update references across all pages.

### Current state

Images used across grease trap pages:
- `zhu-pv-hero-ral7032.jpg` — already in corporate colors (underground vertical)
- `zhu-vertical-ral.jpg` — needs verification/regeneration
- `zhu-horizontal-ral.jpg` — needs verification/regeneration
- `zhu-rectangular-ral.jpg` — needs verification/regeneration
- `zhu-underground-ral.jpg` — needs verification/regeneration
- `zhu-pv-schema1–5.png` — technical schemas (keep as-is)
- `zhiroulovitel-hero-1.png` — old hero image
- `zhiroulovitel-thumb.png` — catalog thumbnail

Product card gallery (Product.tsx line 1351) uses only underground vertical images for ALL grease trap types — needs per-type galleries.

### Changes

**1. Generate 4 hero images via AI (Nano banana 2)**
Each on clean white background, polypropylene body in RAL 7032 (#CBCEC0), pipes/frames in RAL 7024 (#3A3D3F):
- Underground vertical grease trap → `zhu-pv-hero-ral7032.jpg` (already done)
- Above-ground vertical grease trap → `zhu-nv-hero-ral7032.jpg`
- Horizontal grease trap → `zhu-g-hero-ral7032.jpg`
- Rectangular grease trap → `zhu-p-hero-ral7032.jpg`

**2. Update sub-category pages with new images**
- `ZhuNazemnyeVertikalnye.tsx` — replace `zhu-vertical-ral.jpg` and `zhu-underground-ral.jpg` with `zhu-nv-hero-ral7032.jpg`
- `ZhuGorizontalnye.tsx` — replace `zhu-horizontal-ral.jpg` and `zhu-underground-ral.jpg` with `zhu-g-hero-ral7032.jpg`
- `ZhuPryamougolnye.tsx` — replace `zhu-rectangular-ral.jpg` and `zhu-vertical-ral.jpg` with `zhu-p-hero-ral7032.jpg`

**3. Update hub page `VodoochistkaZhirouloviteli.tsx`**
- Hero images: use `zhu-pv-hero-ral7032.jpg` + `zhu-g-hero-ral7032.jpg`
- Category card thumbnails: update each to its corresponding new hero image

**4. Update catalog thumbnail `catalog.ts`**
- Replace `zhu-vertical-ral.jpg` with `zhu-pv-hero-ral7032.jpg`

**5. Update Product.tsx gallery per type**
- Underground vertical (ЖУ): keep current 6-image gallery
- Above-ground vertical (ЖУН): `[zhu-nv-hero-ral7032.jpg, zhu-pv-schema1.png, zhu-pv-schema2.png]`
- Horizontal (ЖУГ): `[zhu-g-hero-ral7032.jpg, zhu-pv-schema1.png, zhu-pv-schema2.png]`
- Rectangular (ЖУП): `[zhu-p-hero-ral7032.jpg]`

### Files modified
- `public/images/` — 3 new generated images
- `src/pages/ZhuNazemnyeVertikalnye.tsx`
- `src/pages/ZhuGorizontalnye.tsx`
- `src/pages/ZhuPryamougolnye.tsx`
- `src/pages/VodoochistkaZhirouloviteli.tsx`
- `src/pages/Product.tsx`
- `src/data/catalog.ts`

