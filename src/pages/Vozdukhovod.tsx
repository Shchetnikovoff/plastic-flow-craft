import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { getVozdukhovodSizes, vozdukhovodImages, vozdukhovodAvailableLengths, type VozdukhovodSize } from "@/data/vozdukhovodProducts";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VozdukhovodContent = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const specs = materialSpecs[selectedMaterial];
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(specs?.colors[0]);
  const currentSizes = getVozdukhovodSizes(selectedMaterial, selectedColor?.colorCode || "");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedLengths, setSelectedLengths] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images = vozdukhovodImages;

  const getLength = (article: string) => selectedLengths[article] || 500;

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [article]: Math.max(1, (prev[article] || 1) + delta),
    }));
  };

  const handleAdd = (size: VozdukhovodSize) => {
    const qty = quantities[size.article] || 1;
    const length = getLength(size.article);
    addItem(
      { article: `${size.article}-L${length}`, diameter: size.diameter, wallThickness: size.wallThickness },
      qty
    );
    toast.success(`${size.article} L=${length} (${qty} шт.) добавлен в корзину`);
  };

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
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
            <img src={src} alt={`Фото ${i + 1}`} className="h-full w-full object-contain p-2" />
          </button>
        ))}
      </div>

      {/* === LIGHTBOX === */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-3xl p-2 bg-background">
          <div className="relative">
            <img src={images[selectedImage]} alt={`Фото ${selectedImage + 1}`} className="w-full h-auto object-contain max-h-[80vh]" />
            <Button variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm" onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm" onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {images.map((src, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`h-14 w-14 overflow-hidden rounded border-2 transition-all ${i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"}`}>
                <img src={src} alt={`Миниатюра ${i + 1}`} className="h-full w-full object-contain p-1" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* === ОПИСАНИЕ + ХАРАКТЕРИСТИКИ === */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Воздуховоды круглого сечения, изготавливаемые нашей компанией, могут применяться в системах приточно-вытяжной вентиляции, общеобменной вентиляции, системах аспирации и т.д. Изготавливаются воздуховоды из полипропилена, полиэтилена, поливинилхлорида. Выбор материала зависит от конкретных условий эксплуатации воздуховодов.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Диаметр Dn</span>
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
              <span className="block text-xs text-muted-foreground">Длина</span>
              <span className="text-sm font-semibold text-foreground">500–2000 мм</span>
            </div>
          </div>
        </div>
      </div>

      {/* === МАТЕРИАЛЫ === */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Материалы</h2>
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
              onClick={() => {
                setSelectedMaterial(mat.name);
                const newSpecs = materialSpecs[mat.name];
                if (newSpecs) setSelectedColor(newSpecs.colors[0]);
                setQuantities({});
                setSelectedLengths({});
              }}
            >
              {mat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* === ХАРАКТЕРИСТИКИ ПЛАСТИКА === */}
      {materialSpecs[selectedMaterial] && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики пластика</h2>
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
              <div
                key={c.ral}
                onClick={() => { setSelectedColor(c); setQuantities({}); setSelectedLengths({}); }}
                className={`rounded-lg border bg-card p-3 cursor-pointer transition-all ${
                  selectedColor?.colorCode === c.colorCode
                    ? "border-primary ring-1 ring-primary shadow-sm"
                    : "hover:border-muted-foreground"
                }`}
              >
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

      {/* === РАСШИФРОВКА АРТИКУЛА === */}
      {(() => {
        const mat = materials.find((m) => m.name === selectedMaterial);
        const hasMultipleColors = specs && specs.colors.length > 1;
        const firstSize = currentSizes[0];
        const exampleArticle = firstSize?.article || "—";

        const segments = [
          { value: "ВК", label: "Тип изделия", desc: "Воздуховод круглый" },
          { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
          ...(hasMultipleColors && selectedColor
            ? [{ value: selectedColor.colorCode, label: "Цвет (RAL)", desc: selectedColor.name, hex: selectedColor.hex }]
            : []),
          { value: firstSize ? `${firstSize.diameter}` : "Dn", label: "Диаметр", desc: "Dn, мм" },
        ] as Array<{ value: string; label: string; desc: string; hex?: string }>;

        const gridCols = hasMultipleColors ? "sm:grid-cols-4 grid-cols-2" : "sm:grid-cols-3 grid-cols-2";

        return (
          <div className="mb-4 rounded-lg border bg-muted/30 px-3 sm:px-4 py-3 sm:py-4">
            <p className="text-xs text-muted-foreground mb-1 text-center">Расшифровка артикула</p>
            <p className="text-center font-mono text-xs sm:text-sm font-bold text-foreground tracking-wider mb-3">
              {exampleArticle}
            </p>
            <div className={`grid ${gridCols} gap-2`}>
              {segments.map((seg) => (
                <div key={seg.label} className="rounded-md border bg-card px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    {seg.hex && (
                      <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0" style={{ backgroundColor: seg.hex }} />
                    )}
                    <span className="font-mono text-sm font-bold text-foreground">{seg.value}</span>
                  </div>
                  <span className="block text-[10px] font-semibold text-primary uppercase tracking-wide">{seg.label}</span>
                  <span className="block text-[10px] text-muted-foreground mt-0.5 leading-tight">{seg.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* === ТАБЛИЦА === */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {selectedMaterial}{selectedColor && specs?.colors.length > 1 ? ` — ${selectedColor.name}` : ""}
        </h2>

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[750px]">
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Dn, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">L, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">S, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Sр, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center whitespace-nowrap">Кол-во</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSizes.map((size, i) => (
                <TableRow
                  key={size.article}
                  className={`cursor-pointer transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                  onClick={() => navigate(`/product/${encodeURIComponent(size.article)}`)}
                >
                  <TableCell className="font-mono text-xs text-primary underline underline-offset-2 whitespace-nowrap">{size.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.diameter}</TableCell>
                  <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={String(getLength(size.article))}
                      onValueChange={(v) => setSelectedLengths((prev) => ({ ...prev, [size.article]: parseInt(v) }))}
                    >
                      <SelectTrigger className="h-7 w-20 text-xs mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vozdukhovodAvailableLengths.map((l) => (
                          <SelectItem key={l} value={String(l)}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
                  <TableCell className="text-center text-sm">{size.socketThickness}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
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
                  <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" className="h-7 gap-1 text-xs whitespace-nowrap" onClick={() => handleAdd(size)}>
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

const Vozdukhovod = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} productType="vozdukhovod" />
        <VozdukhovodContent />
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Vozdukhovod;
