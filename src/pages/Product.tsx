import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { materials, materialSpecs, connectionTypes, baseSizes, type ConnectionType } from "@/data/products";
import { getProductImages } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight, FileDown } from "lucide-react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import ContactFormFields, { type ContactFormData, type ContactFormErrors, validateContactForm } from "@/components/ContactFormFields";
import { generateSpecPdf } from "@/lib/generateSpecPdf";

/** Parse article to extract product params */
function parseArticle(article: string) {
  // Format: PREFIX-ANGLE-MATERIAL[-COLOR]-DIAMETER
  const parts = article.split("-");
  if (parts.length < 4) return null;

  const prefix = parts[0]; // ОТВР or ОТВФ
  const connectionType: ConnectionType = prefix === "ОТВФ" ? "flanec" : "rastrub";
  const angle = parseInt(parts[1]) as 90 | 60; // 90 or 60
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
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [contactData, setContactData] = useState<ContactFormData>({ name: "", email: "", phone: "", inn: "" });
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});

  if (!article) return <div className="p-8 text-center text-muted-foreground">Артикул не указан</div>;

  const parsed = parseArticle(article);
  if (!parsed) {
    return (
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
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

  const { connectionType, angle, material, color, diameter, sizeData, specs } = parsed;
  const conn = connectionTypes.find((c) => c.id === connectionType);
  const productImages = getProductImages(connectionType, angle);

  const handleAdd = () => {
    addItem(
      { article, diameter, wallThickness: sizeData?.wallThickness || 0 },
      qty
    );
    toast.success(`${article} (${qty} шт.) добавлен в корзину`);
  };

  const handleDownloadPdf = async () => {
    const errors = validateContactForm(contactData);
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await generateSpecPdf(
      {
        article,
        diameter,
        wallThickness: sizeData?.wallThickness || 0,
        socketThickness: sizeData?.socketThickness || 0,
        availableLength: sizeData?.availableLength ?? null,
        connectionName: conn?.name || "",
        materialName: material.name,
        workingTemp: specs?.workingTemp,
        chemicalResistance: specs?.chemicalResistance,
        colorName: color?.name,
        colorRal: color?.ral,
      },
      contactData
    );
    toast.success("PDF-спецификация скачана");
    setPdfDialogOpen(false);
  };

  const handleContactChange = (field: keyof ContactFormData, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
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
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Отвод вентиляционный {angle}°</h1>
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
              <span className="text-sm font-semibold text-foreground">{angle}°</span>
            </div>
          </div>

          {/* Material info */}
          <div className="mb-6">
            <h2 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide">Материал</h2>
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
          <Button variant="outline" className="gap-2 w-full mt-3" onClick={() => setPdfDialogOpen(true)}>
            <FileDown className="h-4 w-4" />
            Скачать спецификацию (PDF)
          </Button>
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

      {/* PDF Download Dialog */}
      <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Скачать спецификацию</DialogTitle>
            <DialogDescription>
              Заполните контактные данные для скачивания PDF-спецификации
            </DialogDescription>
          </DialogHeader>
          <ContactFormFields data={contactData} errors={contactErrors} onChange={handleContactChange} />
          <Button className="w-full gap-2 mt-2" onClick={handleDownloadPdf}>
            <FileDown className="h-4 w-4" />
            Скачать PDF
          </Button>
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
