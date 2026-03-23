

## Plan: Create subpage for vertical cylindrical tanks (flat roof / flat bottom)

**What:** Create a dedicated product subpage at `/catalog/emkosti/vertikalnye-ploskaya` for ЕВПП tanks with product image (recolored from uploaded photo), technical schema, description, and interactive table with 17 models linking to existing product cards.

### Changes

**1. Copy and recolor uploaded images**
- Copy `user-uploads://image-91.png` (product photo) to `public/images/evpp-flat-hero.png` — remove "СВ ПОЛИМЕР" watermark, recolor to RAL 7032 body
- Copy `user-uploads://image-92.png` (schema) to `public/images/evpp-flat-schema.png` — clean technical drawing

**2. Create `src/pages/EmkostiVertikalnyePloskaya.tsx`**
New page following the site template (like EmkostiPodzemnye.tsx):
- Breadcrumb: Каталог > Ёмкости > Вертикальные цилиндрические с плоской крышей
- Hero section with description text and 2-column image grid (photo + schema)
- Anchor navigation pills
- Description section with the provided text about flat roof/flat bottom design, Ø800 mm hatch
- Interactive table with 17 ЕВПП models (1000–50000 L), columns: Артикул, Объём (л), Ø (мм), H (мм)
- Each row is a clickable `<Link>` to `/product/СЗПК.ЕВПП.{volume}` (existing product cards)
- Advantages section, CTA form, PageFooter

**3. Update `src/App.tsx`** — Add route:
```
/catalog/emkosti/vertikalnye-ploskaya → EmkostiVertikalnyePloskaya
```

**4. Update `src/data/catalog.ts`** — Add `externalPath` to subcategory "e1" (Ёмкости цилиндрические вертикальные) pointing to the new page, or add a new subcategory specifically for flat-roof tanks

### Table data (17 rows)
| Артикул | Объём | Ø | H |
|---------|-------|---|---|
| СЗПК.ЕВПП.1000 | 1000 | 940 | 1500 |
| СЗПК.ЕВПП.2000 | 2000 | 1330 | 1500 |
| ... through to ... |
| СЗПК.ЕВПП.50000 | 50000 | 3050 | 7000 |

### Files modified
- `public/images/evpp-flat-hero.png` — recolored product photo (new)
- `public/images/evpp-flat-schema.png` — technical schema (new)
- `src/pages/EmkostiVertikalnyePloskaya.tsx` — new page
- `src/App.tsx` — new route
- `src/data/catalog.ts` — link subcategory to new page

