

## Plan: Create Dedicated "Ёмкости" Landing Page

### What We're Building

A full-featured landing page for the "Ёмкости" (Containers) category at `/catalog/emkosti` — a rich content page with all the provided text content, structured into visual sections matching our existing design system (dark cards, borders, primary accents).

### Approach

Create a new dedicated page component `src/pages/EmkostiPage.tsx` that renders all the user-provided content as a well-structured landing page with the following sections:

1. **Hero section** — title "Промышленные ёмкости из листового полипропилена и полиэтилена" + tagline + CTA button "Получить расчёт стоимости"
2. **Intro block** — "Промышленные ёмкости на заказ: от эскиза до монтажа" + description + "Почему выбирают нас" checklist (5 items with check icons)
3. **Section 1: Назначение** — bulleted list of 7 application areas, styled as a grid of small cards
4. **Section 2: Материалы** — two material cards (PP and HDPE) with specs in a grid, plus shared "Оба материала" benefits
5. **Section 3: Виды и модификации** — grouped lists (По форме, По объёму, По назначению, Дополнительные опции) as accordion or card sections
6. **Section 4: Преимущества** — 5 advantage cards with icons
7. **Subcategories grid** — the existing sidebar + image card grid showing the 10 subcategories (reuse current layout from CatalogPage)
8. **CTA block** — "Готовы заказать ёмкость?" with a contact form (name, phone, email, description) using existing ContactFormFields pattern
9. **Footer info** — company details, address, phone

### Files to Create/Modify

- **Create** `src/pages/EmkostiPage.tsx` — the full landing page component with all sections
- **Modify** `src/App.tsx` — add route `/catalog/emkosti` pointing to the new page (before the generic `/catalog/:categorySlug` route)
- **Modify** `src/data/catalog.ts` — add `description` to the Ёмкости category

### Design Notes
- Reuse existing UI primitives: `Card`, `Badge`, `Button`, `Input`, `Textarea`, `Accordion`
- Section headings: uppercase, `text-base font-bold tracking-wide` (matching Index.tsx style)
- Cards: `rounded-lg border border-border bg-card` pattern
- CTA buttons: primary variant
- The subcategories grid at the bottom links to existing `/catalog/emkosti/:subSlug` placeholder pages
- Contact form uses the existing validation pattern from ContactFormFields
- Wrapped in `CartProvider` with Header and CartSheet like other pages

