

## Plan: Enlarge product images in perelivnye product cards

### Problem
The product image for perelivnye (overflow tank) cards is constrained by `aspect-square` and `object-contain p-4`, making the photo appear small within the container.

### Change

**`src/pages/Product.tsx`** (line 317):
- Change `aspect-square` to `aspect-[4/3]` for the perelivnaya image container to give it more horizontal space
- Remove or reduce the `p-4` padding on the `<img>` tag (line 339) to `p-2` and switch to `object-cover` so the image fills the container better

Specifically for the perelivnaya branch (line 338-340), change the image class from `h-full w-full object-contain p-4` to `h-full w-full object-cover`.

