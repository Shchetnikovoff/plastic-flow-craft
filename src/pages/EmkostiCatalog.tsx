import { useState } from "react";
import { Link } from "react-router-dom";
import { CartProvider, useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { emkostGroups, type EmkostCategory, type EmkostGroup } from "@/data/emkostiProducts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* ── image sets per group ── */
const groupImages: Record<string, string[]> = {
  "vertical-pp": [
    "/images/emkosti-hero-1.png",
    "/images/emkosti-hero-2.png",
    "/images/emkost-pryam-pp-1.png",
    "/images/emkost-pryam-pp-2.png",
    "/images/emkost-pryam-schema-1.jpg",
  ],
  "vertical-pnd": [
    "/images/emkost-pryam-pnd-1.jpg",
    "/images/emkost-pryam-pnd-2.png",
    "/images/emkosti-hero-1.png",
    "/images/emkosti-hero-2.png",
    "/images/emkost-pryam-schema-2.png",
  ],
  "horizontal-pp": [
    "/images/emkosti-hero-2.png",
    "/images/emkost-pryam-pp-3.png",
    "/images/emkost-pryam-pp-4.png",
    "/images/emkost-pryam-schema-1.jpg",
    "/images/emkosti-hero-1.png",
  ],
  "horizontal-pnd": [
    "/images/emkost-pryam-pnd-1.jpg",
    "/images/emkost-pryam-pnd-2.png",
    "/images/emkost-pryam-schema-2.png",
    "/images/emkosti-hero-2.png",
    "/images/emkosti-hero-1.png",
  ],
};

const orientationLabels: Record<string, string> = {
  "vertical-pp": "Вертикальная",
  "vertical-pnd": "Вертикальная",
  "horizontal-pp": "Горизонтальная",
  "horizontal-pnd": "Горизонтальная",
};

const materialLabels: Record<string, string> = {
  "vertical-pp": "Полипропилен (PP)",
  "vertical-pnd": "Полиэтилен (ПНД)",
  "horizontal-pp": "Полипропилен (PP)",
  "horizontal-pnd": "Полиэтилен (ПНД)",
};

const CatalogContent = () => {
  const { addItem } = useCart();
  const [selectedGroupId, setSelectedGroupId] = useState(emkostGroups[0].id);
  const group = emkostGroups.find((g) => g.id === selectedGroupId) || emkostGroups[0];
  const [selectedCatId, setSelectedCatId] = useState(group.categories[0].id);
  const category = group.categories.find((c) => c.id === selectedCatId) || group.categories[0];

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = groupImages[selectedGroupId] || groupImages["vertical-pp"];

  const handleGroupChange = (gId: string) => {
    setSelectedGroupId(gId);
    const g = emkostGroups.find((gr) => gr.id === gId)!;
    setSelectedCatId(g.categories[0].id);
    setQuantities({});
    setSelectedImage(0);
  };

  const handleCatChange = (cId: string) => {
    setSelectedCatId(cId);
    setQuantities({});
  };

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [article]: Math.max(1, (prev[article] || 1) + delta),
    }));
  };

  const handleAdd = (article: string, volume: number, diameter: number) => {
    const qty = quantities[article] || 1;
    addItem({ article, diameter, wallThickness: 0 }, qty);
    toast.success(`${article} (${qty} шт.) добавлен в корзину`);
  };

  // Article breakdown segments
  const firstItem = category.items[0];
  const articleParts = firstItem ? firstItem.article.split("-") : ["—", "—"];
  const articleSegments = [
    { value: articleParts[0], label: "Тип ёмкости", desc: group.title },
    { value: articleParts.slice(1).join("-") || "V", label: "Объём, л", desc: "Номинальный объём" },
  ];

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Конфигуратор</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* === IMAGE ROW === */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-8">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => { setSelectedImage(i); setLightboxOpen(true); }}
            className={`aspect-square overflow-hidden rounded border-2 bg-card transition-all cursor-zoom-in ${
              i === selectedImage ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
            }`}
          >
            <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-2 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* === LIGHTBOX === */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img src={images[selectedImage]} alt={`Фото ${selectedImage + 1}`} className="w-full h-auto object-contain max-h-[80vh]" />
            <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {images.map((src, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`h-14 w-14 overflow-hidden rounded border-2 transition-all ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}>
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1 transition-all duration-300" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* === ОПИСАНИЕ + ХАРАКТЕРИСТИКИ === */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Объём</span>
              <span className="text-sm font-semibold text-foreground">1 000–50 000 л</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Материал</span>
              <span className="text-sm font-semibold text-foreground">{materialLabels[selectedGroupId]}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Ориентация</span>
              <span className="text-sm font-semibold text-foreground">{orientationLabels[selectedGroupId]}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Модификация</span>
              <span className="text-sm font-semibold text-foreground">{category.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* === ТИП ЁМКОСТИ === */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Тип ёмкости</h2>
        <div className="flex flex-wrap gap-2">
          {emkostGroups.map((g) => (
            <Badge
              key={g.id}
              variant="outline"
              className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                selectedGroupId === g.id
                  ? "border-primary text-primary bg-primary/5"
                  : "hover:border-primary/50 hover:text-primary/80"
              }`}
              onClick={() => handleGroupChange(g.id)}
            >
              {g.title}
            </Badge>
          ))}
        </div>
      </div>

      {/* === МОДИФИКАЦИЯ === */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Модификация</h2>
        <div className="flex flex-wrap gap-2">
          {group.categories.map((cat) => (
            <Badge
              key={cat.id}
              variant="outline"
              className={`rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                selectedCatId === cat.id
                  ? "border-primary text-primary bg-primary/5"
                  : "hover:border-primary/50 hover:text-primary/80"
              }`}
              onClick={() => handleCatChange(cat.id)}
            >
              {cat.title}
            </Badge>
          ))}
        </div>
      </div>

      {/* === ТАБЛИЦА === */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {group.title} — {category.title}
        </h2>

        {/* === РАСШИФРОВКА АРТИКУЛА === */}
        <div className="mb-4 rounded-lg border bg-muted/30 px-3 sm:px-4 py-3 sm:py-4">
          <p className="text-xs text-muted-foreground mb-1 text-center">Расшифровка артикула</p>
          <p className="text-center font-mono text-xs sm:text-sm font-bold text-foreground tracking-wider mb-3">
            {firstItem?.article || "—"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {articleSegments.map((seg) => (
              <div key={seg.label} className="rounded-md border bg-card px-3 py-2 text-center">
                <span className="font-mono text-sm font-bold text-foreground">{seg.value}</span>
                <span className="block text-[10px] font-semibold text-primary uppercase tracking-wide">{seg.label}</span>
                <span className="block text-[10px] text-muted-foreground mt-0.5 leading-tight">{seg.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Объём, л</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Ø, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">{category.heightLabel}</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center whitespace-nowrap">Кол-во</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.items.map((item, i) => (
                <TableRow
                  key={item.article}
                  className={`transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                >
                  <TableCell className="font-mono text-xs text-primary whitespace-nowrap">{item.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{item.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-sm">{item.diameter.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-sm text-primary">{item.height.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(item.article, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-7 text-center text-xs font-medium">{quantities[item.article] || 1}</span>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => setQty(item.article, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="h-7 gap-1 text-xs whitespace-nowrap" onClick={() => handleAdd(item.article, item.volume, item.diameter)}>
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

      {/* Footer */}
      <footer className="border-t border-border pt-6 pb-4 mt-10 text-center text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
        <p>Ленинградская область, д. Разметелево, ул. Строителей 27</p>
        <p>Телефон: <a href="tel:+79633225540" className="text-primary hover:underline">+7 (963) 322-55-40</a> · E-mail: <a href="mailto:osobenkov@list.ru" className="text-primary hover:underline">osobenkov@list.ru</a></p>
        <p>Режим работы: пн.–пт. 9:00–18:00</p>
      </footer>
    </main>
  );
};

const EmkostiCatalog = () => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
        <CatalogContent />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default EmkostiCatalog;
