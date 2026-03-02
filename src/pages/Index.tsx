import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { productImages, productSizesByMaterial, materials, materialSpecs, type ProductSize } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductContent = () => {
  const { addItem } = useCart();
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const currentSizes = productSizesByMaterial[selectedMaterial];
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const darkFilter = (_i: number) => undefined;

  

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [article]: Math.max(1, (prev[article] || 1) + delta),
    }));
  };

  const handleAdd = (size: ProductSize) => {
    const qty = quantities[size.article] || 1;
    addItem(
      { article: size.article, diameter: size.diameter, wallThickness: size.wallThickness },
      qty
    );
    toast.success(`${size.article} (${qty} шт.) добавлен в корзину`);
  };

  return (
    <main className="mx-auto max-w-[960px] px-6 py-8">
      {/* === IMAGE ROW === */}
      <div className="grid grid-cols-5 gap-3 mb-10">
        {productImages.map((src, i) => (
          <button
            key={i}
            onClick={() => { setSelectedImage(i); setLightboxOpen(true); }}
            className={`aspect-square overflow-hidden rounded border-2 bg-card transition-all cursor-zoom-in ${
              i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
            }`}
          >
            <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-2 transition-all duration-300" style={darkFilter(i)} />
          </button>
        ))}
      </div>

      {/* === LIGHTBOX === */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img
              src={productImages[selectedImage]}
              alt={`Фото ${selectedImage + 1}`}
              style={darkFilter(selectedImage)}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {productImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`h-14 w-14 overflow-hidden rounded border-2 transition-all ${
                  i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1 transition-all duration-300" style={darkFilter(i)} />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
          {materials.map((mat) => (
            <Badge
              key={mat.name}
              variant="outline"
              className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                selectedMaterial === mat.name
                  ? "border-primary text-primary bg-primary/5"
                  : "hover:border-primary/50 hover:text-primary/80"
              }`}
              onClick={() => setSelectedMaterial(mat.name)}
            >
              {mat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* === ХАРАКТЕРИСТИКИ ПЛАСТИКА === */}
      {materialSpecs[selectedMaterial] && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики пластика</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-4">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Рабочая температура</span>
              <span className="text-sm font-semibold text-foreground">{materialSpecs[selectedMaterial].workingTemp}</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Химическая стойкость</span>
              <span className="text-sm font-semibold text-foreground">{materialSpecs[selectedMaterial].chemicalResistance}</span>
            </div>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Доступные цвета</h3>
          <div className="grid gap-2 sm:grid-cols-3">
            {materialSpecs[selectedMaterial].colors.map((c) => (
              <div key={c.ral} className="rounded-lg border bg-card p-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-border shrink-0" style={{ backgroundColor: c.hex }} />
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.ral}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{c.application}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === ТАБЛИЦА === */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {selectedMaterial}
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
              {currentSizes.map((size, i) => (
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
                      <span className="w-7 text-center text-xs font-medium">{quantities[size.article] || 1}</span>
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
