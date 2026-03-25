interface Point {
  x: number;
  y: number;
}

export interface IsoCorners {
  /** Front-top-left corner of the box */
  frontTopLeft: Point;
  /** Front-top-right corner */
  frontTopRight: Point;
  /** Front-bottom-left corner */
  frontBotLeft: Point;
  /** Front-bottom-right corner */
  frontBotRight: Point;
  /** Back-top-right corner */
  backTopRight: Point;
  /** Back-bottom-right corner */
  backBotRight: Point;
}

interface ObjectBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface DimensionOverlayProps {
  imageSrc: string;
  imageAlt: string;
  length?: number;
  width?: number;
  height?: number;
  /** Legacy flat bounds – auto-converted to isoCorners */
  objectBounds?: ObjectBounds;
  /** Isometric corners for 3D-perspective dimension lines */
  isoCorners?: IsoCorners;
  /** Optional CSS style applied to the image element (e.g. filter for color tinting) */
  imageStyle?: React.CSSProperties;
}

/** Convert flat bounds to iso corners (no perspective) */
function boundsToIso(b: ObjectBounds): IsoCorners {
  return {
    frontTopLeft: { x: b.left, y: b.top },
    frontTopRight: { x: b.right, y: b.top },
    frontBotLeft: { x: b.left, y: b.bottom },
    frontBotRight: { x: b.right, y: b.bottom },
    backTopRight: { x: b.right, y: b.top },
    backBotRight: { x: b.right, y: b.bottom },
  };
}

/** Normalise a 2D vector */
function norm(v: Point): Point {
  const len = Math.sqrt(v.x * v.x + v.y * v.y);
  return len === 0 ? { x: 0, y: 0 } : { x: v.x / len, y: v.y / len };
}

/** Perpendicular (rotate 90° CW) */
function perp(v: Point): Point {
  return { x: v.y, y: -v.x };
}

/** Add two points */
function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

/** Scale a point */
function scale(p: Point, s: number): Point {
  return { x: p.x * s, y: p.y * s };
}

/** Midpoint */
function mid(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Angle in degrees from a direction vector */
function angleDeg(d: Point): number {
  return (Math.atan2(d.y, d.x) * 180) / Math.PI;
}

const fmt = (v: number) => v.toLocaleString();

/**
 * Renders a product image with GOST-style SVG dimension lines overlay.
 * Supports isometric (axonometric) layout following the 3D perspective of the object.
 */
const DimensionOverlay = ({
  imageSrc,
  imageAlt,
  length,
  width,
  height,
  objectBounds,
  isoCorners: isoCornersProp,
}: DimensionOverlayProps) => {
  // Resolve corners
  const iso: IsoCorners = isoCornersProp
    ?? (objectBounds ? boundsToIso(objectBounds) : boundsToIso({ left: 80, right: 320, top: 60, bottom: 310 }));

  const offset = 28; // how far from edge the dim line sits
  const ext = 6;     // extension line overshoot past dim line
  const gap = 3;     // gap between object edge and extension line start

  /**
   * Draw a single dimension: line with arrows + extension lines + value text.
   * @param p1 Start point on object edge
   * @param p2 End point on object edge
   * @param outDir Unit vector pointing outward (where to place dim line)
   * @param value Dimension value (mm)
   * @param id Unique id for markers
   */
  const renderDim = (p1: Point, p2: Point, outDir: Point, value: number, id: string) => {
    // Direction along the edge
    const edgeDir = norm({ x: p2.x - p1.x, y: p2.y - p1.y });

    // Dimension line endpoints: offset outward from p1 and p2
    const d1 = add(p1, scale(outDir, offset));
    const d2 = add(p2, scale(outDir, offset));

    // Extension lines: from object edge (+ gap) to dim line (+ overshoot)
    const ext1Start = add(p1, scale(outDir, gap));
    const ext1End = add(p1, scale(outDir, offset + ext));
    const ext2Start = add(p2, scale(outDir, gap));
    const ext2End = add(p2, scale(outDir, offset + ext));

    // Text position & rotation
    const center = mid(d1, d2);
    const angle = angleDeg(edgeDir);
    // Keep text readable (flip if upside down)
    const textAngle = angle > 90 || angle < -90 ? angle + 180 : angle;

    const markerId = `dim-arrow-${id}`;

    return (
      <g key={id}>
        <defs>
          <marker id={`${markerId}-start`} markerWidth="8" markerHeight="4" refX="0.5" refY="2" orient="auto">
            <polygon points="8,0 0,2 8,4" fill="hsl(var(--foreground))" />
          </marker>
          <marker id={`${markerId}-end`} markerWidth="8" markerHeight="4" refX="7.5" refY="2" orient="auto">
            <polygon points="0,0 8,2 0,4" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Extension lines */}
        <line x1={ext1Start.x} y1={ext1Start.y} x2={ext1End.x} y2={ext1End.y}
          stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1={ext2Start.x} y1={ext2Start.y} x2={ext2End.x} y2={ext2End.y}
          stroke="hsl(var(--foreground))" strokeWidth="0.5" />

        {/* Dimension line */}
        <line x1={d1.x} y1={d1.y} x2={d2.x} y2={d2.y}
          stroke="hsl(var(--foreground))" strokeWidth="0.5"
          markerStart={`url(#${markerId}-start)`} markerEnd={`url(#${markerId}-end)`} />

        {/* Background rect + text */}
        <g transform={`rotate(${textAngle}, ${center.x}, ${center.y})`}>
          <rect
            x={center.x - 22} y={center.y - 7}
            width="44" height="14" rx="1"
            fill="hsl(var(--background))" fillOpacity="0.85"
          />
          <text
            x={center.x} y={center.y + 4}
            fill="hsl(var(--foreground))"
            fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif"
            textAnchor="middle"
          >
            {fmt(value)}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-contain p-4"
      />
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Height — front-left vertical edge */}
        {height != null && (() => {
          const p1 = iso.frontTopLeft;
          const p2 = iso.frontBotLeft;
          const outDir: Point = { x: -1, y: 0 }; // offset to the left
          return renderDim(p1, p2, outDir, height, "height");
        })()}

        {/* Length — bottom-front edge */}
        {length != null && (() => {
          const p1 = iso.frontBotLeft;
          const p2 = iso.frontBotRight;
          // Outward = perpendicular to edge direction, pointing downward
          const edgeDir = norm({ x: p2.x - p1.x, y: p2.y - p1.y });
          const outCandidate = perp(edgeDir); // 90° CW
          // Ensure it points generally downward (positive y)
          const outDir = outCandidate.y >= 0 ? outCandidate : scale(outCandidate, -1);
          return renderDim(p1, p2, outDir, length, "length");
        })()}

        {/* Width — bottom-right depth edge */}
        {width != null && (() => {
          const p1 = iso.frontBotRight;
          const p2 = iso.backBotRight;
          // Outward = perpendicular to edge direction, pointing right/down
          const edgeDir = norm({ x: p2.x - p1.x, y: p2.y - p1.y });
          const outCandidate = perp(edgeDir);
          // Ensure it points generally to the right (positive x)
          const outDir = outCandidate.x >= 0 ? outCandidate : scale(outCandidate, -1);
          return renderDim(p1, p2, outDir, width, "width");
        })()}
      </svg>
    </div>
  );
};

export default DimensionOverlay;
