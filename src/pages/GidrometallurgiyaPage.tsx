import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Factory, Beaker, Settings, Shield, Pickaxe } from "lucide-react";
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
  "Собственное производство оборудования для гидрометаллургии из полимеров",
  "Химическая стойкость к кислотам, щелочам и растворителям",
  "Гарантия 5 лет, срок службы — от 30 лет",
  "Полный цикл: проектирование, производство, доставка, монтаж",
  "Опыт реализации проектов для горнодобывающей и металлургической промышленности",
];

const applications = [
  { icon: Pickaxe, text: "Выщелачивание руд и концентратов" },
  { icon: FlaskConical, text: "Химическое осаждение металлов из растворов" },
  { icon: Beaker, text: "Сорбционное извлечение ценных компонентов" },
  { icon: Factory, text: "Фильтрация пульп и суспензий" },
  { icon: Settings, text: "Нейтрализация и очистка технологических растворов" },
  { icon: Shield, text: "Электролиз и электрохимическое рафинирование" },
];

const modifications = [
  { title: "Реакторы осаждения", items: ["С мешалкой для химического осаждения металлов", "Реакторы с рубашкой для контроля температуры", "Объём от 0,5 до 50 м³"] },
  { title: "Нутч-фильтры", items: ["Полипропиленовые нутч-фильтры", "Различная площадь фильтрации", "Вакуумное и давленческое исполнение"] },
  { title: "Установки выщелачивания", items: ["Автоклавное и атмосферное выщелачивание", "С системой перемешивания и подогрева", "Кислотное и щелочное выщелачивание"] },
  { title: "Сорбционные установки", items: ["Колонного и кассетного типа", "С системой промывки и регенерации", "Для извлечения золота, серебра, цветных металлов"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Спроектируем оборудование под ваш технологический процесс." },
  { icon: FlaskConical, title: "Подбор материала", text: "Учтём химическую среду и температурный режим." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Проверка на герметичность и химическую стойкость." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 21–45 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ, включая удалённые объекты." },
  { icon: Wrench, title: "Сервис", text: "Монтаж, пусконаладка, обучение персонала." },
  { icon: Shield, title: "Документация", text: "Паспорта, сертификаты, инструкции." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("gidrometallurgiya");
  const catIndex = 8;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; } toast.success("Заявка отправлена!"); setForm({ name: "", phone: "", email: "", description: "" }); };
  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Гидрометаллургия</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Оборудование для гидрометаллургии</h1>
          <p className="text-sm text-muted-foreground mb-5">Реакторы, нутч-фильтры, установки выщелачивания и сорбции — полимерное оборудование для извлечения металлов!</p>
          <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
<div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/gidrometallurgiya-hero-1.png" alt="Оборудование для гидрометаллургии" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/gidrometallurgiya-hero-2.png" alt="Реакторы и фильтры" className="w-full object-contain" /></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Гидрометаллургическое оборудование из полимеров</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы проектируем и производим полимерное оборудование для гидрометаллургических процессов: выщелачивания, осаждения, фильтрации и сорбции ценных металлов.</p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Почему выбирают нас:</h3>
          <ul className="space-y-2">{whyUs.map((item, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Области применения</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{applications.map((a, i) => (<div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-card p-3"><a.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span className="text-sm text-foreground">{a.text}</span></div>))}</div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Виды оборудования</h2>
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
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог оборудования</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => {
              const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p></div></>);
              if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all block">{cc}</Link>;
              return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">{cc}</button>;
            })}</div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать оборудование?</h2>
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

const GidrometallurgiyaPage = () => (<CartProvider><Inner /></CartProvider>);
export default GidrometallurgiyaPage;
