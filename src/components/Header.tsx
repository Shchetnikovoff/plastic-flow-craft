import { ShoppingCart, Phone, FileText, ChevronDown, Menu, X } from "lucide-react";
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
import { type AngleType, type ConnectionType } from "@/data/products";
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenCat(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setOpenCat(null); setMobileOpen(false); }, [location.pathname]);

  const isActiveCat = (catSlug: string) => {
    if (catSlug === "ventilyatsiya") {
      return ["/configurator", "/60", "/45", "/30", "/15", "/troynik", "/razdvizhnoy", "/vozdukhovod"].some(
        (p) => location.pathname === p
      );
    }
    return location.pathname.startsWith(`/catalog/${catSlug}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900">
      {/* Top bar */}
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <span className="text-slate-900 font-extrabold text-xs">СЗ</span>
            </div>
            <div>
              <span className="text-white text-sm font-bold leading-none">Пласт-Металл ПРО</span>
              <span className="block text-[9px] text-slate-500 leading-none mt-0.5">ООО СЗПК</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href="tel:+78122426006" className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <Phone className="h-3 w-3" /> +7 (812) 242-60-06
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="Скачать бланк КП" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => generateLetterhead()}>Скачать Word (.docx)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateLetterheadPdf()}>Скачать PDF (.pdf)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800" onClick={onCartOpen}>
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-slate-900 p-0 text-[9px] font-bold">
                {totalItems}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-slate-800" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Desktop category navigation */}
      <div ref={navRef} className="hidden md:block bg-slate-800/80 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <nav className="flex items-center justify-center gap-0">
            {catalog.map((cat) => (
              <div key={cat.id} className="flex items-center" data-cat-slug={cat.slug}>
                <Link
                  to={`/catalog/${cat.slug}`}
                  className={`whitespace-nowrap pl-3 pr-1 py-2.5 text-xs font-semibold transition-colors border-b-2 ${
                    isActiveCat(cat.slug)
                      ? "border-amber-400 text-amber-400"
                      : "border-transparent text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {cat.name}
                </Link>
                <button
                  onClick={() => setOpenCat(openCat === cat.slug ? null : cat.slug)}
                  className={`pr-3 py-2.5 border-b-2 ${
                    isActiveCat(cat.slug) ? "border-amber-400 text-amber-400" : "border-transparent text-slate-500 hover:text-white"
                  }`}
                >
                  <ChevronDown className={`h-3 w-3 transition-transform ${openCat === cat.slug ? "rotate-180" : ""}`} />
                </button>
              </div>
            ))}
            <Link to="/" className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold transition-colors border-b-2 ${location.pathname === "/" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-400 hover:text-white"}`}>
              Главная
            </Link>
            <Link to="/about" className={`whitespace-nowrap px-3 py-2.5 text-xs font-semibold transition-colors border-b-2 ${location.pathname === "/about" ? "border-amber-400 text-amber-400" : "border-transparent text-slate-400 hover:text-white"}`}>
              О компании
            </Link>
          </nav>
        </div>
        {openCat && (() => {
          const cat = catalog.find((c) => c.slug === openCat);
          if (!cat) return null;
          return (
            <div className="absolute left-0 right-0 top-full z-50 bg-slate-800 border-t border-slate-700 shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-200">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0.5">
                  {cat.subcategories.map((sub) => {
                    const href = sub.externalPath || `/catalog/${cat.slug}/${sub.slug}`;
                    return (
                      <Link key={sub.id} to={href} className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
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
        <div className="md:hidden bg-slate-800 border-t border-slate-700 max-h-[70vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {catalog.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center">
                  <Link to={`/catalog/${cat.slug}`} className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${isActiveCat(cat.slug) ? "text-amber-400 bg-amber-400/10" : "text-slate-200 hover:bg-slate-700"}`}>
                    {cat.name}
                  </Link>
                  <button onClick={() => setOpenCat(openCat === cat.slug ? null : cat.slug)} className="px-2 py-2 text-slate-400">
                    <ChevronDown className={`h-4 w-4 transition-transform ${openCat === cat.slug ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {openCat === cat.slug && (
                  <div className="ml-3 border-l-2 border-slate-700 pl-3 py-1 space-y-0.5">
                    {cat.subcategories.map((sub) => {
                      const href = sub.externalPath || `/catalog/${cat.slug}/${sub.slug}`;
                      return <Link key={sub.id} to={href} className="block px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors">{sub.name}</Link>;
                    })}
                  </div>
                )}
              </div>
            ))}
            <Link to="/" className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700 rounded-lg">Главная</Link>
            <Link to="/about" className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-700 rounded-lg">О компании</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
