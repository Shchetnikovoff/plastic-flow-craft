export interface ArticleSegment {
  value: string;
  label: string;
  desc: string;
  hex?: string;
}

interface ArticleBreakdownProps {
  exampleArticle: string;
  segments: ArticleSegment[];
}

const ArticleBreakdown = ({ exampleArticle, segments }: ArticleBreakdownProps) => {
  const gridCols =
    segments.length <= 2 ? "grid-cols-2" :
    segments.length === 3 ? "sm:grid-cols-3 grid-cols-2" :
    segments.length === 4 ? "sm:grid-cols-4 grid-cols-2" :
    "sm:grid-cols-5 grid-cols-2";

  return (
    <div className="mb-4 rounded-lg border bg-muted/30 px-3 sm:px-4 py-3 sm:py-4">
      <p className="text-xs text-muted-foreground mb-1 text-center">Расшифровка артикула</p>
      <p className="text-center font-mono text-xs sm:text-sm font-bold text-foreground tracking-wider mb-3">
        {exampleArticle}
      </p>
      <div className={`grid ${gridCols} gap-2`}>
        {segments.map((seg) => (
          <div key={seg.label} className="rounded-md border bg-card px-3 py-2 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              {seg.hex && (
                <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0" style={{ backgroundColor: seg.hex }} />
              )}
              <span className="font-mono text-sm font-bold text-foreground">{seg.value}</span>
            </div>
            <span className="block text-[10px] font-semibold text-primary uppercase tracking-wide">{seg.label}</span>
            <span className="block text-[10px] text-muted-foreground mt-0.5 leading-tight">{seg.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleBreakdown;
