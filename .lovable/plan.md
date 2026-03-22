

## Plan: Update rectangular grease trap page with reference images and technical data

**What:** Download product images and technical schemas from the zasorov-net.ru rectangular grease traps page, recolor to corporate RAL 7032/7024, update the ZhuPryamougolnye page with accurate dimensions from the reference, and add schemas to the product card gallery.

### Reference data extracted

From zasorov-net.ru, the rectangular models have these real dimensions (Д×Ш×В):
- 1 л/с, 500 л — 1050×750×1120
- 2 л/с, 1000 л — 1400×850×1320
- 3 л/с, 1500 л — 1500×1000×1320
- 4 л/с, 2000 л — 1650×1000×1500
- 5 л/с, 2500 л — 1650×1200×1520
- 6 л/с, 3000 л — 1750×1250×1670
- 7 л/с, 3500 л — 2000×1300×1670
- 8 л/с, 4000 л — 2000×1500×1670
- 9 л/с, 4500 л — 2300×1500×1670
- 10 л/с, 5000 л — 2550×1500×1670
- 15 л/с, 7500 л — 2800×1500×2020
- 20 л/с, 10000 л — 3500×1600×2020
- 25 л/с, 12500 л — 4000×1650×2120

### Changes

**1. Download and recolor images**
- Download hero photo from reference (blue rectangular unit) → recolor to RAL 7032 body / RAL 7024 frame → `public/images/zhu-p-hero-ral7032.jpg`
- Download 4-5 product gallery images (schemas, views) → recolor → `public/images/zhu-p-schema1.png` through `zhu-p-schema5.png`

**2. `src/pages/ZhuPryamougolnye.tsx`**
- Update `models` array: expand from 9 models to 13 (add throughput 4, 7, 9, 20, 25) with correct dimensions from reference
- Update hero images: replace `zhu-rectangular-ral.jpg` / `zhu-vertical-ral.jpg` with `zhu-p-hero-ral7032.jpg` + schemas
- Update description with technical details from reference (sedimentation plates, sealed lid with gasket, installation in technical rooms)

**3. `src/pages/Product.tsx`**
- Update `zhuModels` array for ЖУП entries: add missing models (4, 6, 7, 9, 20, 25), correct dimensions to match reference
- Update gallery logic (line 1350-1355): add condition for `.ЖУП.` articles to show rectangular-specific images

### Files modified
- `public/images/` — 5-6 new recolored images
- `src/pages/ZhuPryamougolnye.tsx` — models, images, description
- `src/pages/Product.tsx` — ЖУП models + gallery images

