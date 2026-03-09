import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import {
  Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical,
  Factory, Zap, Beaker, Settings, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const whyUs = [
  "Собственное производство гальванических линий и ванн с ЧПУ-оборудованием",
  "Изготовление автоматических, механизированных и ручных линий",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж, пусконаладка",
  "Соответствие ГОСТ и международным стандартам качества покрытий",
  "Наличие сертификатов на все материалы и готовые изделия",
];

const applications = [
  { icon: Factory, text: "Нанесение гальванических покрытий (цинкование, никелирование, хромирование)" },
  { icon: Beaker, text: "Анодирование и оксидирование металлов" },
  { icon: Zap, text: "Электрохимическая обработка деталей" },
  { icon: Settings, text: "Подготовка поверхности (обезжиривание, травление, промывка)" },
  { icon: Shield, text: "Нанесение защитных и декоративных покрытий" },
  { icon: FlaskConical, text: "Химическое и электрохимическое полирование" },
];

const materialCards = [
  {
    name: "Полипропилен (PP)",
    specs: ["Температурный диапазон: −20…+100 °C", "Высокая стойкость к кислотам и щелочам", "Идеален для гальванических ванн"],
  },
  {
    name: "ПВХ (PVC)",
    specs: ["Температурный диапазон: до +60 °C", "Устойчивость к агрессивным средам", "Гладкая поверхность, легко очищается"],
  },
];

const modifications = [
  {
    title: "Типы гальванических линий",
    items: ["Ручные линии — для мелкосерийного производства", "Механизированные линии — для среднесерийного производства", "Автоматические линии — для крупносерийного и массового производства"],
  },
  {
    title: "Виды ванн",
    items: ["Гальванические ванны (стационарные)", "Колокольные ванны (для мелких деталей)", "Барабанные ванны (для массовой обработки)", "Ванны промывки и нейтрализации"],
  },
  {
    title: "Дополнительное оборудование",
    items: ["Линии подготовки поверхности", "Системы фильтрации электролита", "Выпрямители и источники тока", "Системы вентиляции и газоочистки", "Запчасти и комплектующие для гальваники"],
  },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Разработаем проект гальванической линии под ваши задачи и производственные площади." },
  { icon: FlaskConical, title: "Точный подбор оборудования", text: "Учтём тип покрытий, производительность и требования к качеству." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждая ванна проходит проверку на герметичность и химическую стойкость." },
  { icon: Clock, title: "Оперативность", text: "Средний срок изготовления — 21–45 дней, монтаж — 5–14 дней." },
  { icon: Truck, title: "Логистика", text: "Организуем доставку крупногабаритного оборудования по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка, обучение персонала, гарантийное и постгарантийное обслуживание." },
  { icon: Shield, title: "Документация", text: "Предоставим паспорта изделий, сертификаты и инструкции по эксплуатации." },
];

const GalvanikaPageInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля (имя, телефон)"); return; }
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Гальваника</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Гальваническое оборудование из полимеров</h1>
          <p className="text-sm text-muted-foreground mb-5">Проектирование, производство и монтаж гальванических линий и ванн — полный цикл от эскиза до ввода в эксплуатацию!</p>
          <Button onClick={scrollToForm} className="gap-2">Получить расчёт стоимости</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/galvanika-hero-1.png" alt="Гальваническое оборудование" className="w-full h-56 object-cover" /></div>
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/galvanika-hero-2.png" alt="Гальванические ванны" className="w-full h-56 object-cover" /></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Гальваническое оборудование: от проектирования до монтажа</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы проектируем и производим полный спектр гальванического оборудования из химически стойких полимеров для нанесения покрытий, подготовки поверхности и электрохимической обработки металлов.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">
            {whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {applications.map((area, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><area.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{area.text}</span></div>))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Материалы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {materialCards.map((mat, i) => (
              <Card key={i}><CardContent className="p-4"><p className="text-sm font-semibold text-foreground mb-2">{mat.name}</p>
                <ul className="space-y-1">{mat.specs.map((s, j) => (<li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5"><Check className="h-3 w-3 text-primary shrink-0 mt-0.5" /><span>{s}</span></li>))}</ul>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды оборудования</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (
              <AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{mod.title}</AccordionTrigger>
                <AccordionContent><ul className="space-y-1.5 pb-2">{mod.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-1">•</span><span>{item}</span></li>))}</ul></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advantages.map((adv) => (<Card key={adv.title}><CardContent className="p-4 flex items-start gap-3"><adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p><p className="text-xs text-muted-foreground">{adv.text}</p></div></CardContent></Card>))}
          </div>
        </section>


        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать гальваническое оборудование?</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку, и наш инженер бесплатно проконсультирует по выбору оборудования и подготовит расчёт стоимости в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label htmlFor="name" className="text-xs">Имя *</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label htmlFor="phone" className="text-xs">Телефон *</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label htmlFor="email" className="text-xs">E-mail</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="desc" className="text-xs">Описание задачи</Label><Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите вашу задачу…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
            </form>
          </CardContent></Card>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const GalvanikaPage = () => (<CartProvider><GalvanikaPageInner /></CartProvider>);
export default GalvanikaPage;
