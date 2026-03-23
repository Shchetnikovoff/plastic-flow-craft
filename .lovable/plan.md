

## Plan: Replace simple SVG tank illustrations with detailed vector renders in TankCalculator

**What:** Replace the basic geometric SVG shapes in the `TankSvg` component with detailed, professional-looking SVG illustrations for each of the 4 tank types. The SVGs will retain dynamic color switching via the `color` prop (fill bound to selected RAL hex). This keeps the reactive color feature while dramatically improving visual quality.

**Approach:** Create detailed inline SVGs with realistic proportions — proper cylindrical body with 3D elliptical top/bottom, reinforcement ribs, welding seams, inlet/outlet nozzles, hatch details, support legs, and subtle gradients/shadows for depth. All tank body surfaces use the dynamic `color` prop; structural elements (legs, flanges, hatch frame) use RAL 7024 dark grey.

### Changes

**1. `src/components/configurator/TankCalculator.tsx`** — Replace `TankSvg` component

Replace the current ~48-line basic SVG with 4 detailed SVG render functions (one per tank type), each featuring:
- **3D cylinder body** with gradient shading (lighter highlight strip for volume illusion)
- **Elliptical top/bottom** with proper perspective depth
- **Hatch with bolts** — circular hatch Ø800mm representation with bolt dots
- **Inlet/outlet nozzles** — small pipe stubs on the side
- **Reinforcement ribs** — multiple horizontal bands
- **Welding seam lines** — subtle detail lines
- **Support legs** (for conusdno type) with proper base plates
- **Level indicator strip** on the side
- All body fills use `{color}` with `transition-colors duration-300`
- Structural elements use fixed dark grey with opacity variations for depth

The SVG viewBox stays at 200×280, keeping the same layout footprint. Each type variant adjusts top/bottom geometry:
- `flat`: flat elliptical lid + flat elliptical bottom
- `sloped`: flat elliptical lid + angled bottom plate
- `conical`: cone top with apex + flat bottom
- `conusdno`: flat lid + inverted cone bottom + tall support frame

### Files modified
- `src/components/configurator/TankCalculator.tsx` — enhanced SVG illustrations

