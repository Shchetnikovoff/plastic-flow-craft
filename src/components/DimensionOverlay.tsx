interface DimensionOverlayProps {
  imageSrc: string;
  imageAlt: string;
  length?: number;
  width?: number;
  height?: number;
}

/**
 * Renders a product image with SVG dimension lines overlay.
 * Designed for isometric-style photos of rectangular tanks.
 */
const DimensionOverlay = ({ imageSrc, imageAlt, length, width, height }: DimensionOverlayProps) => {
  const fmt = (v: number) => v.toLocaleString();

  return (
    <div className="relative w-full h-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-contain p-4"
      />
      {/* SVG overlay for dimension lines */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arrow-start" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          </marker>
          <marker id="arrow-end" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          </marker>
        </defs>

        {/* Height — right side vertical */}
        {height && (
          <g>
            {/* Tick marks */}
            <line x1="340" y1="72" x2="355" y2="72" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <line x1="340" y1="310" x2="355" y2="310" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            {/* Arrow line */}
            <line
              x1="348" y1="72" x2="348" y2="310"
              stroke="hsl(var(--primary))" strokeWidth="0.8"
              markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
            />
            {/* Label */}
            <text
              x="360" y="195"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              textAnchor="start"
            >
              H
            </text>
            <text
              x="360" y="208"
              fill="hsl(var(--muted-foreground))"
              fontSize="9"
              fontFamily="system-ui, sans-serif"
              textAnchor="start"
            >
              {fmt(height)}
            </text>
          </g>
        )}

        {/* Length — bottom horizontal */}
        {length && (
          <g>
            {/* Tick marks */}
            <line x1="65" y1="325" x2="65" y2="340" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <line x1="290" y1="325" x2="290" y2="340" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            {/* Arrow line */}
            <line
              x1="65" y1="333" x2="290" y2="333"
              stroke="hsl(var(--primary))" strokeWidth="0.8"
              markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
            />
            {/* Label */}
            <text
              x="177" y="352"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
            >
              L = {fmt(length)}
            </text>
          </g>
        )}

        {/* Width — bottom-right diagonal (perspective) */}
        {width && (
          <g>
            {/* Tick marks */}
            <line x1="290" y1="325" x2="298" y2="318" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <line x1="345" y1="310" x2="352" y2="302" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            {/* Arrow line */}
            <line
              x1="294" y1="322" x2="348" y2="306"
              stroke="hsl(var(--primary))" strokeWidth="0.8"
              markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)"
            />
            {/* Label */}
            <text
              x="338" y="340"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
            >
              W
            </text>
            <text
              x="338" y="353"
              fill="hsl(var(--muted-foreground))"
              fontSize="9"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
            >
              {fmt(width)}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default DimensionOverlay;
