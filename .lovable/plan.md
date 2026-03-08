

## Plan: Create "Каплеуловители" landing page

### What we're building
A landing page at `/catalog/gazoochistka/kapleuloviteli` for polypropylene droplet separators (КУ series) used in ventilation systems. Two model series: КУ.1 (14 sizes, 300–27500 m³/h) and КУ.6 (1 size, 125 m³/h). No user-uploaded images — we'll use reference images from the afxpro.ru site directly or text/icon layout.

### Changes

#### 1. New file: `src/pages/GazoochistkaKapleuloviteli.tsx` (~350 lines)
Following GazoochistkaFvg.tsx pattern:

- **Breadcrumbs**: Каталог > Газоочистка > Каплеуловители
- **Hero**: Title "Каплеуловители из полипропилена", subtitle about removing excess moisture and droplets from ventilation systems
- **"Почему выбирают"** bullets: эффективность 99,9%, скорость 2,5–3 м/с, полимерные материалы (коррозиестойкость), работа в агрессивных средах, круглое и прямоугольное сечение, производство в России (СПб)

- **Область применения**: 2 use cases — общеобменная вентиляция (удаление влаги из приточного воздуха), местная вентиляция (после скрубберов, абсорберов, гальванических линий)

- **Принцип работы**: воздух проходит вдоль ламелей, деформированных в двух плоскостях → центробежные силы → капли оседают на ребристой поверхности

- **Устройство и преимущества**: лёгкость конструкции, простота монтажа, отсутствие коррозии, ревизия и замена блока ламелей, индивидуальный подход, заказ от 1 шт., любое монтажное исполнение

- **Как подобрать**: подбор по расходу воздуха в меньшую сторону, переходные камеры под имеющиеся размеры, поворотные/несоосные камеры

- **Типоразмерный ряд КУ.1** (table, 14 rows):

  | Типоразмер | Расход, м³/ч | Д, мм | А, мм | Б, мм | В, мм | Масса, кг |
  |------------|-------------|-------|-------|-------|-------|-----------|
  | 300 | 300 | 125–250 | 672–532 | 308 | 299 | 6 |
  | 500 | 500 | 125–250 | 732–532 | 308 | 402 | 7 |
  | ... through 27500 |

- **Типоразмерный ряд КУ.6** (table, 1 row):

  | Типоразмер | Расход, м³/ч | Д, мм | А, мм | Б, мм | В, мм | Масса, кг |
  |------------|-------------|-------|-------|-------|-------|-----------|
  | 125 | 125 | 100–125 | 530 | 150 | 174 | 1,5 |

- **Note**: аэродинамическое сопротивление 50–300 Па в зависимости от расхода; для прямоугольного сечения — переходные камеры под размер заказчика

- **Преимущества сотрудничества**: 6 standard cards
- **CTA form**: Contact form

#### 2. Update `src/data/catalog.ts`
- go4: add `externalPath: "/catalog/gazoochistka/kapleuloviteli"`

#### 3. Update `src/App.tsx`
Add route + import: `/catalog/gazoochistka/kapleuloviteli` → `GazoochistkaKapleuloviteli`

### Files modified
- `src/pages/GazoochistkaKapleuloviteli.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update go4 externalPath)

