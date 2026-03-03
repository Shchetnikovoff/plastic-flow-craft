

## Plan: Set fixed L min and L max values for Раздвижной элемент

Change lines 29-30 in `src/data/razdvizhnoyProducts.ts`:
- `lMin: item.diameter` → `lMin: 1000`
- `lMax: item.diameter * 2` → `lMax: 1800`

Also update the characteristics grid in `src/pages/Razdvizhnoy.tsx` description section if it mentions dynamic ranges.

