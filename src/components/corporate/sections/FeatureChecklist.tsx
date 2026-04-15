import { Check } from "lucide-react";

interface FeatureChecklistProps {
  title: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2;
}

export default function FeatureChecklist({
  title,
  subtitle,
  items,
  columns = 2,
}: FeatureChecklistProps) {
  const gridCols = columns === 1 ? "" : "md:grid-cols-2";

  return (
    <section className="w-full bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-slate-500 text-sm max-w-[700px]">{subtitle}</p>
        )}

        <div className={`mt-6 grid grid-cols-1 ${gridCols} gap-3`}>
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Check className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
