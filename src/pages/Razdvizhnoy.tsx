import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { getRazdvizhnoySizes, razdvizhnoyImages, razdvizhnoyFlanecImages, type RazdvizhnoySize } from "@/data/razdvizhnoyProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  ImageGalleryWithLightbox,
  ArticleBreakdown,
  MaterialSection,
  SelectorBadges,
  ProductPageShell,
  QuantityCell,
  AddToCartButton,
  type ArticleSegment,
} from "@/components/configurator";

const RazdvizhnoyContent = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [connectionType, setConnectionType] = useState<"rastrub" | "flanec">("rastrub");
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const specs = materialSpecs[selectedMaterial];
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(specs?.colors[0]);
  const currentSizes = getRazdvizhnoySizes(selectedMaterial, selectedColor?.colorCode || "", connectionType);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const images = connectionType === "flanec" ? razdvizhnoyFlanecImages : razdvizhnoyImages;

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [article]: Math.max(1, (prev[article] || 1) + delta) }));
  };

  const handleAdd = (size: RazdvizhnoySize) => {
    const qty = quantities[size.article] || 1;
    addItem({ article: size.article, diameter: size.diameter, wallThickness: size.wallThickness }, qty);
    toast.success(`${size.article} (${qty} шт.) добавлен в корзину`);
  };

  const mat = materials.find((m) => m.name === selectedMaterial);
  const hasMultipleColors = specs && specs.colors.length > 1;
  const firstSize = currentSizes[0];

  const articleSegments: ArticleSegment[] = [
    { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
    { value: connectionType === "flanec" ? "РЭФ" : "РЭ", label: "Тип изделия", desc: connectionType === "flanec" ? "Раздвижной элемент (фланец)" : "Раздвижной элемент" },
    { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
    ...(hasMultipleColors && selectedColor
      ? [{ value: selectedColor.colorCode, label: "Цвет (RAL)", desc: selectedColor.name, hex: selectedColor.hex }]
      : []),
    { value: firstSize ? `${firstSize.diameter}` : "Dn", label: "Диаметр", desc: "Dn, мм" },
  ];

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      <ImageGalleryWithLightbox images={images} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />

      <SelectorBadges
        label="Тип соединения"
        options={[{ id: "rastrub", title: "Раструб" }, { id: "flanec", title: "Фланец" }]}
        selected={connectionType}
        onChange={(id) => { setConnectionType(id as "rastrub" | "flanec"); setQuantities({}); setSelectedImage(0); }}
      />

      {/* Description + Characteristics */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Раздвижной элемент — воздуховод, состоящий из трёх секций с возможностью регулировки длины до двух раз.
            Применяется при монтаже вентиляции, когда трудно подобрать точную длину воздуховода.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Диаметр Dn</span>
              <span className="text-sm font-semibold text-foreground">200–1200 мм</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Соединение</span>
              <span className="text-sm font-semibold text-foreground">{connectionType === "flanec" ? "Фланец" : "Раструб"}</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Стенка</span>
              <span className="text-sm font-semibold text-foreground">3–10 мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Тип</span>
              <span className="text-sm font-semibold text-foreground">Раздвижной элемент</span>
            </div>
          </div>
        </div>
      </div>

      <MaterialSection
        selectedMaterial={selectedMaterial}
        selectedColor={selectedColor}
        onMaterialChange={(name) => { setSelectedMaterial(name); const s = materialSpecs[name]; if (s) setSelectedColor(s.colors[0]); setQuantities({}); }}
        onColorChange={(c) => { setSelectedColor(c); setQuantities({}); }}
      />

      <ArticleBreakdown exampleArticle={firstSize?.article || "—"} segments={articleSegments} />

      {/* Table */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {selectedMaterial}{selectedColor && specs?.colors.length > 1 ? ` — ${selectedColor.name}` : ""}
        </h2>

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Dn, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">L min, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">L max, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Раструб, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">S, мм</TableHead>
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
                  <TableCell className="text-center text-sm">{size.lMin}</TableCell>
                  <TableCell className="text-center text-sm">{size.lMax}</TableCell>
                  <TableCell className="text-center text-sm">{size.socket}</TableCell>
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
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

const Razdvizhnoy = () => (
  <ProductPageShell productType="razdvizhnoy">
    <RazdvizhnoyContent />
  </ProductPageShell>
);

export default Razdvizhnoy;
