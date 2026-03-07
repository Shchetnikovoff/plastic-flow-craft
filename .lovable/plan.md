

## Plan: Create "ЛОС — Локальные очистные сооружения" landing page

### What we're building
A unified landing page at `/catalog/vodoochistka/los` covering three product types: ЛОС, Пескоуловитель, Нефтеуловитель. Rename catalog entry from "КОС" to "ЛОС". Save 3 uploaded images as hero/product images.

### Changes

#### 1. Save 3 uploaded images
- `user-uploads://ЛОС.jpg` → `public/images/los-hero-1.jpg`
- `user-uploads://нефтеуловитель.jpg` → `public/images/los-nefteulovitel-1.jpg`
- `user-uploads://пескоуловитель.jpg` → `public/images/los-peskoulovitel-1.jpg`

#### 2. Update `src/data/catalog.ts`
- Rename v8: `"КОС — комплексные очистные сооружения"` → `"ЛОС — локальные очистные сооружения"`, slug → `"los"`, externalPath → `"/catalog/vodoochistka/los"`

#### 3. New file: `src/pages/VodoochistkaLos.tsx` (~450 lines)
Same pattern as other vodoochistka pages. Page has 3 product tabs/sections with individual tables:

- **Breadcrumbs**: Каталог → Водоочистка → ЛОС
- **Hero**: Title "Локальные очистные сооружения (ЛОС)", subtitle about deep wastewater treatment, 3 product images
- **Intro**: Description + "Почему выбирают" bullets (подземная установка, корпус из спиральновитых труб СВТ, срок службы 50+ лет, изготовление по чертежам заказчика)

- **Section — ЛОС** (with image `los-hero-1.jpg`):
  Description: глубокая очистка хозяйственно-бытовых, ливневых и промышленных стоков. Table (13 models, 6 columns):

  | Произв., л/с | Диаметр, мм | Длина, мм | Перепад вх/вых, мм | Ø вх/вых труб, мм | Объем сорбента, м3 |
  |---|---|---|---|---|---|
  | 2 | 1500 | 2600 | 120 | 110 | 0.5 |
  | 5 | 1500 | 6500 | 200 | 160 | 1 |
  | 10 | 2000 | 5500 | 200 | 160 | 2 |
  | 15 | 2000 | 7400 | 200 | 200 | 2.7 |
  | 20 | 2000 | 9000 | 300 | 200 | 3.6 |
  | 25 | 2000 | 10000 | 300 | 200 | 4.5 |
  | 30 | 2000 | 11500 | 300 | 250 | 5.4 |
  | 40 | 2400 | 11000 | 300 | 250 | 6.4 |
  | 50 | 2400 | 12200 | 300 | 250 | 8.4 |
  | 60 | 2400 | 13000 | 300 | 315 | 10 |
  | 70 | 3000 | 9500 | 400 | 315 | 11.5 |
  | 80 | 3000 | 11800 | 400 | 315 | 13.1 |
  | 90 | 3000 | 13600 | 400 | 400 | 15.1 |

- **Section — Пескоуловитель** (with image `los-peskoulovitel-1.jpg`):
  Description: очистка поверхностных сточных вод от тонкодисперсных частиц. Same 13-row table but 5 columns (no sorbent volume).

- **Section — Нефтеуловитель** (with image `los-nefteulovitel-1.jpg`):
  Description: выделение нефтепродуктов из поверхностных стоков. Same 13-row table, 4 columns (no pipe drop, no sorbent).

- **Section — Преимущества сотрудничества**: 6 cards (same pattern)
- **CTA form**: Contact form

#### 4. Update `src/App.tsx`
Add route + import: `/catalog/vodoochistka/los` → `VodoochistkaLos`

### Files modified
- 3 new images in `public/images/`
- `src/pages/VodoochistkaLos.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (rename v8, update slug + externalPath)

