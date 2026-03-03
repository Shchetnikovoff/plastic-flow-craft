

## Plan: Add flanec connection type for 60° elbow with dedicated images

The user uploaded 5 images for the flanec-60° product. Currently `getProductImages` returns the same `product60Images` for both connection types when angle is 60°. We need a dedicated image set and updated logic.

### Changes

**1. Copy uploaded images to `public/images/`**
- `user-uploads://image-18.png` → `public/images/flanec-60-1.png`
- `user-uploads://image-19.png` → `public/images/flanec-60-2.png`
- `user-uploads://image-20.png` → `public/images/flanec-60-3.png`
- `user-uploads://image-21.png` → `public/images/flanec-60-4.png`
- `user-uploads://image-22.png` → `public/images/flanec-60-5.png`

**2. Update `src/data/products.ts`**
- Add `flanec60Images` array with the 5 new image paths.
- Update `getProductImages` to return `flanec60Images` when `angle === 60 && connectionType === "flanec"`.

No other files need changes — the Index page and Product page already support angle + connection type switching dynamically.

