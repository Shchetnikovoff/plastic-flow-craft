

## Plan: Add Render Preview to Calculator with Graphite Frame

### Problem
The horizontal tank render image only appears in the hero section. User wants it inside the calculator/table section (right side of material & color selectors) and wants the metal frame to remain graphite-colored across all color variants.

### Approach
Since CSS `filter` affects the entire image (frame + body), and we only have one base image, we'll use CSS `filter` combined with a semi-transparent colored overlay on top of the image to tint just the lighter body area while the darker frame stays relatively unchanged. However, a simpler and more effective approach: adjust the CSS filters to be subtler so the dark frame stays dark/graphite-looking.

### Changes

**1. `src/pages/EmkostiPryamougolnyeGorizontalnye.tsx`**

- **Restructure `RectProductTable` layout**: Wrap the material/color selectors and ArticleBreakdown in a 2-column grid — left column has selectors, right column has the render preview image
- **Render preview**: Small image (`max-w-[220px]`) of `emkost-pryam-goriz-render-grey.png` with CSS filter matching selected color
- **Adjust `colorFilters`** to keep frame dark/graphite:
  ```typescript
  const colorFilters: Record<string, string> = {
    "7032": "none",                                          // grey — as-is
    "5012": "hue-rotate(190deg) saturate(1.8) brightness(0.95)", // blue — less saturated to preserve dark frame
    "9003": "brightness(1.25) saturate(0.15) contrast(1.1)",     // white — less extreme, keeps frame contrast
    "": "brightness(0.35) saturate(0) contrast(1.2)",            // black — darker but with contrast to show frame
  };
  ```

**2. `src/pages/EmkostiPryamougolnyeVertikalnye.tsx`**
- Same treatment: add small render preview to `VertRectProductTable` right side (reusing the same horizontal render or the vertical page's own render)

### Layout sketch
```text
┌─────────────────────────────────────────────┐
│ Типоразмерный ряд                           │
├──────────────────────┬──────────────────────┤
│ Материал             │                      │
│ [PPC] [PE100] [PPH]  │   ┌──────────────┐  │
│                      │   │  render img   │  │
│ Цвет                 │   │  (filtered)   │  │
│ [grey] [blue] [white]│   └──────────────┘  │
│                      │                      │
│ Артикул: СЗПК.ЕПО...│                      │
├──────────────────────┴──────────────────────┤
│ Table rows...                               │
└─────────────────────────────────────────────┘
```

### Scope
- 2 files modified (`EmkostiPryamougolnyeGorizontalnye.tsx`, `EmkostiPryamougolnyeVertikalnye.tsx`)
- No new files

