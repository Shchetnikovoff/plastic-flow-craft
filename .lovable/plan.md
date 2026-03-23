

## Plan: Add color-specific renders for remaining tank colors

**Current state:** Only blue (5012) and default (grey 7032) images exist. Missing: natural white (9003) and black (PE100).

**Colors from `materialSpecs`:**
- **7032 (Серый)** — already the default images, no change needed
- **5012 (Голубой)** — already has blue renders, done
- **9003 (Натуральный)** — needs white/cream renders for all 4 tank types
- **"" (Чёрный, PE100)** — needs dark/black renders for all 4 tank types

### Changes

**1. Generate 8 new image assets**
Using the existing hero photos as base, create tinted versions:
- `public/images/evpp-flat-hero-white.png` — natural white tint
- `public/images/evpp-sloped-hero-white.png`
- `public/images/evpp-conical-hero-white.png`
- `public/images/evpp-conusdno-hero-white.png`
- `public/images/evpp-flat-hero-black.png` — dark/black tint
- `public/images/evpp-sloped-hero-black.png`
- `public/images/evpp-conical-hero-black.png`
- `public/images/evpp-conusdno-hero-black.png`

**2. Update `tankTypeImages` mapping in `TankCalculator.tsx`**
Add entries for `"9003"` and `"black"` (for PE100's empty colorCode, use a fallback key):
```tsx
flat: {
  default: "/images/evpp-flat-hero.png",
  "5012": "/images/evpp-flat-hero-blue.png",
  "9003": "/images/evpp-flat-hero-white.png",
  "black": "/images/evpp-flat-hero-black.png",
},
// ... same for sloped, conical, conusdno
```

**3. Update `getTankImage` to handle PE100's empty colorCode**
Map empty `colorCode` (`""`) to `"black"` key before lookup.

### Files modified
- 8 new image files in `public/images/`
- `src/components/configurator/TankCalculator.tsx` — update image mapping and lookup

