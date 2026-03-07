

## Plan: Add images to subcategory cards + make them navigable

### Problem
The subcategory cards on `/catalog/emkosti` show broken image placeholders (ImageOff icons) and only toggle inline selection instead of navigating to dedicated pages.

### Changes

#### 1. `src/data/catalog.ts` — add `image` to each емкости subcategory
Map available photos to matching container types:
- e1 (вертикальные): `/images/emkosti-hero-1.png`
- e2 (горизонтальные): `/images/emkosti-hero-2.png`
- e3 (подземные): `/images/emkosti-podzemnye-1.jpg`
- e4 (прямоугольные): `/images/emkost-pryam-pp-1.png`
- e5 (пожарные): `/images/emkost-pryam-pp-2.png`
- e6 (сейсмоактивные): `/images/emkosti-podzemnye-2.jpg`
- e7 (коническое дно): `/images/emkost-pryam-pp-3.png`
- e8 (щёлочь): `/images/emkost-pryam-pnd-1.jpg`
- e9 (кислота): `/images/emkost-pryam-pnd-2.png`
- e10 (переливные): `/images/emkosti-podzemnye-3.png`

#### 2. `src/pages/EmkostiPage.tsx` — make cards navigate to pages
Change the grid card behavior (lines 323-344):
- Cards with `externalPath` → wrap in `<Link to={sub.externalPath}>` for direct navigation
- Cards without `externalPath` → keep current inline selection (click to show details)
- Remove the intermediate "selected" detail view for items with externalPath — clicking goes straight to the page

### Files modified
- `src/data/catalog.ts` (add image fields to 10 subcategories)
- `src/pages/EmkostiPage.tsx` (update card click behavior ~20 lines)

