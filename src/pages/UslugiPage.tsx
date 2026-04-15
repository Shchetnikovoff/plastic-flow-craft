import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Factory, Settings, Shield, HardHat } from "lucide-react";
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
  "Комплексный подход: от проекта до ввода в эксплуатацию",
  "Собственная производственная база и квалифицированные монтажные бригады",
  "Опыт работы с крупными промышленными объектами",
  "Гарантия на все виды работ",
  "Соблюдение сроков и бюджета проекта",
];

const services = [
  { icon: Settings, text: "Проектирование водоподготовительного и водоочистного оборудования" },
  { icon: Factory, text: "Проектирование КНС (канализационных насосных станций)" },
  { icon: HardHat, text: "Монтаж ёмкостей и резервуаров" },
  { icon: Wrench, text: "Монтаж КНС" },
  { icon: FlaskConical, text: "Пусконаладочные работы" },
  { icon: Shield, text: "Гарантийное и постгарантийное обслуживание" },
];

const modifications = [
  { title: "Проектирование", items: ["Разработка проектной документации", "3D-моделирование и визуализация", "Гидравлические расчёты", "Подбор оборудования и материалов", "Согласование с надзорными органами"] },
  { title: "Монтаж", items: ["Монтаж ёмкостей (наземных и подземных)", "Монтаж КНС с подключением к сетям", "Монтаж трубопроводов и арматуры", "Установка насосного оборудования", "Электромонтажные работы"] },
  { title: "Пусконаладка и сервис", items: ["Пусконаладочные работы", "Обучение персонала заказчика", "Гарантийное обслуживание", "Постгарантийный сервис", "Поставка запасных частей"] },
];

const advantages = [
  { icon: Settings, title: "Комплексный подход", text: "Все работы — от проекта до сервиса — в одних руках." },
  { icon: ShieldCheck, title: "Качество работ", text: "Квалифицированные специалисты с допусками СРО." },
  { icon: Clock, title: "Соблюдение сроков", text: "Чёткий график выполнения работ." },
  { icon: Truck, title: "География", text: "Работаем по всей территории РФ." },
  { icon: Wrench, title: "Оборудование", text: "Используем сертифицированное оборудование." },
  { icon: Shield, title: "Гарантия", text: "Гарантия на все виды работ — от 2 лет." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("uslugi");
  const catIndex = 12;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; } toast.success("Заявка отправлена!"); setForm({ name: "", phone: "", email: "", description: "" }); };
  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Услуги</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Услуги проектирования и монтажа</h1>
          <p className="text-sm text-muted-foreground mb-5">Проектирование, монтаж и пусконаладка промышленного оборудования — полный цикл от идеи до ввода в эксплуатацию!</p>
          <Button onClick={scrollToForm}>Оставить заявку</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
<div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/uslugi-hero-1.png" alt="Монтаж оборудования" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/uslugi-hero-2.png" alt="Проектирование и пусконаладка" className="w-full object-contain" /></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Проектирование и монтаж: от идеи до результата</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы оказываем полный спектр услуг по проектированию, монтажу и вводу в эксплуатацию промышленного оборудования: водоочистных и водоподготовительных систем, КНС, ёмкостей и резервуаров.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Наши услуги</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{services.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Этапы работ</h2>
          <Accordion type="multiple" defaultValue={[modifications[0].title]} className="space-y-2">
            {modifications.map((mod) => (<AccordionItem key={mod.title} value={mod.title} className="rounded-lg border border-border bg-card px-4"><AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">{mod.title}</AccordionTrigger><AccordionContent><ul className="space-y-1.5 pb-2">{mod.items.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="text-primary mt-1">•</span><span>{item}</span></li>))}</ul></AccordionContent></AccordionItem>))}
          </Accordion>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Преимущества сотрудничества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{advantages.map((adv) => (<Card key={adv.title} className="hover:border-amber-400/50 hover:shadow-md transition-all"><CardContent className="p-4 flex items-start gap-3"><adv.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{adv.title}</p><p className="text-xs text-muted-foreground">{adv.text}</p></div></CardContent></Card>))}</div>
        </section>

        {category && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Каталог услуг</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => {
              const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-amber-500 transition-colors mt-0.5">{sub.name}</p></div></>);
              return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 hover:scale-[1.02] transition-all text-left">{cc}</button>;
            })}</div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8">
            <h2 className="text-base font-bold text-white mb-2 tracking-wide uppercase">Готовы обсудить проект?</h2>
            <p className="text-sm text-slate-300 mb-5">Оставьте заявку — мы свяжемся в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите задачу…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-full">Отправить заявку</Button></div>
            </form>
          </div>
        </section>
        <PageFooter />
      </main>
    </>
  );
};

const UslugiPage = () => (<CartProvider><Inner /></CartProvider>);
export default UslugiPage;
