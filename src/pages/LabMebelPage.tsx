import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Beaker, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const whyUs = [
  "Собственное производство лабораторной мебели из полипропилена",
  "Химическая стойкость к кислотам, щелочам и растворителям",
  "Гарантия 5 лет, срок службы — от 25 лет",
  "Изготовление по типовым и индивидуальным размерам",
  "Соответствие требованиям к лабораторной мебели (ГОСТ, СанПиН)",
];

const applications = [
  { icon: Beaker, text: "Химические и аналитические лаборатории" },
  { icon: FlaskConical, text: "Фармацевтические производства" },
  { icon: Shield, text: "Научно-исследовательские институты" },
  { icon: Settings, text: "Лаборатории контроля качества" },
  { icon: Wrench, text: "Учебные лаборатории вузов и техникумов" },
  { icon: ShieldCheck, text: "Медицинские и санитарно-эпидемиологические лаборатории" },
];

const modifications = [
  { title: "Мебель и столы", items: ["Лабораторные столы из полипропилена", "Столы моечные с раковинами", "Островные и пристенные столы", "Тумбы лабораторные (с ящиками, дверцами, мойкой)"] },
  { title: "Шкафы", items: ["Шкафы хранения реактивов", "Вытяжные шкафы с вентиляцией", "Шкафы для кислот и щелочей", "Сушильные шкафы"] },
  { title: "Мойки и раковины", items: ["Мойки лабораторные из полипропилена", "Тумбы с мойкой и сушилкой", "Раковины различных размеров", "Системы слива и канализации"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Изготовим мебель по вашим размерам и планировке." },
  { icon: FlaskConical, title: "Химическая стойкость", text: "Полипропилен устойчив к агрессивным средам." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка на прочность и герметичность." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 10–21 день." },
  { icon: Truck, title: "Логистика", text: "Доставка и сборка на объекте." },
  { icon: Wrench, title: "Сервис", text: "Монтаж и подключение коммуникаций." },
  { icon: Shield, title: "Документация", text: "Сертификаты и паспорта изделий." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("labmebel");
  const catIndex = 10;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; } toast.success("Заявка отправлена!"); setForm({ name: "", phone: "", email: "", description: "" }); };
  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Лабораторная мебель</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Лабораторная мебель из полипропилена</h1>
          <p className="text-sm text-muted-foreground mb-5">Столы, шкафы, мойки и тумбы — химически стойкая мебель для лабораторий!</p>
          <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/labmebel-hero-1.png" alt="Лабораторная мебель" className="w-full h-56 object-cover" /></div>
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/labmebel-hero-2.png" alt="Лабораторные шкафы" className="w-full h-56 object-cover" /></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Лабораторная мебель: от проектирования до монтажа</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы производим полный ассортимент лабораторной мебели из полипропилена для химических, фармацевтических и исследовательских лабораторий.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{applications.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды продукции</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (<AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4"><AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{mod.title}</AccordionTrigger><AccordionContent><ul className="space-y-1.5 pb-2">{mod.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-1">•</span><span>{item}</span></li>))}</ul></AccordionContent></AccordionItem>))}
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{advantages.map((adv) => (<Card key={adv.title}><CardContent className="p-4 flex items-start gap-3"><adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p><p className="text-xs text-muted-foreground">{adv.text}</p></div></CardContent></Card>))}</div>
        </section>

        {category && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог лабораторной мебели</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <nav className="md:w-[220px] shrink-0"><ul className="space-y-0.5">{category.subcategories.map((sub, i) => { const isSelected = selectedSubId === sub.id; return (<li key={sub.id}><button onClick={() => setSelectedSubId(isSelected ? null : sub.id)} className={`group flex items-baseline gap-2 rounded-md px-3 py-2 text-sm w-full text-left transition-colors ${isSelected ? "bg-primary/10 border border-primary/30" : "hover:bg-muted border border-transparent"}`}><span className={`text-xs font-semibold shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{catIndex}.{i + 1}</span><span className={`transition-colors ${isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"}`}>{sub.name}</span></button></li>); })}</ul></nav>
              <div className="flex-1">{(() => {
                const sel = category.subcategories.find((s) => s.id === selectedSubId);
                if (sel) return (<div className="rounded-xl border border-border bg-card overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200"><div className="aspect-[16/9] bg-muted flex items-center justify-center">{sel.image ? <img src={sel.image} alt={sel.name} className="w-full h-full object-cover" /> : <ImageOff className="h-12 w-12 text-muted-foreground/40" />}</div><div className="p-5"><h3 className="text-lg font-bold text-foreground mb-2">{sel.name}</h3>{sel.externalPath && <Link to={sel.externalPath} className="text-sm font-medium text-primary hover:underline">Перейти на страницу →</Link>}</div></div>);
                return (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => { const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p></div></>); return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">{cc}</button>; })}</div>);
              })()}</div>
            </div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать лабораторную мебель?</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
            </form>
          </CardContent></Card>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const LabMebelPage = () => (<CartProvider><Inner /></CartProvider>);
export default LabMebelPage;
