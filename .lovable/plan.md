

## Plan: Add "Раздвижной элемент" (Sliding Element) product page

A new product — a straight ventilation duct with 3 sections and adjustable length (up to 2x). Socket connection only. Follow the Troynik page template.

### 1. Save 5 uploaded images to `public/images/`
- `razdvizhnoy-1.png` through `razdvizhnoy-3.png` (renders from image-69, 70, 71)
- `razdvizhnoy-4.png` (technical drawing from image-72)
- `razdvizhnoy-5.png` (wireframe from image-73)

### 2. Create `src/data/razdvizhnoyProducts.ts`
- **Interface** `RazdvizhnoySize`: `diameter`, `wallThickness`, `lMin`, `lMax`, `socket`, `article`
- **Size table** derived from existing `baseSizes` (200–1200mm), with `lMin = diameter`, `lMax = 2 * diameter`, same wall thickness / socket logic
- Article prefix: `РЭ` (Раздвижной элемент)
- `getRazdvizhnoySizes(materialName, colorCode)` — generates articles with material/color codes
- `razdvizhnoyImages` array (5 paths)

### 3. Create `src/pages/Razdvizhnoy.tsx`
Follow Troynik template structure:
- Image gallery row with lightbox
- Description: "Раздвижной элемент — воздуховод из трёх секций с возможностью регулировки длины до двух раз"
- Characteristics grid: Diameter 200–1200mm, Connection: Раструб, Type: Раздвижной элемент
- **No connection type switcher** (socket only)
- Material selector + plastic specs + color picker
- Article decoder (РЭ — prefix)
- Table columns: Артикул, Dn мм, L min мм, L max мм, Раструб мм, S мм, Кол-во, Действие
- Cart integration + row click → `/product/:article`

### 4. Update `src/App.tsx`
- Add route: `/razdvizhnoy` → `<Razdvizhnoy />`

### 5. Update `src/components/Header.tsx`
- Extend `ProductType` to include `"razdvizhnoy"`
- Add nav link "Раздвижной" pointing to `/razdvizhnoy`
- Show "РЭ" badge when productType is razdvizhnoy
- Update title for razdvizhnoy: "Раздвижной элемент вентиляционный"

