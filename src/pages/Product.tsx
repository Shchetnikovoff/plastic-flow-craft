import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { materials, materialSpecs, connectionTypes, baseSizes, type ConnectionType } from "@/data/products";
import { getProductImages } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

/** Parse article to extract product params */
function parseArticle(article: string) {
  // Format: PREFIX-90-MATERIAL[-COLOR]-DIAMETER
  const parts = article.split("-");
  if (parts.length < 4) return null;

  const prefix = parts[0]; // ОТВР or ОТВФ
  const connectionType: ConnectionType = prefix === "ОТВФ" ? "flanec" : "rastrub";
  const angle = parts[1]; // 90
  const materialCode = parts[2];
  const diameter = parseInt(parts[parts.length - 1]);
  const colorCode = parts.length === 5 ? parts[3] : null;

  const material = materials.find((m) => m.code === materialCode);
  if (!material) return null;

  const specs = materialSpecs[material.name];
  const color = colorCode ? specs?.colors.find((c) => c.colorCode === colorCode) : specs?.colors[0];
  const sizeData = baseSizes.find((s) => s.diameter === diameter);

  return { connectionType, angle, material, color, diameter, sizeData, specs };
}

const ProductDetailContent = () => {
  const { article } = useParams<{ article: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!article) return <div className="p-8 text-center text-muted-foreground">Артикул не указан</div>;

  const parsed = parseArticle(article);
  if (!parsed) {
    return (
      <main className="mx-auto max-w-[960px] px-6 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Каталог</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{article}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <p className="text-center text-muted-foreground">Товар с артикулом «{article}» не найден</p>
      </main>
    );
  }

  const { connectionType, material, color, diameter, sizeData, specs } = parsed;
  const conn = connectionTypes.find((c) => c.id === connectionType);
  const productImages = getProductImages(connectionType);

  const handleAdd = () => {
    addItem(
      { article, diameter, wallThickness: sizeData?.wallThickness || 0 },
      qty
    );
    toast.success(`${article} (${qty} шт.) добавлен в корзину`);
  };

  return (
    <main className="mx-auto max-w-[960px] px-6 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Каталог</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Gallery */}
        <div>
          <div
            className="aspect-square overflow-hidden rounded-lg border bg-card cursor-zoom-in mb-3"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={productImages[selectedImage]}
              alt={`Фото ${selectedImage + 1}`}
              className="h-full w-full object-contain p-4"
            />
          </div>
          <div className="flex gap-2">
            {productImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square w-16 overflow-hidden rounded border-2 transition-all ${
                  i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
                }`}
              >
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-xl font-bold text-foreground mb-1">Отвод вентиляционный 90°</h1>
          <p className="font-mono text-sm text-muted-foreground mb-6">{article}</p>

          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden mb-6">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Диаметр (DN)</span>
              <span className="text-sm font-semibold text-foreground">{diameter} мм</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Соединение</span>
              <span className="text-sm font-semibold text-foreground">{conn?.name}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Толщина стенки (S)</span>
              <span className="text-sm font-semibold text-foreground">{sizeData?.wallThickness} мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Длина (L)</span>
              <span className="text-sm font-semibold text-foreground">{sizeData?.availableLength ?? "—"} мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Толщина раструба (Sp)</span>
              <span className="text-sm font-semibold text-foreground">{sizeData?.socketThickness} мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Угол</span>
              <span className="text-sm font-semibold text-foreground">90°</span>
            </div>
          </div>

          {/* Material info */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Материал</h2>
            <p className="text-sm text-foreground mb-1">{material.name}</p>
            {specs && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>Рабочая температура: {specs.workingTemp}</p>
                <p>Химическая стойкость: {specs.chemicalResistance}</p>
              </div>
            )}
            {color && (
              <div className="flex items-center gap-2 mt-2">
                <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: color.hex }} />
                <span className="text-sm text-foreground">{color.name}</span>
                {color.ral !== "—" && <span className="text-xs text-muted-foreground">{color.ral}</span>}
              </div>
            )}
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border rounded-md">
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty((q) => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2 flex-1" onClick={handleAdd}>
              <ShoppingCart className="h-4 w-4" />
              В корзину
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img
              src={productImages[selectedImage]}
              alt={`Фото ${selectedImage + 1}`}
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
        </DialogContent>
      </Dialog>
    </main>
  );
};

const Product = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} />
        <ProductDetailContent />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Product;
