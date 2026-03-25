

## Plan: Align Rectangular Tank Calculator with Vertical Tank Calculator Style

### Problem
The `RectangularTankCalculator` uses a different layout and color selection approach than the `TankCalculator` used in vertical tanks. Need to match the vertical tanks' style.

### Key Differences (Current → Target)

| Aspect | Rectangular (current) | Vertical (target) |
|---|---|---|
| Layout | 2-column (image left, controls right) | Controls left, small image right (`lg:grid-cols-[1fr_220px]`) |
| Volume slider | Index-based, label outside | Value-based with min/max labels below |
| Material selector | Badge with `text-[11px]` | Badge with `text-xs`, `px-3 py-1.5` |
| Color selector | Round color circles only | Cards with swatch + name + RAL text |
| Color rendering | CSS overlay on image | CSS overlay (keep — no separate renders exist for rectangular) |
| Result section | Inline box inside controls | Full-width bottom section with `ArticleBreakdown` + highlighted result card |
| Image | Large left panel with bg-muted | Small 220px column, `aspect-[3/4]` |

### Changes — Single file: `src/components/configurator/RectangularTankCalculator.tsx`

Rewrite to match `TankCalculator` structure:

1. **Layout**: Change to `grid-cols-1 lg:grid-cols-[1fr_220px]` — controls on left, image preview (220px) on right
2. **Volume slider**: Use actual volume values (`min={1000}`, `max={50000}`, `step={1000}`) with min/max labels below, show selected value in label
3. **Material selector**: Use same Badge sizing (`px-3 py-1.5 text-xs`) with temperature info below
4. **Color selector**: Replace round circles with card-style selectors showing color swatch + name + RAL (matching vertical tanks' `flex items-center gap-2 rounded-lg border px-3 py-2` pattern)
5. **Image preview**: Move to right column, 220px max width, `aspect-[3/4]`, keep overlay approach for color tinting
6. **Result section**: Move below the grid as full-width `ArticleBreakdown` + highlighted result card with "Перейти к товару" button (matching vertical tanks' bottom result pattern)
7. **Snap volume to nearest product**: Use closest-match logic like `TankCalculator.matchedModel`

No other files need changes — the component is already imported and used in `EmkostiPryamougolnye.tsx`.

