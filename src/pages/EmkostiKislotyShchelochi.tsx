import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Beaker, Shield, Leaf, Zap, Building2, Atom,
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

const whyUs = [
  "Собственное производство с применением экструзионной сварки и современных технологий формования",
  "Подбор материала и толщины стенок под конкретную среду (с учётом концентрации, температуры и давления)",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ, ТУ и международным стандартам химической стойкости",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const purposes = [
  { icon: FlaskConical, text: "Хранение концентрированных кислот (соляной, серной, азотной, фосфорной и др.)" },
  { icon: Beaker, text: "Работа с щелочами (гидроксид натрия, калия, кальция и др.)" },
  { icon: Truck, text: "Транспортировка агрессивных химических веществ" },
  { icon: Zap, text: "Использование в гальванических производствах" },
  { icon: Leaf, text: "Системы нейтрализации и очистки стоков" },
  { icon: Settings, text: "Приготовление и дозирование химических растворов" },
  { icon: Atom, text: "Утилизация отработанных кислот и щелочей" },
  { icon: Building2, text: "Применение в химической, фармацевтической, металлургической и других отраслях" },
];

const materialCards = [
  {
    name: "Полипропилен (PP)",
    specs: [
      "Температурный диапазон: от −20 °C до +100 °C (кратковременно до +110 °C)",
      "Высокая химическая стойкость к большинству кислот и щелочей",
      "Плотность 0,90–0,92 г/см³, температура плавления 160–170 °C",
      "Устойчивость к механическим повреждениям",
      "Подходит для помещений (чувствителен к низким температурам)",
    ],
  },
  {
    name: "Полиэтилен (ПНД/HDPE)",
    specs: [
      "Температурный диапазон: от −50 °C до +60 °C (кратковременно до +80 °C)",
      "Устойчивость к слабым и среднеконцентрированным кислотам и щелочам",
      "Морозостойкость, подходит для подземного размещения",
      "Плотность 0,93–0,97 г/см³, температура плавления ~120–135 °C",
      "Гладкая внутренняя поверхность, препятствующая скоплению веществ",
    ],
  },
  {
    name: "ПВХ (PVC)",
    specs: [
      "Температурный диапазон: до +60 °C (ограничения при высоких температурах)",
      "Повышенная устойчивость к коррозии и низкая поглотительная способность",
      "Химическая стойкость к гипохлориту натрия, среднеконцентрированным растворам",
      "Гладкая поверхность, облегчающая очистку",
      "Не рекомендуется для эксплуатации при отрицательных температурах",
    ],
  },
];

const compatibilityTable = [
  { substance: "Соляная кислота (до 37 %)", pp: "Отлично", pe: "Хорошо", pvc: "Условно" },
  { substance: "Серная кислота (до 70 %)", pp: "До 70 %", pe: "Хорошо", pvc: "Не рекомендуется" },
  { substance: "Гидроксид натрия (до 50 %)", pp: "Отлично", pe: "Хорошо", pvc: "Хорошо" },
  { substance: "Азотная кислота (до 40 %)", pp: "Ограниченно", pe: "Не подходит", pvc: "Хорошо" },
];

const modifications = [
  {
    title: "По форме",
    items: [
      "Цилиндрические (вертикальные/горизонтальные)",
      "Прямоугольные (оптимальны для ограниченного пространства)",
      "Конические (для полного опорожнения)",
      "Нестандартные формы по чертежам заказчика",
    ],
  },
  {
    title: "По объёму",
    items: [
      "Малые (от 50 л до 1 м³) — для лабораторий и локальных систем",
      "Средние (1–10 м³) — для промышленных задач",
      "Крупные (10–50 м³ и более) — для масштабных производств",
    ],
  },
  {
    title: "По типу установки",
    items: [
      "Наземные (с каркасом и опорами)",
      "Подземные (с анкерными креплениями против всплытия)",
      "Модульные (сборные системы из нескольких резервуаров)",
    ],
  },
  {
    title: "Стандартная комплектация",
    items: [
      "Герметичные сварные швы с проверкой на вакуум и опрессовку",
      "Горловины и люки доступа",
      "Входные/выходные патрубки с фланцами",
      "Лестницы и площадки обслуживания (для крупных ёмкостей)",
      "Усиленные рёбра жёсткости (для подземного размещения)",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Мешалки и перемешивающие устройства",
      "Датчики уровня и температуры",
      "Системы обогрева (греющий кабель или рубашка)",
      "Теплоизоляция (минеральная вата, ППУ)",
      "Контрольно-измерительные приборы (КИП)",
      "Запорная арматура и трубопроводы из химически стойких материалов",
      "Ревизионные колодцы и смотровые окна",
      "Футеровка для особо агрессивных сред",
      "Маркировка и защитные ограждения",
    ],
  },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект под ваши задачи, включая нестандартные формы и комплектацию." },
  { icon: FlaskConical, title: "Точный подбор материала", text: "Учтём концентрацию, температуру и давление рабочей среды." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–21 день, монтаж — 2–7 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку крупногабаритных ёмкостей по РФ с соблюдением мер безопасности." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Предоставим паспорта изделий, сертификаты соответствия и инструкции по эксплуатации." },
];

/* ── component ── */

const EmkostiKislotyShchelochiInner = () => {
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Ёмкости для кислот и щелочей</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Химически стойкие ёмкости для кислот и щелочей
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Безопасность и долговечность хранения агрессивных сред!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-kisloty-shchelochi-clean.jpg" alt="Химически стойкие ёмкости из ПНД с поддоном и уровнемером" className="w-full object-contain" />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Ёмкости для кислот и щелочей: от проектирования до монтажа
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы изготавливаем промышленные ёмкости из листового полипропилена (PP), полиэтилена (ПНД/HDPE) и ПВХ (PVC) для безопасного хранения и транспортировки концентрированных и разбавленных кислот, щелочей и других агрессивных химических сред.
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

        {/* Section 1: Назначение */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение ёмкостей</h2>
          <p className="text-sm text-muted-foreground mb-3">Наши ёмкости предназначены для:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {purposes.map((p, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <p.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{p.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Материалы */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Описание материалов</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {materialCards.map((mat, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground mb-2">{mat.name}</p>
                  <ul className="space-y-1">
                    {mat.specs.map((s, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Таблица химической совместимости:</h3>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-foreground">Вещество</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">Полипропилен</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">Полиэтилен</th>
                  <th className="text-center px-3 py-2 text-xs font-semibold text-foreground">ПВХ</th>
                </tr>
              </thead>
              <tbody>
                {compatibilityTable.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                    <td className="px-3 py-2 text-xs text-foreground font-medium">{row.substance}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground text-center">{row.pp}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground text-center">{row.pe}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground text-center">{row.pvc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Виды и модификации */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации ёмкостей</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                  {mod.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Section 4: Преимущества сотрудничества */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partnershipAdvantages.map((adv) => (
              <Card key={adv.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-muted-foreground">{adv.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">
                Готовы заказать ёмкость для кислот или щелочей?
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору материала и комплектации, подготовит расчёт стоимости в течение 24 часов.
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="desc" className="text-xs">Описание задачи</Label>
                  <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите вашу задачу…" rows={3} maxLength={1000} />
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

const EmkostiKislotyShchelochi = () => (
  <CartProvider>
    <EmkostiKislotyShchelochiInner />
  </CartProvider>
);

export default EmkostiKislotyShchelochi;
