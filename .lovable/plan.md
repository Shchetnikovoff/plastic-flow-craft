

## Plan: Move hero image 2.3 to Lamella Settler page

**Change**: Move the second hero image from the Vodoochistka page (`vodoochistka-hero-real-2.jpeg`) to the Lamella Settler page (`VodoochistkaLamelnyj.tsx`) as a hero image.

### Files to modify

**1. `src/pages/VodoochistkaLamelnyj.tsx`** (lines 27-30)
- Add `vodoochistka-hero-real-2.jpeg` to the `heroImages` array (as second or replacement image)

**2. `src/pages/Vodoochistka.tsx`** (lines 201-208)
- Remove `vodoochistka-hero-real-2.jpeg` from the hero grid
- Either make the remaining image full-width, or replace with another water treatment image (e.g. `vodoochistka-hero-1.jpeg`)

