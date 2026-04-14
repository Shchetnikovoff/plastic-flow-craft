import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Droplets, Factory, CloudRain, FlaskConical, Download } from "lucide-react";
import { toast } from "sonner";
import ArticleBreakdown, { type ArticleSegment } from "./ArticleBreakdown";
import { knsSvtProducts } from "@/data/knsSvtProducts";
import { knsPpProducts } from "@/data/knsPpProducts";
import { generateKnsOprosnyList } from "@/lib/generateKnsOprosnyList";

type WastewaterType = "domestic" | "industrial" | "stormwater" | "other";
type KnsMaterial = "pe" | "pp";

interface PipelineParams {
  count: string;
  diameter: string;
  material: string;
  depth: string;
}

const defaultPipeline: PipelineParams = { count: "1", diameter: "", material: "", depth: "" };
const pipeMaterials = ["ПВХ", "ПЭ", "ПП", "Чугун", "Сталь"];

const wastewaterOptions: { id: WastewaterType; label: string; icon: React.ElementType }[] = [
  { id: "domestic", label: "Хоз.-бытовые", icon: Droplets },
  { id: "industrial", label: "Промышленные", icon: Factory },
  { id: "stormwater", label: "Ливневые", icon: CloudRain },
  { id: "other", label: "Другое", icon: FlaskConical },
];

const materialOptions: { id: KnsMaterial; label: string; desc: string }[] = [
  { id: "pe", label: "Полиэтилен (ПЭ)", desc: "Корпус из полиэтилена — высокая прочность, срок службы от 30 лет" },
  { id: "pp", label: "Полипропилен (ПП)", desc: "Химическая стойкость к агрессивным средам, сварная конструкция" },
];

const equipmentOptions = [
  { id: "basket", label: "Сороудерживающая корзина" },
  { id: "gate", label: "Шиберная задвижка на подводящем трубопроводе" },
  { id: "gateWell", label: "Колодец с шиберной задвижкой" },
  { id: "flowMeter", label: "Колодец с запорной арматурой и расходомером" },
  { id: "pavilion", label: "Павильон-укрытие с грузоподъемным механизмом" },
  { id: "insulation", label: "Утепление корпуса КНС" },
];

const PipelineSection = ({ title, value, onChange }: { title: string; value: PipelineParams; onChange: (v: PipelineParams) => void }) => (
  <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
    <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{title}</span>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div className="space-y-1">
        <Label className="text-[11px] text-muted-foreground">Кол-во, шт.</Label>
        <Input
          type="number" min={1} max={4}
          value={value.count}
          onChange={(e) => onChange({ ...value, count: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-[11px] text-muted-foreground">Диаметр, мм</Label>
        <Input
          type="number" min={50} max={1000} placeholder="110"
          value={value.diameter}
          onChange={(e) => onChange({ ...value, diameter: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-[11px] text-muted-foreground">Материал</Label>
        <Select value={value.material} onValueChange={(v) => onChange({ ...value, material: v })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Выбрать" /></SelectTrigger>
          <SelectContent>
            {pipeMaterials.map((m) => <SelectItem key={m} value={m} className="text-xs">{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-[11px] text-muted-foreground">Глубина залож., м</Label>
        <Input
          type="number" min={0} max={20} step={0.1} placeholder="1.5"
          value={value.depth}
          onChange={(e) => onChange({ ...value, depth: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
    </div>
  </div>
);

const KnsCalculator = () => {
  const [wastewaterType, setWastewaterType] = useState<WastewaterType>("domestic");
  const [material, setMaterial] = useState<KnsMaterial>("pp");
  const [flow, setFlow] = useState(20);
  const [head, setHead] = useState(15);
  const [pumpCount, setPumpCount] = useState(2);
  const [equipment, setEquipment] = useState<Record<string, boolean>>({});
  const [inletPipe, setInletPipe] = useState<PipelineParams>({ ...defaultPipeline });
  const [outletPipe, setOutletPipe] = useState<PipelineParams>({ ...defaultPipeline });
  const [contact, setContact] = useState({ company: "", person: "", phone: "", email: "", address: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const allProducts = useMemo(() => [
    ...knsSvtProducts.map((p) => ({ ...p, mat: "pe" as KnsMaterial })),
    ...knsPpProducts.map((p) => ({ ...p, mat: "pp" as KnsMaterial })),
  ], []);

  const recommended = useMemo(() => {
    const filtered = allProducts.filter((p) => p.mat === material);
    // Find best match: flow >= requested AND head >= requested, then smallest
    const matching = filtered.filter((p) => p.flow >= flow && p.head >= head);
    if (matching.length > 0) {
      matching.sort((a, b) => (a.flow + a.head) - (b.flow + b.head));
      return matching[0];
    }
    // Fallback: closest by combined distance
    const sorted = [...filtered].sort((a, b) => {
      const distA = Math.abs(a.flow - flow) + Math.abs(a.head - head);
      const distB = Math.abs(b.flow - flow) + Math.abs(b.head - head);
      return distA - distB;
    });
    return sorted[0] || null;
  }, [allProducts, material, flow, head]);

  const selectedEquipmentList = Object.entries(equipment)
    .filter(([, v]) => v)
    .map(([k]) => equipmentOptions.find((e) => e.id === k)?.label)
    .filter(Boolean);

  const matCode = material === "pe" ? "ПЭ" : "ПП";
  const matLabel = material === "pe" ? "Полиэтилен" : "Полипропилен";
  const wastewaterLabel = wastewaterOptions.find((w) => w.id === wastewaterType)?.label || "";
  const pumpSchemeLabel = pumpCount === 2 ? "1 рабочий + 1 резервный" : pumpCount === 3 ? "2 рабочих + 1 резервный" : "3 рабочих + 1 резервный";

  const handleDownloadPdf = async () => {
    if (!recommended) return;
    const errors: Record<string, string> = {};
    if (!contact.person.trim()) errors.person = "Укажите контактное лицо";
    const phone = contact.phone.trim();
    if (!phone) {
      errors.phone = "Укажите телефон";
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
      errors.phone = "Неверный формат телефона";
    }
    const email = contact.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Неверный формат e-mail";
    }
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Заполните обязательные поля");
      return;
    }
    try {
      await generateKnsOprosnyList({
        wastewaterType: wastewaterLabel,
        material: matLabel,
        flow,
        head,
        pumpScheme: pumpSchemeLabel,
        inletPipe,
        outletPipe,
        equipment: selectedEquipmentList as string[],
        recommendedModel: recommended.model,
        recommendedArticle: recommended.article,
        recommendedDiameter: recommended.diameter,
        recommendedHeight: recommended.height,
        recommendedPumpCount: recommended.pumpCount,
        recommendedPumpPower: recommended.pumpPower,
        contact,
      });
      toast.success("Опросный лист скачан");
    } catch {
      toast.error("Ошибка при генерации PDF");
    }
  };

  const articleSegments: ArticleSegment[] = recommended
    ? [
        { value: "СЗПК", label: "Компания", desc: "ООО СЗПК «Пласт-Металл Про»" },
        { value: "КНС", label: "Тип изделия", desc: "Канализационная насосная станция" },
        { value: matCode, label: "Материал", desc: matLabel },
        { value: `${recommended.flow}-${recommended.head}`, label: "Q-H", desc: `Произв. ${recommended.flow} м³/ч, напор ${recommended.head} м` },
      ]
    : [];

  return (
    <section id="calculator" className="mb-10 scroll-mt-8">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">
        Калькулятор подбора КНС
      </h2>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="space-y-6">
          {/* Wastewater type */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Тип перекачиваемых сточных вод</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {wastewaterOptions.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setWastewaterType(w.id)}
                  className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                    wastewaterType === w.id
                      ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                      : "border-border hover:border-muted-foreground bg-card"
                  }`}
                >
                  <w.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-xs font-medium text-foreground">{w.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Материал корпуса</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {materialOptions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setMaterial(m.id)}
                  className={`rounded-lg border p-3 cursor-pointer transition-all ${
                    material === m.id
                      ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                      : "border-border hover:border-muted-foreground bg-card"
                  }`}
                >
                  <span className="text-sm font-semibold text-foreground">{m.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flow & Head sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Производительность (Q): <span className="text-primary">{flow} м³/ч</span>
              </label>
              <Slider
                min={5}
                max={80}
                step={5}
                value={[flow]}
                onValueChange={([v]) => setFlow(v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 м³/ч</span>
                <span>80 м³/ч</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">
                Требуемый напор (H): <span className="text-primary">{head} м</span>
              </label>
              <Slider
                min={5}
                max={40}
                step={5}
                value={[head]}
                onValueChange={([v]) => setHead(v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 м</span>
                <span>40 м</span>
              </div>
            </div>
          </div>

          {/* Pump count */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Рабочая схема</span>
            <div className="flex flex-wrap gap-2">
              {[2, 3, 4].map((n) => (
                <Badge
                  key={n}
                  variant="outline"
                  className={`rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                    pumpCount === n
                      ? "border-primary text-primary bg-primary/5"
                      : "hover:border-primary/50 hover:text-primary/80"
                  }`}
                  onClick={() => setPumpCount(n)}
                >
                  {n === 2 ? "1 раб. + 1 рез." : n === 3 ? "2 раб. + 1 рез." : "3 раб. + 1 рез."}
                </Badge>
              ))}
            </div>
          </div>

          {/* Pipeline parameters */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-3 block">Параметры трубопроводов</span>
            <div className="space-y-3">
              <PipelineSection title="Подводящий трубопровод" value={inletPipe} onChange={setInletPipe} />
              <PipelineSection title="Напорный трубопровод" value={outletPipe} onChange={setOutletPipe} />
            </div>
          </div>

          {/* Additional equipment */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-3 block">Дополнительное оборудование</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {equipmentOptions.map((eq) => (
                <div key={eq.id} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5">
                  <Switch
                    id={eq.id}
                    checked={!!equipment[eq.id]}
                    onCheckedChange={(v) => setEquipment((prev) => ({ ...prev, [eq.id]: v }))}
                  />
                  <Label htmlFor={eq.id} className="text-xs text-foreground cursor-pointer">{eq.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Contact details */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-3 block">Контактные данные заказчика</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Организация</Label>
                <Input value={contact.company} onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))} placeholder="ООО «Название»" maxLength={200} className="h-8 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Контактное лицо *</Label>
                <Input value={contact.person} onChange={(e) => { setContact((p) => ({ ...p, person: e.target.value })); setContactErrors((p) => ({ ...p, person: "" })); }} placeholder="Ф.И.О." maxLength={100} className={`h-8 text-xs ${contactErrors.person ? "border-destructive" : ""}`} />
                {contactErrors.person && <span className="text-[10px] text-destructive">{contactErrors.person}</span>}
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Телефон *</Label>
                <Input value={contact.phone} onChange={(e) => { setContact((p) => ({ ...p, phone: e.target.value })); setContactErrors((p) => ({ ...p, phone: "" })); }} placeholder="+7 (___) ___-__-__" maxLength={20} className={`h-8 text-xs ${contactErrors.phone ? "border-destructive" : ""}`} />
                {contactErrors.phone && <span className="text-[10px] text-destructive">{contactErrors.phone}</span>}
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">E-mail</Label>
                <Input type="email" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))} placeholder="mail@example.com" maxLength={255} className="h-8 text-xs" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <Label className="text-[11px] text-muted-foreground">Адрес объекта</Label>
                <Input value={contact.address} onChange={(e) => setContact((p) => ({ ...p, address: e.target.value }))} placeholder="Город, улица, объект" maxLength={300} className="h-8 text-xs" />
              </div>
            </div>
          </div>

          {/* Result */}
          {recommended && (
            <div className="space-y-3">
              <ArticleBreakdown exampleArticle={recommended.article} segments={articleSegments} />

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      Рекомендованная модель: <span className="text-primary">{recommended.model}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {recommended.article} · Ø{recommended.diameter} мм · H {recommended.height} мм
                      · Q {recommended.flow} м³/ч · Напор {recommended.head} м
                      · {recommended.pumpCount} насоса × {recommended.pumpPower} кВт
                      · {matLabel}
                    </p>
                    {(inletPipe.diameter || outletPipe.diameter) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {inletPipe.diameter && <><span className="font-medium">Подвод:</span> Ø{inletPipe.diameter} мм{inletPipe.material && `, ${inletPipe.material}`}{inletPipe.depth && `, глуб. ${inletPipe.depth} м`} · </>}
                        {outletPipe.diameter && <><span className="font-medium">Напор:</span> Ø{outletPipe.diameter} мм{outletPipe.material && `, ${outletPipe.material}`}{outletPipe.depth && `, глуб. ${outletPipe.depth} м`}</>}
                      </p>
                    )}
                    {selectedEquipmentList.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className="font-medium">Доп. оборудование:</span> {selectedEquipmentList.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" className="gap-1.5">
                      <Link to={`/product/${encodeURIComponent(recommended.article)}`}>
                        Перейти к товару
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={handleDownloadPdf}>
                      <Download className="h-4 w-4" />
                      Скачать опросный лист (PDF)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KnsCalculator;
