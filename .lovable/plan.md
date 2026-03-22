

## Plan: Add schema image to sludge dewatering product cards

**What:** Add the existing schema image (`obezvozhivatel-schema-1.webp`) as a second image in ОНИКС product cards, with thumbnail navigation like other product pages.

### Changes

**File: `src/pages/Product.tsx`** (lines ~933-938)

Replace the single static image with `ImageGalleryWithLightbox` component (already used across the project):

- Import `ImageGalleryWithLightbox` from `@/components/configurator`
- Add `useState` for `selectedImage` index
- Define image array: `["/images/obezvozhivatel-real-3d-new.jpg", "/images/obezvozhivatel-schema-1.webp"]`
- Replace the single `<div><img></div>` block with `<ImageGalleryWithLightbox images={moImages} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />`

This matches the pattern used on FFU, Lamella, and ventilation product pages.

