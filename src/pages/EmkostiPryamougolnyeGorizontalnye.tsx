import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FAQSection } from "@/components/corporate/sections";
import { pryamougolnyeProducts } from "@/data/pryamougolnyeProducts";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";

const GORIZ_RENDER_SRC = "/images/emkost-pryam-goriz-render-grey.png";

const colorFilters: Record<string, string> = {
  "7032": "none",
  "5012": "hue-rotate(185deg) saturate(2.5) brightness(0.92)",
  "9003": "brightness(1.2) saturate(0.2) contrast(1.05)",
  "": "brightness(0.3) saturate(0) contrast(1.3)",
};

function getColorFilter(colorCode: string): string {
  return colorFilters[colorCode] ?? "none";
}

const TankRenderPreview = ({ colorCode, className = "" }: { colorCode: string; className?: string }) => {
  const filter = getColorFilter(colorCode);
  return (
    <img
      src={GORIZ_RENDER_SRC}
      alt="Превью ёмкости"
      className={`object-contain transition-[filter] duration-300 ${className}`}
      style={{ filter }}
    />
  );
};

interface RectProductTableProps {
  selectedMaterial: string;
  selectedColor: MaterialColor;
  onMaterialChange: (matName: string) => void;
  onColorChange: (color: MaterialColor) => void;
}

const RectProductTable = ({ selectedMaterial, selectedColor, onMaterialChange, onColorChange }: RectProductTableProps) => {
  const navigate = useNavigate();

  const specs = materialSpecs[selectedMaterial];
  const matCode = materials.find((m) => m.name === selectedMaterial)?.code || "PPC";
  const hasMultipleColors = specs.colors.length > 1;

  const buildArticle = useCallback((volume: number) => {
    const colorPart = hasMultipleColors && selectedColor.colorCode ? `.${selectedColor.colorCode}` : "";
    return `СЗПК.ЕПО.${matCode}${colorPart}.${volume}`;
  }, [matCode, selectedColor, hasMultipleColors]);

  const exampleArticle = buildArticle(pryamougolnyeProducts[0].volume);

  const segments: ArticleSegment[] = useMemo(() => {
    const segs: ArticleSegment[] = [
      { value: "СЗПК", label: "Компания", desc: "Сибирский завод полимерных конструкций" },
      { value: "ЕПО", label: "Тип", desc: "Прямоугольная горизонтальная в обрешётке" },
      { value: matCode, label: "Материал", desc: materials.find((m) => m.code === matCode)?.name.split("(")[0].trim() || matCode },
    ];
    if (hasMultipleColors && selectedColor.colorCode) {
      segs.push({
        value: selectedColor.colorCode,
        label: "Цвет",
        desc: `${selectedColor.name} (${selectedColor.ral})`,
        hex: selectedColor.hex,
      });
    }
    segs.push({ value: String(pryamougolnyeProducts[0].volume), label: "Объём, л", desc: "Объём в литрах" });
    return segs;
  }, [matCode, selectedColor, hasMultipleColors]);

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Типоразмерный ряд</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6">
          <div>
            <div className="mb-6">
              <span className="text-sm font-semibold text-slate-900 mb-2 block">Материал</span>
              <div className="flex flex-wrap gap-2">
                {materials.map((mat) => (
                  <Badge
                    key={mat.name}
                    variant="outline"
                    className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                      selectedMaterial === mat.name
                        ? "border-amber-500 text-amber-600 bg-amber-50"
                        : "hover:border-amber-400 hover:text-amber-600"
                    }`}
                    onClick={() => onMaterialChange(mat.name)}
                  >
                    {mat.code}
                  </Badge>
                ))}
              </div>
              {specs && (
                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  <span>Рабочая температура: {specs.workingTemp}</span>
                </div>
              )}
            </div>

            {specs && (
              <div className="mb-6">
                <span className="text-sm font-semibold text-slate-900 mb-2 block">Цвет</span>
                <div className="flex flex-wrap gap-2">
                  {specs.colors.map((c) => (
                    <div
                      key={c.ral + c.colorCode}
                      onClick={() => onColorChange(c)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all ${
                        selectedColor.colorCode === c.colorCode
                          ? "border-amber-500 ring-1 ring-amber-500 shadow-sm bg-amber-50"
                          : "border-slate-200 hover:border-slate-400 bg-white"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-slate-200 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="text-xs font-medium text-slate-900">{c.name}</span>
                      <span className="text-xs text-slate-500">{c.ral}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ArticleBreakdown exampleArticle={exampleArticle} segments={segments} />
          </div>

          <div className="flex items-center justify-center">
            <TankRenderPreview colorCode={selectedColor.colorCode} className="max-w-[200px] w-full" />
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="font-semibold text-slate-700">Артикул</TableHead>
                <TableHead className="font-semibold text-slate-700">Объём, л</TableHead>
                <TableHead className="font-semibold text-slate-700">Длина, мм</TableHead>
                <TableHead className="font-semibold text-slate-700">Ширина, мм</TableHead>
                <TableHead className="font-semibold text-slate-700">Высота, мм</TableHead>
                <TableHead className="font-semibold text-slate-700">Цена</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pryamougolnyeProducts.map((p) => {
                const art = buildArticle(p.volume);
                return (
                  <TableRow
                    key={p.volume}
                    className="cursor-pointer transition-colors hover:bg-amber-50/50"
                    onClick={() => navigate(`/product/${encodeURIComponent(art)}`)}
                  >
                    <TableCell className="font-mono text-xs font-medium">{art}</TableCell>
                    <TableCell>{p.volume.toLocaleString("ru-RU")}</TableCell>
                    <TableCell>{p.length}</TableCell>
                    <TableCell>{p.width}</TableCell>
                    <TableCell>{p.height}</TableCell>
                    <TableCell className="text-slate-400 text-xs italic">По запросу</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

const faqItems = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по среде и температуре." },
  { q: "Какой объём?", a: "50 л — 300 м³, нестандарт по ТЗ." },
  { q: "Сроки?", a: "10–21 день стандарт, от 15 нестандарт." },
  { q: "Доставка?", a: "Спецтранспорт по всей РФ." },
  { q: "По своим чертежам?", a: "Да, изготовим и спроектируем." },
];

const EmkostiPryamougolnyeGorizontalnye = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [selectedColor, setSelectedColor] = useState<MaterialColor>(
    materialSpecs[materials[0].name].colors[0]
  );

  const handleMaterialChange = useCallback((matName: string) => {
    setSelectedMaterial(matName);
    const newSpecs = materialSpecs[matName];
    if (newSpecs && newSpecs.colors.length > 0) {
      setSelectedColor(newSpecs.colors[0]);
    }
  }, []);

  return (
    <CorporatePageShell
      catalogTabs="emkosti"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Ёмкости", href: "/catalog/emkosti" },
        { label: "Прямоугольные", href: "/catalog/emkosti/pryamougolnye" },
        { label: "Горизонтальные" },
      ]}
      title="Прямоугольные горизонтальные"
      accentWord="ёмкости в обрешётке"
      subtitle="Горизонтальная компоновка для компактного размещения при ограниченной высоте. Объём от 1 000 до 50 000 литров."
      badge="Собственное производство"
      heroImage="/images/emkosti-collage-hero.png"
      stats={[
        { value: "50 л — 300 м³", label: "диапазон объёмов" },
        { value: "PP / PE / PVC", label: "материалы" },
        { value: "от 10 дней", label: "срок изготовления" },
        { value: "5 лет", label: "гарантия" },
      ]}
      seo={{
        title: "Прямоугольные горизонтальные ёмкости в обрешётке — купить",
        description: "Горизонтальные прямоугольные ёмкости из полипропилена и полиэтилена в обрешётке. Объём от 1 000 до 50 000 л. Производство, доставка, монтаж.",
        keywords: "горизонтальные ёмкости, прямоугольные ёмкости, ёмкости в обрешётке, полипропилен",
      }}
    >
      <RectProductTable
        selectedMaterial={selectedMaterial}
        selectedColor={selectedColor}
        onMaterialChange={handleMaterialChange}
        onColorChange={setSelectedColor}
      />

      <FAQSection items={faqItems} />
    </CorporatePageShell>
  );
};

export default EmkostiPryamougolnyeGorizontalnye;
