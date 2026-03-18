import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { findCategory } from "@/data/catalog";
import { Check, Wrench, ShieldCheck, Clock, Truck, FlaskConical, ImageOff, Droplets, Factory, Beaker, Settings, Shield, Leaf } from "lucide-react";
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
  "Собственное производство систем водоподготовки из химически стойких полимеров",
  "Индивидуальный подбор системы под параметры исходной воды",
  "Гарантия 5 лет, срок службы — от 25 лет",
  "Полный цикл: анализ воды, проектирование, производство, монтаж, пусконаладка",
  "Соответствие СанПиН и требованиям к питьевой и технической воде",
];

const applications = [
  { icon: Droplets, text: "Подготовка питьевой воды для населённых пунктов" },
  { icon: Factory, text: "Подготовка воды для котельных и теплообменников" },
  { icon: Beaker, text: "Деминерализация и умягчение воды для промышленности" },
  { icon: Settings, text: "Обратноосмотическая очистка для фармацевтики" },
  { icon: Leaf, text: "Подготовка воды для пищевого производства" },
  { icon: Shield, text: "Системы оборотного водоснабжения" },
];

const modifications = [
  { title: "Обратный осмос", items: ["Мембранные установки различной производительности", "Одно- и двухступенчатый обратный осмос", "Автоматическое управление и промывка мембран"] },
  { title: "Фильтрация и сорбция", items: ["Механические фильтры (песчаные, мультимедийные)", "Угольные сорбционные фильтры", "Фильтры обезжелезивания и деманганации"] },
  { title: "Умягчение и деионизация", items: ["Ионообменные умягчители", "Установки электродеионизации", "Системы регенерации смол"] },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный подход", text: "Подберём систему по анализу воды и требованиям к качеству." },
  { icon: FlaskConical, title: "Анализ воды", text: "Проведём полный анализ исходной воды перед проектированием." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Гарантия соответствия очищенной воды нормативам." },
  { icon: Clock, title: "Оперативность", text: "Срок изготовления — 14–30 дней." },
  { icon: Truck, title: "Логистика", text: "Доставка по РФ." },
  { icon: Wrench, title: "Сервис", text: "Пусконаладка и сервисное обслуживание." },
  { icon: Shield, title: "Документация", text: "Паспорта, сертификаты, протоколы испытаний." },
];

const Inner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const category = findCategory("vodopodgotovka");
  const catIndex = 3;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; } toast.success("Заявка отправлена!"); setForm({ name: "", phone: "", email: "", description: "" }); };
  const scrollToForm = () => { document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Водоподготовка</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>

        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Системы водоподготовки</h1>
          <p className="text-sm text-muted-foreground mb-5">Обратный осмос, фильтрация и умягчение — комплексные решения для подготовки воды любого качества!</p>
          <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
<div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/vodopodgotovka-hero-1.png" alt="Системы водоподготовки" className="w-full object-contain" /></div>
            <div className="rounded-lg border border-border overflow-hidden bg-card"><img src="/images/vodopodgotovka-hero-2.png" alt="Обратный осмос" className="w-full object-contain" /></div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Водоподготовка: от анализа воды до ввода в эксплуатацию</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Мы проектируем и производим системы водоподготовки для промышленных, коммунальных и коммерческих объектов с использованием химически стойких полимерных материалов.</p>
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
            <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Каталог оборудования водоподготовки</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{category.subcategories.map((sub, i) => {
              const cc = (<><div className="aspect-[4/3] bg-muted flex items-center justify-center">{sub.image ? <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" /> : <ImageOff className="h-10 w-10 text-muted-foreground/40" />}</div><div className="px-3 py-2.5"><p className="text-xs text-muted-foreground font-semibold">{catIndex}.{i + 1}</p><p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">{sub.name}</p></div></>);
              if (sub.externalPath) return <Link key={sub.id} to={sub.externalPath} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all block">{cc}</Link>;
              return <button key={sub.id} onClick={() => setSelectedSubId(sub.id)} className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left">{cc}</button>;
            })}</div>
          </section>
        )}

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Готовы заказать систему водоподготовки?</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт стоимости в течение 24 часов.</p>
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

const VodopodgotovkaPage = () => (<CartProvider><Inner /></CartProvider>);
export default VodopodgotovkaPage;
