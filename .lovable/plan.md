

## Plan: Download rectangular grease trap images from reference and recolor to corporate scheme

**What:** Download 5 product images (1 photo + 4 schemas) from the zasorov-net.ru rectangular grease trap product page, recolor them to corporate RAL 7032/7024, and update the rectangular section page and product card gallery.

### Source images (from ПЭ-3.5-500 product page)

1. Hero photo (blue rectangular unit): `api.trueapp.ru/.../1720698336518.jpg`
2. Front schema drawing: `api.trueapp.ru/.../1694181226157.png`
3. Side schema drawing: `api.trueapp.ru/.../1694181226229.png`
4. Top schema drawing: `api.trueapp.ru/.../1694181226343.png`
5. Additional photo: `api.trueapp.ru/.../1759825149616.jpg`

### Changes

**1. Download and recolor 5 images**
- Download all 5 images from reference, recolor blue elements to RAL 7032 (#CBCEC0) body / RAL 7024 (#3A3D3F) pipes and frames
- Save as:
  - `public/images/zhu-p-hero-ral7032.jpg` (replace existing)
  - `public/images/zhu-p-schema1.png` (replace existing)
  - `public/images/zhu-p-schema2.png` (replace existing)
  - `public/images/zhu-p-schema3.png` (replace existing — was blank)
  - `public/images/zhu-p-photo2.jpg` (new additional photo)

**2. `src/pages/ZhuPryamougolnye.tsx`** — Update hero section images to show new hero + front schema

**3. `src/pages/Product.tsx`** (line 1358-1359) — Expand ЖУП gallery from 4 to 5 images:
```tsx
["/images/zhu-p-hero-ral7032.jpg", "/images/zhu-p-schema1.png", "/images/zhu-p-schema2.png", "/images/zhu-p-schema3.png", "/images/zhu-p-photo2.jpg"]
```

### Files modified
- `public/images/` — 5 recolored images (4 replaced + 1 new)
- `src/pages/ZhuPryamougolnye.tsx` — hero images
- `src/pages/Product.tsx` — ЖУП gallery array

