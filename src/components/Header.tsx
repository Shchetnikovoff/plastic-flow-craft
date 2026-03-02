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
    <header className="sticky top-0 z-40 border-b bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo + Company */}
        <div className="flex items-center gap-4">
          <img
            src="/images/logo.png"
            alt="Логотип Пласт-Металл Про"
            className="h-14 w-auto object-contain"
          />
          <div className="hidden sm:block">
            <h2 className="text-sm font-bold text-foreground leading-tight">
              ООО СЗПК «Пласт-Металл Про»
            </h2>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Ленинградская обл., д. Разметелево, ул. Строителей 27
            </p>
          </div>
        </div>

        {/* Contacts + Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end gap-0.5 text-xs text-muted-foreground">
            <a href="tel:+79633225540" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" /> +7 963 322-55-40
            </a>
            <a href="mailto:osobenkov@list.ru" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="h-3 w-3" /> osobenkov@list.ru
            </a>
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
