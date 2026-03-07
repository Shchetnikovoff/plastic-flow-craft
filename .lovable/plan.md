

## Plan: Restructure Ventilation into "Round" and "Square" sections + fix images

### Problem
1. Ventilation subcategory cards show broken image placeholders despite having `image` paths in catalog data
2. User wants ventilation split into two groups: **Круглые** (round) and **Квадратные** (square), similar to how containers (Ёмкости) has subcategories leading to dedicated pages

### Changes

#### 1. `src/data/catalog.ts` — restructure ventilation subcategories

Split current 4 items into two groups. Add two new top-level subcategories acting as group headers:

```
subcategories: [
  { id: "ve-round", name: "Круглого сечения", slug: "kruglye", subcategories with externalPath... },
  { id: "ve-square", name: "Прямоугольного сечения", slug: "kvadratnye", ... },
]
```

Since the catalog data model is flat (no nested subcategories), we use two approaches:
- **Option A**: Keep flat list but add a `group` field to each subcategory for visual grouping
- **Option B**: Create two separate "section" entries that link to dedicated pages listing their children

Given the existing pattern (containers use `externalPath` for navigation), **Option A** is simpler — add a `group` property and render grouped headings in `CatalogPage.tsx`.

Ventilation subcategories become:
- Group "Круглого сечения": Отвод (ve1), Тройник (ve2), Раздвижной элемент (ve3), Воздуховод круглый (ve4)
- Group "Прямоугольного сечения": (placeholder items for future — or empty for now)

#### 2. `src/data/catalog.ts` — fix image paths

The image files exist in `/public/images/` but the cards show ImageOff. Verify the exact filenames match. Current paths:
- `/images/product-1.png` — exists
- `/images/troynik-1.png` — exists  
- `/images/razdvizhnoy-1.png` — exists
- `/images/vozdukhovod-1.png` — exists

These should work. The issue may be in `CatalogPage.tsx` rendering logic — need to verify the `sub.image` property is being read correctly after the recent edits.

#### 3. `src/pages/CatalogPage.tsx` — render grouped subcategories

When a category has subcategories with a `group` field, render them under group headings:

```
Круглого сечения
  [card] [card]
  [card] [card]

Прямоугольного сечения
  [card] [card]
```

### Files modified
- `src/data/catalog.ts` — add `group` field to ventilation subcategories, add square section placeholders
- `src/pages/CatalogPage.tsx` — support grouped rendering (~15 lines added)

