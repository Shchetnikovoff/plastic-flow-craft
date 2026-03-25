import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { pryamougolnyeProducts } from "@/data/pryamougolnyeProducts";
import { materials, materialSpecs, type MaterialColor } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import ArticleBreakdown, { type ArticleSegment } from "@/components/configurator/ArticleBreakdown";

const GORIZ_RENDER_SRC = "/images/emkost-pryam-goriz-render-grey.png";

// CSS filters tuned to preserve dark graphite frame while tinting lighter body
const colorFilters: Record<string, string> = {
  "7032": "none",
  "5012": "hue-rotate(185deg) saturate(2.5) brightness(0.92)",
  "9003": "brightness(1.2) saturate(0.2) contrast(1.05)",
  "": "brightness(0.3) saturate(0) contrast(1.3)",
};

function getColorFilter(colorCode: string): string {
  return colorFilters[colorCode] ?? "none";
}

/** Reusable render preview with CSS filter for color switching */
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
    <section id="modeli" className="mb-10">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-4 mb-4">
        <div>
          <div className="mb-4">
            <span className="text-sm font-semibold text-foreground mb-2 block">Материал</span>
            <div className="flex flex-wrap gap-2">
              {materials.map((mat) => (
                <Badge
                  key={mat.name}
                  variant="outline"
                  className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    selectedMaterial === mat.name
                      ? "border-primary text-primary bg-primary/5"
                      : "hover:border-primary/50 hover:text-primary/80"
                  }`}
                  onClick={() => onMaterialChange(mat.name)}
                >
                  {mat.code}
                </Badge>
              ))}
            </div>
            {specs && (
              <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                <span>🌡 {specs.workingTemp}</span>
              </div>
            )}
          </div>

          {specs && (
            <div className="mb-4">
              <span className="text-sm font-semibold text-foreground mb-2 block">Цвет</span>
              <div className="flex flex-wrap gap-2">
                {specs.colors.map((c) => (
                  <div
                    key={c.ral + c.colorCode}
                    onClick={() => onColorChange(c)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all ${
                      selectedColor.colorCode === c.colorCode
                        ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                        : "border-border hover:border-muted-foreground bg-card"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border border-border shrink-0" style={{ backgroundColor: c.hex }} />
                    <span className="text-xs font-medium text-foreground">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{c.ral}</span>
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

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="font-semibold">Артикул</TableHead>
              <TableHead className="font-semibold">Объём, л</TableHead>
              <TableHead className="font-semibold">Длина, мм</TableHead>
              <TableHead className="font-semibold">Ширина, мм</TableHead>
              <TableHead className="font-semibold">Высота, мм</TableHead>
              <TableHead className="font-semibold">Цена</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pryamougolnyeProducts.map((p) => {
              const art = buildArticle(p.volume);
              return (
                <TableRow
                  key={p.volume}
                  className="cursor-pointer transition-colors hover:bg-primary/5"
                  onClick={() => navigate(`/product/${encodeURIComponent(art)}`)}
                >
                  <TableCell className="font-mono text-xs font-medium">{art}</TableCell>
                  <TableCell>{p.volume.toLocaleString("ru-RU")}</TableCell>
                  <TableCell>{p.length}</TableCell>
                  <TableCell>{p.width}</TableCell>
                  <TableCell>{p.height}</TableCell>
                  <TableCell className="text-muted-foreground text-xs italic">По запросу</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

const EmkostiPryamougolnyeGorizontalnyeInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
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

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните обязательные поля (имя, телефон)");
      return;
    }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti/pryamougolnye">Прямоугольные</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Горизонтальные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Прямоугольные горизонтальные ёмкости в обрешётке
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Горизонтальная компоновка для компактного размещения при ограниченной высоте. Объём от 1 000 до 50 000 литров.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-real-4.png" alt="Прямоугольная горизонтальная ёмкость" className="w-full object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card transition-all">
              <TankRenderPreview colorCode={selectedColor.colorCode} className="w-full" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkost-pryam-real-2.jpg" alt="Горизонтальная ёмкость в обрешётке" className="w-full object-contain" />
            </div>
          </div>
        </section>

        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "modeli", label: "Модели" },
            { id: "cta-form", label: "Заявка" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <RectProductTable
          selectedMaterial={selectedMaterial}
          selectedColor={selectedColor}
          onMaterialChange={handleMaterialChange}
          onColorChange={setSelectedColor}
        />

        <section id="cta-form" className="mb-10 scroll-mt-8">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-2">Запросить расчёт</h2>
            <p className="text-sm text-muted-foreground mb-4">Оставьте заявку — подготовим КП в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label htmlFor="cta-name">Имя *</Label><Input id="cta-name" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div><Label htmlFor="cta-phone">Телефон *</Label><Input id="cta-phone" type="tel" placeholder="+7 900 000-00-00" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></div>
              <div className="sm:col-span-2"><Label htmlFor="cta-desc">Описание задачи</Label><Textarea id="cta-desc" placeholder="Опишите ёмкость: тип, объём, назначение…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button></div>
            </form>
          </div>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const EmkostiPryamougolnyeGorizontalnye = () => (
  <CartProvider><EmkostiPryamougolnyeGorizontalnyeInner /></CartProvider>
);

export default EmkostiPryamougolnyeGorizontalnye;
