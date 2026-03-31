import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface AdvantageItem {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
}

interface AdvantagesGridProps {
  title?: string;
  subtitle?: string;
  items: AdvantageItem[];
}

export default function AdvantagesGrid({
  title = "Почему выбирают нас",
  subtitle,
  items,
}: AdvantagesGridProps) {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p data-testid="section-subtitle" className="mt-2 text-slate-500 text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <Icon className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{item.text}</p>
              </>
            );

            const className =
              "border-l-4 border-l-amber-500 bg-slate-50 rounded-xl p-5 transition-shadow hover:shadow-md";

            return item.href ? (
              <Link key={item.title} to={item.href} className={className}>
                {content}
              </Link>
            ) : (
              <div key={item.title} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
