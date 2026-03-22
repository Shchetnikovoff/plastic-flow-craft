

## Plan: Update dewatering schematic to RAL 7032 color scheme

**What:** Generate a new version of the schematic image (`obezvozhivatel-schema-1.webp`) with the equipment body in Grey RAL 7032 and frame/pipes in Graphite RAL 7024, replacing the current schematic in both locations.

### Changes

**1. Generate new image** — Create `public/images/obezvozhivatel-schema-ral7032.jpg` using flux.schnell: technical schematic/cutaway diagram of a bag-type sludge dewatering unit, grey RAL 7032 body, graphite RAL 7024 frame and pipes, clean white background, industrial style.

**2. `src/pages/Product.tsx`** (line 935) — Replace `"/images/obezvozhivatel-schema-1.webp"` with `"/images/obezvozhivatel-schema-ral7032.jpg"`

**3. `src/pages/VodoochistkaObezvozhivatel.tsx`** (line 32) — Replace `"/images/obezvozhivatel-schema-1.webp"` with `"/images/obezvozhivatel-schema-ral7032.jpg"`

