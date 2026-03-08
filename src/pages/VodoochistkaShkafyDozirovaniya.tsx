import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Zap, Gauge, Cpu, Monitor,
  Shield, Cable, CircuitBoard, Waves, Droplets, Flame,
  LayoutList, Thermometer, Lock,
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
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const heroImages = [
  "/images/shkaf-dozirovochnyj-1.jpg",
  "/images/shkaf-dozirovochnyj-2.jpg",
  "/images/shkaf-dozirovochnyj-3.jpg",
  "/images/shkaf-dozirovochnyj-4.jpg",
];

const whyUs = [
  "Точное дозирование — пропорциональное, аналоговое и постоянное управление",
  "Степень защиты IP65 и выше — безопасность в агрессивных средах",
  "Химически стойкие корпуса (полиэстер/стекловолокно, AISI 316L)",
  "Интеграция в АСУ ТП — SCADA, удалённый мониторинг, архивирование",
  "Взрывозащищённое исполнение для опасных зон",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
];

const components = [
  { icon: Gauge, text: "Дозировочные насосы (мембранные, плунжерные, перистальтические) — подача реагента в требуемом объёме" },
  { icon: Cpu, text: "Программируемые логические контроллеры (ПЛК) — управление насосами и алгоритмами дозирования" },
  { icon: Thermometer, text: "Датчики — уровень реагента, давление, температура, pH, электропроводность" },
  { icon: Monitor, text: "Панель управления (HMI) — настройка параметров, мониторинг и аварийная сигнализация" },
  { icon: Shield, text: "Защитные устройства — автоматы, УЗО, реле перегрузки для электрооборудования" },
  { icon: CircuitBoard, text: "Гальванические изоляторы — предотвращение наводок на датчики химического анализа" },
  { icon: Cable, text: "Клеммные колодки — подключение внешних устройств" },
  { icon: Lock, text: "Кабельные вводы из PVDF, полиамида — устойчивость к конкретному реагенту" },
];

const functions = [
  { step: "1", title: "Пропорциональное дозирование", desc: "По импульсам от расходомера — расход реагента пропорционален объёму обрабатываемой воды." },
  { step: "2", title: "Аналоговое управление", desc: "По сигналам с датчиков (pH-метр, кондуктометр) — поддержание заданных параметров среды." },
  { step: "3", title: "Постоянное дозирование", desc: "С заданной частотой ходов насоса — для стабильных процессов с известным расходом." },
  { step: "4", title: "Контроль уровня", desc: "Мониторинг уровня реагента в ёмкостях, предотвращение «сухого хода» насоса." },
  { step: "5", title: "Защита от протечек", desc: "По сигналу датчика разрыва мембраны — автоматическая остановка и аварийное оповещение." },
  { step: "6", title: "Блокировка дозирования", desc: "При отсутствии основного потока (по датчику протока или реле давления)." },
  { step: "7", title: "Управление мешалками", desc: "Автоматическое включение перемешивания при приготовлении растворов." },
  { step: "8", title: "Архивирование данных", desc: "Протоколирование расхода реагента, дистанционный контроль через SCADA." },
];

const cabinetTypes = [
  {
    q: "ШУ БДР — шкаф управления блоком дозирования реагента",
    a: "Обеспечивает управление технологическими процессами дозирования, автоматическое поддержание параметров в заданных пределах. Включает ПЛК, HMI-панель, защитную автоматику.",
  },
  {
    q: "ШУ УДР — шкаф управления установкой дозирования реагента",
    a: "Ориентирован на работу с малыми расходами и агрессивными средами. Включает логику управления насосами-дозаторами с контролем уровня и защитой от сухого хода.",
  },
  {
    q: "КРХ — типовой шкаф автоматики для реагентного хозяйства",
    a: "Комплексное решение с дополнительными опциями: рама, расходный бак из нержавеющей стали, дозатор сухого вещества, автоматика, датчики pH и другие КИП.",
  },
  {
    q: "БДР — блок дозирования реагентов",
    a: "Блочное решение, включающее не только шкаф управления, но и технологическое оборудование: ёмкости для реагентов, насосы, систему вентиляции и освещения.",
  },
];

const constructionFeatures = [
  { title: "Химстойкий корпус", desc: "Полиэстер, армированный стекловолокном, или нержавеющая сталь AISI 316L" },
  { title: "Степень защиты IP65+", desc: "Надёжная защита электрооборудования от пыли, влаги и агрессивных паров" },
  { title: "Кабельные вводы PVDF", desc: "Устойчивость к конкретному реагенту — PVDF, полиамид и другие полимеры" },
  { title: "Взрывозащита", desc: "Исполнение для взрывоопасных зон при работе с горючими реагентами" },
  { title: "Маркировка элементов", desc: "Термоусадочные трубки и ламинированные маркеры вместо обычных наклеек" },
];

const applications = [
  { icon: Droplets, text: "Очистные сооружения — коагуляция, флокуляция, коррекция pH" },
  { icon: Waves, text: "Питьевое водоснабжение — стабилизация состава воды" },
  { icon: Zap, text: "Энергетика — подготовка воды для котлов и технологических контуров" },
  { icon: Factory, text: "Металлургия, гальваника — нейтрализация стоков, осаждение тяжёлых металлов" },
  { icon: FlaskConical, text: "Пищевая промышленность — мойка, дезинфекция, поддержание параметров воды" },
  { icon: Waves, text: "Бассейны и аквапарки — дозировка хлора, pH-корректоров" },
  { icon: Flame, text: "Нефтегазовая отрасль — дозирование ингибиторов коррозии, деэмульгаторов" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Разработка шкафа под ваше техническое задание и тип реагента." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Заводские испытания каждого шкафа перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления 20–40 рабочих дней, пусконаладка 1–3 дня." },
  { icon: Wrench, title: "Сервис", text: "Гарантийное и постгарантийное обслуживание, поставка запчастей." },
  { icon: Truck, title: "Доставка", text: "По всей России, помощь с логистикой и монтажом на объекте." },
  { icon: FlaskConical, title: "Интеграция", text: "Подключение к существующим АСУ ТП, SCADA, системам телеметрии." },
];

/* ── component ── */

const VodoochistkaShkafyDozirovaniyaInner = () => {
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
            <BreadcrumbItem><BreadcrumbPage>Шкафы и стойки дозировочные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Шкафы и стойки дозировочные для реагентных хозяйств
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Специализированные системы автоматизации для точного дозирования химических реагентов в процессах водоподготовки, очистки сточных вод и химической обработки.
          </p>

          <Button onClick={scrollToForm} className="gap-2">
            Получить коммерческое предложение
          </Button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {heroImages.map((src, i) => (
              <img key={i} src={src} alt={`Шкаф дозировочный ${i + 1}`} className="w-full aspect-[4/3] object-cover rounded-lg border border-border" />
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Дозировочные шкафы: производство под ключ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы проектируем и изготавливаем шкафы и стойки управления дозированием реагентов для водоподготовки, очистки сточных вод, гальванического производства и других промышленных задач. Обеспечиваем контроль, управление и безопасность процессов приготовления и подачи реагентов.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 1: Основные компоненты */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Основные компоненты</h2>
          <div className="space-y-2">
            {components.map((c, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <c.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{c.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Функции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Функции шкафов управления</h2>
          <div className="space-y-3">
            {functions.map((s) => (
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
        </section>

        {/* Section 3: Типы шкафов */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типы шкафов и стоек</h2>
          <Accordion type="single" collapsible className="w-full">
            {cabinetTypes.map((item, i) => (
              <AccordionItem key={i} value={`type-${i}`}>
                <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Section 4: Особенности конструкции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Особенности конструкции</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {constructionFeatures.map((f, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Области применения */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{a.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Преимущества сотрудничества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
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
              <h2 className="text-base font-bold text-foreground mb-2">Готовы заказать дозировочный шкаф?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Оставьте заявку — мы подберём оптимальное решение под ваши задачи и подготовим коммерческое предложение.
              </p>
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="description" className="text-xs">Описание задачи</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип реагента, требуемая производительность, условия эксплуатации…" rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

const VodoochistkaShkafyDozirovaniya = () => (
  <CartProvider>
    <VodoochistkaShkafyDozirovaniyaInner />
  </CartProvider>
);

export default VodoochistkaShkafyDozirovaniya;
