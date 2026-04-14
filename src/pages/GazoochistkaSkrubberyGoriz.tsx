import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Wind, Flame, Droplets, Beaker,
  Gauge, Thermometer, Zap, ArrowRight,
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
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import { scrubberHorizProducts } from "@/data/scrubberHorizProducts";

/* ── static data ── */

const keySpecs = [
  { icon: Gauge, label: "Производительность", value: "до 60 000 м³/ч" },
  { icon: Thermometer, label: "Температура газов", value: "+5…+80 °C (до +400 °C)" },
  { icon: Zap, label: "Степень очистки", value: "до 99,9 %" },
  { icon: ArrowRight, label: "Сопротивление", value: "до 750 Па" },
];

const whyUs = [
  "Компактные габариты — минимальная высота размещения от 1 550 мм",
  "Движение газа параллельно основанию — не требует высоких помещений",
  "Производительность от 500 до 60 000 м³/ч",
  "Рабочая температура газов до +400 °C (с теплоизоляцией)",
  "Степень очистки до 99,9 % при правильном подборе насадки и реагента",
  "Химически стойкие материалы: ПП, ПЭ, нержавеющая сталь, титан, фторопласт",
  "Гарантия 5 лет на все изделия",
];

const applications = [
  { icon: Beaker, title: "Гальваническое производство", text: "Очистка паров кислот, щелочей, хромового ангидрида при травлении, обезжиривании и нанесении покрытий." },
  { icon: Factory, title: "Металлургия и машиностроение", text: "Удаление пыли, оксидов металлов, кислотных газов из отходящих потоков плавильных и термических печей." },
  { icon: FlaskConical, title: "Химия и нефтехимия", text: "Абсорбция HCl, HF, SO₂, NOx, NH₃, H₂S, Cl₂ и других токсичных компонентов." },
  { icon: Wind, title: "ЦБК и полиграфия", text: "Очистка от хлора, диоксида хлора, сероводорода, меркаптанов при отбеливании и варке целлюлозы." },
  { icon: Flame, title: "Лакокрасочная и микроэлектроника", text: "Улавливание паров растворителей, аэрозолей красок и лаков, кислотных паров травления." },
  { icon: Droplets, title: "Пищевая и энергетическая отрасль", text: "Дезодорация, удаление аммиака, сероводорода, органических соединений, очистка дымовых газов." },
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
  "Горизонтальная абсорбционная камера (корпус из ПП / ПЭ / нержавеющей стали)",
  "Насадочный слой (кольца Палля, Рашига, седла Intalox, блочная насадка)",
  "Бак-сборник орошающей жидкости с поддоном",
  "Циркуляционный насос (химстойкое исполнение)",
  "Каплеуловитель (демистер / сепаратор капель)",
  "Система орошения с форсунками",
  "Панель управления",
];

const options = [
  "Газоходы из ПП / ПЭ / нержавеющей стали",
  "Центробежный вентилятор в химстойком исполнении",
  "Система дозирования реагентов (автоматическая)",
  "Датчики pH, давления, уровня, температуры",
  "Теплоизоляция корпуса (для высокотемпературных газов)",
  "Взрывозащищённое электрооборудование",
  "Второй ряд форсунок для повышения степени очистки",
];

const constructionMaterials = [
  { name: "Полипропилен (ПП)", desc: "Основной материал, стоек к большинству кислот и щелочей. Температура до +100 °C." },
  { name: "Полиэтилен (ПЭ 100)", desc: "Повышенная ударная вязкость, морозостойкость до –60 °C." },
  { name: "Нержавеющая сталь", desc: "AISI 304/316. Высокая прочность, температура до +400 °C." },
  { name: "Титан", desc: "Исключительная коррозионная стойкость к хлорсодержащим средам." },
  { name: "Фторопласт (PVDF)", desc: "Стойкость к агрессивным кислотам (HF, H₂SO₄ конц.), температура до +150 °C." },
  { name: "Стеклопластик (СПЛ)", desc: "Лёгкий и прочный, стоек к широкому спектру сред." },
];

/* ── component ── */

const GazoochistkaSkrubberyGorizInner = () => {
  const navigate = useNavigate();
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
            <BreadcrumbItem><BreadcrumbPage>Скрубберы горизонтальные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Скрубберы горизонтальные промышленные (серия СГ)
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Горизонтальные насадочные абсорберы мокрого типа для очистки газовоздушных выбросов от химически активных газов, аэрозолей и паров кислот.
            Компактная конструкция с горизонтальным расположением корпуса — оптимальное решение для помещений с ограниченной высотой потолков.
            Производительность от 500 до 60 000 м³/ч. Степень очистки до 99,9 %.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="mt-6 rounded-lg border border-border overflow-hidden bg-card max-w-md mx-auto">
            <img src="/images/skrubber-goriz-render-clean-v2.png" alt="Скруббер горизонтальный промышленный" className="w-full object-contain" />
            <p className="text-xs text-muted-foreground p-2 text-center">Скруббер горизонтальный промышленный (серия СГ)</p>
          </div>
        </section>

        {/* Key specs */}
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {keySpecs.map((s, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-3 text-center">
                  <s.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
                  <p className="text-sm font-semibold text-foreground">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Anchor nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "modeli", label: "Модели" },
            { id: "opisanie", label: "Описание" },
            { id: "konstruktsiya", label: "Конструкция" },
            { id: "primenenie", label: "Применение" },
            { id: "materialy", label: "Материалы" },
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

        {/* Models table */}
        <section id="modeli" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд (19 моделей)</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <img src="/images/skrubber-goriz-render-clean-v2.png" alt="Скруббер горизонтальный" className="w-full sm:w-48 object-contain rounded-lg border border-border" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Скруббер горизонтальный с насадочным слоем (серия СГ)</h3>
              <p className="text-xs text-muted-foreground">
                Горизонтальный абсорбер с неподвижным слоем насадки для очистки от химически активных газов, аэрозолей и туманов.
                Движение загрязнённого газа — параллельно основанию, что позволяет размещать оборудование в помещениях с высотой потолков от 3 м.
                Производительность от 500 до 60 000 м³/ч.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border overflow-auto text-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">Произв., м³/ч</TableHead>
                  <TableHead className="text-xs text-right">D, мм</TableHead>
                  <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scrubberHorizProducts.map((m, i) => (
                  <TableRow
                    key={m.article}
                    className={`cursor-pointer transition-colors hover:bg-accent/50 ${i % 2 === 1 ? "bg-muted/30" : ""}`}
                    onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}
                  >
                    <TableCell className="text-xs font-mono text-primary">{m.article}</TableCell>
                    <TableCell className="text-xs font-medium">{m.model}</TableCell>
                    <TableCell className="text-xs text-right">{m.flowFormatted}</TableCell>
                    <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Description */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Компактная очистка промышленных газов
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Горизонтальные скрубберы серии СГ — насадочные абсорберы мокрого типа с горизонтальным расположением корпуса.
            Загрязнённый газ поступает через входной патрубок и движется параллельно основанию через слой насадки,
            орошаемой химическим реагентом. Вредные вещества поглощаются жидкостью, а очищенный воздух проходит через
            каплеуловитель и выбрасывается в атмосферу. Основное преимущество — минимальная высота установки (от 1 550 мм),
            что позволяет эксплуатировать скруббер в помещениях с низкими потолками и на эстакадах.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Преимущества горизонтальных скрубберов:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Construction */}
        <section id="konstruktsiya" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Конструктивные особенности</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Корпус скруббера — горизонтальный цилиндр или прямоугольное сечение, внутри которого размещён слой насадки.
                Газ входит с одной стороны и проходит через орошаемую насадку, контактируя с реагентом.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Основные обозначения на чертеже:
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>D</strong> — диаметр входного/выходного патрубка</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>h</strong> — высота корпуса</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>a</strong> — длина корпуса (по оси газового потока)</span></li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>b</strong> — ширина корпуса</span></li>
              </ul>
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/skrubber-goriz-chertezh.webp" alt="Чертёж горизонтального скруббера с размерами D, h, a, b" className="w-full object-contain" />
              <p className="text-xs text-muted-foreground p-2 text-center">Габаритный чертёж горизонтального скруббера (серия СГ)</p>
            </div>
          </div>
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

        {/* Materials */}
        <section id="materialy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Конструкционные материалы</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {constructionMaterials.map((m, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground mb-1">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
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
              <p className="text-xs text-muted-foreground mb-4">Заполните форму — мы подберём горизонтальный скруббер под ваши параметры и подготовим коммерческое предложение.</p>
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

const GazoochistkaSkrubberyGoriz = () => (
  <CartProvider>
    <GazoochistkaSkrubberyGorizInner />
  </CartProvider>
);

export default GazoochistkaSkrubberyGoriz;
