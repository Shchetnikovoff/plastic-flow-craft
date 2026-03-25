import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { podzemnyeProducts } from "@/data/podzemnyeProducts";
import { Check, Droplets, Wrench, ShieldCheck, Clock, Truck, FlaskConical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const whyUs = [
  "Собственное производство спиральновитых конструкций",
  "Применение современных технологий сварки и герметизации",
  "Адаптация под сложные грунтовые условия и сейсмику",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка",
  "Гарантия 7 лет, расчётный срок службы — от 50 лет",
  "Соответствие ГОСТ, СП, СНиП и международным стандартам",
];

const applications = [
  "Хранение питьевой и технической воды (в т. ч. пожарных запасов)",
  "Приём и накопление ливневых и талых вод",
  "Сбор и временное хранение промышленных стоков",
  "Системы локальной канализации и септиков для коттеджных посёлков",
  "Хранение нефтепродуктов, ГСМ, технологических растворов",
  "Буферные резервуары в системах водоподготовки и водоочистки",
  "Дренажные системы и понижение уровня грунтовых вод",
  "Утилизация химически активных жидкостей (при соответствующей модификации)",
];

const materials = [
  { name: "Полиэтилен высокой плотности (ПНД/HDPE)", desc: "для химически нейтральных сред" },
  { name: "Полипропилен (PP)", desc: "для повышенных температур и умеренных агрессивных сред" },
  { name: "Армированные композитные трубы", desc: "для высоких нагрузок и сложных грунтов" },
];

const specs = [
  { label: "Диаметр", value: "от 1 000 до 3 500 мм (и более по спецзаказу)" },
  { label: "Длина секции", value: "до 12 м (с возможностью наращивания)" },
  { label: "Рабочее давление", value: "до 0,5 МПа" },
  { label: "Температура", value: "от −50 °C до +60 °C (до +80 °C кратковр.)" },
  { label: "Кольцевая жёсткость", value: "SN2–SN16" },
  { label: "Сейсмостойкость", value: "до 9 баллов (MSK-64)" },
];

const spiralAdvantages = [
  "Равномерное распределение нагрузки по всей поверхности",
  "Повышенная устойчивость к подвижкам грунта",
  "Возможность изготовления нестандартных форм и переходов",
  "Ремонтопригодность — локальный ремонт без демонтажа всей системы",
  "Малый вес по сравнению с бетонными и стальными аналогами",
];

const modifications = [
  {
    title: "По назначению",
    items: [
      "Водонапорные и пожарные резервуары",
      "Канализационные и дренажные накопители",
      "Ливневые и дождевые коллекторы",
      "Ёмкости для нефтепродуктов и ГСМ",
      "Технологические ёмкости для химических производств",
      "Септики и биологические очистные сооружения",
    ],
  },
  {
    title: "По конструкции",
    items: [
      "Однокамерные — для простых задач хранения",
      "Многокамерные — с разделением на секции (отстойник, аэрация, фильтрация)",
      "Модульные — сборные системы из нескольких соединённых резервуаров",
      "С усиленным каркасом — для глубокого залегания (от 6 м и более)",
    ],
  },
  {
    title: "По способу монтажа",
    items: [
      "Горизонтальные — для больших объёмов и ограниченного пространства",
      "Вертикальные — при дефиците площади на поверхности",
      "Комбинированные — с наземными элементами управления",
    ],
  },
  {
    title: "Дополнительные опции",
    items: [
      "Анкерные плиты и якорение для предотвращения всплытия",
      "Теплоизоляция и обогрев (греющий кабель)",
      "Датчики уровня, давления, температуры",
      "Системы контроля загазованности и вентиляции",
      "Ревизионные колодцы и люки доступа",
      "Внутренняя футеровка для агрессивных сред",
      "Автоматизированные системы откачки и дозирования",
    ],
  },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный проект", text: "Разработаем ёмкость под конкретные условия: тип грунта, глубину залегания, нагрузки." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый шов проходит проверку на герметичность (вакуумный тест, опрессовка)." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 14–21 день, монтаж — 3–7 дней." },
  { icon: Truck, title: "Логистика", text: "Доставим крупногабаритные секции и смонтируем на месте." },
  { icon: FlaskConical, title: "Сервис", text: "Полный цикл: от геологического исследования до пусконаладки и обучения персонала." },
  { icon: Wrench, title: "Гарантии", text: "Сервисное обслуживание, запасные части, модернизация существующих систем." },
];

const EmkostiPodzemnyeInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const navigate = useNavigate();

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
            <BreadcrumbItem><BreadcrumbPage>Подземные ёмкости</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Промышленные подземные ёмкости из спиральновитых труб
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Подземные ёмкости из спиральновитых труб — надёжное решение для долгосрочного хранения жидкостей и стоков!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          {/* Hero images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-podzemnye-svt-1.jpg" alt="Многокамерная подземная ёмкость СВТ" className="w-full object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-podzemnye-svt-2.jpg" alt="Подземные резервуары в разрезе" className="w-full object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/emkosti-podzemnye-svt-3.png" alt="Подземные ёмкости на тёмном фоне" className="w-full object-contain" />
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "modeli", label: "Модели" },
            { id: "opisanie", label: "Описание" },
            { id: "naznachenie", label: "Назначение" },
            { id: "materialy", label: "Материалы" },
            { id: "modifikacii", label: "Модификации" },
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

        {/* Типоразмерный ряд */}
        <section id="modeli" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs">Объём, м³</TableHead>
                  <TableHead className="text-xs text-right">Ø корпуса, мм</TableHead>
                  <TableHead className="text-xs text-right">Длина (L), мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {podzemnyeProducts.map((item) => (
                  <TableRow
                    key={item.article}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => navigate(`/product/${item.article}`)}
                  >
                    <TableCell className="text-xs font-medium text-primary underline underline-offset-2">{item.article}</TableCell>
                    <TableCell className="text-xs font-medium">{item.volume}</TableCell>
                    <TableCell className="text-xs text-right">{item.diameter.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right">{item.length.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Нажмите на строку, чтобы открыть карточку товара с возможностью скачивания КП и спецификации</p>
        </section>

        {/* Intro / Description */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Подземные резервуары на заказ: от проектирования до ввода в эксплуатацию
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы проектируем и изготавливаем промышленные подземные ёмкости из спиральновитых труб (СВП) для систем водоснабжения, канализации, ливневых стоков, хранения технической воды и нефтепродуктов.
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
        <section id="naznachenie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение подземных ёмкостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((app, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
                <Droplets className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{app}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Технология и материалы */}
        <section id="materialy" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Технология и материалы</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Спиральновитые трубы (СВП) — это гофрированные полимерные или металлополимерные конструкции, формируемые методом спиральной навивки с последующей сваркой швов.
          </p>

          <h3 className="text-sm font-semibold text-foreground mb-3">Основные материалы:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {materials.map((mat, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="text-sm font-semibold text-foreground mb-1">{mat.name}</p>
                  <p className="text-xs text-muted-foreground">{mat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Ключевые характеристики:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {specs.map((spec, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/30 p-3">
                <span className="block text-xs text-muted-foreground">{spec.label}</span>
                <span className="text-sm font-semibold text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-2">Преимущества спиральновитой конструкции:</h3>
          <ul className="space-y-1.5">
            {spiralAdvantages.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Виды и модификации */}
        <section id="modifikacii" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды и модификации</h2>
          <Accordion type="multiple" defaultValue={["По назначению"]} className="space-y-2">
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
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv) => (
              <Card key={adv.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{adv.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Готовы заказать подземную ёмкость?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Оставьте заявку, и наш инженер бесплатно проведёт консультацию, подготовит 3D‑модель и расчёт стоимости в течение 24 часов.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Имя *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Телефон *</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">E-mail</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="description" className="text-sm">Описание задачи</Label>
                  <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите вашу задачу..." rows={3} />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button>
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

const EmkostiPodzemnye = () => (
  <CartProvider>
    <EmkostiPodzemnyeInner />
  </CartProvider>
);

export default EmkostiPodzemnye;
