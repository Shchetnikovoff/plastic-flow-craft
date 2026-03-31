import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { DescriptionBlock, AdvantagesGrid, SpecTable, FAQSection, DarkInfoBlock } from "@/components/corporate/sections";
import {
  Settings, ShieldCheck, Clock, Wrench, Truck, FlaskConical,
  Wind, Droplets, Package, Gauge, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

/* ── static data ── */

const whyUs = [
  "Эффективность улавливания капель — 99,9%",
  "Скорость воздуха в рабочем сечении — 2,5–3 м/с",
  "Полимерные материалы — полная коррозиестойкость",
  "Работа в агрессивных средах (кислоты, щёлочи)",
  "Круглое и прямоугольное сечение",
  "Производство в России (Санкт-Петербург)",
];

const applications = [
  {
    icon: Wind,
    title: "Общеобменная вентиляция",
    text: "Удаление избыточной влаги из приточного воздуха, защита оборудования и воздуховодов от конденсата.",
  },
  {
    icon: FlaskConical,
    title: "Местная вентиляция",
    text: "Установка после скрубберов, абсорберов, гальванических линий — улавливание капель химически агрессивных растворов.",
  },
];

const advantages = [
  { icon: Package, title: "Лёгкость конструкции", text: "Полимерный корпус значительно легче металлических аналогов." },
  { icon: Wrench, title: "Простота монтажа", text: "Быстрая установка в существующую систему вентиляции." },
  { icon: ShieldCheck, title: "Отсутствие коррозии", text: "Полипропилен не подвержен коррозии даже при контакте с агрессивными средами." },
  { icon: Layers, title: "Ревизия и замена ламелей", text: "Блок ламелей легко извлекается для осмотра, промывки или замены." },
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовление под заказ от 1 штуки, любые монтажные исполнения." },
  { icon: Gauge, title: "Низкое сопротивление", text: "Аэродинамическое сопротивление 50–300 Па в зависимости от расхода." },
];

const ku1Data = [
  { size: "300", flow: "300", D: "125–250", A: "672–532", B: "308", V: "299", mass: "6" },
  { size: "500", flow: "500", D: "125–250", A: "732–532", B: "308", V: "402", mass: "7" },
  { size: "1000", flow: "1 000", D: "160–315", A: "816–576", B: "308", V: "504", mass: "8" },
  { size: "1500", flow: "1 500", D: "200–400", A: "930–650", B: "380", V: "608", mass: "12" },
  { size: "2000", flow: "2 000", D: "250–400", A: "930–690", B: "380", V: "708", mass: "14" },
  { size: "3000", flow: "3 000", D: "250–500", A: "1110–770", B: "455", V: "812", mass: "18" },
  { size: "4000", flow: "4 000", D: "315–500", A: "1110–810", B: "455", V: "912", mass: "22" },
  { size: "5000", flow: "5 000", D: "315–630", A: "1260–870", B: "530", V: "1014", mass: "28" },
  { size: "7500", flow: "7 500", D: "400–630", A: "1260–950", B: "530", V: "1216", mass: "35" },
  { size: "10000", flow: "10 000", D: "400–800", A: "1500–1050", B: "605", V: "1418", mass: "45" },
  { size: "15000", flow: "15 000", D: "500–1000", A: "1740–1210", B: "680", V: "1622", mass: "62" },
  { size: "20000", flow: "20 000", D: "630–1000", A: "1740–1290", B: "680", V: "1926", mass: "80" },
  { size: "25000", flow: "25 000", D: "630–1250", A: "2040–1410", B: "780", V: "2128", mass: "100" },
  { size: "27500", flow: "27 500", D: "800–1250", A: "2040–1490", B: "780", V: "2330", mass: "115" },
];

const ku1ProductData = [
  { model: "КУ.1-300", flow: "250-300", mass: "6" },
  { model: "КУ.1-500", flow: "250-500", mass: "7" },
  { model: "КУ.1-900", flow: "400-900", mass: "9" },
  { model: "КУ.1-1400", flow: "200-1400", mass: "12" },
  { model: "КУ.1-2200", flow: "250-2200", mass: "16" },
  { model: "КУ.1-3400", flow: "315-3400", mass: "19" },
  { model: "КУ.1-5500", flow: "400-5500", mass: "29" },
  { model: "КУ.1-6900", flow: "450-6900", mass: "35" },
  { model: "КУ.1-8500", flow: "500-8500", mass: "42" },
  { model: "КУ.1-10700", flow: "560-10700", mass: "45" },
  { model: "КУ.1-13500", flow: "630-13500", mass: "50" },
  { model: "КУ.1-17000", flow: "710-17000", mass: "59" },
  { model: "КУ.1-22000", flow: "800-22000", mass: "74" },
  { model: "КУ.1-27500", flow: "900-27500", mass: "92" },
];

const ku6Data = [
  { size: "125", flow: "125", D: "100–125", A: "530", B: "150", V: "174", mass: "1,5" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Расчёт каплеуловителя под конкретные параметры системы вентиляции." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Испытания каждого изделия. Сварка по ГОСТ, материалы с сертификатами." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 10–25 рабочих дней. Монтаж — 1–3 дня." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, сертификаты соответствия." },
];

const stats = [
  { value: "Скрубберы / ФВГ", label: "типы оборудования" },
  { value: "PP / PVC", label: "материалы" },
  { value: "от 14 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqItems = [
  { q: "Какие типы газоочистного оборудования?", a: "Скрубберы (вертикальные и горизонтальные), фильтры ФВГ, каплеуловители." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и ПВХ (PVC) — стойкие к агрессивным газам и парам." },
  { q: "Какая производительность?", a: "От 500 до 100 000 м³/ч в зависимости от модели." },
  { q: "Сроки изготовления?", a: "14–30 рабочих дней." },
  { q: "Выполняете монтаж?", a: "Да, шеф-монтаж и пусконаладка включены." },
];

/* ── component ── */

const GazoochistkaKapleuloviteli = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните обязательные поля (имя, телефон)");
      return;
    }
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  const renderSizeTable = (
    data: typeof ku1Data,
    caption: string,
  ) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-2">{caption}</h3>
      <div className="rounded-lg border border-border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Типоразмер</TableHead>
              <TableHead className="text-xs text-right">Расход, м³/ч</TableHead>
              <TableHead className="text-xs text-right">Д, мм</TableHead>
              <TableHead className="text-xs text-right">А, мм</TableHead>
              <TableHead className="text-xs text-right">Б, мм</TableHead>
              <TableHead className="text-xs text-right">В, мм</TableHead>
              <TableHead className="text-xs text-right">Масса, кг</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-medium">КУ-{r.size}</TableCell>
                <TableCell className="text-xs text-right">{r.flow}</TableCell>
                <TableCell className="text-xs text-right">{r.D}</TableCell>
                <TableCell className="text-xs text-right">{r.A}</TableCell>
                <TableCell className="text-xs text-right">{r.B}</TableCell>
                <TableCell className="text-xs text-right">{r.V}</TableCell>
                <TableCell className="text-xs text-right">{r.mass}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <CorporatePageShell
      title="Каплеуловители из полипропилена"
      subtitle="Удаление капельной влаги и аэрозолей из вентиляционных потоков. Эффективность улавливания — 99,9%. Круглое и прямоугольное сечение, производительность от 125 до 27 500 м³/ч."
      heroImage="/images/gazoochistka-hero-1.png"
      heroImageAlt="Каплеуловитель круглого сечения"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Газоочистка", href: "/catalog/gazoochistka" },
        { label: "Каплеуловители" },
      ]}
      stats={stats}
    >
      <DescriptionBlock
        id="opisanie"
        title="Почему выбирают наши каплеуловители"
        features={whyUs}
        applicationsTitle="Область применения"
        applications={applications}
      />

      <DarkInfoBlock id="princip" title="Принцип работы">
        <p>
          Загрязнённый воздушный поток проходит через блок ламелей — тонких пластин, деформированных в двух плоскостях. При изменении направления движения воздуха возникают центробежные силы, под действием которых капли жидкости осаждаются на ребристой поверхности ламелей.
        </p>
        <p>
          Осаждённая жидкость стекает вниз по каналам ламелей и отводится через дренажный патрубок. Очищенный воздух выходит через выходной патрубок каплеуловителя.
        </p>
      </DarkInfoBlock>

      <AdvantagesGrid
        title="Устройство и преимущества"
        items={advantages}
      />

      <DarkInfoBlock title="Как подобрать каплеуловитель">
        <p>
          Подбор осуществляется по расходу воздуха — выбирается ближайший типоразмер в меньшую сторону. Для прямоугольного сечения воздуховода изготавливаются переходные камеры под имеющиеся размеры заказчика.
        </p>
        <p>
          Также доступны поворотные и несоосные камеры для нестандартных условий монтажа.
        </p>
      </DarkInfoBlock>

      {/* Size tables */}
      <section id="modeli" className="mb-10">
        <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>
        {renderSizeTable(ku1Data, "Серия КУ.1 — стандартная")}
        {renderSizeTable(ku6Data, "Серия КУ.6 — компактная")}
        <p className="text-xs text-muted-foreground mt-2">
          Аэродинамическое сопротивление: 50–300 Па в зависимости от расхода. Для прямоугольного сечения — переходные камеры под размер заказчика.
        </p>
      </section>

      <AdvantagesGrid
        id="preimushchestva"
        title="Преимущества сотрудничества"
        items={partnershipAdvantages}
      />

      <SpecTable
        title="Типоразмерный ряд каплеуловителей КУ.1"
        columns={[
          { key: "model", label: "Модель" },
          { key: "flow", label: "Расход воздуха, м³/ч", align: "right" },
          { key: "mass", label: "Масса, кг", align: "right" },
        ]}
        rows={ku1ProductData}
        striped
      />

      <FAQSection items={faqItems} />

      {/* CTA form */}
      <section id="cta-form" className="mb-10 scroll-mt-24">
        <Card className="border-border">
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-1 tracking-wide uppercase">Запросить расчёт</h2>
            <p className="text-xs text-muted-foreground mb-4">Заполните форму — мы подберём каплеуловитель под ваши параметры и подготовим коммерческое предложение.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Имя *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Петров" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email" className="text-xs">E-mail</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@company.ru" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description" className="text-xs">Описание задачи</Label>
                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Расход воздуха, тип среды, размеры воздуховода…" rows={4} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </CorporatePageShell>
  );
};

export default GazoochistkaKapleuloviteli;
