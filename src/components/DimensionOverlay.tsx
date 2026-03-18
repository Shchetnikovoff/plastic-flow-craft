interface DimensionOverlayProps {
  imageSrc: string;
  imageAlt: string;
  length?: number;
  width?: number;
  height?: number;
}

/**
 * Renders a product image with GOST-style SVG dimension lines overlay.
 * Extension lines, filled arrowheads, values centered on dimension lines.
 */
const DimensionOverlay = ({ imageSrc, imageAlt, length, width, height }: DimensionOverlayProps) => {
  const fmt = (v: number) => v.toLocaleString();

  // Object bounding box within the 400x400 viewBox
  const obj = { left: 80, right: 320, top: 60, bottom: 310 };
  // Dimension line offsets
  const hOff = 30; // height dim line offset left
  const lOff = 28; // length dim line offset below
  const wOff = 28; // width dim line offset above
  const ext = 5;   // extension line overshoot past dim line
  const gap = 3;   // gap between object edge and extension line start

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
        <defs>
          {/* Filled triangular arrowheads per GOST 2.307 */}
          <marker id="dim-arrow-start" markerWidth="8" markerHeight="4" refX="0.5" refY="2" orient="auto">
            <polygon points="8,0 0,2 8,4" fill="hsl(var(--foreground))" />
          </marker>
          <marker id="dim-arrow-end" markerWidth="8" markerHeight="4" refX="7.5" refY="2" orient="auto">
            <polygon points="0,0 8,2 0,4" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        {/* Height — left side vertical */}
        {height && (() => {
          const dx = obj.left - hOff;
          return (
            <g>
              {/* Extension lines (horizontal, from object edge going left) */}
              <line x1={obj.left - gap} y1={obj.top} x2={dx - ext} y2={obj.top}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              <line x1={obj.left - gap} y1={obj.bottom} x2={dx - ext} y2={obj.bottom}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              {/* Dimension line (vertical) */}
              <line x1={dx} y1={obj.top} x2={dx} y2={obj.bottom}
                stroke="hsl(var(--foreground))" strokeWidth="0.5"
                markerStart="url(#dim-arrow-start)" markerEnd="url(#dim-arrow-end)" />
              {/* Value — rotated 90°, centered on line */}
              <rect x={dx - 22} y={(obj.top + obj.bottom) / 2 - 7} width="18" height="14" rx="1"
                fill="hsl(var(--background))" fillOpacity="0.85" />
              <text
                x={dx - 13} y={(obj.top + obj.bottom) / 2 + 4}
                fill="hsl(var(--foreground))"
                fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif"
                textAnchor="middle"
                transform={`rotate(-90, ${dx - 13}, ${(obj.top + obj.bottom) / 2})`}
              >
                {fmt(height)}
              </text>
            </g>
          );
        })()}

        {/* Length — bottom horizontal */}
        {length && (() => {
          const dy = obj.bottom + lOff;
          return (
            <g>
              {/* Extension lines (vertical, from object bottom going down) */}
              <line x1={obj.left} y1={obj.bottom + gap} x2={obj.left} y2={dy + ext}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              <line x1={obj.right} y1={obj.bottom + gap} x2={obj.right} y2={dy + ext}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              {/* Dimension line (horizontal) */}
              <line x1={obj.left} y1={dy} x2={obj.right} y2={dy}
                stroke="hsl(var(--foreground))" strokeWidth="0.5"
                markerStart="url(#dim-arrow-start)" markerEnd="url(#dim-arrow-end)" />
              {/* Value — centered above the line */}
              <rect x={(obj.left + obj.right) / 2 - 20} y={dy - 14} width="40" height="12" rx="1"
                fill="hsl(var(--background))" fillOpacity="0.85" />
              <text
                x={(obj.left + obj.right) / 2} y={dy - 4}
                fill="hsl(var(--foreground))"
                fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif"
                textAnchor="middle"
              >
                {fmt(length)}
              </text>
            </g>
          );
        })()}

        {/* Width — top horizontal */}
        {width && (() => {
          const dy = obj.top - wOff;
          return (
            <g>
              {/* Extension lines (vertical, from object top going up) */}
              <line x1={obj.left} y1={obj.top - gap} x2={obj.left} y2={dy - ext}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              <line x1={obj.right} y1={obj.top - gap} x2={obj.right} y2={dy - ext}
                stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              {/* Dimension line (horizontal) */}
              <line x1={obj.left} y1={dy} x2={obj.right} y2={dy}
                stroke="hsl(var(--foreground))" strokeWidth="0.5"
                markerStart="url(#dim-arrow-start)" markerEnd="url(#dim-arrow-end)" />
              {/* Value — centered above the line */}
              <rect x={(obj.left + obj.right) / 2 - 20} y={dy - 14} width="40" height="12" rx="1"
                fill="hsl(var(--background))" fillOpacity="0.85" />
              <text
                x={(obj.left + obj.right) / 2} y={dy - 4}
                fill="hsl(var(--foreground))"
                fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif"
                textAnchor="middle"
              >
                {fmt(width)}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

export default DimensionOverlay;
