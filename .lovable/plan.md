

## Plan: Add TankCalculator to the EmkostiVertikalnye page

**What:** Add the existing `TankCalculator` component to the vertical tanks overview page (`EmkostiVertikalnye.tsx`), placed right after the subtypes image grid and before the CTA form. Also add a "Калькулятор" anchor to the nav.

### Changes to `src/pages/EmkostiVertikalnye.tsx`

1. Import `TankCalculator` from `@/components/configurator`
2. Add a `models` array with the standard volume range (same as `EmkostiEvpp.tsx`: 1000–50000 л)
3. Insert `<TankCalculator models={models} defaultType="flat" />` after the subtypes grid section (line 128) and before the CTA form
4. Add `{ id: "calculator", label: "Калькулятор" }` to the anchor nav array

### Files modified
- `src/pages/EmkostiVertikalnye.tsx`

