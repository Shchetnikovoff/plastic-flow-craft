import { ShoppingCart, Phone, Mail, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { supportedAngles, connectionTypes, type AngleType, type ConnectionType } from "@/data/products";
import { generateLetterhead } from "@/lib/generateLetterhead";

export type ProductType = "otvod" | "troynik" | "razdvizhnoy" | "vozdukhovod";

interface HeaderProps {
  onCartOpen: () => void;
  angle?: AngleType;
  connectionType?: ConnectionType;
  productType?: ProductType;
}

const Header = ({ onCartOpen, angle = 90, connectionType = "rastrub", productType = "otvod" }: HeaderProps) => {
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
              {productType === "vozdukhovod" ? "Воздуховод вентиляционный круглый" : productType === "razdvizhnoy" ? "Раздвижной элемент вентиляционный" : productType === "troynik" ? "Тройник вентиляционный круглого сечения" : `Отвод вентиляционный круглого сечения ${angle}°`}
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
            {/* Navigation: product types + angles */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Link
                to="/"
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                  productType === "otvod"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                Отвод
              </Link>
              <Link
                to="/troynik"
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                  productType === "troynik"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                Тройник
              </Link>
              <Link
                to="/razdvizhnoy"
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                  productType === "razdvizhnoy"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                Раздвижной
              </Link>
              <Link
                to="/vozdukhovod"
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                  productType === "vozdukhovod"
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                Воздуховод
              </Link>
              {productType === "otvod" && (
                <>
                  <span className="text-muted-foreground text-xs">|</span>
                  {supportedAngles.map((a) => (
                    <Link
                      key={a}
                      to={a === 90 ? "/" : `/${a}`}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                        a === angle
                          ? "border-primary text-primary bg-primary/10"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {a}°
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: angle badge + Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex flex-col items-center">
            {productType === "vozdukhovod" ? (
              <span className="text-2xl font-black text-primary leading-none">ВК</span>
            ) : productType === "razdvizhnoy" ? (
              <span className="text-2xl font-black text-primary leading-none">РЭ</span>
            ) : productType === "troynik" ? (
              <span className="text-2xl font-black text-primary leading-none">ТР</span>
            ) : (
              <>
                <span className="text-3xl font-black text-primary leading-none">{angle}°</span>
                <span className="text-[10px] text-muted-foreground">{connectionTypes.find(c => c.id === connectionType)?.name?.toLowerCase() || "раструб"}</span>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => generateLetterhead()}
            title="Скачать бланк КП"
          >
            <FileText className="h-5 w-5" />
          </Button>
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
