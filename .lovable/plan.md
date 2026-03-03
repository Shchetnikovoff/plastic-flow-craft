

## Plan: Add flanged tee gallery images with connection-type switching

The flanged tee data and table already work correctly. What's missing is **dedicated gallery images** for the flanged tee variant -- the uploaded images (3 renders + 2 technical drawings) should display when "Фланец" is selected, similar to how elbows switch images.

### Changes

1. **Copy 5 uploaded images** to `public/images/`:
   - `troynik-flanec-1.png` through `troynik-flanec-3.png` (renders from image-64, 65, 66)
   - `troynik-flanec-4.png`, `troynik-flanec-5.png` (technical drawings from image-67, 68)

2. **Update `src/data/troynikProducts.ts`**:
   - Add `troynikFlanecImages` array (5 paths)
   - Add `getTroynikImages(connectionType)` helper function

3. **Update `src/pages/Troynik.tsx`**:
   - Use `getTroynikImages(selectedConnection)` instead of static `troynikImages`
   - Reset `selectedImage` to 0 when connection type changes

