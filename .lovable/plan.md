

## Plan: Match Lamella gallery layout to FFU page style

**Current state (Lamella):** 3 images in a `grid-cols-3` layout with `aspect-[4/3]` containers and `p-2` padding.

**Target state (FFU):** 2-column grid (`grid-cols-1 sm:grid-cols-2`) with no forced aspect ratio, images use `w-full object-contain` without padding.

**Changes:**

**File: `src/pages/VodoochistkaLamelnyj.tsx`** (lines 178-184)

1. Change grid from `grid-cols-3` to `grid-cols-1 sm:grid-cols-2 gap-3` (matching FFU).
2. Remove `aspect-[4/3] flex items-center justify-center` from image containers.
3. Remove `h-full p-2` from `<img>` tags, keep `w-full object-contain`.

This will make the 3 images display in a 2-column grid (2 on top, 1 below) with natural height, matching the FFU page proportions exactly.

