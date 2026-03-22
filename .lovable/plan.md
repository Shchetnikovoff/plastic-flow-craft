

## Plan: Reorder sections on the grease traps page

**What:** Move "Виды жироуловителей" (type cards) section up — right after the Hero — and push "Intro" (description) and "Назначение" (purpose) sections below it.

### Current order (lines 139-210):
1. Hero (139-156)
2. Intro — description + "почему выбирают" (158-178)
3. Назначение и области применения (180-191)
4. Виды жироуловителей (193-210)

### New order:
1. Hero (unchanged)
2. **Виды жироуловителей** (moved up)
3. Intro — description + "почему выбирают"
4. Назначение и области применения

### Changes
**`src/pages/VodoochistkaZhirouloviteli.tsx`** — Swap the three `<section>` blocks: cut "Виды" section (lines 193-210) and paste it immediately after the Hero section (after line 156), before Intro.

