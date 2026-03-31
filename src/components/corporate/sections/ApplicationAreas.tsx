import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ApplicationItem {
  icon: LucideIcon;
  name: string;
  href?: string;
}

interface ApplicationAreasProps {
  title?: string;
  subtitle?: string;
  items: ApplicationItem[];
}

export default function ApplicationAreas({
  title = "Области применения",
  subtitle,
  items,
}: ApplicationAreasProps) {
  return (
    <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-slate-500 text-sm">{subtitle}</p>
        )}

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 transition-colors group-hover:bg-amber-500">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700">{item.name}</span>
              </div>
            );

            return item.href ? (
              <Link key={item.name} to={item.href}>
                {inner}
              </Link>
            ) : (
              <div key={item.name}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
