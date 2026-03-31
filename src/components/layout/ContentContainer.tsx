import { cn } from "@/lib/utils";

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
  /** max-w-[1440px] for grids and wide content */
  wide?: boolean;
  /** max-w-[800px] for forms and narrow text */
  narrow?: boolean;
}

/**
 * Width-constraining wrapper with full-bleed backgrounds.
 * Default: 1200px (optimal for text readability ~75 chars/line)
 * Wide: 1440px (catalogs, card grids, image galleries)
 * Narrow: 800px (forms, FAQ, single-column text)
 */
export default function ContentContainer({ children, className, wide, narrow }: ContentContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-[800px]" : wide ? "max-w-[1440px]" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  );
}
