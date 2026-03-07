

## Plan: Create "Станция дозирования" landing page

### What we're building
A new page at `/catalog/vodoochistka/stantsiya-dozirovaniya` combining coagulant and flocculant dosing stations into one unified product page. Rename catalog entry "Станция приготовления коагулянта" → "Станция дозирования".

### Changes

#### 1. Update `src/data/catalog.ts`
- Rename v5: `"Станция приготовления коагулянта"` → `"Станция дозирования"`, slug → `"stantsiya-dozirovaniya"`, externalPath → `"/catalog/vodoochistka/stantsiya-dozirovaniya"`

#### 2. New file: `src/pages/VodoochistkaDozirovanie.tsx` (~380 lines)
Following the same pattern as `VodoochistkaFfu.tsx`:

- **Breadcrumbs**: Каталог → Водоочистка → Станция дозирования
- **Hero**: Title "Станция дозирования реагентов", subtitle about coagulants/flocculants/polyelectrolytes. No uploaded images — will use placeholder or descriptive icon-based hero.
- **Intro**: What coagulation/flocculation is (from pumpen.ru content), "Почему выбирают" bullets (3-chamber system, auto/manual modes, powder & liquid polymers, up to 10,000 l/h, control panel with display, level control, full service cycle)
- **Section 1 — Назначение**: 9 application areas from pumpen.ru (сточные воды, питьевая вода, солевые растворы, гальваника, бумажное производство, etc.)
- **Section 2 — Принцип работы**: 3-chamber continuous-flow system description, 11 construction elements from the EASYPURE parts diagram
- **Section 3 — Модельный ряд**: 8 models from pumpen.ru:

| Модель | Подача воды, л/ч | Габариты (A×B×C), мм |
|--------|-----------------|---------------------|
| EASYPURE 500 | 500 | 1700×1200×1540 |
| EASYPURE 1000 | 1000 | 2000×1350×1540 |
| EASYPURE 2000 | 2000 | 2300×1450×1940 |
| EASYPURE 3000 | 3000 | 2700×1600×1940 |
| EASYPURE 4000 | 4000 | 3200×1750×1940 |
| EASYPURE 5000 | 5000 | 3300×1850×1940 |
| EASYPURE 6000 | 6000 | 3500×1850×2140 |
| EASYPURE 10000 | 10000 | 3900×1850×2140 |

Common specs: pressure 2–6 bar, hold time 60 min, concentration 0.1–0.5%, IP54, temp +5…+40°C, max viscosity 2500 mPa·s.

- **Section 4 — Модификации и опции**: Individual configurations, powder/liquid feed options, additional mixing in 3rd chamber
- **Section 5 — Преимущества сотрудничества**: 6 cards (same pattern as other pages)
- **CTA form**: Contact form (name, phone, email, description)

#### 3. Update `src/App.tsx`
Add route + import: `/catalog/vodoochistka/stantsiya-dozirovaniya` → `VodoochistkaDozirovanie`

### Files modified
- `src/pages/VodoochistkaDozirovanie.tsx` (new, ~380 lines)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (rename v5, update slug + externalPath)

