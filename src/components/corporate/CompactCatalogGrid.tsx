import { Link } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";
import type { CatalogCategory } from "@/data/catalog";

interface Props {
  category: CatalogCategory;
  catIndex?: number;
}

/**
 * Catalog grid with medium-sized cards — image top, text below.
 * Responsive: 1 col mobile, 2 tablet, 3 desktop.
 */
export default function CompactCatalogGrid({ category, catIndex = 1 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {category.subcategories.map((sub, i) => {
        const href = sub.externalPath || `/catalog/${category.slug}/${sub.slug}`;
        return (
          <Link
            key={sub.id}
            to={href}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-amber-300 hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="aspect-[3/2] bg-slate-100 overflow-hidden flex items-center justify-center">
              {sub.image ? (
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <ImageOff className="h-8 w-8 text-slate-300" />
              )}
            </div>
            {/* Text */}
            <div className="p-4">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-slate-400">{catIndex}.{i + 1}</span>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {sub.name}
                </h3>
              </div>
              {sub.description && (
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">{sub.description}</p>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 mt-2 group-hover:gap-2 transition-all">
                Подробнее <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
