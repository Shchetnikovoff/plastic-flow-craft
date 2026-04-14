import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Droplets, Factory, CloudRain, Building2, Download } from "lucide-react";
import { toast } from "sonner";
import ArticleBreakdown, { type ArticleSegment } from "./ArticleBreakdown";
import { losProducts } from "@/data/losProducts";
import { generateLosOprosnyList } from "@/lib/generateLosOprosnyList";

type LosType = "los" | "pesk" | "neft";
type WastewaterType = "domestic" | "stormwater" | "industrial" | "mixed";

const losTypeOptions: { id: LosType; label: string; desc: string; prefix: string }[] = [
  { id: "los", label: "ЛОС", desc: "Комплексная очистка хозяйственно-бытовых, ливневых и промышленных стоков", prefix: "ЛОС" },
  { id: "pesk", label: "Пескоуловитель", desc: "Удаление взвешенных частиц (песка, ила, грунта) из поверхностных стоков", prefix: "ПУ" },
  { id: "neft", label: "Нефтеуловитель", desc: "Выделение нефтепродуктов из стоков — АЗС, автомойки, промплощадки", prefix: "НУ" },
];

const wastewaterOptions: { id: WastewaterType; label: string; icon: React.ElementType }[] = [
  { id: "domestic", label: "Хоз.-бытовые", icon: Droplets },
  { id: "stormwater", label: "Ливневые", icon: CloudRain },
  { id: "industrial", label: "Промышленные", icon: Factory },
  { id: "mixed", label: "Смешанные", icon: Building2 },
];

const objectTypes = ["Коттеджный посёлок", "Промышленное предприятие", "АЗС / Автомойка", "Складской комплекс", "Торговый центр", "Другое"];
const soilTypes = ["Песок", "Супесь", "Суглинок", "Глина", "Скала", "Неизвестно"];
const groundwaterLevels = ["Выше 1 м", "1–3 м", "3–5 м", "Ниже 5 м", "Неизвестно"];

const LosCalculator = () => {
  const [losType, setLosType] = useState<LosType>("los");
  const [wastewaterType, setWastewaterType] = useState<WastewaterType>("domestic");
  const [throughput, setThroughput] = useState(10);
  const [groundwaterLevel, setGroundwaterLevel] = useState("");
  const [installDepth, setInstallDepth] = useState("");
  const [inletPipeDiam, setInletPipeDiam] = useState("");
  const [inletPipeDepth, setInletPipeDepth] = useState("");
  const [outletPipeDiam, setOutletPipeDiam] = useState("");
  const [outletPipeDepth, setOutletPipeDepth] = useState("");
  const [objectType, setObjectType] = useState("");
  const [soilType, setSoilType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [contact, setContact] = useState({ company: "", person: "", phone: "", email: "", address: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const recommended = useMemo(() => {
    const filtered = losProducts.filter((p) => p.type === losType);
    // Find best match: smallest throughput >= requested
    const matching = filtered.filter((p) => p.throughput >= throughput);
    if (matching.length > 0) {
      matching.sort((a, b) => a.throughput - b.throughput);
      return matching[0];
    }
    // Fallback: largest available
    const sorted = [...filtered].sort((a, b) => b.throughput - a.throughput);
    return sorted[0] || null;
  }, [losType, throughput]);

  const losTypeLabel = losTypeOptions.find((t) => t.id === losType)?.label || "";
  const wastewaterLabel = wastewaterOptions.find((w) => w.id === wastewaterType)?.label || "";

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
      await generateLosOprosnyList({
        losType: losTypeLabel,
        wastewaterType: wastewaterLabel,
        throughput,
        groundwaterLevel,
        installDepth,
        inletPipeDiam,
        inletPipeDepth,
        outletPipeDiam,
        outletPipeDepth,
        objectType,
        soilType,
        additionalNotes,
        recommendedModel: recommended.name,
        recommendedArticle: recommended.article,
        recommendedDiameter: recommended.diameter,
        recommendedLength: recommended.length,
        recommendedPipes: recommended.pipes,
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
        { value: losTypeOptions.find((t) => t.id === losType)?.prefix || "", label: "Тип", desc: losTypeLabel },
        { value: "СВТ", label: "Корпус", desc: "Спиральновитая труба" },
        { value: String(recommended.throughput), label: "Произв.", desc: `${recommended.throughput} л/с` },
      ]
    : [];

  return (
    <section id="calculator" className="mb-10 scroll-mt-8">
      <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">
        Калькулятор подбора ЛОС
      </h2>
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="space-y-6">
          {/* LOS Type */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Тип оборудования</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {losTypeOptions.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setLosType(t.id)}
                  className={`rounded-lg border p-3 cursor-pointer transition-all ${
                    losType === t.id
                      ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
                      : "border-border hover:border-muted-foreground bg-card"
                  }`}
                >
                  <span className="text-sm font-semibold text-foreground">{t.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wastewater type */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Тип сточных вод</span>
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

          {/* Throughput slider */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Производительность: <span className="text-primary">{throughput} л/с</span>
            </label>
            <Slider
              min={2}
              max={90}
              step={1}
              value={[throughput]}
              onValueChange={([v]) => setThroughput(v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2 л/с</span>
              <span>90 л/с</span>
            </div>
          </div>

          {/* Object & site conditions */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-3 block">Объект и условия монтажа</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Тип объекта</Label>
                <Select value={objectType} onValueChange={setObjectType}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Выбрать" /></SelectTrigger>
                  <SelectContent>
                    {objectTypes.map((t) => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Тип грунта</Label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Выбрать" /></SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((t) => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Уровень грунтовых вод</Label>
                <Select value={groundwaterLevel} onValueChange={setGroundwaterLevel}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Выбрать" /></SelectTrigger>
                  <SelectContent>
                    {groundwaterLevels.map((t) => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-2">
              <div className="space-y-1">
                <Label className="text-[11px] text-muted-foreground">Глубина установки, м</Label>
                <Input
                  type="number" min={0} max={20} step={0.1} placeholder="2.5"
                  value={installDepth}
                  onChange={(e) => setInstallDepth(e.target.value)}
                  className="h-8 text-xs max-w-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Pipelines */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-3 block">Параметры трубопроводов</span>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Подводящий трубопровод</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Диаметр, мм</Label>
                    <Input type="number" min={50} max={1000} placeholder="110" value={inletPipeDiam} onChange={(e) => setInletPipeDiam(e.target.value)} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Глубина залож., м</Label>
                    <Input type="number" min={0} max={20} step={0.1} placeholder="1.5" value={inletPipeDepth} onChange={(e) => setInletPipeDepth(e.target.value)} className="h-8 text-xs" />
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Отводящий трубопровод</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Диаметр, мм</Label>
                    <Input type="number" min={50} max={1000} placeholder="110" value={outletPipeDiam} onChange={(e) => setOutletPipeDiam(e.target.value)} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Глубина залож., м</Label>
                    <Input type="number" min={0} max={20} step={0.1} placeholder="1.5" value={outletPipeDepth} onChange={(e) => setOutletPipeDepth(e.target.value)} className="h-8 text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional notes */}
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">Дополнительные требования</span>
            <Textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Особые условия, доп. оборудование, примечания..."
              className="text-xs min-h-[60px]"
              maxLength={500}
            />
          </div>

          {/* Contact */}
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
                <Input type="email" value={contact.email} onChange={(e) => { setContact((p) => ({ ...p, email: e.target.value })); setContactErrors((p) => ({ ...p, email: "" })); }} placeholder="mail@example.com" maxLength={255} className={`h-8 text-xs ${contactErrors.email ? "border-destructive" : ""}`} />
                {contactErrors.email && <span className="text-[10px] text-destructive">{contactErrors.email}</span>}
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
                      Рекомендованная модель: <span className="text-primary">{recommended.name}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {recommended.article} · Ø{recommended.diameter} мм · L {recommended.length} мм
                      · Ø труб {recommended.pipes} мм
                      {recommended.drop ? ` · Перепад ${recommended.drop} мм` : ""}
                      {recommended.sorbent ? ` · Сорбент ${recommended.sorbent} м³` : ""}
                    </p>
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

export default LosCalculator;
