import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { getProductImages, materials, materialSpecs, getSizesForColor, connectionTypes, type ProductSize, type MaterialColor, type ConnectionType, type AngleType } from "@/data/products";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { toast } from "sonner";
import { generateFullPagePdf } from "@/lib/generateFullPagePdf";
import {
  ImageGalleryWithLightbox,
  ArticleBreakdown,
  MaterialSection,
  SelectorBadges,
  CharacteristicsGrid,
  QuantityCell,
  AddToCartButton,
  type ArticleSegment,
} from "@/components/configurator";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FAQSection } from "@/components/corporate/sections";

interface ProductContentProps {
  angle: AngleType;
  selectedConnection: ConnectionType;
  setSelectedConnection: (c: ConnectionType) => void;
}

const ProductContent = ({ angle, selectedConnection, setSelectedConnection }: ProductContentProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const specs = materialSpecs[selectedMaterial];
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(specs?.colors[0]);
  const currentSizes = getSizesForColor(selectedMaterial, selectedColor?.colorCode || "", selectedConnection, angle);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = getProductImages(selectedConnection, angle);

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [article]: Math.max(1, (prev[article] || 1) + delta) }));
  };

  const handleAdd = (size: ProductSize) => {
    const qty = quantities[size.article] || 1;
    addItem({ article: size.article, diameter: size.diameter, wallThickness: size.wallThickness }, qty);
    toast.success(`${size.article} (${qty} шт.) добавлен в корзину`);
  };

  const mat = materials.find((m) => m.name === selectedMaterial);
  const conn = connectionTypes.find((c) => c.id === selectedConnection);
  const hasMultipleColors = specs && specs.colors.length > 1;
  const firstSize = currentSizes[0];

  const articleSegments: ArticleSegment[] = [
    { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
    { value: selectedConnection === "flanec" ? "ОТВФ" : "ОТВР", label: "Тип изделия", desc: selectedConnection === "flanec" ? "Отвод вентиляционный, фланец" : "Отвод вентиляционный, раструб" },
    { value: String(angle), label: "Угол поворота", desc: `${angle} градусов` },
    { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
    ...(hasMultipleColors && selectedColor
      ? [{ value: selectedColor.colorCode, label: "Цвет (RAL)", desc: selectedColor.name, hex: selectedColor.hex }]
      : []),
    { value: firstSize ? String(firstSize.diameter) : "DN", label: "Диаметр", desc: "Номинальный диаметр, мм" },
  ];

  return (
    <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
      <ImageGalleryWithLightbox images={productImages} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />

      {/* Description + Characteristics */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Отвод вентиляционный круглого сечения служит для плавного поворота системы под углом {angle}°.
            Обеспечивает надёжное соединение элементов вентиляционной системы благодаря раструбному типу соединения.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground">Диаметр</span>
              <span className="text-sm font-semibold text-foreground">200–1200 мм</span>
            </div>
            <div className="bg-card p-3">
              <span className="block text-xs text-muted-foreground mb-1">Соединение</span>
              <div className="flex gap-1.5">
                {connectionTypes.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => { setSelectedConnection(ct.id); setQuantities({}); setSelectedImage(0); }}
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                      selectedConnection === ct.id
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {ct.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Стенка</span>
              <span className="text-sm font-semibold text-foreground">3–10 мм</span>
            </div>
            <div className="bg-card p-3 border-t">
              <span className="block text-xs text-muted-foreground">Угол</span>
              <span className="text-sm font-semibold text-foreground">{angle}°</span>
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

      {/* Table */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {selectedMaterial}{selectedColor && specs?.colors.length > 1 ? ` — ${selectedColor.name}` : ""} — {conn?.name}
        </h2>

        <ArticleBreakdown exampleArticle={firstSize?.article || "—"} segments={articleSegments} />

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="bg-primary text-primary-foreground hover:bg-primary">
                <TableHead className="text-primary-foreground font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">DN</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">S, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">L, мм</TableHead>
                <TableHead className="text-primary-foreground font-semibold text-xs text-center">Sp, мм</TableHead>
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
                  <TableCell className="text-center text-sm">{size.wallThickness}</TableCell>
                  <TableCell className="text-center text-sm text-primary">{size.availableLength ?? "—"}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.socketThickness}</TableCell>
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

        <div className="mt-4 flex justify-center gap-3">
          <Button variant="outline" className="gap-2"
            onClick={async () => {
              const pdfSegments = [
                { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
                { value: selectedConnection === "flanec" ? "ОТВФ" : "ОТВР", label: "Тип", desc: selectedConnection === "flanec" ? "Фланец" : "Раструб" },
                { value: String(angle), label: "Угол", desc: `${angle} градусов` },
                { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
                ...(hasMultipleColors && selectedColor
                  ? [{ value: selectedColor.colorCode, label: "Цвет", desc: selectedColor.name }]
                  : []),
                { value: firstSize ? String(firstSize.diameter) : "DN", label: "Диаметр", desc: "мм" },
              ];
              await generateFullPagePdf({
                sizes: currentSizes,
                materialName: selectedMaterial,
                connectionName: conn?.name || "",
                colorName: selectedColor?.name,
                colors: specs?.colors,
                workingTemp: specs?.workingTemp,
                chemicalResistance: specs?.chemicalResistance,
                articleSegments: pdfSegments,
              });
              toast.success("PDF каталога скачан");
            }}>
            <FileDown className="h-4 w-4" />
            Скачать страницу (PDF)
          </Button>
        </div>
      </div>
    </main>
  );
};

interface IndexProps {
  angle?: AngleType;
}

const Index = ({ angle = 90 }: IndexProps) => {
  const [selectedConnection, setSelectedConnection] = useState<ConnectionType>("rastrub");

  return (
    <CorporatePageShell
      title="Отводы вентиляционные"
      heroImage="/images/ventilyatsiya-hero-1.png"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Вентиляция", href: "/catalog/ventilyatsiya" },
        { label: "Отводы" },
      ]}
      stats={[
        { value: "15° — 90°", label: "углы" },
        { value: "PP / PE", label: "материалы" },
        { value: "от 7 дней", label: "сроки" },
        { value: "5 лет", label: "гарантия" },
      ]}
    >
      <ProductContent angle={angle} selectedConnection={selectedConnection} setSelectedConnection={setSelectedConnection} />
      <FAQSection
        items={[
          { q: "Как выбрать материал?", a: "Используйте конфигуратор — выберите рабочую среду и температуру, система подберёт оптимальный материал." },
          { q: "Можно заказать нестандартный размер?", a: "Да, укажите параметры в конфигураторе или свяжитесь с инженером." },
          { q: "Как формируется артикул?", a: "Артикул генерируется автоматически на основе выбранных параметров." },
          { q: "Сроки изготовления?", a: "7–21 рабочий день в зависимости от сложности." },
          { q: "Как оформить заказ?", a: "Добавьте товар в корзину из конфигуратора и оформите заявку." },
        ]}
      />
    </CorporatePageShell>
  );
};

export default Index;
