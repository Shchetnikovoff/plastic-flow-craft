

## Plan: Create Lamella Settler (Ламельный отстойник) landing page

### What we're building
A new page at `/catalog/vodoochistka/lamelnyj-otstojnik` — same pattern as `VodoochistkaFfu.tsx`.

### Changes

#### 1. Save 8 uploaded images
- `user-uploads://ламельный_отстйник_на_главную_страницу.jpg` → `public/images/lamelnyj-hero-1.jpg`
- `user-uploads://1fe37eb88a449d077c84ab20c44949b7.jpg` → `public/images/lamelnyj-hero-2.jpg`
- `user-uploads://a585ec1cf9b30e2524a1f089c24830d3.png` → `public/images/lamelnyj-3.png`
- `user-uploads://2_1.png` → `public/images/lamelnyj-4.png`
- `user-uploads://psxsb37y86b6rgex5hn1tpi15n5rlt7b.jpg` → `public/images/lamelnyj-5.jpg`
- `user-uploads://1649898375994.jpg` → `public/images/lamelnyj-6.jpg`
- `user-uploads://d05843faadf01ee4efc3379b0180482a.png` → `public/images/lamelnyj-schema-1.png`
- `user-uploads://2020-03-24_16-04-29.png` → `public/images/lamelnyj-schema-2.png`

#### 2. New file: `src/pages/VodoochistkaLamelnyj.tsx` (~400 lines)
Following `VodoochistkaFfu.tsx` structure:

- **Breadcrumbs**: Каталог → Водоочистка → Ламельный отстойник
- **Hero**: Title, subtitle, CTA button, image gallery (8 images)
- **Intro**: "Почему выбирают наши ламельные отстойники" (7 bullets)
- **Section 1 — Назначение**: 6 purpose items, pollutant types, 6 application areas
- **Section 2 — Принцип работы**: 5-step process + construction elements + lamella module features
- **Section 3 — Модельный ряд**: Model table:

| Модель | м³/ч | Площадь, м² | Габариты | Масса |
|--------|------|-------------|----------|-------|
| ЛО-5 | 5 | 7 | 2.0×1.5×2.5 | 0.8 т |
| ЛО-10 | 10 | 14 | 3.0×2.0×2.8 | 1.2 т |
| ЛО-20 | 20 | 28 | 4.0×2.5×3.0 | 1.8 т |
| ЛО-50 | 50 | 70 | 6.0×3.5×3.2 | 3.5 т |
| ЛО-100 | 100 | 135 | 8.0×4.0×3.5 | 5.2 т |

Plus cleanup performance table (взвешенные вещества 90-95%, нефтепродукты 70-80%, БПКполн 60-70%).

- **Section 4 — Модификации и опции**: 4 modifications + 7 optional extras
- **Section 5 — Преимущества сотрудничества**: 6 cards with icons
- **CTA form**: Contact form (name, phone, email, description)

#### 3. Update `src/App.tsx`
Add route: `<Route path="/catalog/vodoochistka/lamelnyj-otstojnik" element={<VodoochistkaLamelnyj />} />`

#### 4. Update `src/data/catalog.ts`
Change v3 `externalPath` from `/catalog/vodoochistka` to `/catalog/vodoochistka/lamelnyj-otstojnik`.

### Files modified
- 8 new images in `public/images/`
- `src/pages/VodoochistkaLamelnyj.tsx` (new)
- `src/App.tsx` (add route + import)
- `src/data/catalog.ts` (update v3 externalPath)

