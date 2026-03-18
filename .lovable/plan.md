

## Plan: Redraw dimension lines in proper engineering drawing style (GOST/ISO)

Currently the overlay uses informal placement with labels like "L = ...", "W", "H" next to the lines. Standard engineering drawings use a different convention:

- Dimension lines are placed **outside** the object outline, offset with **extension lines** (выносные линии)
- Arrows at both ends of the dimension line
- The value is placed **centered above** the dimension line (not below or to the side)
- Thin solid lines for dimensions (0.3-0.5mm equivalent)
- Extension lines extend slightly past the dimension line

### Changes to `src/components/DimensionOverlay.tsx`

Rewrite the SVG overlay to follow drafting conventions:

1. **Height (H)** — vertical dimension line on the **left side**, offset from the object:
   - Two horizontal extension lines from the object edge going left
   - Vertical arrow line between them
   - Value centered along the line, rotated 90° (or placed to the left), format: `1500` (just the number, in mm)

2. **Length (L)** — horizontal dimension line **below** the object:
   - Two vertical extension lines going down from the object edges
   - Horizontal arrow line between them
   - Value centered above the line, format: `3000`

3. **Width (W)** — horizontal dimension line **above** the object (or second line below, offset further):
   - Two vertical extension lines going up/down
   - Horizontal arrow line
   - Value centered, format: `1500`

4. **Arrow style** — proper filled triangular arrowheads (not open chevrons), as per GOST 2.307
5. **Line weight** — thin (strokeWidth ~0.5-0.7)
6. **Text** — numbers only (no "L =", "W", "H" prefixes), font size ~10-11, placed centered on the dimension line with a small white background rectangle for readability

Layout (ASCII sketch):
```text
        ┌─── W = 1500 ───┐
        │                 │
   ┬    ┌─────────────────┐
   │    │                 │
 H=1500 │    [IMAGE]      │
   │    │                 │
   ┴    └─────────────────┘
        ├─── L = 3000 ────┤
```

Extension lines have a ~2px gap from the object edge and extend ~4px past the dimension line. Filled arrowhead markers replace the open chevrons.

