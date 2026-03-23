

## Plan: Replace EVPP images with uploaded photos

**What:** Replace the two hero images on the EVPP page (`EmkostiEvpp.tsx`) with the user-uploaded product photo and technical schema. Remove the "СВ ПОЛИМЕР" watermark from the product photo.

### Changes

**1. Copy uploaded images to project**
- Copy `user-uploads://Emkost-vertikalnaya-tsilindricheskaya-s-ploskoj-kryshkoj.jpg` → `public/images/evpp-flat-hero.png` (overwrite)
- Copy `user-uploads://Emkost-vertikalnaya-tsilindricheskaya-s-ploskoj-kryshkoj-1.jpg` → `public/images/evpp-flat-schema.png` (overwrite)

**2. Process images**
- Product photo: remove "СВ ПОЛИМЕР" watermark and logo, keep clean white background per design standard
- Schema: keep as-is (blue dimension lines are standard for technical drawings)

### Files modified
- `public/images/evpp-flat-hero.png` — replaced with uploaded product photo
- `public/images/evpp-flat-schema.png` — replaced with uploaded technical schema

No code changes needed — `EmkostiEvpp.tsx` already references these exact file paths.

