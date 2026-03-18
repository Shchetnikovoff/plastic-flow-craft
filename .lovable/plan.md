

## Plan: Add color selection to Overflow Tanks page

### What
Add a color picker section (2 colors: Grey RAL 7032, Blue RAL 5012) to `EmkostiPerelivnye.tsx`, styled like the color cards in `MaterialSection.tsx`.

### Changes

**`src/pages/EmkostiPerelivnye.tsx`**:
1. Define a local array of 2 colors with `name`, `ral`, `hex`, `application`:
   - Серый / RAL 7032 / `#b5b0a1` / "внутри помещения"
   - Голубой / RAL 5012 / `#0089bf` / "улица, УФ-защита"
2. Add `selectedColor` state (default: first color).
3. Insert a "Цвет полипропилена" section after the hero image, before the intro — render clickable color cards (same markup as `MaterialSection` color grid: circle swatch + name + RAL + application text, border highlight on selected).

No other files need changes. The selection is visual only (no impact on articles or cart since these products use a request form, not direct ordering).

