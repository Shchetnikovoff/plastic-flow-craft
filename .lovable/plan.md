

## Plan: Improve tank color tinting to match reference site quality

**Problem:** The current pixel-level canvas tinting (`useTintedImage`) produces unnatural-looking results. The reference site (sv-polimer.ru) shows tanks with clean, natural coloring — white/cream tanks on white backgrounds with realistic shading.

**Root cause:** The algorithm tints ALL mid-luminance pixels (60–235) uniformly, destroying natural photo shading and producing a flat, artificial look.

**Solution:** Replace the canvas pixel manipulation with CSS `mix-blend-mode: color` overlay. This blend mode changes hue and saturation while preserving the original luminance — exactly like Photoshop's "Color" blend mode. White/near-white areas stay white, dark areas stay dark, and mid-tones get the target hue naturally.

For neutral colors (RAL 7032 grey, RAL 9003 white), the overlay opacity is reduced so the original photo shows through naturally.

### Changes to `src/components/configurator/TankCalculator.tsx`

1. **Remove** `useTintedImage` hook and `TintedImage` component (canvas-based pixel processing)
2. **Replace** with a CSS-based `ColoredTankImage` component that:
   - Renders the original `<img>` as-is
   - Overlays a `<div>` with `mix-blend-mode: color` and `backgroundColor` set to the selected hex
   - For near-white/neutral colors (hex lightness > 85%), reduces overlay opacity to ~0.3 so the tank looks naturally white/grey
   - For dark colors (PE100 black), uses `mix-blend-mode: multiply` with low opacity for a subtle darkening effect
   - For vivid colors (blue RAL 5012), uses full opacity `color` blend mode
3. **Update** both the type selector thumbnails and the main preview to use the new component

### Technical details

```tsx
const ColoredTankImage = ({ src, hex, alt, className }) => {
  // Calculate perceived lightness to adjust blend intensity
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;  
  const b = parseInt(hex.slice(5,7), 16) / 255;
  const lightness = r * 0.299 + g * 0.587 + b * 0.114;
  
  // Near-white: minimal overlay; dark: multiply; vivid: full color blend
  const opacity = lightness > 0.85 ? 0.15 : lightness < 0.15 ? 0.6 : 0.7;
  const blendMode = lightness < 0.15 ? "multiply" : "color";
  
  return (
    <div className="relative overflow-hidden">
      <img src={src} alt={alt} className={className} />
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{ backgroundColor: hex, mixBlendMode: blendMode, opacity }}
      />
    </div>
  );
};
```

This approach is simpler, faster (no canvas processing), and produces results matching the natural photographic quality of the reference site.

### Files modified
- `src/components/configurator/TankCalculator.tsx` — replace canvas tinting with CSS blend mode

