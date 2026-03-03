

## Plan: Remove blue text and whiten backgrounds on tee renders

Use client-side canvas pixel manipulation to process `troynik-1.png`, `troynik-2.png`, `troynik-3.png` at render time, removing blue-colored text and ensuring a white background.

### Approach

Create a React hook or utility that:
1. Loads each image onto a hidden canvas
2. Scans all pixels — any pixel where blue channel dominates (high blue, low red/green) gets replaced with white `(255,255,255)`
3. Light/near-white pixels (all channels > 240) also become pure white for a clean background
4. Returns processed image as a data URL

### Implementation

1. **Create `src/lib/processImage.ts`** — a function `removeBlueTextAndWhiten(src: string): Promise<string>` that:
   - Draws image to canvas
   - Iterates pixel data: if `b > r + 30 && b > g + 30 && b > 100` → set to white
   - If `r > 230 && g > 230 && b > 230` → set to pure white (clean background)
   - Returns `canvas.toDataURL()`

2. **Create `src/hooks/useProcessedImages.ts`** — hook that takes an image array and indices to process (0, 1, 2), returns processed URLs via `useEffect` + `useState`

3. **Update `src/pages/Troynik.tsx`** — use the hook to process the first 3 troynik images, display processed versions in gallery

4. **Update `src/pages/Product.tsx`** — apply same processing when displaying troynik product images

### Technical notes
- Processing happens once on mount, cached in state
- Only images at indices 0-2 are processed (renders); indices 3-4 (technical drawings) are left as-is
- Threshold values may need tuning if blue shades vary

