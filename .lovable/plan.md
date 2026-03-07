

## Plan: Create "Промышленные жироуловители" landing page

### What we're building
A landing page at `/catalog/vodoochistka/zhirouloviteli` for industrial grease traps, with product model table extracted from zasorov-net.ru and AI-generated hero image.

### Changes

#### 1. Generate hero image via AI
Use Nano banana to generate an industrial grease trap illustration → save to `public/images/zhiroulovitel-hero-1.png`.

#### 2. New file: `src/pages/VodoochistkaZhirouloviteli.tsx` (~380 lines)
Same pattern as other vodoochistka pages:

- **Breadcrumbs**: Каталог → Водоочистка → Жироуловители промышленные
- **Hero**: Title "Промышленные жироуловители", subtitle about grease/fat removal from industrial wastewater
- **Intro**: "Почему выбирают" bullets (protection of sewage, food safety compliance, nazemное/подземное installation, polypropylene construction, 5-year warranty)
- **Section 1 — Назначение**: Restaurants, food factories, meat processing, canteens. Removes non-emulsified fats, oils, grease from wastewater
- **Section 2 — Виды**: 4 types as cards (подземные вертикальные, вертикальные наземные, подземные горизонтальные, прямоугольные наземные) with brief descriptions
- **Section 3 — Модельный ряд**: Table with 12 models from the scraped data:

| Артикул | Производительность, л/с | Пиковый сброс, л | Ø корпуса, мм | Высота, мм |
|---------|------------------------|-------------------|---------------|------------|
| ЖУ-3,5-500 | 1 | 500 | 800 | 1300 |
| ЖУ-7-1000 | 2 | 1000 | 1000 | 1600 |
| ЖУ-11-1500 | 3 | 1500 | 1200 | 1500 |
| ЖУ-15-2000 | 4 | 2000 | 1350 | 1550 |
| ЖУ-18-2500 | 5 | 2500 | 1350 | 2000 |
| ЖУ-22-3000 | 6 | 3000 | 1450 | 2000 |
| ЖУ-25-3500 | 7 | 3500 | 1550 | 2000 |
| ЖУ-29-4000 | 8 | 4000 | 1650 | 2000 |
| ЖУ-32-4500 | 9 | 4500 | 1750 | 2000 |
| ЖУ-36-5000 | 10 | 5000 | 1850 | 2000 |
| ЖУ-54-7500 | 15 | 7500 | 2200 | 2000 |

- **Section 4 — Принцип работы**: Gravitational separation — fat rises, solids settle, clean water exits mid-level
- **Section 5 — Доп. опции**: Sump pump, fat level sensor, ladder for maintenance, inspection well extension, heated version
- **Section 6 — Преимущества сотрудничества**: 6 cards (same pattern)
- **CTA form**: Contact form

#### 3. Update `src/App.tsx`
Add route + import: `/catalog/vodoochistka/zhirouloviteli` → `VodoochistkaZhirouloviteli`

#### 4. Update `src/data/catalog.ts`
Change v7 externalPath from `/catalog/vodoochistka` to `/catalog/vodoochistka/zhirouloviteli`

### Files modified
- `public/images/zhiroulovitel-hero-1.png` (AI-generated)
- `src/pages/VodoochistkaZhirouloviteli.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update v7 externalPath)

