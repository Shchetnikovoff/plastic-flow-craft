import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Droplets, Factory, Wrench, ShieldCheck, Clock, Truck,
  FlaskConical, Settings, Zap, HelpCircle, Package, Recycle,
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

const heroImages = [
  { src: "/images/obezvozhivatel-hero-1.jpg", alt: "Мешочный обезвоживатель осадка" },
  { src: "/images/obezvozhivatel-schema-1.webp", alt: "Схема мешочного обезвоживателя" },
];

const whyUs = [
  "Простота обслуживания — не требует квалифицированного персонала",
  "Низкие энергозатраты — работает на принципе гравитации",
  "Компактность — минимальная занимаемая площадь",
  "Отсутствие движущихся частей — минимум износа и поломок",
  "Высокая степень обезвоживания — влажность осадка до 70–80%",
  "Универсальность — подходит для хозбытовых, ливневых и производственных стоков",
  "Полный цикл: проектирование, производство, доставка, монтаж, сервис",
];

const purposeItems = [
  "Снижение влажности шлама после очистных сооружений",
  "Обезвоживание осадка хозяйственно-бытовых сточных вод",
  "Обработка осадка ливневых и дождевых стоков",
  "Обезвоживание промышленных шламов (гальваника, металлургия, пищевое производство)",
  "Уменьшение объёма осадка перед утилизацией или вывозом",
  "Первичная фильтрация суспензий на производственных объектах",
];

const processSteps = [
  { step: "1", title: "Подача осадка", desc: "Шлам или осадок подаётся в приёмную ёмкость обезвоживателя самотёком или насосом." },
  { step: "2", title: "Распределение", desc: "Осадок равномерно распределяется по фильтрующим мешкам из полимерного материала." },
  { step: "3", title: "Гравитационная фильтрация", desc: "Вода проходит через стенки мешков под действием силы тяжести, а твёрдые частицы задерживаются внутри." },
  { step: "4", title: "Обезвоживание", desc: "Постепенно влажность осадка снижается до 70–80%, формируя плотный кек внутри мешка." },
  { step: "5", title: "Выгрузка", desc: "Заполненные мешки снимаются и утилизируются или отправляются на полигон." },
];

const models = [
  { name: "ОНИКС-1", capacity: "1,5", bags: "1", dimensions: "700×500×1420" },
  { name: "ОНИКС-2", capacity: "3", bags: "2", dimensions: "1100×500×1480" },
  { name: "ОНИКС-3", capacity: "4,5", bags: "3", dimensions: "1650×500×1480" },
  { name: "ОНИКС-4", capacity: "6", bags: "4", dimensions: "2200×500×1480" },
  { name: "ОНИКС-5", capacity: "7,5", bags: "5", dimensions: "2750×500×1480" },
  { name: "ОНИКС-6", capacity: "9", bags: "6", dimensions: "3300×500×1480" },
  { name: "ОНИКС-12", capacity: "12", bags: "12", dimensions: "6600×500×1480" },
];

const faqItems = [
  {
    q: "Как подобрать модель обезвоживателя?",
    a: "Модель подбирается исходя из суточного объёма осадка. Наши инженеры помогут определить оптимальную модификацию по вашим данным — оставьте заявку, и мы подготовим расчёт.",
  },
  {
    q: "Как часто нужно менять мешки?",
    a: "Частота замены зависит от концентрации взвесей и объёма осадка. В среднем один мешок работает от нескольких суток до нескольких недель. Мы поставляем расходные мешки отдельно.",
  },
  {
    q: "Подходит ли обезвоживатель для промышленных стоков?",
    a: "Да, мешочные обезвоживатели применяются для промышленных стоков — гальванических, нефтесодержащих, пищевых и других. При агрессивных средах используются мешки из химстойких материалов.",
  },
  {
    q: "Какая документация поставляется с оборудованием?",
    a: "В комплект входят: паспорт изделия, руководство по эксплуатации, сертификат соответствия, а также рекомендации по подбору фильтрующих мешков.",
  },
  {
    q: "Какие сроки изготовления и доставки?",
    a: "Срок изготовления — от 10 до 25 рабочих дней в зависимости от модели. Доставка по всей России транспортной компанией или собственным транспортом.",
  },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальный подбор", text: "Подберём модель и комплектацию под ваш объём осадка и тип стоков." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая установка проходит проверку на герметичность и соответствие техническим условиям." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 10–25 дней, монтаж — 1–3 дня." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, поставка расходных материалов." },
  { icon: Truck, title: "Доставка", text: "Доставка по всей России, помощь с логистикой и разгрузкой." },
  { icon: FlaskConical, title: "Гибкость", text: "Возможность доработки конструкции и изготовления нестандартных модификаций." },
];

/* ── component ── */

const VodoochistkaObezvozhivatelInner = () => {
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
            <BreadcrumbItem><BreadcrumbPage>Мешочный обезвоживатель</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Мешочный обезвоживатель осадка
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Эффективное обезвоживание шлама без электроэнергии — компактно, просто, надёжно!
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {heroImages.map((img, i) => (
              <div key={i} className="rounded-lg border border-border overflow-hidden bg-card">
                <img src={img.src} alt={img.alt} className="w-full object-cover h-48 sm:h-64" />
              </div>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Мешочные обезвоживатели осадка: производство под ключ
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Мы изготавливаем мешочные обезвоживатели осадка для снижения влажности шламов, образующихся на очистных сооружениях хозяйственно-бытовых, ливневых и промышленных стоков. Оборудование работает по принципу гравитационной фильтрации через полимерные мешки — без электричества и движущихся частей.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают наши обезвоживатели:</h3>
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

          <h3 className="text-sm font-semibold text-foreground mb-2">Мешочные обезвоживатели предназначены для:</h3>
          <ul className="space-y-1.5 mb-4">
            {purposeItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-foreground mb-3">Типовые сферы применения:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { icon: Droplets, text: "Очистные сооружения хозбытовых стоков" },
              { icon: Factory, text: "Промышленные предприятия (гальваника, металлургия, пищевая)" },
              { icon: Zap, text: "Ливневые очистные системы" },
              { icon: Recycle, text: "Полигоны и объекты утилизации отходов" },
              { icon: Package, text: "Автомойки и сервисные центры" },
              { icon: HelpCircle, text: "Строительные площадки и карьеры" },
            ].map((area, i) => (
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
            Обезвоживатель работает по принципу гравитационной фильтрации: осадок подаётся в фильтрующие мешки из полимерного материала с переменной проницаемостью. Вода проходит через стенки мешков, а твёрдые частицы задерживаются, постепенно формируя плотный кек.
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
        </section>

        {/* Section 3: Модельный ряд */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модельный ряд</h2>

          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-right">м³/сут</TableHead>
                  <TableHead className="text-xs text-right">Кол-во мешков</TableHead>
                  <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-xs font-medium">{m.name}</TableCell>
                    <TableCell className="text-xs text-right">{m.capacity}</TableCell>
                    <TableCell className="text-xs text-right">{m.bags}</TableCell>
                    <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Часто задаваемые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
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
              <h2 className="text-base font-bold text-foreground mb-2">Готовы заказать мешочный обезвоживатель?</h2>
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
                  <Label htmlFor="description" className="text-xs">Описание задачи (тип осадка, объём, требования)</Label>
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

const VodoochistkaObezvozhivatel = () => (
  <CartProvider>
    <VodoochistkaObezvozhivatelInner />
  </CartProvider>
);

export default VodoochistkaObezvozhivatel;
