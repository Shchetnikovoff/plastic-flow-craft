

## Plan: Clean up all product images — remove labels, white background

### Scope
50 product images across all angles (90°, 60°, 45°, 30°, 15°) and connection types (rastrub, flanec). Excludes `logo.png` and `schema.png`.

### Approach
Use the AI image editing API (Gemini) to process each image with the prompt: "Remove all text, labels, watermarks and annotations from this image. Make the background pure white (#FFFFFF). Keep only the product (pipe elbow) on a clean white background."

### Batch processing
Images will be processed in parallel batches to stay within API limits:
- **Batch 1**: `product-{1-5}.png` (90° rastrub)
- **Batch 2**: `flanec-{1-5}.png` (90° flanec)
- **Batch 3**: `product-60-{1-5}.png`
- **Batch 4**: `flanec-60-{1-5}.png`
- **Batch 5**: `product-45-{1-5}.png`
- **Batch 6**: `flanec-45-{1-5}.png`
- **Batch 7**: `product-30-{1-5}.png`
- **Batch 8**: `flanec-30-{1-5}.png`
- **Batch 9**: `product-15-{1-5}.png`

Total: 45 images (flanec-15 reuses flanec-30, so no separate files).

### Notes
- Each image will be edited individually via the AI image editing endpoint
- The edited images replace the originals in `public/images/`
- No code changes needed — only asset replacement
- After processing, visual verification on each angle page will confirm quality

