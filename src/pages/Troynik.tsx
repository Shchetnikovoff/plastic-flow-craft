import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { materials, materialSpecs, connectionTypes, type MaterialColor, type ConnectionType } from "@/data/products";
import { getTroynikSizes, getTroynikImages, type TroynikSize } from "@/data/troynikProducts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import {
  ImageGalleryWithLightbox,
  ArticleBreakdown,
  MaterialSection,
  SelectorBadges,
  QuantityCell,
  AddToCartButton,
  type ArticleSegment,
} from "@/components/configurator";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FAQSection } from "@/components/corporate/sections";

const stats = [
  { value: "Круглые / квадратные", label: "сечения" },
  { value: "PP / PE", label: "материалы" },
  { value: "от 7 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faq = [
  { q: "Какие виды вентиляции вы производите?", a: "Воздуховоды круглого и прямоугольного сечения, тройники, отводы, раздвижные воздуховоды." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и полиэтилен (PE)." },
  { q: "Какие диаметры доступны?", a: "От 50 до 1200 мм для круглых, нестандарт — по ТЗ." },
  { q: "Сроки?", a: "7–14 рабочих дней." },
  { q: "Доставка?", a: "Спецтранспортом по всей РФ." },
];

const TroynikContent = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [selectedConnection, setSelectedConnection] = useState<ConnectionType>("rastrub");
  const specs = materialSpecs[selectedMaterial];
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(specs?.colors[0]);
  const currentSizes = getTroynikSizes(selectedMaterial, selectedColor?.colorCode || "", selectedConnection);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const images = getTroynikImages(selectedConnection);

  const socketColumnLabel = selectedConnection === "flanec" ? "Фланец" : "Раструб";

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [article]: Math.max(1, (prev[article] || 1) + delta) }));
  };

  const handleAdd = (size: TroynikSize) => {
    const qty = quantities[size.article] || 1;
    addItem({ article: size.article, diameter: size.d, wallThickness: size.wallThickness }, qty);
    toast.success(`${size.article} (${qty} шт.) добавлен в корзину`);
  };

  const mat = materials.find((m) => m.name === selectedMaterial);
  const hasMultipleColors = specs && specs.colors.length > 1;
  const firstSize = currentSizes[0];
  const prefix = selectedConnection === "flanec" ? "ТРФ" : "ТР";

  const articleSegments: ArticleSegment[] = [
    { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
    { value: prefix, label: "Тип изделия", desc: selectedConnection === "flanec" ? "Тройник вентиляционный, фланец" : "Тройник вентиляционный, раструб" },
    { value: mat?.code || "—", label: "Материал", desc: mat?.name.replace(/\s*\(.*\)/, "") || "—" },
    ...(hasMultipleColors && selectedColor
      ? [{ value: selectedColor.colorCode, label: "Цвет (RAL)", desc: selectedColor.name, hex: selectedColor.hex }]
      : []),
    { value: firstSize ? `${firstSize.d}x${firstSize.d1}` : "DxD1", label: "Диаметры", desc: "D × D1, мм" },
  ];

  return (
    <>
      <ImageGalleryWithLightbox images={images} selectedImage={selectedImage} onSelectedImageChange={setSelectedImage} />

      {/* Description + Characteristics */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-8">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3 tracking-wide uppercase">Описание</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Тройник вентиляционный круглого сечения используется для присоединения ответвлений к основной магистрали воздуховода круглого сечения.
            Обеспечивает надёжное соединение элементов вентиляционной системы.
          </p>
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-2 gap-px rounded-lg border overflow-hidden">
            <div className="bg-white p-3">
              <span className="block text-xs text-slate-500">Диаметр D</span>
              <span className="text-sm font-semibold text-slate-900">100–1200 мм</span>
            </div>
            <div className="bg-white p-3">
              <span className="block text-xs text-slate-500">Соединение</span>
              <span className="text-sm font-semibold text-slate-900">{selectedConnection === "flanec" ? "Фланец" : "Раструб"}</span>
            </div>
            <div className="bg-white p-3 border-t">
              <span className="block text-xs text-slate-500">Стенка</span>
              <span className="text-sm font-semibold text-slate-900">2–10 мм</span>
            </div>
            <div className="bg-white p-3 border-t">
              <span className="block text-xs text-slate-500">Тип</span>
              <span className="text-sm font-semibold text-slate-900">Тройник</span>
            </div>
          </div>
        </div>
      </div>

      <SelectorBadges
        label="Тип соединения"
        options={connectionTypes.map((ct) => ({ id: ct.id, title: ct.name }))}
        selected={selectedConnection}
        onChange={(id) => { setSelectedConnection(id as ConnectionType); setQuantities({}); setSelectedImage(0); }}
      />

      <MaterialSection
        selectedMaterial={selectedMaterial}
        selectedColor={selectedColor}
        onMaterialChange={(name) => { setSelectedMaterial(name); const s = materialSpecs[name]; if (s) setSelectedColor(s.colors[0]); setQuantities({}); }}
        onColorChange={(c) => { setSelectedColor(c); setQuantities({}); }}
      />

      <ArticleBreakdown exampleArticle={firstSize?.article || "—"} segments={articleSegments} />

      {/* Table */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4 tracking-wide uppercase text-center">
          Технические характеристики — {selectedMaterial}{selectedColor && specs?.colors.length > 1 ? ` — ${selectedColor.name}` : ""}
        </h2>

        <div className="rounded-lg border overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-amber-600 text-white hover:bg-amber-600">
                <TableHead className="text-white font-semibold text-xs">Артикул</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">D, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">D1, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">L, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">L1, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">A, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">B, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">{socketColumnLabel}</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">S, мм</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center whitespace-nowrap">Кол-во</TableHead>
                <TableHead className="text-white font-semibold text-xs text-center">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSizes.map((size, i) => (
                <TableRow key={size.article} className={`cursor-pointer transition-colors hover:bg-amber-50 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                  onClick={() => navigate(`/product/${encodeURIComponent(size.article)}`)}>
                  <TableCell className="font-mono text-xs text-amber-600 underline underline-offset-2 whitespace-nowrap">{size.article}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.d}</TableCell>
                  <TableCell className="text-center text-sm font-medium">{size.d1}</TableCell>
                  <TableCell className="text-center text-sm">{size.l}</TableCell>
                  <TableCell className="text-center text-sm">{size.l1}</TableCell>
                  <TableCell className="text-center text-sm">{size.a}</TableCell>
                  <TableCell className="text-center text-sm">{size.b}</TableCell>
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

      {/* FAQ */}
      <div className="mt-10">
        <FAQSection items={faq} />
      </div>
    </>
  );
};

const Troynik = () => (
  <CorporatePageShell
      catalogTabs="ventilyatsiya"
    title="Тройники вентиляционные"
    subtitle="Тройники круглого сечения из полипропилена и полиэтилена"
    heroImage="/images/ventilyatsiya-hero-1.png"
    stats={stats}
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "Вентиляция", href: "/ventilyatsiya" },
      { label: "Тройники" },
    ]}
  >
    <TroynikContent />
  </CorporatePageShell>
);

export default Troynik;
