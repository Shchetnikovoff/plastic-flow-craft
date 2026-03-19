

## Plan: Use first gallery image for large Lamella models

**What:** Replace the product card image for Lamella Settler models ЛО-ПП-20 and above with the first hero image (`lamelnyj-hero-real.jpg`) instead of the current `lamelnyj-thumb-new.png`.

**File:** `src/pages/Product.tsx` (line 719)

**Change:** Add conditional logic to select the image based on the model's capacity. Models with capacity ≥ 20 (ЛО-ПП-20, ЛО-ПП-25, ЛО-ПП-32.5, ЛО-ПП-40, ЛО-ПП-50, ЛО-ПП-65, ЛО-ПП-80, ЛО-ПП-100) will use `/images/lamelnyj-hero-real.jpg`. Smaller models keep `/images/lamelnyj-thumb-new.png`.

```tsx
const lamImage = lamModel && parseFloat(lamModel.capacity) >= 20
  ? "/images/lamelnyj-hero-real.jpg"
  : "/images/lamelnyj-thumb-new.png";
```

Then on line 719, replace the hardcoded `src` with `{lamImage}`.

