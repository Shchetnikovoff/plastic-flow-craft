

## Plan: Add reference schemas and technical data to ЖУП product cards

**What:** Download 4 technical schemas from the zasorov-net.ru rectangular grease trap product page, recolor to corporate RAL 7032/7024, update gallery and add detailed technical specs to ЖУП product cards.

### Source images (from ПЭ-11-1500 product page)

1. Main schema (front view): `api.trueapp.ru/.../1694607764541.png`
2. Schema 2 (side view): `api.trueapp.ru/.../1694613151726.png`
3. Schema 3 (top view): `api.trueapp.ru/.../1694613151819.png`
4. Schema 4 (detail): `api.trueapp.ru/.../1694613151893.png`

### Reference technical data (ПЭ-11-1500 = 3 л/с model)

- Well height: 120 mm
- Inlet height: 1040 mm
- Outlet height: 990 mm
- Pipe diameter: 110 mm
- Weight: 145 kg

### Changes

**1. Download and recolor 4 schemas**
- Download all 4 schema images from the reference page
- Recolor blue elements to RAL 7032 (#CBCEC0) / RAL 7024 (#3A3D3F)
- Save as `public/images/zhu-p-schema1.png` through `zhu-p-schema4.png` (replace existing 3, add 4th)

**2. `src/pages/Product.tsx` — Gallery (line 1358-1359)**
- Expand ЖУП gallery from 3 to 4 images:
```
["/images/zhu-p-schema1.png", "/images/zhu-p-schema2.png", "/images/zhu-p-schema3.png", "/images/zhu-p-schema4.png"]
```

**3. `src/pages/Product.tsx` — ЖУП model data (lines 1259-1271)**
- Add `wellHeight`, `inletHeight`, `outletHeight` values for all 13 ЖУП models (proportionally scaled from reference data)
- Fill in currently empty `-` fields with actual values

**4. `src/pages/Product.tsx` — ЖУП technical characteristics grid (lines 1390-1468)**
- Replace "Ø корпуса" / "Ø колодца" labels with rectangular-specific labels: "Длина×Ширина корпуса", "Высота колодца"
- Add conditional rendering for ЖУП articles to show rectangular layout vs. circular layout
- Update description text (line 1476-1484) to mention rectangular form factor, sedimentation plates, EPDM gasket

### Files modified
- `public/images/zhu-p-schema1.png` — recolored front schema (replace)
- `public/images/zhu-p-schema2.png` — recolored side schema (replace)
- `public/images/zhu-p-schema3.png` — recolored top schema (replace)
- `public/images/zhu-p-schema4.png` — recolored detail schema (new)
- `src/pages/Product.tsx` — gallery array, model data, characteristics grid, description

