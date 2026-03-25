

## Plan: Move Catalog Section Up

Move the "Каталог водоочистного оборудования" section (lines 352-end of that section) to right after the hero collage and navigation pills, before the descriptive text sections.

### Changes

**`src/pages/Vodoochistka.tsx`**:
- Cut the catalog section (lines 352-onwards with the subcategories grid) from its current position
- Paste it immediately after the nav pills (after line 243), before the "Системы водоочистки" text section (line 245)
- This follows the established design pattern (per memory: catalog-layout-priority) of placing product selection blocks right after the hero section

