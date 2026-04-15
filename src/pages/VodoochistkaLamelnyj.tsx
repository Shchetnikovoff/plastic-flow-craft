import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { lamelnyjModels } from "@/data/lamelnyjProducts";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Zap, Building2, Wheat, Layers, Warehouse,
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

/* ── static data ── */

const heroImages = [
  { src: "/images/lamelnyj-hero-real.jpg", alt: "Ламельный тонкослойный отстойник" },
  { src: "/images/lamelnyj-otstoynik-render.png", alt: "Ламельный тонкослойный отстойник — рендер RAL 7032" },
  { src: "/images/lamelnyj-otstoynik-3d.png", alt: "Ламельный отстойник 3D-модель" },
];

const whyUs = [
  "Высокая эффективность осаждения взвешенных частиц",
  "Компактность — занимают в 3–5 раз меньше места, чем традиционные отстойники",
  "Непрерывный процесс очистки без остановки на удаление осадка",
  "Устойчивость к коррозии и агрессивным средам",
  "Соответствие СанПиН и нормам сброса в канализацию/водоёмы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка, сервис",
];

const purposeItems = [
  "Механическая очистка бытовых и производственных сточных вод",
  "Подготовка технической и питьевой воды путём осветления",
  "Очистка циркуляционной воды на заводских установках",
  "Отделение взвесей после химической обработки промстоков",
  "Первичная фильтрация дождевых и ливневых стоков",
  "Дополнительная фильтрация воды перед сбросом в водоёмы после биоочистки",
];

const pollutants = [
  "Песок, ил, шлам",
  "Взвешенные частицы органического и минерального происхождения",
  "Гидроксиды металлов после реагентной обработки",
  "Продукты коагуляции и флокуляции",
];

const applicationAreas = [
  { icon: Building2, text: "Коммунальные очистные сооружения" },
  { icon: Factory, text: "Промышленные предприятия (металлургия, машиностроение, нефтехимия)" },
  { icon: Wheat, text: "Пищевые производства" },
  { icon: Warehouse, text: "Животноводческие комплексы" },
  { icon: Zap, text: "Ливневые очистные системы городов и промышленных зон" },
  { icon: Droplets, text: "Станции водоподготовки" },
];

const processSteps = [
  { step: "1", title: "Подготовка воды", desc: "Жидкость поступает в распределительную ёмкость, где скорость потока замедляется для равномерного распределения внутри корпуса." },
  { step: "2", title: "Очистка", desc: "Вода направляется в секцию осаждения, где проходит через ламельные модули (пластины под углом 55–60°)." },
  { step: "3", title: "Осаждение", desc: "Частицы загрязнений оседают на поверхностях ламелей и скатываются вниз под действием силы тяжести." },
  { step: "4", title: "Сбор чистой воды", desc: "Очищенная вода поступает в накопительный жёлоб через зубчатые переливы." },
  { step: "5", title: "Удаление осадка", desc: "Шлам удаляется самотёком или откачивается насосом через дренажные отверстия." },
];

const constructionElements = [
  "Корпус из полимера (ПП, ПВХ) или стали с антикоррозийным покрытием",
  "Приёмный отсек для грязной воды",
  "Секция основного осаждения с ламельными модулями",
  "Отдел сбора очищенной воды",
  "Система дренажа для удаления осадка",
  "Патрубки входа/выхода и дренажные отверстия",
  "Опционально: автоматизированная система управления выгрузкой осадка",
];

const lamellaFeatures = [
  "Создают тонкие слои жидкости, увеличивая площадь осаждения",
  "Наклонное расположение (55–60°) предотвращает застревание частиц",
  "Интервал между модулями обеспечивает быстрое осаждение без перемешивания слоёв",
];

const models = lamelnyjModels;

const cleanupPerformance = [
  { pollutant: "Взвешенные вещества", inlet: "200–1000", outlet: "15–50", efficiency: "90–95" },
  { pollutant: "Нефтепродукты", inlet: "10–50", outlet: "3–10", efficiency: "70–80" },
  { pollutant: "БПКполн", inlet: "100–300", outlet: "40–80", efficiency: "60–70" },
];

const modificationsList = [
  "Горизонтальные — для наземной установки",
  "Вертикальные — при дефиците площади",
  "Модульные — для каскадного использования и больших объёмов",
  "С контактной камерой — для введения реагентов (коагулянтов, флокулянтов)",
];

const optionsList = [
  "Система автоматического удаления осадка",
  "Датчики уровня осадка и сигнализация переполнения",
  "Теплоизоляция корпуса для эксплуатации в холодных помещениях",
  "Система промывки ламельных модулей",
  "Комплект запорной арматуры из коррозионностойких материалов",
  "Интеграция в АСУ ТП предприятия",
  "Усиленные ламели для высокоабразивных сред",
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подбор", text: "Разработаем схему очистки под ваши стоки и требования к качеству воды." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая установка проходит гидравлические испытания и проверку на герметичность." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–30 дней, монтаж — 3–10 дней." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Truck, title: "Документация", text: "Предоставим паспорта изделий, сертификаты соответствия и инструкции по эксплуатации." },
  { icon: FlaskConical, title: "Гибкость", text: "Возможность доработки конструкции в процессе эксплуатации." },
];

/* ── component ── */

const VodoochistkaLamelnyjInner = () => {
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/vodoochistka">Водоочистка</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Ламельный отстойник</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Тонкослойный (ламельный) отстойник для очистки сточных вод
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Ламельный отстойник — экономия площади до 90% по сравнению с традиционными решениями!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {heroImages.map((img, i) => (
              <div key={i} className="rounded-lg border border-border overflow-hidden bg-card">
                <img src={img.src} alt={img.alt} className="w-full object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}

        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "opisanie", label: "Описание" },
            { id: "naznachenie", label: "Назначение" },
            { id: "princip", label: "Принцип работы" },
            { id: "modeli", label: "Модели" },
            { id: "preimushchestva", label: "Преимущества" },
            { id: "cta-form", label: "Заявка" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase border-l-4 border-amber-400 pl-3">
            Тонкослойные (ламельные) отстойники: проектирование и производство под ключ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы изготавливаем ламельные отстойники из химически стойких полимеров (полипропилен, ПВХ, стеклопластик) и коррозионностойких сталей для механической очистки бытовых, промышленных и ливневых стоков.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши ламельные отстойники:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 1: Назначение */}
        <section id="naznachenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Назначение и области применения</h2>

          <h3 className="text-sm font-semibold text-foreground mb-2">Ламельные отстойники предназначены для:</h3>
          <ul className="space-y-1.5 mb-4">
            {purposeItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-2">Основные виды удаляемых загрязнений:</h3>
          <ul className="space-y-1.5 mb-4">
            {pollutants.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Droplets className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-3">Типовые сферы применения:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applicationAreas.map((area, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <area.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{area.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Принцип работы */}
        <section id="princip" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Принцип работы и конструкция</h2>

          <h3 className="text-sm font-semibold text-foreground mb-3">Принцип действия ламельного отстойника:</h3>
          <div className="space-y-3 mb-6">
            {processSteps.map((s) => (
              <div key={s.step} className="flex gap-3 items-start rounded-lg border border-border bg-card p-3">
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Конструкция ламельного отстойника включает:</h3>
          <ul className="space-y-1.5 mb-6">
            {constructionElements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-2">Особенности ламельных модулей:</h3>
          <ul className="space-y-1.5">
            {lamellaFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Layers className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Модельный ряд */}
        <section id="harakteristiki" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Технические характеристики и модельный ряд</h2>

          <h3 className="text-sm font-semibold text-foreground mb-3">Базовые модели ламельных отстойников:</h3>
          <div className="rounded-lg border border-border overflow-auto mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">Произв., м³/ч</TableHead>
                  <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
                  <TableHead className="text-xs text-right">Масса сух./раб., кг</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m, i) => (
                  <TableRow
                    key={m.article}
                    className={`cursor-pointer transition-colors hover:bg-primary/5 ${i % 2 === 1 ? "bg-muted/50" : ""}`}
                    onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}
                  >
                    <TableCell className="text-xs font-medium text-primary underline">{m.article}</TableCell>
                    <TableCell className="text-xs">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.capacity}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                    <TableCell className="text-xs text-right">{m.mass}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Эффективность очистки:</h3>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Показатель</TableHead>
                  <TableHead className="text-xs text-right">На входе, мг/л</TableHead>
                  <TableHead className="text-xs text-right">После очистки, мг/л</TableHead>
                  <TableHead className="text-xs text-right">Эффективность, %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cleanupPerformance.map((r, i) => (
                  <TableRow key={r.pollutant} className={i % 2 === 1 ? "bg-muted/50" : ""}>
                    <TableCell className="text-xs font-medium">{r.pollutant}</TableCell>
                    <TableCell className="text-xs text-right">{r.inlet}</TableCell>
                    <TableCell className="text-xs text-right">{r.outlet}</TableCell>
                    <TableCell className="text-xs text-right">{r.efficiency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Section 4: Модификации и опции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Модификации и опции</h2>

          <h3 className="text-sm font-semibold text-foreground mb-2">Модификации ламельных отстойников:</h3>
          <ul className="space-y-1.5 mb-4">
            {modificationsList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-2">Дополнительные опции:</h3>
          <ul className="space-y-1.5">
            {optionsList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 5: Преимущества сотрудничества */}
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partnershipAdvantages.map((a, i) => (
              <Card key={i} className="border-border">
                <CardContent className="flex items-start gap-3 p-4">
                  <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA form */}
        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-2">Готовы заказать ламельный отстойник?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору модели, подготовит схему очистки и расчёт стоимости в течение 24 часов.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" type="tel" placeholder="+7 900 000-00-00" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" placeholder="ivanov@company.ru" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="description" className="text-xs">Описание задачи (тип стоков, объём, требования)</Label>
                  <Textarea id="description" placeholder="Опишите вашу задачу..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Оставить заявку</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const VodoochistkaLamelnyj = () => (
  <CartProvider>
    <VodoochistkaLamelnyjInner />
  </CartProvider>
);

export default VodoochistkaLamelnyj;
