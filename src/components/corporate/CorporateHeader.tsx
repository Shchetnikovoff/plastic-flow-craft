import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown, Phone, ShoppingCart, FileText } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { generateLetterhead } from "@/lib/generateLetterhead";
import { generateLetterheadPdf } from "@/lib/generateLetterheadPdf";

const navItems = [
  { name: "Ёмкости", href: "/catalog/emkosti", hasSub: true, sub: [
    { name: "Вертикальные", href: "/catalog/emkosti/vertikalnye" },
    { name: "Горизонтальные", href: "/catalog/emkosti/gorizontalnye" },
    { name: "Подземные", href: "/catalog/emkosti/podzemnye" },
    { name: "Прямоугольные", href: "/catalog/emkosti/pryamougolnye" },
    { name: "Пожарные", href: "/catalog/emkosti/pozharnye" },
    { name: "Кислоты и щелочи", href: "/catalog/emkosti/kisloty-shchelochi" },
  ]},
  { name: "Водоочистка", href: "/catalog/vodoochistka", hasSub: true, sub: [
    { name: "ФФУ", href: "/catalog/vodoochistka/ffu" },
    { name: "Ламельный отстойник", href: "/catalog/vodoochistka/lamelnyj-otstojnik" },
    { name: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
    { name: "Станция дозирования", href: "/catalog/vodoochistka/stantsiya-dozirovaniya" },
    { name: "ЛОС", href: "/catalog/vodoochistka/los" },
  ]},
  { name: "КНС", href: "/catalog/kns" },
  { name: "Химические реакторы", href: "/catalog/reaktory" },
  { name: "Гидрометаллургия", href: "/catalog/gidrometallurgiya" },
  { name: "Газоочистка", href: "/catalog/gazoochistka", hasSub: true, sub: [
    { name: "Скрубберы", href: "/catalog/gazoochistka/skrubbery" },
    { name: "Фильтры ФВГ", href: "/catalog/gazoochistka/fvg" },
    { name: "Каплеуловители", href: "/catalog/gazoochistka/kapleuloviteli" },
  ]},
  { name: "Вентиляция", href: "/catalog/ventilyatsiya" },
  { name: "Услуги", href: "/catalog/uslugi" },
  { name: "Главная", href: "/" },
  { name: "О компании", href: "/about" },
];

function CartButton() {
  try {
    const { totalItems } = useCart();
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 relative">
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-slate-900 p-0 text-[9px] font-bold">
            {totalItems}
          </Badge>
        )}
      </Button>
    );
  } catch {
    // No CartProvider — render disabled button
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 cursor-default">
        <ShoppingCart className="h-4 w-4" />
      </Button>
    );
  }
}

function NavDropdown({ item }: { item: typeof navItems[number] }) {
  const [open, setOpen] = useState(false);
  if (!item.hasSub) {
    return (
      <Link to={item.href} className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">
        {item.name}
      </Link>
    );
  }
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link to={item.href} className="flex items-center gap-1 text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap">
        {item.name}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>
      {open && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="rounded-lg bg-slate-800 border border-slate-700 shadow-2xl p-1.5 min-w-[220px] animate-in fade-in-0 slide-in-from-top-2 duration-200">
            {item.sub?.map((sub) => (
              <Link
                key={sub.href}
                to={sub.href}
                className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CorporateHeader() {
  const scrollToForm = () => {
    document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-slate-900">
      {/* Top bar — nav items */}
      <div className="max-w-[1440px] mx-auto flex h-12 items-center justify-between px-4 sm:px-6 border-b border-slate-800">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <span className="text-slate-900 font-extrabold text-xs">СЗ</span>
          </div>
          <div>
            <span className="text-white text-sm font-bold leading-none tracking-tight">Пласт-Металл ПРО</span>
          </div>
        </Link>

        {/* Desktop nav — all categories inline */}
        <nav className="hidden xl:flex items-center">
          {navItems.map((item) => (
            <NavDropdown key={item.href} item={item} />
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Скачать бланк КП */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800" title="Скачать бланк КП">
                <FileText className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem onClick={() => generateLetterhead()} className="text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer">
                Скачать Word (.docx)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateLetterheadPdf()} className="text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer">
                Скачать PDF (.pdf)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Корзина */}
          <CartButton />

          <a href="tel:+78122426006" className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors ml-1">
            <Phone className="h-3 w-3" />
            +7 (812) 242-60-06
          </a>
          <Button
            onClick={scrollToForm}
            size="sm"
            className="hidden md:inline-flex rounded-full px-5 h-8 text-xs bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold shadow-lg shadow-amber-500/20"
          >
            Оставить заявку
          </Button>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger asChild className="xl:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800 h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-slate-900 border-slate-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-left text-white">Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link to={item.href} className="text-slate-200 hover:bg-slate-800 px-3 py-2 rounded-md text-sm transition-colors block font-medium">
                      {item.name}
                    </Link>
                    {item.hasSub && item.sub && (
                      <div className="ml-4 mt-0.5 space-y-0.5">
                        {item.sub.map((sub) => (
                          <Link key={sub.href} to={sub.href} className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-md text-xs transition-colors block">
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="border-t border-slate-800 my-3" />
                <a href="tel:+78122426006" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-200">
                  <Phone className="h-4 w-4" /> +7 (812) 242-60-06
                </a>
                <Button onClick={scrollToForm} className="mt-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
                  Оставить заявку
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
