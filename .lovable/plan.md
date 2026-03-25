
## Plan: Replace Horizontal Tank Card Image

### Change
Save the uploaded image to `public/images/emkost-pryam-goriz-card.png` and update the `subtypes` array in `EmkostiPryamougolnye.tsx` to reference it.

### File Changes

1. **Copy image**: `user-uploads://emkost-pryam-real-3_1-3.png` → `public/images/emkost-pryam-goriz-card.png`

2. **`src/pages/EmkostiPryamougolnye.tsx`** — line 107: change image path from `"/images/emkost-pryam-real-4.png"` to `"/images/emkost-pryam-goriz-card.png"`
