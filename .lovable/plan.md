

## Plan: Add schema drawings to SPR product card gallery

**What:** Copy both uploaded schema images to `public/images/` and add them to the SPR product card gallery array.

### Changes

**1. Copy uploaded images to project:**
- `user-uploads://EasyPureDraw1_1.gif` → `public/images/spr-schema-front.gif`
- `user-uploads://izobrazhenie_2023-11-24_144458187.png` → `public/images/spr-schema-top.png`

**2. `src/pages/Product.tsx`** (line 938) — Expand gallery array:
```tsx
images={["/images/spr-hero-ral7032.jpg", "/images/spr-schema-front.gif", "/images/spr-schema-top.png"]}
```

**3. `src/pages/VodoochistkaDozirovanie.tsx`** (line 176) — Replace duplicate hero image with schema:
```tsx
<img src="/images/spr-schema-front.gif" alt="Схема станции приготовления реагентов" ... />
```

