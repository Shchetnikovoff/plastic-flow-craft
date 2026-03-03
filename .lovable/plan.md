

## Plan: Add "Тройник вентиляционный круглый" product

A new product type (tee fitting) with a different data structure: two diameters (D, D1) and additional dimensions (L, L1, A, B). Follows the same visual template as the elbow product.

### 1. Save uploaded images to `public/images/`

- `image-55.png` → `public/images/troynik-1.png` (render 1)
- `image-56.png` → `public/images/troynik-2.png` (render 2)
- `image-57.png` → `public/images/troynik-3.png` (render 3)
- `image-58.png` → `public/images/troynik-4.png` (technical drawing)
- `image-59.png` → `public/images/troynik-5.png` (line drawing)

Images 51-54 are reference tables (not saved as assets).

### 2. Create `src/data/troynikProducts.ts`

New data file with:
- `TroynikSize` interface: `{ d: number, d1: number, l: number, l1: number, a: number, b: number, socket: number, wallThickness: number, article: string }`
- Full size table (~130 rows) from the uploaded data
- `getTroynikSizes(materialName, colorCode)` function generating articles like `ТР-PPC-7032-200x100`
- `troynikImages` array with the 5 image paths
- Reuse `materials`, `materialSpecs`, `connectionTypes` from existing `products.ts`

### 3. Create `src/pages/Troynik.tsx`

New page following the same layout as `Index.tsx`:
- Image gallery row (5 thumbnails + lightbox)
- Description: "Тройник вентиляционный круглого сечения используется для присоединения ответвлений к основной магистрали воздуховода круглого сечения."
- Characteristics grid (Диаметр 100-1200, Соединение раструб, Стенка 2-10)
- Material selector + plastic specs + color selector (same as elbows)
- SKU decoder adapted for tee format
- Product table with columns: Артикул, D, D1, L, L1, A, B, Раструб, Стенка, Кол-во, Действие
- PDF export button
- Cart integration

### 4. Update `src/App.tsx`

Add route: `<Route path="/troynik" element={<Troynik />} />`

### 5. Update `src/components/Header.tsx`

Add navigation link to Тройник alongside the angle selector, or add a product type selector above the angle row. The simplest approach: add a "Тройник" link next to the angle badges.

### Technical notes

- Article format: `ТР-{MaterialCode}-{ColorCode}-{D}x{D1}` (e.g., `ТР-PPC-7032-200x100`)
- The tee has no angle variants — only one configuration
- Only rastrub connection initially (no flanec)
- Same materials/colors/specs as the elbow product
- Table has ~130 rows vs ~18 for elbows, so the table will be longer

