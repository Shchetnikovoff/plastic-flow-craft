

## Plan: Add "Наклонное дно" subsection to 6.1 Vertical Cylindrical Tanks

**What:** Create a new subpage for "Вертикальная цилиндрическая ёмкость с наклонным дном" (ЕВПП-НД) following the same pattern as the existing EVPP flat-roof page, using the two uploaded images.

### Changes

**1. Copy uploaded images to project**
- `user-uploads://Emkost-vertikalnaya-tsilindricheskaya-naklonnoe-dno.jpg` → `public/images/evpp-sloped-hero.png` (product photo, remove "СВ ПОЛИМЕР" watermark)
- `user-uploads://Emkost-vertikalnaya-tsilindricheskaya-naklonnoe-dno-1.jpg` → `public/images/evpp-sloped-schema.png` (technical schema)

**2. Create `src/pages/EmkostiEvppSloped.tsx`**
- Clone structure from `EmkostiEvpp.tsx`
- Title: "Вертикальная цилиндрическая ёмкость с наклонным дном"
- Description: "Вертикальная цилиндрическая ёмкость с наклонным дном. Полностью закрытая с люком Ø800 мм со съёмной крышкой на болтовом соединении."
- Model table: 17 rows with articles `СЗПК.ЕВПП-НД.1000` through `СЗПК.ЕВПП-НД.50000` (same sizes as ЕВПП from `emkostiProducts.ts`)
- Gallery: hero photo + schema via `ImageGalleryWithLightbox`
- Breadcrumb: Каталог → Ёмкости → Цилиндрические вертикальные → Наклонное дно

**3. Update `src/pages/EmkostiVertikalnye.tsx`**
- Add second entry to `subtypes` array:
  ```
  { id: "naklonnoe-dno", name: "С наклонным дном", image: "/images/evpp-sloped-hero.png",
    path: "/catalog/emkosti/vertikalnye/naklonnoe-dno", description: "Ёмкость с наклонным дном для полного слива жидкости. Люк Ø800 мм." }
  ```

**4. Update `src/App.tsx`**
- Import `EmkostiEvppSloped`
- Add route: `<Route path="/catalog/emkosti/vertikalnye/naklonnoe-dno" element={<EmkostiEvppSloped />} />`

**5. Update `src/pages/Product.tsx`**
- Add `evpp-sloped` category handling in `parseEmkostArticle` to return hero + schema images for ЕВПП-НД product cards

### Files modified
- `public/images/evpp-sloped-hero.png` — new (cleaned product photo)
- `public/images/evpp-sloped-schema.png` — new (technical schema)
- `src/pages/EmkostiEvppSloped.tsx` — new page
- `src/pages/EmkostiVertikalnye.tsx` — add subtype card
- `src/App.tsx` — add route
- `src/pages/Product.tsx` — add ЕВПП-НД product card support

