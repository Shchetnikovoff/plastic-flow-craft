

## Plan: Create "Ёмкости пожарные" Landing Page

### Goal
Create a dedicated page for fire-fighting containers at `/catalog/emkosti/pozharnye`, combining size tables from three existing container types (rectangular, underground, horizontal on supports) with fire-specific article prefixes.

### Changes

#### 1. Create `src/data/pozharnyeProducts.ts`
Three product tables with regenerated "fire" article prefixes:

- **Прямоугольные пожарные** — same 16 sizes as `pryamougolnyeProducts` (1000–50000 л), articles: `ЕПП-{volume}` (columns: Объём, ДхШхВ)
- **Подземные пожарные** — same 12 sizes as `podzemnyeProducts` (20–150 м³), articles: `ЕПП-ПДЗ-{volume}` (columns: Объём м³, Ø, L)
- **Горизонтальные пожарные на ложементах** — reuse sizes from `emkostGroups` horizontal categories (1000–50000 л), articles: `ЕПП-Г-{volume}` (columns: Объём, Ø, L)

#### 2. Create `src/pages/EmkostiPozharnye.tsx`
Landing page following the same structure as `EmkostiPryamougolnye.tsx`:

- Hero with title "Пожарные ёмкости из полимерных материалов"
- "Почему выбирают нас" checklist (fire-safety focused)
- Applications section (fire water reserves, automatic fire suppression, sprinkler systems, etc.)
- Construction advantages
- Tabs for 3 container types with size tables (Прямоугольные / Подземные / Горизонтальные)
- Modifications accordion (по назначению, по конструкции, доп. опции)
- Advantages cards
- Contact form + footer
- Reuse existing container images (`emkosti-hero-*`, `emkost-pryam-*`)

#### 3. Update `src/data/catalog.ts`
Add `externalPath: "/catalog/emkosti/pozharnye"` to the "e5" subcategory entry.

#### 4. Update `src/App.tsx`
Add route: `/catalog/emkosti/pozharnye` → `EmkostiPozharnye`

### Files
- **Create**: `src/data/pozharnyeProducts.ts`, `src/pages/EmkostiPozharnye.tsx`
- **Modify**: `src/data/catalog.ts` (1 line), `src/App.tsx` (2 lines)

