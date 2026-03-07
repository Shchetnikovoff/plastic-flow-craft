

## Plan: Create FFU (ФФУ) dedicated landing page

### What we're building
A new page at `/catalog/vodoochistka/ffu` — a comprehensive landing page for flotation-filtration units, following the same pattern as `EmkostiPodzemnye.tsx`. Includes hero with 5 uploaded images, full technical content from the user's spec, and a model table with 13 models extracted from vo-da.ru.

### Changes

#### 1. Save uploaded images
- `user-uploads://флотатор_на_главную_страницу.jpg` → `public/images/ffu-hero-1.jpg`
- `user-uploads://ффу_2.jpg` → `public/images/ffu-hero-2.jpg`
- `user-uploads://izobrazhenie_2024-02-27_165051822.png` → `public/images/ffu-3.png`
- `user-uploads://izobrazhenie_2024-02-27_163138621.png` → `public/images/ffu-4.png`
- `user-uploads://izobrazhenie_2024-02-27_163122337.png` → `public/images/ffu-5.png`

#### 2. New file: `src/pages/VodoochistkaFfu.tsx` (~400 lines)
Structured like `EmkostiPodzemnye.tsx` / `Vodoochistka.tsx`:

- **Breadcrumbs**: Каталог → Водоочистка → ФФУ
- **Hero**: Title, subtitle, CTA button, image gallery (5 images)
- **Intro block**: "Почему выбирают наши ФФУ" (7 bullets)
- **Section 1 — Назначение и области применения**: Purpose list, pollutant types, application areas (автомойки, НПЗ, пищевые, ЖКХ...)
- **Section 2 — Принцип работы и конструкция**: 5-step process (Сатурация → Флотация → Удаление шлама → Фильтрация → Сбор), construction elements list
- **Section 3 — Модельный ряд**: Table with 13 models from vo-da.ru:

```
ФФУ-1К   1 м³/ч    2.3 кВт   1180×1100×1440   0.25/0.63 т
ФФУ-2М   2 м³/ч    2.3 кВт   1450×1330×1720   0.37/1.0 т
ФФУ-4М   4 м³/ч    4.2 кВт   1785×1530×1700   0.65/2.28 т
ФФУ-6М   6 м³/ч    3.5 кВт   2200×1785×1760   0.94/3.86 т
ФФУ-10   10 м³/ч   5.9 кВт   2620×1850×2300   1.85/7.0 т
ФФУ-15   15 м³/ч   7.9 кВт   3440×2220×2260   2.66/10.5 т
ФФУ-20   20 м³/ч   7.9 кВт   3840×2220×2350   2.95/12.9 т
ФФУ-30   30 м³/ч   15.8 кВт  5600×2400×2470   3.89/17.64 т
ФФУ-40   40 м³/ч   15.8 кВт  6750×2400×2470   4.0/23.0 т
ФФУ-50   50 м³/ч   19 кВт    7430×2400×2530   4.7/23.0 т
ФФУ-65   65 м³/ч   18.5 кВт  6500×4700×3000   8.5/36.0 т
ФФУ-80   80 м³/ч   31.5 кВт  7200×5200×2500   9.6/42.6 т
ФФУ-100  100 м³/ч  42 кВт    9600×5600×2585   12.2/45.6 т
```

Plus a cleanup performance table (with reagents):

| Загрязнение | На входе | После очистки |
|---|---|---|
| Взвешенные вещества | 50-200 мг/л | 3 мг/л |
| Нефтепродукты | 10-100 мг/л | 0.15-0.4 мг/л |
| БПКполн | 50-200 мг/л | 6 мг/л |
| ХПК | 100-400 мг/л | 30 мг/л |

- **Section 4 — Модификации и опции**: Modifications list + optional extras (8 items)
- **Section 5 — Преимущества сотрудничества**: 6 advantage cards with icons
- **CTA form**: Contact form (name, phone, email, description)
- **Footer**: Company details

#### 3. Update `src/App.tsx`
Add route: `<Route path="/catalog/vodoochistka/ffu" element={<VodoochistkaFfu />} />`

#### 4. Update `src/data/catalog.ts`
Change the ФФУ subcategory `externalPath` from `/catalog/vodoochistka` to `/catalog/vodoochistka/ffu` so the tile links to the new dedicated page.

### Files modified
- `public/images/ffu-hero-1.jpg` (new)
- `public/images/ffu-hero-2.jpg` (new)
- `public/images/ffu-3.png` (new)
- `public/images/ffu-4.png` (new)
- `public/images/ffu-5.png` (new)
- `src/pages/VodoochistkaFfu.tsx` (new, ~400 lines)
- `src/App.tsx` (add route)
- `src/data/catalog.ts` (update ФФУ externalPath)

