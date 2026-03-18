

## Plan: Isometric (axonometric) dimension lines matching tank perspective

### Problem
Current dimension lines are flat orthographic (horizontal/vertical), but the tank images show 3D perspective. Lines should follow the isometric axes of the rendered tank.

### Approach
Replace the flat `objectBounds` (left/right/top/bottom rectangle) with **8 corner points** of a 3D bounding box projected onto the 2D image plane. This lets dimension lines follow the isometric angles of the tank as it appears in the photo.

### New props for `DimensionOverlay`

Replace `objectBounds` with `isoCorners` — 4 key points defining the visible isometric box:

```text
          frontTopLeft ─────── frontTopRight
         ╱|                   ╱|
  backTopLeft ──── backTopRight |
        |  |              |    |
        |  frontBotLeft ──|── frontBotRight
        | ╱               |  ╱
  backBotLeft ──── backBotRight
```

For the visible faces we only need 7 distinct points (back-bottom-left is hidden). Simplified to the key vertices needed for dimension lines:

- **Height**: vertical line on the front-left edge (frontTopLeft → frontBotLeft), with extension lines going left
- **Length**: line along the bottom-front edge (frontBotLeft → frontBotRight), angled to match the isometric floor axis
- **Width**: line along the bottom-right edge (frontBotRight → backBotRight), angled to match the depth axis

Each dimension line follows the actual edge direction of the tank, with arrows and extension lines perpendicular to that edge (in 2D projection).

### Changes

**1. `src/components/DimensionOverlay.tsx`** — Full rewrite:
- New interface: `IsoCorners` with points `frontTopLeft`, `frontTopRight`, `frontBotLeft`, `frontBotRight`, `backTopRight`, `backBotRight` (each `{x, y}` in viewBox coords)
- Height dim: vertical line offset left of front-left edge
- Length dim: line parallel to bottom-front edge, offset downward (perpendicular outward)
- Width dim: line parallel to bottom-right edge (depth), offset to the right
- Extension lines perpendicular to each dimension direction
- Same GOST arrowheads and text styling

**2. `src/pages/Product.tsx`** — Update props:
- For `perelivnaya` image: set `isoCorners` matching the tank's perspective in the photo
- For `pryam` image: set `isoCorners` for that image's perspective
- Fallback: auto-generate flat corners from legacy `objectBounds` if needed

### Visual result
```text
                    ┌──────────┐
                   ╱          ╱│
        ← W →    ╱          ╱ │ ↕ H
                 ╱          ╱  │
                └──────────┘   │
                │          │  ╱
                │          │ ╱
                └──────────┘
                   ← L →
```

Dimension lines will follow the slanted edges with arrows at both ends, values centered along each line with background rectangles. Extension lines extend outward perpendicular to each isometric axis.

