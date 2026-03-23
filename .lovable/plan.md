

## Plan: Fix EVPP product card issues

**Problems found:**
1. Articles `СЗПК.ЕВПП-КД.*` (conusdno) are not registered in `emkostiProducts.ts` — clicking any row shows "Товар не найден"
2. Product card images for all EVPP types are too small — `ImageGalleryWithLightbox` renders only a row of small thumbnails without a large main image preview
3. Hero images on all 4 subsection pages are clean (no watermarks found)

### Changes

**1. `src/data/emkostiProducts.ts`** — Add `evpp-conusdno` category
- Add new category entry with `id: "evpp-conusdno"`, `items: makeTable("ЕВПП-КД")` to the `vertical-pp` group

**2. `src/components/configurator/ImageGalleryWithLightbox.tsx`** — Add large main image
- Add a large main image display above the thumbnail row showing `images[selectedImage]` at full width in an `aspect-square` container with `object-contain`
- Clicking the main image opens the lightbox
- Thumbnails below select the main image (existing click-to-lightbox behavior preserved)

**3. `src/pages/Product.tsx`** — Add `evpp-conusdno` to schema image mapping
- Add `cat.id === "evpp-conusdno"` case to the `schemaImage` ternary (line 53) — this line already exists, confirming it's already handled
- Add `cat.id.includes("conusdno")` to the image selection logic (line 45-48) so it picks the correct hero image `/images/evpp-conusdno-hero.png`

### Files modified
- `src/data/emkostiProducts.ts` — add conusdno category
- `src/components/configurator/ImageGalleryWithLightbox.tsx` — add large main image
- `src/pages/Product.tsx` — add conusdno image mapping

