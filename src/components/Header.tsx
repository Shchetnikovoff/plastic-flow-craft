import { ShoppingCart, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onCartOpen: () => void;
}

const Header = ({ onCartOpen }: HeaderProps) => {
  const { totalItems } = useCart();

  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <img
            src="/images/logo.png"
            alt="Логотип Пласт-Металл Про"
            className="h-20 sm:h-36 md:h-40 w-auto object-contain shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-sm sm:text-lg md:text-xl font-bold text-foreground leading-tight">
              Отвод вентиляционный круглого сечения 90°
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
              Карточка товара • ООО СЗПК «Пласт-Металл Про»
            </p>
            <div className="hidden sm:flex items-center gap-3 mt-1 text-[11px] text-muted-foreground flex-wrap">
              <a href="tel:+79633225540" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="h-3 w-3 shrink-0" /> +7 963 322-55-40
              </a>
              <a href="mailto:osobenkov@list.ru" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="h-3 w-3 shrink-0" /> osobenkov@list.ru
              </a>
              <span className="hidden md:flex items-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" /> Ленинградская обл., д. Разметелево
              </span>
            </div>
          </div>
        </div>

        {/* Right: 90° badge + Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-center">
            <span className="text-3xl font-black text-primary leading-none">90°</span>
            <span className="text-[10px] text-muted-foreground">раструб</span>
          </div>
          <Button variant="outline" size="icon" className="relative" onClick={onCartOpen}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;