

# Plan: Update Lamella Settler Hero Gallery

## What changes

1. **Copy uploaded image** `user-uploads://otstoynik.jpg` → `public/images/lamelnyj-otstoynik-real.jpg`

2. **Generate a recolored version** of the uploaded image using AI image generation — body recolored to Grey RAL 7032 (light grey), frame recolored to Graphite RAL 7024 (dark grey/graphite). Save as `public/images/lamelnyj-otstoynik-ral7032.png`.

3. **Update `heroImages` array** in `src/pages/VodoochistkaLamelnyj.tsx` (lines 28-32):
   - Remove the 2 small images (`vodoochistka-hero-real-2.jpeg`, `lamelnyj-photo-1.jpg`)
   - Keep the existing large hero image (`lamelnyj-hero-real.jpg`)
   - Add the uploaded real photo (`lamelnyj-otstoynik-real.jpg`)
   - Add the recolored RAL 7032/7024 version (`lamelnyj-otstoynik-ral7032.png`)

4. **Adjust grid layout** (lines 178-184) to display 3 images in a balanced layout (1 large + 2 medium) instead of the current 1 large + 2 small.

## Technical details
- File: `src/pages/VodoochistkaLamelnyj.tsx`, lines 28-32 (heroImages) and 178-184 (grid)
- AI image generation model: `google/gemini-2.5-flash-image` for recoloring
- Color specs: Body → RAL 7032 (light warm grey), Frame → RAL 7024 (dark graphite)

