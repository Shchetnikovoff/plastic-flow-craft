

## Plan: Download full page as PDF

Create a new utility `src/lib/generateFullPagePdf.ts` that builds a comprehensive PDF containing all visible sections of the Index page: product images, description, specs, material info, plastic characteristics, and the full sizes table.

**New file: `src/lib/generateFullPagePdf.ts`**
- Accept all current page state: selected material, connection type, color, sizes, product images, specs
- Build a multi-page landscape jsPDF document with sections:
  1. Title + subtitle (material, connection, color)
  2. Description block
  3. Specifications grid (diameter range, connection, wall, angle)
  4. Material/plastic characteristics (working temp, chemical resistance, available colors)
  5. Article decoding legend
  6. Full sizes table (reuse logic from `generateTablePdf`)
  7. Footer with company contacts
- Export as `Каталог_{material}_{connection}.pdf`

**Edit: `src/pages/Index.tsx`**
- Import the new generator
- Add a "Скачать страницу (PDF)" button next to the existing "Скачать таблицу (PDF)" button
- Pass all relevant state (material, connection, color, specs, sizes, images) to the generator

