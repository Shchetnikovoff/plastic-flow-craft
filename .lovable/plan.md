

## Plan: Generate images for all placeholder spots in the project

### Problem
~40 catalog items show an empty `ImageOff` icon instead of a product image, and 3 landing pages (ФВГ, Каплеуловители, Дозирование) have no hero images at all.

### Approach
Use the AI image generation model (Nano banana / gemini-2.5-flash-image) to generate product images for each category, then save them as PNG files in `public/images/`. For catalog thumbnails, generate one representative image per subcategory. For landing pages, generate 2 hero images each.

### Images to generate (~45 total)

**Landing page hero images (6):**
- `fvg-hero-1.png`, `fvg-hero-2.png` — galvanic fiber filter (ФВГ), industrial air filtration unit, polypropylene body
- `kapleulovitel-hero-1.png`, `kapleulovitel-hero-2.png` — polypropylene droplet separator, cylindrical ventilation unit
- `dozirovanie-hero-1.png`, `dozirovanie-hero-2.png` — dosing station, three-chamber polymer unit with pumps

**Catalog thumbnails (39):**

Гальваника (8):
- `galvanika-linii-ruchnye.png` — manual galvanic line
- `galvanika-linii-mekh.png` — mechanized galvanic line
- `galvanika-linii-avto.png` — automatic galvanic line
- `galvanika-podgotovka.png` — surface preparation line
- `galvanika-vanny.png` — galvanic bath
- `galvanika-kolokolnye.png` — bell-shaped bath
- `galvanika-barabany.png` — galvanic drum
- `galvanika-zapchasti.png` — galvanic spare parts

Водоподготовка (1):
- `vodopodgotovka-osmos.png` — reverse osmosis system

Вентиляция прямоугольная (4):
- `vent-vozdukhovod-pryam.png`, `vent-otvod-pryam.png`, `vent-troynik-pryam.png`, `vent-perekhod.png`

Газоочистка (2):
- `fvg-thumb.png`, `kapleulovitel-thumb.png`

Водоочистка (7):
- `ffu-thumb.png`, `lamelnyj-thumb.png`, `obezvozhivatel-thumb.png`, `dozirovanie-thumb.png`, `zhiroulovitel-thumb.png`, `los-thumb.png`, `shkafy-thumb.png`

Реакторы (3):
- `reaktor-pp.png`, `reaktor-pe.png`, `reaktor-gidro.png`

Гидрометаллургия (4):
- `gm-reaktor.png`, `gm-nutch.png`, `gm-vyshchelach.png`, `gm-sorbtsionnye.png`

КНС (2):
- `kns-svt.png`, `kns-pp.png`

Лабораторная мебель (8):
- `lab-mebel.png`, `lab-shkaf.png`, `lab-vytyazhnoy.png`, `lab-moyka.png`, `lab-stol.png`, `lab-tumba.png`, `lab-tumba-moyka.png`, `lab-tumba-sushilka.png`

Шкафы управления (3):
- `su-galvanika.png`, `su-ochistnye.png`, `su-nasosy.png`

Услуги (4):
- `uslugi-proekt-vodo.png`, `uslugi-proekt-kns.png`, `uslugi-montazh-emk.png`, `uslugi-montazh-kns.png`

### Files modified
1. **~45 new PNG files** in `public/images/` — AI-generated product images
2. **`src/data/catalog.ts`** — add `image` property to all subcategories without one
3. **`src/pages/GazoochistkaFvg.tsx`** — add hero image grid section
4. **`src/pages/GazoochistkaKapleuloviteli.tsx`** — add hero image grid section
5. **`src/pages/VodoochistkaDozirovanie.tsx`** — add hero image grid section

### Implementation
Each image will be generated with a prompt describing the specific industrial equipment on a clean white/light background, photorealistic style, suitable for a product catalog. Images will be generated in batches and saved to `public/images/`.

### Note
This is a large operation (~45 API calls). Generation will be done in parallel batches to optimize speed.

