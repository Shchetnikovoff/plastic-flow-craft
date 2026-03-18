import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Zap, Building2, Wheat, Car, Warehouse,
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
  { src: "/images/ffu-hero-real.jpg", alt: "ФФУ — 3D-рендер флотационно-фильтровальной установки" },
  { src: "/images/ffu-hero-real-2.jpg", alt: "ФФУ — фото флотатора" },
];

const whyUs = [
  "Многоступенчатая схема очистки — стабильно высокие показатели эффективности",
  "Компактность — экономия производственных площадей",
  "Автоматизированный процесс очистки",
  "Возможность работы с реагентами и без них",
  "Соответствие СанПиН и нормам сброса в канализацию/водоёмы",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл услуг: проектирование, производство, доставка, монтаж, пусконаладка, сервис",
];

const purposeItems = [
  "Сточные воды после мойки автомобилей, агрегатов, деталей, тары",
  "Ливневые воды гаражей, автостоянок, промышленных предприятий",
  "Производственные стоки мясокомбинатов, масложировых производств",
  "Хозяйственно-бытовые стоки (в составе комплексных очистных сооружений)",
];

const pollutants = [
  "Нефтепродукты (масла, топливо, смазки)",
  "Жиры и жировые эмульсии",
  "Взвешенные вещества (песок, ил, шлам)",
  "Гидроксиды металлов",
  "Поверхностно-активные вещества (ПАВ)",
];

const applicationAreas = [
  { icon: Car, text: "Автомойки и СТО" },
  { icon: Factory, text: "Машиностроительные предприятия" },
  { icon: Zap, text: "Нефтебазы и АЗС" },
  { icon: Wheat, text: "Пищевые производства" },
  { icon: Warehouse, text: "Складские комплексы" },
  { icon: Building2, text: "Промышленные зоны и технопарки" },
];

const processSteps = [
  { step: "1", title: "Сатурация", desc: "В нижней части установки (сатураторе) стоки насыщаются воздухом под давлением." },
  { step: "2", title: "Флотация", desc: "Насыщенная воздухом вода поступает во флотационную камеру, где микропузырьки поднимают загрязнения на поверхность." },
  { step: "3", title: "Удаление шлама", desc: "Механический скребок собирает загрязнённую плёнку и направляет её в шламовую ёмкость." },
  { step: "4", title: "Фильтрация", desc: "Очищенная вода проходит через встроенный фильтр (активированный уголь, полимерные загрузки) для доочистки." },
  { step: "5", title: "Сбор очищенной воды", desc: "Очищенная вода направляется в накопительную ёмкость или на сброс." },
];

const constructionElements = [
  "Корпус из химически стойкого полимера (полипропилен/ПВХ/стеклопластик)",
  "Сатуратор для насыщения воды воздухом",
  "Флотационная камера с системой микропузырьков",
  "Механический скребок для удаления шлама",
  "Встроенный фильтр с заменяемой загрузкой",
  "Система патрубков и трубопроводов",
  "Датчики уровня и контроля давления (опционально)",
];

// Models imported from shared data
import { ffuModels } from "@/data/ffuProducts";
const models = ffuModels;

const cleanupPerformance = [
  { pollutant: "Взвешенные вещества", inlet: "50–200", outlet: "3" },
  { pollutant: "Нефтепродукты", inlet: "10–100", outlet: "0,15–0,4" },
  { pollutant: "БПКполн", inlet: "50–200", outlet: "6" },
  { pollutant: "ХПК", inlet: "100–400", outlet: "30" },
];

const modificationsList = [
  "Для работы с заглублённым накопителем стоков",
  "С надземным блоком вспомогательных ёмкостей («Моноблок»)",
  "Модульные системы для каскадного использования (производительность 50–100 м³/ч и более)",
];

const optionsList = [
  "Система дозирования реагентов (коагулянты, флокулянты)",
  "Автоматический контроль уровня и давления",
  "Датчик заполнения шламовой ёмкости",
  "Теплоизоляция корпуса для эксплуатации в холодных помещениях",
  "Система обратной промывки фильтра",
  "Комплект запорной арматуры из коррозионностойких материалов",
  "Сигнализация аварийных режимов",
  "Интеграция в АСУ ТП предприятия",
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

const VodoochistkaFfuInner = () => {
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
            <BreadcrumbItem><BreadcrumbPage>ФФУ</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            ФФУ — Флотационно-фильтровальная установка
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            ФФУ — эффективная очистка сточных вод от нефтепродуктов, жиров и взвешенных веществ!
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
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Флотационно-фильтровальные установки для глубокой очистки стоков
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы проектируем и производим ФФУ из химически стойких полимеров (полипропилен, ПВХ, стеклопластик) для очистки промышленных и ливневых стоков предприятий различного профиля.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши ФФУ:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 1: Назначение и области применения */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Назначение и области применения</h2>

          <h3 className="text-sm font-semibold text-foreground mb-2">ФФУ предназначены для очистки:</h3>
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

        {/* Section 2: Принцип работы и конструкция */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Принцип работы и конструкция</h2>

          <h3 className="text-sm font-semibold text-foreground mb-3">Принцип действия ФФУ:</h3>
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

          <h3 className="text-sm font-semibold text-foreground mb-2">Конструкция ФФУ включает:</h3>
          <ul className="space-y-1.5">
            {constructionElements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Модельный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Технические характеристики и модельный ряд</h2>

          <h3 className="text-sm font-semibold text-foreground mb-3">Базовые модели ФФУ:</h3>
          <div className="rounded-lg border border-border overflow-auto mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">м³/ч</TableHead>
                  <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
                  <TableHead className="text-xs text-right">Масса сух., т</TableHead>
                  <TableHead className="text-xs text-right">кВт</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-xs font-medium">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.capacity}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                    <TableCell className="text-xs text-right">{m.massDry}</TableCell>
                    <TableCell className="text-xs text-right">{m.power}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Показатели очистки (с применением реагентов):</h3>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Загрязнение</TableHead>
                  <TableHead className="text-xs text-right">На входе, мг/л</TableHead>
                  <TableHead className="text-xs text-right">После очистки, мг/л</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cleanupPerformance.map((row) => (
                  <TableRow key={row.pollutant}>
                    <TableCell className="text-xs font-medium">{row.pollutant}</TableCell>
                    <TableCell className="text-xs text-right">{row.inlet}</TableCell>
                    <TableCell className="text-xs text-right">{row.outlet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Section 4: Модификации и опции */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модификации и опции</h2>

          <h3 className="text-sm font-semibold text-foreground mb-2">Модификации ФФУ:</h3>
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
              <h2 className="text-lg font-bold text-foreground mb-1">Готовы заказать ФФУ для очистки стоков?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору модели, подготовит схему очистки и расчёт стоимости в течение 24 часов.
              </p>
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs">Имя *</Label>
                  <Input id="name" placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="desc" className="text-xs">Описание задачи</Label>
                  <Textarea id="desc" placeholder="Опишите вашу задачу, объём стоков, тип загрязнений..." rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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

const VodoochistkaFfu = () => (
  <CartProvider>
    <VodoochistkaFfuInner />
  </CartProvider>
);

export default VodoochistkaFfu;
