

## Plan: Add Horizontal Tank Render with Color Switching

### Problem
The horizontal rectangular tank pages currently reuse vertical tank renders for color switching. The user provided a new horizontal perspective render (grey) that should be used instead — both in the table/calculator area and in product cards.

### Changes

**1. Save uploaded image**
- Copy `user-uploads://1-3.png` → `public/images/emkost-pryam-goriz-render-grey.png`

**2. Create color variants via CSS hue-rotate/brightness overlay**
Since only one base image (grey) is provided, apply CSS filter approach for color variants (same technique can be used as the DimensionOverlay pattern):
- Grey (7032): base image, no filter
- Blue (5012): `hue-rotate(200deg) saturate(2) brightness(0.85)`
- White (9003): `brightness(1.4) saturate(0.2)`  
- Black (PE100): `brightness(0.3) saturate(0)`

**3. `src/pages/EmkostiPryamougolnyeGorizontalnye.tsx`**
- Replace `colorImages` map to point to the new base image
- Add a `getColorFilter(colorCode)` function returning CSS filter strings
- In the hero grid, replace one of the render images with the new horizontal render + dynamic CSS filter
- In `RectProductTable`, add a small preview image (max-w-[180px]) next to the material/color selectors that also uses the filter approach

**4. `src/pages/EmkostiPryamougolnyeVertikalnye.tsx`**
- No changes (keeps its own vertical renders)

**5. `src/pages/Product.tsx`**
- Update `epoColorImages` map (lines 290-295) to use the new horizontal render as default
- Apply CSS filter for color variants in the product card image display, OR keep the same base image and pass a filter style

**6. Product card image rendering** (in Product.tsx render section)
- Add optional `imageFilter` CSS property to the resolved product data
- Apply it as `style={{ filter }}` on the product image `<img>` tag

### CSS Filter Map
```typescript
const colorFilters: Record<string, string> = {
  "7032": "none",
  "5012": "hue-rotate(190deg) saturate(3) brightness(0.9)",
  "9003": "brightness(1.5) saturate(0.1)",
  "": "brightness(0.25) saturate(0)",
};
```

### Scope
- 1 new image asset
- 3 files modified (EmkostiPryamougolnyeGorizontalnye.tsx, Product.tsx, EmkostiPryamougolnyeVertikalnye.tsx — minor)

