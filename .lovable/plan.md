

## Plan: Fix empty category cards on main catalog page

### Problem
Categories without subcategories (Гальваника, Водоподготовка, Реакторы, Гидрометаллургия, КНС, Лабмебель, Шкафы управления, Услуги) show a broken image icon and "0 позиций" on the `/catalog` page because the code pulls thumbnails and counts from the `subcategories` array which is empty.

### Solution

#### 1. Add `image` field to `CatalogCategory` interface and data (`src/data/catalog.ts`)
Add an optional `image?: string` to `CatalogCategory` and set it for every category using existing hero images:

| Category | Image |
|---|---|
| Гальваника | `/images/galvanika-hero-1.png` |
| Водоочистка | `/images/vodoochistka-hero-1.jpeg` |
| Водоподготовка | `/images/vodopodgotovka-hero-1.png` |
| Вентиляция | `/images/ventilyatsiya-hero-1.png` |
| Газоочистка | `/images/gazoochistka-hero-1.png` |
| Ёмкости | `/images/emkosti-hero-1.png` |
| Реакторы | `/images/reaktory-hero-1.png` |
| Гидрометаллургия | `/images/gidrometallurgiya-hero-1.png` |
| КНС | `/images/kns-hero-1.png` |
| Лабмебель | `/images/labmebel-hero-1.png` |
| Шкафы управления | `/images/shkafy-hero-1.png` |
| Услуги | `/images/uslugi-hero-1.png` |

#### 2. Fix catalog grid in `src/pages/CatalogPage.tsx` (lines 57-83)
- Use `cat.image` as primary thumbnail instead of deriving from subcategories
- Replace "X позиций" with the category `description` text (or remove count entirely for categories with 0 subcategories) — show a short tagline instead of a misleading count

### Files modified
- `src/data/catalog.ts` — add `image` field to interface + all 12 categories
- `src/pages/CatalogPage.tsx` — update card rendering logic (lines 58-79)

