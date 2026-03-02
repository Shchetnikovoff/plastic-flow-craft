

## Plan: Clickable color selection with article codes for PPC

### What changes

**`src/data/products.ts`**
- Add `colorCode` field to `MaterialColor` interface (e.g. `"7032"`, `"9003"`, `"5012"`)
- Add `colorCode` values to all color entries
- Change `productSizesByMaterial` to be keyed by `material + colorCode` combo, or add a helper function that generates articles with color code: `ОТВ-90-PPC-7032-200`

**`src/pages/Index.tsx`**
- Add `selectedColor` state (defaults to first color of current material)
- Reset `selectedColor` when material changes
- Make color cards clickable with active/inactive styling (border highlight on selected)
- Update article generation in the table: when the material has multiple colors, include the RAL code number in the article (e.g. `ОТВ-90-PPC-7032-200`)
- Update table heading to show selected color name
- For materials with only one color, auto-select it (no visual change needed)

### Article format
- Multi-color materials: `ОТВ-90-{materialCode}-{ralNumber}-{diameter}` (e.g. `ОТВ-90-PPC-7032-200`)
- Single-color materials: keep current format `ОТВ-90-{materialCode}-{diameter}`

### UI behavior
- Color cards get `cursor-pointer` and highlighted border when selected
- Table dynamically regenerates rows based on selected color
- Quantities reset when color changes

