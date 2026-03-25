

## Plan: Add Collage to Vodoochistka Hero Section

Replace the single hero image with a collage identical in style to the EmkostiPage: main image on the left (~60%), 3-column thumbnail grid on the right (~40%).

### Changes

**`src/pages/Vodoochistka.tsx`** (lines 201-205):
- Replace the single full-width image container with a 2-column grid using `lg:grid-cols-[3fr_2fr]`
- Left column: the existing `vodoochistka-hero-real.jpeg` in a large container with `min-h-[400px]`
- Right column: grid of 7 subcategory thumbnails in a `grid-cols-3` layout (fills 2 rows of 3 + 1 remaining), using images from catalog data:
  - ФФУ (`ffu-real-3d.png`)
  - Ламельный отстойник (`lamelnyj-thumb-new.png`)
  - Обезвоживатель (`obezvozhivatel-3d-ral7032.jpg`)
  - Станция дозирования (`spr-hero-ral7032.jpg`)
  - Жироуловители (`zhu-vertical-ral.jpg`)
  - КОС (`vodoochistka-kos-kompakt.jpg`)
  - Шкафы дозирования (`vodoochistka-dozirovanie-grundfos.jpg`)
- Each thumbnail in a square card with `aspect-square`, `object-contain`, rounded border — same styling as EmkostiPage

