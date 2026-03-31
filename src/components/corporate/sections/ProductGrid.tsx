import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductItem {
  name: string;
  desc: string;
  image: string;
  href: string;
}

interface ProductGridProps {
  title: string;
  subtitle?: string;
  items: ProductItem[];
  columns?: 2 | 3;
}

export default function ProductGrid({ title, subtitle, items, columns = 3 }: ProductGridProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="w-full bg-slate-50 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p data-testid="section-subtitle" className="mt-2 text-slate-500 text-lg">
            {subtitle}
          </p>
        )}

        <div className={`mt-10 grid grid-cols-1 ${gridCols} gap-6`}>
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group relative block overflow-hidden rounded-2xl aspect-[3/2]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-400">
                  Подробнее <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
