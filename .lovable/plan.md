

## Plan: Configurator page for containers (like ventilation page)

### Goal
Create a new page `/catalog/emkosti/konfigurator` with the same UI pattern as the ventilation configurator (Index.tsx) — image gallery row, description + characteristics, type/material selectors, size tables with cart buttons. The current EmkostiPage becomes a landing page with a CTA link to the configurator.

### Files to create/modify

#### 1. Create `src/pages/EmkostiCatalog.tsx`
New configurator page mirroring Index.tsx structure:
- **Image row** (5 thumbnails with lightbox) — use existing `emkosti-hero-1.png`, `emkosti-hero-2.png`, and the `emkost-pryam-*` images. Images switch based on selected container type (vertical shows hero images, horizontal shows different ones, etc.)
- **Description + Characteristics grid** — left: description of selected container type; right: grid with Volume range, Material (PP/PND toggle pills), Type (Вертикальная/Горизонтальная), Orientation
- **Container type selector** — tabs/badges for groups: Вертикальные ПП, Вертикальные ПНД, Горизонтальные ПП, Горизонтальные ПНД
- **Sub-type selector** — badges for categories within group (Плоская крыша, Наклонное дно, Коническая крыша, etc.)
- **Article breakdown** — same visual pattern as ventilation (segments explaining article format like ЕВПП-1000)
- **Size table** with columns: Артикул, Объём (л), Ø (мм), H/L (мм), Кол-во, Действие (add to cart) — styled identically to Index.tsx table (primary header, zebra rows, quantity +/- buttons, cart button)
- Header + breadcrumbs + footer matching EmkostiPage

#### 2. Modify `src/pages/EmkostiPage.tsx`
- Remove the "Типоразмерный ряд ёмкостей" section (lines 236-288)
- Add a prominent CTA banner/card after "Виды и модификации" section linking to `/catalog/emkosti/konfigurator` with text like "Перейти к конфигуратору ёмкостей — подберите тип, материал и размер"

#### 3. Modify `src/App.tsx`
- Add route: `/catalog/emkosti/konfigurator` → `EmkostiCatalog` (above the `/catalog/emkosti` route)

### Data
Reuses existing `emkostGroups` from `src/data/emkostiProducts.ts` — no new data files needed. Container types/subtypes are already defined there with articles, volumes, diameters, heights.

### Images
Available container images:
- `emkosti-hero-1.png`, `emkosti-hero-2.png` — general container photos
- `emkost-pryam-pp-1..4.png` — rectangular PP containers
- `emkost-pryam-pnd-1..2` — rectangular PND containers  
- `emkost-pryam-schema-1..2` — schemas/drawings

These will be mapped to container type selections. For types without specific photos, the hero images serve as defaults.

