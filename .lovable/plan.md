

## Plan: Update ЖУП product card schemas from ПЭ-3.5-500 reference

**What:** Replace the current 4 schemas in ЖУП product cards with the 3 technical schemas from the ПЭ-3.5-500 product page, recolored to corporate colors.

### Source images (from ПЭ-3.5-500 page)

1. Schema 1 (front view): `api.trueapp.ru/.../1694181226157.png`
2. Schema 2 (side view): `api.trueapp.ru/.../1694181226229.png`
3. Schema 3 (top view): `api.trueapp.ru/.../1694181226343.png`

### Changes

**1. Download and recolor 3 schemas**
- Download all 3 schema images from the ПЭ-3.5-500 product page
- Recolor blue elements to RAL 7032 (#CBCEC0) / RAL 7024 (#3A3D3F)
- Save as `public/images/zhu-p-schema1.png`, `zhu-p-schema2.png`, `zhu-p-schema3.png` (replace existing)

**2. `src/pages/Product.tsx` — Gallery (line 1358-1359)**
- Update ЖУП gallery from 4 images to 3 (remove schema4 which came from a different product):
```
["/images/zhu-p-schema1.png", "/images/zhu-p-schema2.png", "/images/zhu-p-schema3.png"]
```

### Files modified
- `public/images/zhu-p-schema1.png` — recolored front schema (replace)
- `public/images/zhu-p-schema2.png` — recolored side schema (replace)
- `public/images/zhu-p-schema3.png` — recolored top schema (replace)
- `src/pages/Product.tsx` — gallery array reduced to 3 images

