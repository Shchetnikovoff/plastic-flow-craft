

## Plan: Create "Скрубберы" landing page (vertical + horizontal)

### What we're building
A unified landing page at `/catalog/gazoochistka/skrubbery` covering both vertical (CH series, 17 models) and horizontal (CT series, 19 models) scrubbers. Uses Tabs to switch between the two product types. Save 4 uploaded product images.

### Changes

#### 1. Save 4 uploaded images
- `user-uploads://скруббер_вертикальный....jpg` → `public/images/skrubber-vertikalnyj-1.jpg`
- `user-uploads://скруббер_вертикальный.jpg` → `public/images/skrubber-vertikalnyj-2.jpg` (technical drawing)
- `user-uploads://скруббер_горизонтальный....jpg` → `public/images/skrubber-gorizontalnyj-1.jpg`
- `user-uploads://скруббер_тгоризонт.png` → `public/images/skrubber-gorizontalnyj-2.png`

#### 2. New file: `src/pages/GazoochistkaSkrubbery.tsx` (~480 lines)
Same pattern as VodoochistkaLos.tsx (Tabs-based layout):

- **Breadcrumbs**: Каталог → Газоочистка → Скрубберы
- **Hero**: Title "Промышленные скрубберы", subtitle about gas cleaning from toxic/acid/aerosol emissions, 2 product images, CTA button
- **Intro**: "Почему выбирают" bullets (степень очистки до 99.99%, производительность до 100 000 м³/ч, температура до +400°C, химстойкие материалы ПП/ПЭ/нерж/титан/фторопласт, полный цикл)

- **Tabs**: "Вертикальные (серия CH)" / "Горизонтальные (серия CT)"

- **Tab 1 — Скруббер вертикальный (CH)**:
  - Images: skrubber-vertikalnyj-1.jpg, skrubber-vertikalnyj-2.jpg
  - Description: насадочный абсорбер с неподвижным слоем, очистка от химически активных газов, аэрозолей, туманов. Расход 100–40 000 м³/ч.
  - Principle: загрязненный газ проходит через слой насадки (кольца Палля, Рашига, седла Intalox), орошаемой абсорбентом → абсорбция/хемосорбция → каплеуловитель → чистый воздух
  - Table (17 models, 4 columns):

    | Артикул | Расход, м³/ч | Ø D, мм | Габариты, мм |
    |---------|-------------|---------|--------------|
    | CH-0,1 | 100 | 160 | 1050×1550×3900 |
    | CH-0,5 | 500 | 170 | 1050×1550×4000 |
    | CH-1 | 1000 | 190 | 1050×1550×4100 |
    | CH-1,5 | 1500 | 230 | 1050×1650×4200 |
    | CH-2 | 2000 | 260 | 1150×1700×4400 |
    | CH-3 | 3000 | 290 | 1250×1790×4600 |
    | CH-4 | 4000 | 320 | 1350×1900×4700 |
    | CH-5 | 5000 | 370 | 1450×2000×4890 |
    | CH-6 | 6000 | 425 | 1550×2150×5200 |
    | CH-8 | 8000 | 475 | 1680×2300×5400 |
    | CH-10 | 10000 | 525 | 1800×2400×5600 |
    | CH-12 | 12000 | 580 | 2000×2550×5790 |
    | CH-15 | 15000 | 650 | 2150×2850×5910 |
    | CH-20 | 20000 | 720 | 2390×3100×6100 |
    | CH-25 | 25000 | 850 | 2600×3250×6400 |
    | CH-30 | 30000 | 950 | 3000×3600×6700 |
    | CH-40 | 40000 | 1000 | 3180×3780×7400 |

- **Tab 2 — Скруббер горизонтальный (CT)**:
  - Images: skrubber-gorizontalnyj-1.jpg, skrubber-gorizontalnyj-2.png
  - Description: компактный горизонтальный абсорбер для объектов с ограниченной высотой (до 3 м). Расход 500–60 000 м³/ч.
  - Table (19 models, 4 columns):

    | Артикул | Расход, м³/ч | Ø D, мм | Габариты, мм |
    |---------|-------------|---------|--------------|
    | CT-0,5 | 500 | 160 | 2250×1050×1550 |
    | CT-1 | 1000 | 170 | 2250×1050×1550 |
    | ... through CT-60 | 60000 | 1250 | 3700×2350×3000 |

- **Section — Области применения**: 6 cards (гальваника, металлургия, химия/нефтехимия, ЦБК/полиграфия, ЛКМ, очистные/пищевая)
- **Section — Комплектация**: базовая (колонна, насадка, бак, насос, каплеуловитель, панель управления) + опции (газоходы, вентиляторы, дозирование реагентов, датчики pH/давления, теплоизоляция)
- **Section — Преимущества сотрудничества**: 6 cards
- **CTA form**: Contact form

#### 3. Update `src/data/catalog.ts`
- go1: add `externalPath: "/catalog/gazoochistka/skrubbery"`, `image: "/images/skrubber-vertikalnyj-1.jpg"`
- go2: add `externalPath: "/catalog/gazoochistka/skrubbery"`, `image: "/images/skrubber-gorizontalnyj-1.jpg"` (both point to same page, different tabs auto-selected is optional — or just same URL)

#### 4. Update `src/App.tsx`
Add route + import: `/catalog/gazoochistka/skrubbery` → `GazoochistkaSkrubbery`

### Files modified
- 4 images in `public/images/`
- `src/pages/GazoochistkaSkrubbery.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update go1, go2 with externalPath)

