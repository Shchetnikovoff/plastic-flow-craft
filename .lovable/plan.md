

## Plan: Remove Duplicate Calculator and Clean Up Dead Code

### Problem
1. `RectangularTankCalculator` (line 368) duplicates the material/color selection that `RectProductTable` (line 371) already provides
2. Old `ProductTable` component (lines 538-569) is dead code — never rendered
3. Nav anchor "Калькулятор" points to the removed section

### Changes — Single file: `src/pages/EmkostiPryamougolnye.tsx`

1. **Remove `<RectangularTankCalculator />`** call (line 368) and the import (line 26)
2. **Remove nav anchor** `{ id: "calculator", label: "Калькулятор" }` from the nav bar (line 349)
3. **Remove dead `ProductTable` component** (lines 538-570) — it's the old table that's no longer used
4. **Remove unused `sizeTable`** constant (lines 109-126) — also dead code from old layout
5. **Remove unused image arrays** `ppImages` and `pndImages` (lines 128-138) — leftover from old tabs

### Result
- Single interactive table with material & color selectors remains as the primary product selection UI
- All product card links continue to work via existing ЕПО article parsing in Product.tsx
- No duplicate UI elements

