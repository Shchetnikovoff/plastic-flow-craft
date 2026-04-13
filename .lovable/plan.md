

## Plan: Update KNS PP Hero Image

Replace the current hero image on the "9.2 КНС в корпусе из полипропилена" page with the uploaded 3D cutaway render.

### Changes

1. **Copy uploaded image** — `user-uploads://i-2.webp` → `public/images/kns-pp-cutaway.jpg` (overwrite existing)

2. **Update catalog thumbnail** — Ensure `catalog.ts` subcategory `k2` image points to `/images/kns-pp-cutaway.jpg` (already set, no change needed)

No code changes required — the page already references `/images/kns-pp-cutaway.jpg` in both the hero section and catalog card.

