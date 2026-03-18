

## Plan: Swap product image color for perelivnye tanks based on selected color

### Problem
Currently, the same blue tank photo (`emkost-perelivnaya-bassein.jpg`) is shown regardless of which polypropylene color is selected. When the user selects grey (RAL 7032), the tank in the image should appear grey.

### Approach
Use the **Nano banana** AI image generation API to create a grey variant of the existing tank image, save it as a new file, and swap images based on selected color code.

### Changes

**1. Generate new image asset**
- Use image editing API to recolor the existing blue tank image to grey (RAL 7032, `#b5b0a1`), producing `/public/images/emkost-perelivnaya-bassein-grey.jpg`

**2. `src/pages/Product.tsx`** (~line 129)
- Change the static `image` field to be dynamic based on `item.colorCode`:
  - `"7032"` → `/images/emkost-perelivnaya-bassein-grey.jpg`
  - `"5012"` → `/images/emkost-perelivnaya-bassein.jpg` (existing blue)

**3. `src/pages/EmkostiPerelivnye.tsx`** (~line 130)
- Make the hero image swap based on `selectedColorCode`:
  - Grey selected → grey image
  - Blue selected → original blue image

### Result
Both the catalog hero section and individual product cards will show the correctly colored tank matching the selected polypropylene color.

