import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { productImages, productSizes } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductContent = () => {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(productSizes.map((s) => [s.article, 1]))
  );
  const [selectedImage, setSelectedImage] = useState(0);

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [article]: Math.max(1, (prev[article] || 1) + delta),
    }));
  };

  const handleAdd = (size: typeof productSizes[0]) => {
    addItem(
      { article: size.article, diameter: size.diameter, wallThickness: size.wallThickness },
      quantities[size.article]
    );
    toast.success(`${size.article} (${quantities[size.article]} шт.) добавлен в корзину`);
  };

  return (
    <main className="mx-auto max-w-[960px] px-6 py-8">
      {/* === IMAGE ROW === */}
      <div className="flex items-start gap-3 mb-10">
        {/* First 3: small thumbnails */}
        <div className="flex gap-2">
          {productImages.slice(0, 3).map((src, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded border-2 bg-card transition-all ${
                i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
        {/* Last 2: larger */}
        <div className="flex gap-3 flex-1">
          {productImages.slice(3).map((src, i) => (
            <button
              key={i + 3}
              onClick={() => setSelectedImage(i + 3)}
              className={`aspect-square flex-1 overflow-hidden rounded border-2 bg-card transition-all ${
                i + 3 === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
              }`}
            >
              <img src={src} alt={`Фото ${i + 4}`} className="h-full w-full object-contain p-2" />
            </button>
          ))}
        </div>
      </div>

      {/* === ОПИСАНИЕ + ХАРАКТЕРИСТИКИ === */}
      <div className="grid gap-8 md:grid-cols-2 mb-10">
        {/* Left: описание */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Отвод вентиляционный круглого сечения служит для плавного поворота системы под углом 90°.
            Обеспечивает надёжное соединение элементов вентиляционной системы благодаря раструбному типу соединения.
          </p>
        </div>

        {/* Right: характеристики */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Диаметр</span>
              <span className="text-sm font-semibold text-foreground">100–1200 мм</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Соединение</span>
              <span className="text-sm font-semibold text-foreground">Раструб</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Стенка</span>
              <span className="text-sm font-semibold text-foreground">2–10 мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Угол</span>
              <span className="text-sm font-semibold text-foreground">90°</span>
            </div>
          </div>
        </div>
      </div>

      {/* === МАТЕРИАЛЫ === */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3 tracking-wide uppercase">Материалы</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs font-medium border-primary text-primary bg-primary/5">
            Листовой полипропилен блок-сополимер (PPC)
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs font-medium">
            Листовой полиэтилен (PE 100)
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs font-medium">
            Листовой полипропилен гомополимер (PPH)
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs font-medium">
            Листовой полипропилен, не распространяющий горение (PPs)
          </Badge>
        </div>
      </div>

      {/* === ТАБЛИЦА === */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — Листовой полипропилен блок-сополимер (PPC)
        </h2>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">DN</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">S, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">L, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Sp, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Кол-во</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSizes.map((size, i) => (
                <TableRow
                  key={size.article}
                  className={`cursor-pointer transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                >
                  <TableCell className="font-mono text-xs">{size.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.diameter}</TableCell>
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
                  <TableCell className="text-center text-sm text-primary">{size.availableLength ?? "—"}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.socketThickness}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(size.article, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-7 text-center text-xs font-medium">{quantities[size.article]}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(size.article, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="h-7 gap-1 text-xs" onClick={() => handleAdd(size)}>
                      <ShoppingCart className="h-3 w-3" />
                      <span className="hidden sm:inline">В корзину</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} />
        <ProductContent />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Index;
