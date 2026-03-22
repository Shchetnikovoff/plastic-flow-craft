

## Plan: Replace schema with product photo from reference site

**What:** Replace the technical schema (`zhu-p-schema1.png`) in the hero section of the rectangular grease traps page with an actual product photo from zasorov-net.ru, recolored to corporate RAL 7032/7024.

### Changes

**1. Download and recolor product photo**
- Source: `https://api.trueapp.ru/images/products/5da71ca85fe6bf20ec090b46-1720698336518.jpg` (blue rectangular grease trap photo from reference)
- Recolor blue elements to RAL 7032 (#CBCEC0) body / RAL 7024 (#3A3D3F) frame
- Save as `public/images/zhu-p-hero-ral7032.jpg` (overwrite existing)

**2. `src/pages/ZhuPryamougolnye.tsx`** (line 76)
- Change hero image `src` from `/images/zhu-p-schema1.png` to `/images/zhu-p-hero-ral7032.jpg`
- Update alt text to "Прямоугольный жироуловитель — фото продукции"

### Files modified
- `public/images/zhu-p-hero-ral7032.jpg` — recolored product photo
- `src/pages/ZhuPryamougolnye.tsx` — hero image source

