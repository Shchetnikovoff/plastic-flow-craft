

## Plan: Add Color-Responsive Renders to Horizontal Tank Calculator

### Problem
The horizontal tank calculator shows a static photo regardless of the selected color, unlike the vertical tank calculator which switches between color-specific render images (grey, blue, white, black).

### Approach
Since separate color-variant renders don't exist for horizontal tanks (only JPG photos), we'll apply a **CSS color overlay technique** on the preview image to simulate the selected RAL color. This will tint the tank body in the preview to match the user's color selection, providing immediate visual feedback similar to the vertical tanks section.

### Changes

**1. `src/components/configurator/HorizontalTankCalculator.tsx`**
- Add a `getColorOverlayStyle` helper that returns CSS styles (semi-transparent overlay or mix-blend-mode) based on `selectedColor.hex`
- For RAL 7032 (default grey) — show the original image with no overlay
- For RAL 5012 (blue), RAL 9003 (white), Black — apply a tinted overlay matching the color
- Wrap the preview `<img>` in a container with a `::after` pseudo-element or an overlay `<div>` styled with the selected color and `mix-blend-mode: multiply` (for darker colors) or `screen` (for lighter)
- Apply the same overlay logic to the type-selector thumbnails so they also reflect the chosen color

### Technical Detail

The overlay approach:
```
<div className="relative">
  <img src={config.image} ... />
  <div
    className="absolute inset-0 rounded-lg pointer-events-none"
    style={{
      backgroundColor: selectedColor.hex,
      mixBlendMode: 'multiply',
      opacity: 0.35,
    }}
  />
</div>
```

For PE100 (black, no colorCode) — stronger opacity. For RAL 7032 (grey, default) — no overlay. For RAL 9003 (white) — use `screen` blend mode or very low opacity. This gives a convincing tint effect without needing separate image files.

