

## Plan: Replace KNS Hero Images with Uploaded Images

### Changes

1. **Copy uploaded images to public/images/**:
   - `user-uploads://Emkost-sborka.gif` → `public/images/kns-hero-1.png` (the dark 3D render of three KNS units)
   - `user-uploads://icon_kns.png` → `public/images/kns-hero-2.png` (the cutaway/exterior dual view)

2. **No code changes needed** — the existing `KnsPage.tsx` already references `/images/kns-hero-1.png` and `/images/kns-hero-2.png` in the 2-column grid (lines 74-75), so replacing the files in-place will automatically update the visuals.

