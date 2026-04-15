import { ShoppingCart, Phone, Mail, MapPin, FileText, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { supportedAngles, connectionTypes, type AngleType, type ConnectionType } from "@/data/products";
import { catalog } from "@/data/catalog";
import { generateLetterhead } from "@/lib/generateLetterhead";
import { generateLetterheadPdf } from "@/lib/generateLetterheadPdf";

export type ProductType = "otvod" | "troynik" | "razdvizhnoy" | "vozdukhovod";

interface HeaderProps {
  onCartOpen: () => void;
  angle?: AngleType;
  connectionType?: ConnectionType;
  productType?: ProductType;
}

const Header = ({ onCartOpen, angle = 90, connectionType = "rastrub", productType = "otvod" }: HeaderProps) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenCat(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenCat(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Scroll active category tab into view after route change
  useEffect(() => {
    const active = catalog.find((cat) => isActiveCat(cat.slug));
    if (!active) return;
    const el = navRef.current?.querySelector(`[data-cat-slug="${active.slug}"]`) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "instant" });
    }
  }, [location.pathname]);

  const isActiveCat = (catSlug: string) => {
    if (catSlug === "ventilyatsiya") {
      return ["/", "/60", "/45", "/30", "/15", "/troynik", "/razdvizhnoy", "/vozdukhovod"].some(
        (p) => location.pathname === p
      );
    }
    return location.pathname.startsWith(`/catalog/${catSlug}`);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      {/* Top bar */}
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <Link to="/catalog">
            <img
              src="/images/logo.png"
              alt="Логотип Пласт-Металл Про"
              className="h-16 sm:h-28 md:h-32 w-auto object-contain shrink-0"
            />
          </Link>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white leading-tight">
              ООО СЗПК «Пласт-Металл Про»
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
              Производство оборудования из полимеров
            </p>
            <div className="hidden sm:flex items-center gap-3 mt-1 text-[11px] text-slate-400 flex-wrap">
              <a href="tel:+79633225540" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                <Phone className="h-3 w-3 shrink-0" /> +7 963 322-55-40
              </a>
              <a href="mailto:osobenkov@list.ru" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                <Mail className="h-3 w-3 shrink-0" /> osobenkov@list.ru
              </a>
              <span className="hidden md:flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" /> Ленинградская обл., д. Разметелево
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" title="Скачать бланк КП" className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-amber-400">
                <FileText className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => generateLetterhead()}>Скачать Word (.docx)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateLetterheadPdf()}>Скачать PDF (.pdf)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="relative bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-amber-400" onClick={onCartOpen}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-slate-900 p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Button>
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-200 hover:bg-slate-800 hover:text-amber-400"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Desktop category navigation */}
      <div ref={navRef} className="hidden md:block border-t border-slate-800 bg-slate-900/95 relative">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-0">
            {catalog.map((cat) => {
              return (
                <div key={cat.id} className="flex items-center" data-cat-slug={cat.slug}>
                  <Link
                    to={`/catalog/${cat.slug}`}
                    className={`whitespace-nowrap pl-3 pr-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                      isActiveCat(cat.slug)
                        ? "border-amber-400 text-amber-400"
                        : "border-transparent text-slate-300 hover:text-amber-400 hover:border-slate-700"
                    }`}
                  >
                    {cat.name}
                  </Link>
                  <button
                    onClick={() => setOpenCat(openCat === cat.slug ? null : cat.slug)}
                    className={`pr-3 py-2.5 border-b-2 ${
                      isActiveCat(cat.slug) ? "border-amber-400 text-amber-400" : openCat === cat.slug ? "border-amber-400/50 text-amber-400" : "border-transparent text-slate-300 hover:text-amber-400"
                    }`}
                  >
                    <ChevronDown className={`h-3 w-3 transition-transform ${openCat === cat.slug ? "rotate-180" : ""}`} />
                  </button>
                </div>
              );
            })}
            <Link
              to="/about"
              className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                location.pathname === "/about"
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-slate-300 hover:text-amber-400 hover:border-slate-700"
              }`}
            >
              О компании
            </Link>
          </nav>
        </div>
        {openCat && (() => {
          const cat = catalog.find((c) => c.slug === openCat);
          if (!cat) return null;
          return (
            <div className="absolute left-0 right-0 top-full z-50 border-t border-slate-800 bg-slate-900 shadow-lg">
              <div className="mx-auto max-w-[960px] px-4 sm:px-6 py-2">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0.5">
                  {cat.subcategories.map((sub) => {
                    const href = sub.externalPath || `/catalog/${cat.slug}/${sub.slug}`;
                    return (
                      <Link
                        key={sub.id}
                        to={href}
                        className="block px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-amber-400 rounded transition-colors"
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {catalog.map((cat) => (
              <div key={cat.id}>
                {(() => {
                  return (
                    <div className="flex items-center">
                      <Link
                        to={`/catalog/${cat.slug}`}
                        className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                          isActiveCat(cat.slug) ? "text-amber-400 bg-slate-800" : "text-slate-200 hover:bg-slate-800 hover:text-amber-400"
                        }`}
                      >
                        {cat.name}
                      </Link>
                      <button
                        onClick={() => setOpenCat(openCat === cat.slug ? null : cat.slug)}
                        className="px-2 py-2 text-slate-300"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${openCat === cat.slug ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  );
                })()}
                {openCat === cat.slug && (
                  <div className="ml-3 border-l-2 border-slate-800 pl-3 py-1 space-y-0.5">
                    {cat.subcategories.map((sub) => {
                      const href = sub.externalPath || `/catalog/${cat.slug}/${sub.slug}`;
                      return (
                        <Link
                          key={sub.id}
                          to={href}
                          className="block px-3 py-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/about"
              className={`block px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                location.pathname === "/about" ? "text-amber-400 bg-slate-800" : "text-slate-200 hover:bg-slate-800 hover:text-amber-400"
              }`}
            >
              О компании
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
