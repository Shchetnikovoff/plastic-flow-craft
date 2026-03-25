

## Plan: Enlarge Main Hero Image

Make the left hero image (`emkosti-hero-2.png`) take up more space relative to the thumbnails grid.

### Changes

**`src/pages/EmkostiPage.tsx`** (line 117):
- Change grid from `lg:grid-cols-2` to `lg:grid-cols-[3fr_2fr]` so the main image gets ~60% width and thumbnails ~40%
- Remove `p-2` padding from the main image container to maximize display area
- Add `min-h-[400px]` to the main image container for a taller display

