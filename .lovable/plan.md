

## Plan: Make dimension line positions match actual tank edges in photos

### Problem
The `DimensionOverlay` uses a hardcoded bounding box (`left: 80, right: 320, top: 60, bottom: 310`) that doesn't align with the actual tank position in photos. Different product images have tanks in different positions.

### Solution
Make the bounding box configurable via props, so each product page can specify where the tank sits in the image. Keep sensible defaults.

### Changes

**1. `src/components/DimensionOverlay.tsx`**
- Add optional `objectBounds` prop: `{ left, right, top, bottom }` (in viewBox 400×400 coordinates)
- Default to current values if not provided
- Use these bounds for all dimension line calculations

**2. `src/pages/Product.tsx`**
- Pass `objectBounds` when rendering `DimensionOverlay`
- For perelivnaya (`emkost-perelivnaya-bassein.jpg`): approximate bounds `{ left: 145, right: 310, top: 120, bottom: 345 }` — matching where the blue tank sits in the photo
- For pryamougolnye (`emkost-pryam-pp-1.png`): adjust bounds to match that image's tank position

This way each product image gets correctly aligned dimension lines without changing the overlay logic.

