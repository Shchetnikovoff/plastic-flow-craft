

## Plan: Enhanced article decoding scheme

Replace the current minimal decoding row with a richer, more informative breakdown that includes descriptions and a live example article.

### Current state
Simple row: `ОТВ – 90 – PPC – 7032 – DN` with one-word labels underneath.

### Proposed design

**`src/pages/Index.tsx`** — Replace the current decoding block with an enhanced version:

1. **Live example article** at the top — show a full real article like `ОТВ-90-PPC-7032-200` using the first size from the current table, styled as a highlighted mono string

2. **Segment cards** below — each segment as a mini-card in a flex row with:
   - The value in bold mono (e.g. `PPC`)
   - Short label (e.g. "Материал")  
   - Description line explaining what it means (e.g. "Полипропилен блок-сополимер")
   - For RAL: show the color swatch dot next to the value
   - For DN: show "Номинальный диаметр трубы"

3. **Segment descriptions**:
   - `ОТВ` → "Тип изделия" / "Отвод вентиляционный"
   - `90` → "Угол поворота" / "90 градусов"
   - `{code}` → "Материал" / full material name
   - `{RAL}` → "Цвет (RAL)" / color name + swatch (only for multi-color)
   - `{DN}` → "Диаметр" / "Номинальный диаметр, мм"

4. Layout: keep the `rounded-lg border bg-muted/30` wrapper, use a responsive grid (`grid-cols-4` or `grid-cols-5` depending on RAL presence) for the segment cards

Only changes to `src/pages/Index.tsx` — replace the existing IIFE decoding block (~lines 209–237).

