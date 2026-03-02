

## Plan: Add article decoding scheme above tables

Add a visual legend/diagram that explains the article format structure, placed right above the table for each material.

### Article formats
- Multi-color: `ОТВ-90-PPC-7032-200` → Тип–Угол–Материал–RAL–Диаметр
- Single-color: `ОТВ-90-PE100-200` → Тип–Угол–Материал–Диаметр

### Implementation

**`src/pages/Index.tsx`** — Add a styled decoding block between the table heading and the `<Table>`, showing the article broken into labeled segments with arrows/brackets. Use the currently selected material and color to render a live example:

```text
ОТВ  -  90  -  PPC  -  7032  -  200
 │       │      │       │        │
 Тип   Угол  Материал  RAL    Диаметр
```

- Render as a `flex` row of labeled segments with colored underlines/badges
- For single-color materials (PE100, PPH, PPs), hide the RAL segment
- Use `font-mono` for the article parts, `text-muted-foreground text-xs` for labels below
- Wrap in a rounded border card with `bg-muted/30` background, placed between heading and table

