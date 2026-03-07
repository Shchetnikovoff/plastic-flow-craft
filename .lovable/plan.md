

## Plan: Create Мешочный обезвоживатель осадка landing page

### What we're building
A new page at `/catalog/vodoochistka/meshochnyj-obezvozhivatel` following the same pattern as `VodoochistkaFfu.tsx` / `VodoochistkaLamelnyj.tsx`.

### Changes

#### 1. Save 2 uploaded images
- `user-uploads://обезвоживатель_осадка.jpg` → `public/images/obezvozhivatel-hero-1.jpg`
- `user-uploads://image_16.webp` → `public/images/obezvozhivatel-schema-1.webp`

#### 2. New file: `src/pages/VodoochistkaObezvozhivatel.tsx` (~400 lines)

- **Breadcrumbs**: Каталог → Водоочистка → Мешочный обезвоживатель
- **Hero**: Title "Мешочный обезвоживатель осадка", subtitle, CTA button, 2 images
- **Intro**: User's provided text about dewatering + "Почему выбирают" bullets (простота обслуживания, низкие энергозатраты, компактность, no moving parts, works on gravity)
- **Section 1 — Назначение**: Снижение влажности шлама после очистки стоков; applies to хозбыт, ливневка, производственные стоки
- **Section 2 — Принцип работы**: Gravity-based filtration through polymer bag filters with varying permeability
- **Section 3 — Модельный ряд**: 7 models from meshkovoi-obezvozhivatel.ru:

| Модель | Производительность, м³/сут | Кол-во мешков | Габариты, мм |
|--------|---------------------------|---------------|--------------|
| ОНИКС-1 | 1.5 | 1 | 700×500×1420 |
| ОНИКС-2 | 3 | 2 | 1100×500×1480 |
| ОНИКС-3 | 4.5 | 3 | 1650×500×1480 |
| ОНИКС-4 | 6 | 4 | 2200×500×1480 |
| ОНИКС-5 | 7.5 | 5 | 2750×500×1480 |
| ОНИКС-6 | 9 | 6 | 3300×500×1480 |
| ОНИКС-12 | 12 | 12 | 6600×500×1480 |

- **Section 4 — FAQ**: 5 FAQ items from the source (selecting model, bag replacement, applicability, documentation, delivery)
- **Section 5 — Преимущества сотрудничества**: 6 cards (same pattern)
- **CTA form**: Contact form (name, phone, email, description)

#### 3. Update `src/App.tsx`
Add route + import for `/catalog/vodoochistka/meshochnyj-obezvozhivatel`

#### 4. Update `src/data/catalog.ts`
Change v4 `externalPath` from `/catalog/vodoochistka` to `/catalog/vodoochistka/meshochnyj-obezvozhivatel`

### Files modified
- 2 new images in `public/images/`
- `src/pages/VodoochistkaObezvozhivatel.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update v4 externalPath)

