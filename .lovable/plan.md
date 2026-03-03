

## Plan: Add 45° ventilation elbow product

Following the same pattern used for 90° and 60° elbows, add the 45° angle with its own images and route.

### Changes

**1. Copy uploaded images to `public/images/`**
- `user-uploads://image-23.png` → `public/images/product-45-1.png`
- `user-uploads://image-24.png` → `public/images/product-45-2.png`
- `user-uploads://image-25.png` → `public/images/product-45-3.png`
- `user-uploads://image-26.png` → `public/images/product-45-4.png`
- `user-uploads://image-27.png` → `public/images/product-45-5.png`

(image-28 is a reference table screenshot, not used as product image)

**2. Update `src/data/products.ts`**
- Change `AngleType` from `90 | 60` to `90 | 60 | 45`
- Add `45` to `supportedAngles` array
- Add `product45Images` array with the 5 new image paths
- Update `getProductImages` to handle `angle === 45`

**3. Update `src/App.tsx`**
- Add route: `<Route path="/45" element={<Index angle={45} />} />`

**4. Update `src/pages/Product.tsx`**
- No changes needed — `parseArticle` already parses angle dynamically from article string

**5. Update `src/components/Header.tsx`**
- No changes needed — navigation already renders from `supportedAngles` array dynamically

### Technical details
- The `baseSizes` table is identical for 45° (same diameters 200-1200, same wall thicknesses), so no new size data needed
- Article format: `ОТВР-45-PPC-7032-200` (follows existing pattern)
- Only raструб connection initially (user can add flanec images later)

