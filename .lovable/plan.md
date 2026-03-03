

## Plan: Restore dimension labels on all product images

### What
Add back technical dimension labels (DN, S, L, Sp, angle markers) to all 45 product images that were cleaned in the previous step. The labels should show pipe dimensions on a white background with the product.

### Approach
Use AI image editing (Gemini) to process each of the 45 images with a prompt like: "Add technical dimension labels to this pipe elbow image: 'DN' for diameter, 'S' for wall thickness, 'L' for length, 'Sp' for socket thickness. Add dimension lines and arrows pointing to the corresponding parts of the product. Keep the white background clean."

### Batch processing
Same 9 batches as before:
1. `product-{1-5}.png` (90° rastrub)
2. `flanec-{1-5}.png` (90° flanec)
3. `product-60-{1-5}.png`
4. `flanec-60-{1-5}.png`
5. `product-45-{1-5}.png`
6. `flanec-45-{1-5}.png`
7. `product-30-{1-5}.png`
8. `flanec-30-{1-5}.png`
9. `product-15-{1-5}.png`

Total: 45 images (flanec-15 reuses flanec-30).

### Notes
- Only asset edits, no code changes
- The AI will add dimension annotation lines and text labels matching typical engineering drawing style
- Visual verification after processing to confirm quality

