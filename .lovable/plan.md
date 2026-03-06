

## Plan: Add Product Images and Size Tables to Ёмкости Page

### What's Being Added

1. **Two product images** (3D renders of containers) to the hero section of the Ёмкости page
2. **Product specification tables** from the Excel file — 10 tables covering vertical and horizontal containers in PP and PE materials

### Data from Excel (Summary)

The Excel contains standardized size tables for containers (1000–50000 liters) across these types:

**Vertical (Page 1-2):**
- PP плоская крыша/плоское дно (ЕВПП-xxxx)
- PP наклонное дно (ЕВПП-НД-xxxx)
- PP коническая крыша (ЕВПП-КК-xxxx)
- ПНД плоская крыша/плоское дно (ЕВПНД-xxxx)
- ПНД наклонное дно (ЕВПНД-НД-xxxx)
- ПНД коническая крыша (ЕВПНД-КК-xxxx)

**Horizontal (Page 4-5):**
- PP низкие ложементы (ЕГППЛСТ-xxxx)
- PP высокие ложементы (ЕГППЛВ-xxxx)
- ПНД низкие ложементы (ЕГПНДЛСТ-xxxx)
- ПНД высокие ложементы (ЕГПНДЛВ-xxxx)

Each table has columns: Артикул, Объём (л), Ø (мм), H/L (мм). All share the same 17 size rows.

### Changes

#### 1. Copy images to project
- Copy `image_1.png` → `public/images/emkosti-hero-1.png` (white containers render)
- Copy `image-85.png` → `public/images/emkosti-hero-2.png` (dark containers cutaway)

#### 2. Create data file `src/data/emkostiProducts.ts`
- Define all 10 product tables as typed arrays with `{ article, volume, diameter, height }` entries
- Group them by orientation (vertical/horizontal) and material (PP/ПНД) and type (flat/sloped/conical)

#### 3. Update `src/pages/EmkostiPage.tsx`
- Add hero images as a gallery/carousel between hero text and intro block
- Add a new **"Типоразмерный ряд"** section after the modifications accordion, with:
  - Tabs or accordion to switch between container types (vertical PP, vertical ПНД, horizontal PP, horizontal ПНД)
  - Sub-tabs for subtypes (плоская крыша, наклонное дно, коническая крыша / низкие ложементы, высокие ложементы)
  - Each showing a table with columns: Артикул | Объём (л) | Ø (мм) | H (мм)
  - Description text for each subtype from the Excel

### Files
- **Copy**: 2 images to `public/images/`
- **Create**: `src/data/emkostiProducts.ts`
- **Modify**: `src/pages/EmkostiPage.tsx`

