

## Plan: Fill KNS SVT Subsection with Product Data

### Overview
Create a dedicated product page for subcategory "9.1 КНС в корпусе SVT" with a specifications table populated from nasos-kit.ru data, and update the catalog image to the uploaded cutaway render.

### Data Extracted (12 products from page 1)

| Модель | D, мм | H, мм | Q, м³/ч | H, м | Qmax | Hmax | Насосы | P, кВт | Цена, ₽ |
|--------|-------|-------|---------|------|------|------|--------|--------|---------|
| КНС 10-5 | 1300 | 2700 | 10 | 5 | 16 | 10 | 2 | 0.55 | 638 500 |
| КНС 10-10 | 1300 | 2700 | 10 | 10 | 20 | 14 | 2 | 0.75 | 638 500 |
| КНС 10-15 | 1300 | 2900 | 10 | 15 | 24 | 19 | 2 | 1.1 | 676 500 |
| КНС 15-10 | 1300 | 2900 | 15 | 10 | 24 | 19 | 2 | 1.1 | 676 500 |
| КНС 15-15 | 1300 | 2900 | 15 | 15 | 26 | 21 | 2 | 1.5 | 693 000 |
| КНС 20-10 | 1300 | 2900 | 20 | 10 | 30 | 16 | 2 | 2.2 | 703 000 |
| КНС 20-15 | 1300 | 2900 | 20 | 15 | 30 | 18 | 2 | 2.2 | 703 000 |
| КНС 10-20 | 1300 | 2900 | 10 | 20 | 20 | 25 | 2 | 2.2 | 711 000 |
| КНС 15-20 | 1300 | 2900 | 15 | 20 | 21 | 25 | 2 | 2.2 | 711 000 |
| КНС 15-25 | 1500 | 3000 | 15 | 25 | 21 | 30 | 2 | 3.0 | 834 000 |
| КНС 20-20 | 1500 | 2800 | 20 | 20 | 30 | 25 | 2 | 3.0 | 846 000 |
| КНС 20-25 | 1500 | 3200 | 20 | 25 | 30 | 30 | 2 | 4.0 | 859 000 |

### Changes

#### 1. Copy uploaded image
- `user-uploads://alexander-tortsev-8-3-2.jpg` → `public/images/kns-svt-cutaway.jpg`
- Update catalog.ts: change `k1` image from `kns-3d-razrez.png` to `kns-svt-cutaway.jpg`

#### 2. Create data file `src/data/knsSvtProducts.ts`
- Export array of KNS SVT product specs (12 items from table above)
- Fields: model, article, diameter, height, flow, head, maxFlow, maxHead, pumpCount, pumpPower, material, price

#### 3. Create page `src/pages/KnsSvtPage.tsx`
- Follow existing configurator page pattern (ProductPageShell, CharacteristicsGrid, etc.)
- Hero section with the uploaded cutaway image
- Description text from nasos-kit.ru (construction, principle of operation, specs)
- Product table with all 12 models showing key specs and prices
- "Получить расчёт" CTA form at bottom

#### 4. Update routing
- Add `externalPath: "/catalog/kns/v-korpuse-svt"` to catalog.ts subcategory `k1`
- Add route in `App.tsx`: `/catalog/kns/v-korpuse-svt` → `KnsSvtPage`

#### 5. Update KnsPage.tsx
- Make subcategory card `k1` link to the new page instead of just toggling selection

### Technical details
- Page structure mirrors existing product pages (e.g., EmkostiVertikalnye, VodoochistkaFfu)
- Uses `ProductPageShell` wrapper with breadcrumbs, header, cart
- Specifications table rendered via standard `<Table>` component
- All 12 products in a scrollable table with columns: Модель, Диаметр, Высота, Q м³/ч, H м, Qmax, Hmax, Насосы, Мощность, Материал, Цена

