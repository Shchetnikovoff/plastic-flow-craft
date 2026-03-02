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
    <header className="bg-primary text-primary-foreground">
      {/* Top bar */}
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <img
            src="/images/logo.png"
            alt="Логотип Пласт-Металл Про"
            className="h-12 w-auto object-contain brightness-0 invert"
          />
          <div>
            <span className="text-sm font-bold tracking-wide">ООО СЗПК «Пласт-Металл Про»</span>
            <div className="flex items-center gap-4 mt-0.5 text-[11px] text-primary-foreground/70">
              <a href="tel:+79633225540" className="flex items-center gap-1 hover:text-primary-foreground transition-colors">
                <Phone className="h-3 w-3" /> +7 963 322-55-40
              </a>
              <a href="mailto:osobenkov@list.ru" className="flex items-center gap-1 hover:text-primary-foreground transition-colors">
                <Mail className="h-3 w-3" /> osobenkov@list.ru
              </a>
              <span className="hidden lg:flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Ленинградская обл., д. Разметелево, ул. Строителей, 27
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="relative border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          onClick={onCartOpen}
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground p-0 text-[10px]">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>

      {/* Title strip */}
      <div className="border-t border-primary-foreground/10 bg-primary/80">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-2">
          <h1 className="text-lg font-bold tracking-wide">
            Отвод вентиляционный круглого сечения 90°
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black leading-none">90°</span>
            <span className="text-[10px] text-primary-foreground/60 leading-tight">раструб</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
