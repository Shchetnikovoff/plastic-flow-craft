

## Plan: Create Водоочистка (Water Treatment) landing page

### What we're building
A dedicated landing page at `/catalog/vodoochistka` following the same pattern as `EmkostiPodzemnye.tsx` — a long-form technical product page with hero section, product catalog, materials info, applications, partnership advantages, and CTA form.

### Changes

#### 1. Copy uploaded images to project
- `user-uploads://водоочистное_оборудование_на_главную_страницу.jpeg` → `public/images/vodoochistka-hero-1.jpeg`
- `user-uploads://25-WhatsApp_Image_2025-09-11_at_14.13.55-5.jpeg` → `public/images/vodoochistka-hero-2.jpeg`

#### 2. New file: `src/pages/Vodoochistka.tsx`
Full landing page modeled after `EmkostiPodzemnye.tsx` structure:

- **Breadcrumbs**: Каталог → Водоочистка
- **Hero**: Title "Водоочистное оборудование из полимеров", subtitle, "Получить расчёт стоимости" button, 2 hero images
- **Intro block**: "Системы водоочистки из полимерных материалов" + "Почему выбирают нас" (6 bullet points)
- **Section 1 — Перечень продукции**: 7 product cards (ФФУ, Ламельный отстойник, Мешочный обезвоживатель, Станция приготовления коагулянта, Жироуловители, КОС, Реагентные шкафы) — each as an accordion or card with description
- **Section 2 — Преимущества полимерных материалов**: 3 material cards (PP, PVC, Стеклопластик) + "Общие преимущества" list
- **Section 3 — Сферы применения**: 6 application areas as grid cards
- **Section 4 — Преимущества сотрудничества**: 7 advantage cards with icons
- **CTA form**: Same contact form pattern (name, phone, email, description)

#### 3. Update `src/data/catalog.ts`
Update `vodoochistka` category:
- Add `description` field
- Add `externalPath: "/catalog/vodoochistka"` to the category-level or update subcategories to match the 7 products from the user's content
- Trim subcategories to match the 7 actual products (remove v1 "Очистные для гальваники" and merge v5/v6 into one "Станция приготовления коагулянта")

Updated subcategories:
1. v2 — ФФУ
2. v3 — Ламельный отстойник
3. v4 — Мешочный обезвоживатель осадка
4. v5 — Станция приготовления коагулянта
5. v7 — Жироуловители промышленные
6. v8 — КОС
7. v9 — Реагентные шкафы и стойки

#### 4. Update `src/App.tsx`
Add route: `<Route path="/catalog/vodoochistka" element={<Vodoochistka />} />`

### Files modified
- `public/images/vodoochistka-hero-1.jpeg` (new — copied from upload)
- `public/images/vodoochistka-hero-2.jpeg` (new — copied from upload)
- `src/pages/Vodoochistka.tsx` (new — ~350 lines)
- `src/data/catalog.ts` (update vodoochistka subcategories)
- `src/App.tsx` (add route)

