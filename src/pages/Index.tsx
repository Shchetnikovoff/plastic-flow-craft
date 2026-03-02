import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { productImages, productSizes } from "@/data/products";
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

  const materials = [
    "Листовой полипропилен блок-сополимер (PPC)",
    "Листовой полиэтилен (PE 100)",
    "Листовой полипропилен гомополимер (PPH)",
    "Листовой полипропилен, не распространяющий горение (PPs)",
  ];

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-6">
      {/* === IMAGES === */}
      <div className="grid grid-cols-5 gap-2 mb-8">
        {productImages.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`aspect-square overflow-hidden border bg-card transition-all ${
              i === selectedImage
                ? "border-accent ring-2 ring-accent/30 shadow-md"
                : "border-border hover:border-muted-foreground"
            }`}
          >
            <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-2" />
          </button>
        ))}
      </div>

      {/* === ОПИСАНИЕ + ХАРАКТЕРИСТИКИ === */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-1 bg-accent rounded-full" />
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase">Описание</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Отвод вентиляционный круглого сечения служит для плавного поворота системы под углом 90°.
            Обеспечивает надёжное соединение элементов вентиляционной системы благодаря раструбному типу соединения.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-1 bg-accent rounded-full" />
            <h2 className="text-sm font-bold text-foreground tracking-widest uppercase">Характеристики</h2>
          </div>
          <div className="grid grid-cols-2 border">
            {[
              { label: "Диаметр", value: "100–1200 мм" },
              { label: "Соединение", value: "Раструб" },
              { label: "Стенка", value: "2–10 мм" },
              { label: "Угол", value: "90°" },
            ].map((item, i) => (
              <div key={i} className={`p-3 bg-card ${i >= 2 ? "border-t" : ""} ${i % 2 === 0 ? "border-r" : ""}`}>
                <span className="block text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-bold text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === МАТЕРИАЛЫ === */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-1 bg-accent rounded-full" />
          <h2 className="text-sm font-bold text-foreground tracking-widest uppercase">Материалы</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {materials.map((m, i) => (
            <span
              key={i}
              className={`inline-block rounded-none border px-3 py-1.5 text-xs ${
                i === 0
                  ? "border-primary bg-primary/5 text-primary font-semibold"
                  : "border-border text-muted-foreground"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* === ТАБЛИЦА === */}
      <div>
        <div className="bg-primary px-4 py-2">
          <h2 className="text-xs font-bold text-primary-foreground tracking-widest uppercase text-center">
            Технические характеристики — Листовой полипропилен блок-сополимер (PPC)
          </h2>
        </div>
        <div className="border border-t-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10 hover:bg-primary/10">
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider">Артикул</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">DN</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">S, мм</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">L, мм</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">Sp, мм</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">Кол-во</TableHead>
                <TableHead className="font-bold text-[11px] text-foreground uppercase tracking-wider text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSizes.map((size, i) => (
                <TableRow
                  key={size.article}
                  className={`cursor-pointer transition-colors hover:bg-accent/10 ${i % 2 === 1 ? "bg-muted/40" : "bg-card"}`}
                >
                  <TableCell className="font-mono text-[11px] font-medium text-foreground">{size.article}</TableCell>
                  <TableCell className="text-center text-sm font-semibold">{size.diameter}</TableCell>
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
                  <TableCell className="text-center text-sm text-accent font-medium">{size.availableLength ?? "—"}</TableCell>
                  <TableCell className="text-center text-sm font-semibold">{size.socketThickness}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-none" onClick={() => setQty(size.article, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-7 text-center text-xs font-bold">{quantities[size.article]}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6 rounded-none" onClick={() => setQty(size.article, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="h-7 gap-1 text-[11px] rounded-none" onClick={() => handleAdd(size)}>
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
