import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import { HorizontalTankCalculator } from "@/components/configurator";

const subtypes = [
  {
    id: "standartnaya",
    name: "Стандартная на низких ложементах",
    image: "/images/egts-standartnaya-1.jpg",
    path: "/catalog/emkosti/gorizontalnye/standartnaya",
    description: "Горизонтальная цилиндрическая ёмкость стандартной формы на низких ложементах. Объём от 1 000 до 50 000 литров.",
  },
  {
    id: "vysokie-lozhementy",
    name: "Стандартная на высоких ложементах",
    image: "/images/egts-vysokie-lozhementy-1.jpg",
    path: "/catalog/emkosti/gorizontalnye/vysokie-lozhementy",
    description: "Горизонтальная цилиндрическая ёмкость с плоской крышей и плоским дном на высоких ложементах. Объём от 1 000 до 50 000 литров.",
  },
];

const EmkostiGorizontalnyeInner = () => {
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

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} productType="otvod" />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Цилиндрические горизонтальные</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Раздел 6.2</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Ёмкости цилиндрические горизонтальные
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Горизонтальные цилиндрические ёмкости из листового полипропилена и полиэтилена. Применяются для хранения и транспортировки жидкостей. Оснащение люками, штуцерами, уровнемерами. Объём от 1 000 до 50 000 литров.
          </p>
          <Button onClick={() => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" })} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/egts-standartnaya-1.jpg" alt="Горизонтальная ёмкость" className="w-full h-auto object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/egts-standartnaya-3.jpg" alt="Горизонтальная ёмкость — вид сбоку" className="w-full h-auto object-contain" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Anchor nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "katalog", label: "Каталог" },
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

        {/* Subtypes grid */}
        <section id="katalog" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типы горизонтальных ёмкостей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subtypes.map((sub) => (
              <Link
                key={sub.id}
                to={sub.path}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-md transition-all block"
              >
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <img src={sub.image} alt={sub.name} className="w-full h-full object-contain" />
                </div>
                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{sub.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{sub.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-2">Запросить расчёт</h2>
            <p className="text-sm text-muted-foreground mb-4">Оставьте заявку — подготовим КП в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label htmlFor="cta-name">Имя *</Label><Input id="cta-name" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div><Label htmlFor="cta-phone">Телефон *</Label><Input id="cta-phone" type="tel" placeholder="+7 900 000-00-00" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} /></div>
              <div className="sm:col-span-2"><Label htmlFor="cta-desc">Описание задачи</Label><Textarea id="cta-desc" placeholder="Опишите ёмкость: тип, объём, назначение…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Оставить заявку</Button></div>
            </form>
          </div>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const EmkostiGorizontalnye = () => (
  <CartProvider><EmkostiGorizontalnyeInner /></CartProvider>
);

export default EmkostiGorizontalnye;
