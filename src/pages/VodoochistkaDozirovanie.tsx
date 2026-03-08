import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Zap, Beaker, Waves, Pipette, Gauge,
  Thermometer, LayoutList,
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
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

/* ── static data ── */

const whyUs = [
  "Трёхкамерная система непрерывного действия — стабильная концентрация раствора",
  "Автоматический и ручной режимы работы",
  "Работа с порошковыми и жидкими полимерами",
  "Производительность до 10 000 л/ч",
  "Панель управления с дисплеем и контролем уровня",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
];

const purposeItems = [
  { icon: Droplets, text: "Очистка сточных вод (хозбытовых, промышленных)" },
  { icon: Waves, text: "Подготовка питьевой воды" },
  { icon: Factory, text: "Гальваническое производство" },
  { icon: Beaker, text: "Приготовление солевых растворов" },
  { icon: Pipette, text: "Бумажное и целлюлозное производство" },
  { icon: Zap, text: "Нефтехимическая и горнодобывающая промышленность" },
  { icon: FlaskConical, text: "Пищевая промышленность" },
  { icon: Gauge, text: "Ливневые очистные сооружения" },
  { icon: Thermometer, text: "Теплоэнергетика и ЖКХ" },
];

const processSteps = [
  { step: "1", title: "Камера смешения", desc: "Сухой или жидкий реагент подаётся в первую камеру, где происходит интенсивное перемешивание с водой и начальное растворение." },
  { step: "2", title: "Камера созревания", desc: "Во второй камере раствор выдерживается при умеренном перемешивании для полного набухания полимерных цепочек и достижения рабочей вязкости." },
  { step: "3", title: "Камера дозирования", desc: "Готовый раствор заданной концентрации (0,1–0,5%) поступает из третьей камеры на дозирующий насос для подачи в точку ввода." },
];

const constructionElements = [
  "Бункер для сухого реагента с шнековым дозатором",
  "Воронка смешения с эжектором",
  "Камера интенсивного перемешивания (мотор-редуктор)",
  "Камера созревания с мешалкой",
  "Камера готового раствора с датчиком уровня",
  "Дозирующий насос (мембранный или перистальтический)",
  "Панель управления с ЖК-дисплеем",
  "Датчики уровня в каждой камере",
  "Клапан подачи воды с расходомером",
  "Дренажная система для промывки",
  "Корпус из полипропилена / нержавеющей стали",
];

const models = [
  { name: "EASYPURE 500", capacity: "500", dimensions: "1700×1200×1540" },
  { name: "EASYPURE 1000", capacity: "1 000", dimensions: "2000×1350×1540" },
  { name: "EASYPURE 2000", capacity: "2 000", dimensions: "2300×1450×1940" },
  { name: "EASYPURE 3000", capacity: "3 000", dimensions: "2700×1600×1940" },
  { name: "EASYPURE 4000", capacity: "4 000", dimensions: "3200×1750×1940" },
  { name: "EASYPURE 5000", capacity: "5 000", dimensions: "3300×1850×1940" },
  { name: "EASYPURE 6000", capacity: "6 000", dimensions: "3500×1850×2140" },
  { name: "EASYPURE 10000", capacity: "10 000", dimensions: "3900×1850×2140" },
];

const commonSpecs = [
  { label: "Давление", value: "2–6 бар" },
  { label: "Время выдержки", value: "60 мин" },
  { label: "Концентрация раствора", value: "0,1–0,5%" },
  { label: "Степень защиты", value: "IP54" },
  { label: "Температура эксплуатации", value: "+5…+40 °C" },
  { label: "Макс. вязкость", value: "2 500 мПа·с" },
];

const modificationItems = [
  {
    q: "Подача сухого реагента",
    a: "Шнековый или вибрационный дозатор с бункером объёмом от 25 до 200 л. Автоматическая подача порошка по заданному расходу.",
  },
  {
    q: "Подача жидкого реагента",
    a: "Перистальтический или мембранный насос-дозатор для эмульсий и концентратов. Прямой забор из канистры или IBC-контейнера.",
  },
  {
    q: "Дополнительное перемешивание",
    a: "Третья камера может оснащаться мешалкой для поддержания однородности раствора при длительном хранении.",
  },
  {
    q: "Автоматика и телеметрия",
    a: "Интеграция с SCADA/АСУ ТП, удалённый мониторинг, аварийная сигнализация, протоколирование расхода реагента.",
  },
  {
    q: "Исполнение корпуса",
    a: "Полипропилен (стандарт), нержавеющая сталь AISI 304/316 или комбинированное исполнение для агрессивных сред.",
  },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подбор", text: "Подберём модель и комплектацию под ваш тип реагента и производительность." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая станция проходит заводские испытания перед отгрузкой." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 15–30 дней, пусконаладка — 1–3 дня." },
  { icon: Wrench, title: "Сервис", text: "Гарантийное и постгарантийное обслуживание, поставка расходных материалов." },
  { icon: Truck, title: "Доставка", text: "Доставка по всей России, помощь с логистикой и монтажом." },
  { icon: FlaskConical, title: "Гибкость", text: "Нестандартные модификации, интеграция в существующие системы водоочистки." },
];

/* ── component ── */

const VodoochistkaDozirovanieInner = () => {
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
            <BreadcrumbItem><BreadcrumbPage>Станция дозирования</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Станция дозирования реагентов
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Автоматическое приготовление и дозирование коагулянтов, флокулянтов и полиэлектролитов для систем водоочистки.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <img src="/images/dozirovanie-hero-1.png" alt="Станция дозирования — общий вид" className="rounded-lg border border-border object-cover w-full aspect-[4/3]" />
            <img src="/images/dozirovanie-hero-2.png" alt="Дозирующие насосы" className="rounded-lg border border-border object-cover w-full aspect-[4/3]" />
          </div>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Станции дозирования: производство под ключ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы проектируем и изготавливаем станции приготовления и дозирования реагентов на базе трёхкамерной системы непрерывного действия. Станции обеспечивают автоматическое растворение порошковых и жидких полимеров (коагулянтов, флокулянтов, полиэлектролитов) с точным дозированием готового раствора в точку ввода.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши станции:</h3>
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
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение и области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {purposeItems.map((area, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <area.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{area.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Принцип работы */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Принцип работы</h2>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Станция работает по принципу непрерывного трёхкамерного процесса: в первой камере реагент смешивается с водой, во второй — созревает до рабочей вязкости, из третьей — подаётся дозирующим насосом в систему водоочистки.
          </p>

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

          <h3 className="text-sm font-semibold text-foreground mb-2">Основные конструктивные элементы:</h3>
          <ul className="space-y-1.5">
            {constructionElements.map((el, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <LayoutList className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{el}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Модельный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модельный ряд</h2>

          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">Подача воды, л/ч</TableHead>
                  <TableHead className="text-xs text-right">Габариты (A×B×C), мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-xs font-medium">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.capacity}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">Общие технические характеристики:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {commonSpecs.map((spec, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="text-sm font-semibold text-foreground">{spec.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Модификации и опции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модификации и опции</h2>
          <Accordion type="single" collapsible className="w-full">
            {modificationItems.map((item, i) => (
              <AccordionItem key={i} value={`mod-${i}`}>
                <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Section 5: Преимущества сотрудничества */}
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
              <h2 className="text-base font-bold text-foreground mb-2">Готовы заказать станцию дозирования?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Оставьте заявку, и наш инженер подберёт оптимальную модель, подготовит расчёт стоимости и организует доставку на ваш объект.
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
                  <Label htmlFor="description" className="text-xs">Описание задачи (тип реагента, производительность, требования)</Label>
                  <Textarea id="description" placeholder="Опишите вашу задачу..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <Button type="submit" className="w-full">Оставить заявку</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 pb-10 text-center space-y-1">
          <p className="text-xs text-muted-foreground">ООО СЗПК «Пласт-Металл ПРО»</p>
          <p className="text-xs text-muted-foreground">ИНН 7801396709 · ОГРН 1089847099753</p>
          <p className="text-xs text-muted-foreground">info@plast-metall.pro · 8 (800) 555-48-06</p>
        </footer>
      </main>
    </>
  );
};

const VodoochistkaDozirovanie = () => (
  <CartProvider>
    <VodoochistkaDozirovanieInner />
  </CartProvider>
);

export default VodoochistkaDozirovanie;
