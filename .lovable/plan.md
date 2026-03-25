

## Plan: Add Color-Switching Hero Images on Rectangular Tank Sub-Pages

### Problem
The hero images on both horizontal and vertical rectangular tank pages are static. When the user selects a different material/color in the table below, the images don't change. Other sections (vertical cylindrical tanks via `TankCalculator`) swap images per color.

### Approach
Use the same image set already defined in `RectangularTankCalculator` (`colorImages` map) and lift the `selectedColor` state from the table component up to the page level so the hero images react to color changes.

### Changes

**1. `src/pages/EmkostiPryamougolnyeGorizontalnye.tsx`**
- Lift `selectedMaterial` and `selectedColor` state from `RectProductTable` to `EmkostiPryamougolnyeGorizontalnyeInner`
- Pass them as props into `RectProductTable`
- Add a `colorImages` map (same as in `RectangularTankCalculator`): grey default, blue `5012`, white `9003`, black for PE100
- Replace the static render image (`emkost-pryam-pp-1.png` or `emkost-pryam-goriz-hero.png`) with a dynamic one based on `selectedColor.colorCode`
- Keep the real photo static (it's a photo, not a render)

**2. `src/pages/EmkostiPryamougolnyeVertikalnye.tsx`**
- Same approach: lift color state, pass as props to `VertRectProductTable`
- Replace the render image (`emkost-pryam-pp-1.png`) with the color-matched version
- Keep the real photo (`emkost-pryam-real-3.png`) static

### Image mapping (reused from existing `RectangularTankCalculator`)
```
7032 (grey)  → /images/emkost-pryam-pp-1.png
5012 (blue)  → /images/emkost-pryam-hero-blue.png
9003 (white) → /images/emkost-pryam-hero-white.png
""   (black) → /images/emkost-pryam-hero-black.png
```

### Scope
- 2 files modified
- No new files or images needed (all color variants already exist)

