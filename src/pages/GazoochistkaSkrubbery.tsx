import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Wind, Flame, Droplets, Beaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const whyUs = [
  "Степень очистки газов до 99,99%",
  "Производительность до 100 000 м³/ч",
  "Рабочая температура газов до +400 °C",
  "Химически стойкие материалы: ПП, ПЭ, нержавеющая сталь, титан, фторопласт",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Гарантия 5 лет на все изделия",
];

const chModels = [
  { model: "СН-0.1", flow: "100", dimensions: "1050×1550×3900" },
  { model: "СН-0.5", flow: "500", dimensions: "1050×1550×4000" },
  { model: "СН-1", flow: "1 000", dimensions: "1050×1550×4100" },
  { model: "СН-1.5", flow: "1 500", dimensions: "1050×1650×4200" },
  { model: "СН-2", flow: "2 000", dimensions: "1150×1700×4400" },
  { model: "СН-3", flow: "3 000", dimensions: "1250×1790×4600" },
  { model: "СН-4", flow: "4 000", dimensions: "1350×1900×4700" },
  { model: "СН-5", flow: "5 000", dimensions: "1450×2000×4890" },
  { model: "СН-6", flow: "6 000", dimensions: "1550×2150×5200" },
  { model: "СН-8", flow: "8 000", dimensions: "1680×2300×5400" },
  { model: "СН-10", flow: "10 000", dimensions: "1800×2400×5600" },
  { model: "СН-12", flow: "12 000", dimensions: "2000×2550×5790" },
  { model: "СН-15", flow: "15 000", dimensions: "2150×2850×5910" },
  { model: "СН-20", flow: "20 000", dimensions: "2390×3100×6100" },
  { model: "СН-25", flow: "25 000", dimensions: "2600×3250×6400" },
  { model: "СН-30", flow: "30 000", dimensions: "3000×3600×6700" },
  { model: "СН-40", flow: "40 000", dimensions: "3180×3780×7400" },
];

const ctModels = [
  { model: "СТ-0.5", flow: "500", dimensions: "2250×1050×1550" },
  { model: "СТ-1", flow: "1 000", dimensions: "2250×1050×1550" },
  { model: "СТ-1.5", flow: "1 500", dimensions: "2250×1050×1550" },
  { model: "СТ-2", flow: "2 000", dimensions: "2250×1150×1650" },
  { model: "СТ-2.5", flow: "2 500", dimensions: "2250×1150×1650" },
  { model: "СТ-3", flow: "3 000", dimensions: "2400×1400×1800" },
  { model: "СТ-4", flow: "4 000", dimensions: "2400×1450×1800" },
  { model: "СТ-5", flow: "5 000", dimensions: "2400×1450×1850" },
  { model: "СТ-6", flow: "6 000", dimensions: "2525×1500×1900" },
  { model: "СТ-8", flow: "8 000", dimensions: "2575×1600×1990" },
  { model: "СТ-10", flow: "10 000", dimensions: "2725×1650×2015" },
  { model: "СТ-12", flow: "12 000", dimensions: "2800×1700×2100" },
  { model: "СТ-16", flow: "16 000", dimensions: "2850×1750×2200" },
  { model: "СТ-20", flow: "20 000", dimensions: "2900×1800×2300" },
  { model: "СТ-25", flow: "25 000", dimensions: "3450×2000×2400" },
  { model: "СТ-30", flow: "30 000", dimensions: "3600×2200×2500" },
  { model: "СТ-40", flow: "40 000", dimensions: "3600×2350×2700" },
  { model: "СТ-50", flow: "50 000", dimensions: "3700×2350×2800" },
  { model: "СТ-60", flow: "60 000", dimensions: "3700×2350×3000" },
];

const applications = [
  { icon: Beaker, title: "Гальваническое производство", text: "Очистка паров кислот, щелочей, хромового ангидрида при травлении и нанесении покрытий." },
  { icon: Factory, title: "Металлургия", text: "Удаление пыли, оксидов металлов, кислотных газов из отходящих потоков." },
  { icon: FlaskConical, title: "Химия и нефтехимия", text: "Абсорбция HCl, HF, SO₂, NOx, NH₃, H₂S и других токсичных компонентов." },
  { icon: Wind, title: "ЦБК и полиграфия", text: "Очистка от хлора, диоксида хлора, сероводорода, меркаптанов." },
  { icon: Flame, title: "Лакокрасочная промышленность", text: "Улавливание паров растворителей, аэрозолей красок и лаков." },
  { icon: Droplets, title: "Очистные и пищевая отрасль", text: "Дезодорация, удаление аммиака, сероводорода, органических соединений." },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Расчёт скруббера под конкретный состав газа, температуру, производительность и требуемую степень очистки." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гидравлические испытания каждого изделия. Сварка по ГОСТ, материалы с сертификатами." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 15–30 рабочих дней. Монтаж — 3–7 дней." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, расчёт аэродинамического сопротивления, сертификаты соответствия." },
];

const baseKit = [
  "Абсорбционная колонна (корпус из ПП / ПЭ / нержавеющей стали)",
  "Насадка (кольца Палля, Рашига или седла Intalox)",
  "Бак-сборник орошающей жидкости",
  "Циркуляционный насос",
  "Каплеуловитель (сепаратор капель)",
  "Панель управления",
];

const options = [
  "Газоходы из ПП / ПЭ / нержавеющей стали",
  "Центробежный вентилятор (в химстойком исполнении)",
  "Система дозирования реагентов",
  "Датчики pH, давления, уровня",
  "Теплоизоляция корпуса",
  "Взрывозащищённое электрооборудование",
];

/* ── component ── */

const GazoochistkaSkrubberyInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
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

  const scrollToForm = () => {
    document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const renderTable = (models: typeof chModels) => (
    <div className="rounded-lg border border-border overflow-auto text-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Модель</TableHead>
            <TableHead className="text-xs text-right">Произв., м³/ч</TableHead>
            <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models.map((m, i) => (
            <TableRow key={i} className={i % 2 === 1 ? "bg-muted/30" : ""}>
              <TableCell className="text-xs font-medium">{m.model}</TableCell>
              <TableCell className="text-xs text-right">{m.flow}</TableCell>
              <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/gazoochistka">Газоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Скрубберы</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Промышленные скрубберы
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Газоочистное оборудование для удаления токсичных газов, кислотных паров и аэрозолей из промышленных выбросов. Вертикальные и горизонтальные модели производительностью от 100 до 60 000 м³/ч.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/skrubber-vert-real-1.jpg" alt="Скруббер вертикальный" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">Скруббер вертикальный (серия СН)</p>
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/skrubber-goriz-real-1.jpg" alt="Скруббер горизонтальный" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">Скруббер горизонтальный (серия СТ)</p>
            </div>
          </div>
        </section>

        {/* Intro */}

        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "opisanie", label: "Описание" },
            { id: "primenenie", label: "Применение" },
            { id: "modeli", label: "Модели" },
            { id: "preimushchestva", label: "Преимущества" },
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

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Эффективная очистка промышленных газов
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Скрубберы — насадочные абсорберы мокрого типа для очистки газовоздушных выбросов от химически активных газов, аэрозолей, паров кислот и щелочей. Принцип действия: загрязнённый газ проходит через слой насадки (кольца Палля, Рашига, седла Intalox), орошаемой абсорбентом. Происходит абсорбция и хемосорбция вредных компонентов. Каплеуловитель предотвращает унос капель в атмосферу.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши скрубберы:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Product tabs */}
        <section id="modeli" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>

          <Tabs defaultValue="vertical" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="vertical" className="text-xs sm:text-sm">Вертикальные (серия СН)</TabsTrigger>
              <TabsTrigger value="horizontal" className="text-xs sm:text-sm">Горизонтальные (серия СТ)</TabsTrigger>
            </TabsList>

            {/* Vertical CH tab */}
            <TabsContent value="vertical">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <img src="/images/skrubber-vert-real-2.jpg" alt="Скруббер вертикальный" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Скруббер вертикальный со стационарной насадкой (серия СН)</h3>
                  <p className="text-xs text-muted-foreground">
                    Насадочный абсорбер с неподвижным слоем для очистки от химически активных газов, аэрозолей и туманов. Производительность от 100 до 40 000 м³/ч. Применяется в гальванике, металлургии, химической и нефтехимической промышленности.
                  </p>
                </div>
              </div>
              {renderTable(chModels)}
            </TabsContent>

            {/* Horizontal CT tab */}
            <TabsContent value="horizontal">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <img src="/images/skrubber-goriz-real-3.png" alt="Скруббер горизонтальный" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Скруббер горизонтальный (серия СТ)</h3>
                  <p className="text-xs text-muted-foreground">
                    Компактный горизонтальный абсорбер для объектов с ограниченной высотой помещения (до 3 м). Производительность от 500 до 60 000 м³/ч. Оптимален для встраивания в существующие системы вентиляции.
                  </p>
                </div>
              </div>
              {renderTable(ctModels)}
            </TabsContent>
          </Tabs>
        </section>

        {/* Vertical scrubber table */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">
            Типоразмерный ряд вертикальных скрубберов
          </h2>
          {renderTable(chModels)}
        </section>

        {/* Horizontal scrubber table */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">
            Типоразмерный ряд горизонтальных скрубберов
          </h2>
          {renderTable(ctModels)}
        </section>

        {/* Applications */}
        <section id="primenenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {applications.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Kit */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Комплектация</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Базовая комплектация</h3>
              <ul className="space-y-2">
                {baseKit.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Дополнительные опции</h3>
              <ul className="space-y-2">
                {options.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partnershipAdvantages.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA form */}
        <section id="cta-form" className="mb-10 scroll-mt-24">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-1 tracking-wide uppercase">Запросить расчёт</h2>
              <p className="text-xs text-muted-foreground mb-4">Заполните форму — мы подберём скруббер под ваши параметры и подготовим коммерческое предложение.</p>
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
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Состав газа, производительность, температура, требуемая степень очистки…" rows={4} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const GazoochistkaSkrubbery = () => (
  <CartProvider>
    <GazoochistkaSkrubberyInner />
  </CartProvider>
);

export default GazoochistkaSkrubbery;
