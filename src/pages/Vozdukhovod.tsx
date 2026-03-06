import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { getVozdukhovodSizes, vozdukhovodImages, vozdukhovodAvailableLengths, type VozdukhovodSize } from "@/data/vozdukhovodProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ImageGalleryWithLightbox,
  ArticleBreakdown,
  MaterialSection,
  ProductPageShell,
  QuantityCell,
  AddToCartButton,
  type ArticleSegment,
} from "@/components/configurator";

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

  const getLength = (article: string) => selectedLengths[article] || 500;

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [article]: Math.max(1, (prev[article] || 1) + delta) }));
  };

  const handleAdd = (size: VozdukhovodSize) => {
    const qty = quantities[size.article] || 1;
    const length = getLength(size.article);
    addItem({ article: `${size.article}-L${length}`, diameter: size.diameter, wallThickness: size.wallThickness }, qty);
    toast.success(`${size.article} L=${length} (${qty} шт.) добавлен в корзину`);
  };

  const mat = materials.find((m) => m.name === selectedMaterial);
  const hasMultipleColors = specs && specs.colors.length > 1;
  const firstSize = currentSizes[0];

  const articleSegments: ArticleSegment[] = [
    { value: "ВК", label: "Тип изделия", desc: "Воздуховод круглый" },
    { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
    ...(hasMultipleColors && selectedColor
      ? [{ value: selectedColor.colorCode, label: "Цвет (RAL)", desc: selectedColor.name, hex: selectedColor.hex }]
      : []),
    { value: firstSize ? `${firstSize.diameter}` : "Dn", label: "Диаметр", desc: "Dn, мм" },
  ];

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      <ImageGalleryWithLightbox images={vozdukhovodImages} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />

      {/* Description + Characteristics */}
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

      <MaterialSection
        selectedMaterial={selectedMaterial}
        selectedColor={selectedColor}
        onMaterialChange={(name) => { setSelectedMaterial(name); const s = materialSpecs[name]; if (s) setSelectedColor(s.colors[0]); setQuantities({}); setSelectedLengths({}); }}
        onColorChange={(c) => { setSelectedColor(c); setQuantities({}); setSelectedLengths({}); }}
      />

      <ArticleBreakdown exampleArticle={firstSize?.article || "—"} segments={articleSegments} />

      {/* Table */}
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
                <TableRow key={size.article} className={`cursor-pointer transition-colors hover:bg-primary/5 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                  onClick={() => navigate(`/product/${encodeURIComponent(size.article)}`)}>
                  <TableCell className="font-mono text-xs text-primary underline underline-offset-2 whitespace-nowrap">{size.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.diameter}</TableCell>
                  <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                    <Select value={String(getLength(size.article))} onValueChange={(v) => setSelectedLengths((prev) => ({ ...prev, [size.article]: parseInt(v) }))}>
                      <SelectTrigger className="h-7 w-20 text-xs mx-auto"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {vozdukhovodAvailableLengths.map((l) => (<SelectItem key={l} value={String(l)}>{l}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
                  <TableCell className="text-center text-sm">{size.socketThickness}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <QuantityCell quantity={quantities[size.article] || 1} onDecrement={() => setQty(size.article, -1)} onIncrement={() => setQty(size.article, 1)} />
                  </TableCell>
                  <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                    <AddToCartButton onClick={() => handleAdd(size)} />
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

const Vozdukhovod = () => (
  <ProductPageShell productType="vozdukhovod">
    <VozdukhovodContent />
  </ProductPageShell>
);

export default Vozdukhovod;
