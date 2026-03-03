

## Plan: Add "Воздуховод вентиляционный круглый" (Duct) Product

### New product: circular ventilation duct with socket (rastrub) connection

Key differences from existing products:
- Diameters start from **100 mm** (not 200) — adds 100, 125, 160, 180 with wall thickness 2 mm
- Each diameter has **4 available lengths**: 500, 1000, 1500, 2000 mm (table shows one row per diameter with length selector or multiple rows)
- No angle parameter
- Only rastrub connection (no flanec toggle needed initially)

---

### 1. Save uploaded images

Copy 5 product photos to `public/images/vozdukhovod-[1-5].png` and the technical drawing to `public/images/vozdukhovod-schema.png`.

### 2. Create data file `src/data/vozdukhovodProducts.ts`

- Define `VozdukhovodSize` interface: `{ diameter, wallThickness, availableLengths: number[], socketThickness, article }`
- Extended `baseSizes` array starting from diameter 100:
  - 100–180: wall 2, socket 2
  - 200–450: wall 3, socket 3
  - 500: wall 5, socket 3 (per the table)
  - 560–700: wall 5, socket 5
  - 710–800: wall 8, socket 8
  - 900–1200: wall 10, socket 10
- Each size has `availableLengths: [500, 1000, 1500, 2000]`
- Article prefix: `ВК` (Воздуховод Круглый)
- `getVozdukhovodSizes(materialName, colorCode)` function generating articles like `ВК-PPC-7032-200`
- Export image arrays

### 3. Create page `src/pages/Vozdukhovod.tsx`

Follow `Razdvizhnoy.tsx` template:
- Image gallery row with lightbox
- No connection type toggle (rastrub only)
- Description and specs grid (diameter 100–1200 mm, wall 2–10 mm, connection: rastrub)
- Material selector with color picker
- SKU decoding section (ВК — Материал — RAL — Диаметр)
- Table columns: Артикул, Dn мм, L мм (length selector or column), S мм, Sp мм, Кол-во, Действие
- Each row shows one diameter; length shown as a select dropdown (500/1000/1500/2000) since all diameters support all 4 lengths
- Rows clickable → navigate to `/product/...`

### 4. Add route in `src/App.tsx`

```
<Route path="/vozdukhovod" element={<Vozdukhovod />} />
```

### 5. Update Header navigation

- Add `"vozdukhovod"` to `ProductType` union
- Add nav link "Воздуховод" linking to `/vozdukhovod`
- Show title "Воздуховод вентиляционный круглый" and badge "ВК" for this type

### 6. Update Product.tsx (detail page)

- Add parsing block for `ВК-` prefix articles
- Import vozdukhovod images and data
- Show appropriate title, breadcrumb (link to `/vozdukhovod`), specs grid (single L value, Sp shown)
- Use vozdukhovod images in gallery

### Files to create/modify

| File | Action |
|------|--------|
| `public/images/vozdukhovod-*.png` | Copy 5 uploaded images |
| `src/data/vozdukhovodProducts.ts` | Create — sizes, images, article generator |
| `src/pages/Vozdukhovod.tsx` | Create — catalog page (from Razdvizhnoy template) |
| `src/App.tsx` | Add route `/vozdukhovod` |
| `src/components/Header.tsx` | Add "Воздуховод" to ProductType and nav |
| `src/pages/Product.tsx` | Add `ВК-` article parser + vozdukhovod rendering |

