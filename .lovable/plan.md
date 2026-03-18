

## Plan: Remove text labels/plates from the hero image

The current hero image at `public/images/emkosti-kisloty-shchelochi-clean.jpg` contains visible text plates/labels on the tanks. We'll use the Gemini image editing API to remove them.

### Steps

1. **Create a one-time script** (`src/scripts/cleanImage.ts` or inline in a temp component) that:
   - Loads the current image from `public/images/emkosti-kisloty-shchelochi-clean.jpg`
   - Sends it to `google/gemini-2.5-flash-image` with instruction: "Remove all text labels, plates, stickers, and any written text from the tanks in this photo. Keep everything else intact. Make the areas where text was look natural and clean."
   - Saves the result back to the same path

2. **Overwrite** `public/images/emkosti-kisloty-shchelochi-clean.jpg` with the cleaned result.

No code changes needed in `EmkostiKislotyShchelochi.tsx` since it already references this file path.

