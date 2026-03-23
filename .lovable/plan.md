

## Plan: Add tank selection calculator with material/color switching to EVPP pages

**What:** Create a reusable `TankCalculator` component that lets users select parameters (volume, type, material, color) and see a matching tank recommendation. When the user changes color, the tank image tint changes to match the selected RAL color. Add this calculator to all 4 EVPP subsection pages.

### New component: `src/components/configurator/TankCalculator.tsx`

Interactive calculator with:
- **Volume selector** — slider or dropdown for desired volume (1000–50000 л)
- **Tank type selector** — badges for 4 types (Плоская крыша, Наклонное дно, Коническая крыша, Конусное дно)
- **Material selector** — reuse `materials` and `materialSpecs` from `src/data/products.ts` (PPC, PE100, PPH, PPs) displayed as badge pills
- **Color selector** — show available colors for selected material (from `materialSpecs`), each as a clickable swatch card (same UI as `MaterialSection.tsx`)
- **Tank preview** — SVG illustration of the tank that changes fill color to the selected `hex` value. Simple cylinder shape with flat/sloped/conical/cone-bottom variants
- **Result card** — shows matched article, dimensions (Ø×H), selected material code, selected color RAL, with a "Перейти к товару" link to `/product/:article`

The SVG tank illustration will be a simple inline SVG (cylinder body + top + bottom shapes) where the fill color is bound to `selectedColor.hex`. This gives instant visual feedback when switching colors.

### Changes to existing pages

**Files modified (4):**
- `src/pages/EmkostiEvpp.tsx` — add `<TankCalculator defaultType="flat" />` between anchor nav and description sections, add "Калькулятор" to anchor nav
- `src/pages/EmkostiEvppSloped.tsx` — add `<TankCalculator defaultType="sloped" />`
- `src/pages/EmkostiEvppConical.tsx` — add `<TankCalculator defaultType="conical" />`
- `src/pages/EmkostiEvppConusDno.tsx` — add `<TankCalculator defaultType="conusdno" />`

### Data flow

The calculator uses the existing `models` arrays already defined in each page. To avoid duplication, the calculator will accept `models` as a prop along with `defaultType`. Volume selection filters to the nearest matching model. Material and color are cosmetic selections that update the SVG color and the displayed article suffix.

### Files
- `src/components/configurator/TankCalculator.tsx` — new component
- `src/components/configurator/index.ts` — export it
- 4 EVPP page files — integrate the calculator

