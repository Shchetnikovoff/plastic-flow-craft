import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";
import { TankCalculator } from "@/components/configurator";

const models = [
  { art: "СЗПК.ЕВПП-КК.1000", vol: 1000, d: 940, h: 1500 },
  { art: "СЗПК.ЕВПП-КК.2000", vol: 2000, d: 1330, h: 1500 },
  { art: "СЗПК.ЕВПП-КК.3000", vol: 3000, d: 1600, h: 1500 },
  { art: "СЗПК.ЕВПП-КК.4000", vol: 4000, d: 1600, h: 2000 },
  { art: "СЗПК.ЕВПП-КК.5000", vol: 5000, d: 1700, h: 2300 },
  { art: "СЗПК.ЕВПП-КК.6000", vol: 6000, d: 1850, h: 2300 },
  { art: "СЗПК.ЕВПП-КК.8000", vol: 8000, d: 2260, h: 2000 },
  { art: "СЗПК.ЕВПП-КК.10000", vol: 10000, d: 2350, h: 2350 },
  { art: "СЗПК.ЕВПП-КК.12000", vol: 12000, d: 2350, h: 2800 },
  { art: "СЗПК.ЕВПП-КК.15000", vol: 15000, d: 2350, h: 3500 },
  { art: "СЗПК.ЕВПП-КК.20000", vol: 20000, d: 2380, h: 4500 },
  { art: "СЗПК.ЕВПП-КК.25000", vol: 25000, d: 2370, h: 5700 },
  { art: "СЗПК.ЕВПП-КК.30000", vol: 30000, d: 2400, h: 6650 },
  { art: "СЗПК.ЕВПП-КК.35000", vol: 35000, d: 3050, h: 4800 },
  { art: "СЗПК.ЕВПП-КК.40000", vol: 40000, d: 3050, h: 5600 },
  { art: "СЗПК.ЕВПП-КК.45000", vol: 45000, d: 3050, h: 6200 },
  { art: "СЗПК.ЕВПП-КК.50000", vol: 50000, d: 3050, h: 7000 },
];

const EmkostiEvppConicalInner = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните обязательные поля (имя, телефон)");
      return;
    }
    toast.success("Заявка отправлена!");
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti/vertikalnye">Цилиндрические вертикальные</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>С конической крышей</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Раздел 6.1.3</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Вертикальная цилиндрическая ёмкость с конической крышей
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Вертикальная цилиндрическая ёмкость с конусообразной крышей. Полностью закрытая конструкция с люком в верхней части для обслуживания. Коническая форма крыши обеспечивает сток конденсата и предотвращает скопление осадков.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/evpp-conical-hero.png" alt="Вертикальная ёмкость с конической крышей" className="w-full h-auto object-contain" />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/evpp-conical-schema.png" alt="Схема ёмкости с конической крышей" className="w-full h-auto object-contain" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Anchor nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "calculator", label: "Калькулятор" },
            { id: "opisanie", label: "Описание" },
            { id: "modeli", label: "Модельный ряд" },
            { id: "cta-form", label: "Заявка" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </nav>

        <TankCalculator models={models} defaultType="conical" />

        {/* Description */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Описание</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Вертикальная цилиндрическая ёмкость с конической крышей предназначена для хранения воды, химических реагентов и технических жидкостей. 
            Конусообразная форма крыши обеспечивает естественный сток конденсата и предотвращает скопление осадков при наружной установке.
          </p>
          <h3 className="text-sm font-semibold text-foreground mb-2">Особенности конструкции:</h3>
          <ul className="space-y-2">
            {[
              "Коническая крыша — сток конденсата, защита от скопления осадков",
              "Люк в верхней части — удобный доступ для обслуживания",
              "Плоское дно — стандартная установка на ровную поверхность",
              "Усиленные рёбра жёсткости для повышенной прочности",
              "Материал: листовой полипропилен (ПП)",
              "Объём от 1 000 до 50 000 литров",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Model table */}
        <section id="modeli" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase border-l-4 border-amber-400 pl-3">Модельный ряд</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Артикул</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Объём, л</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Ø, мм</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">H, мм</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((m, i) => (
                    <tr
                      key={m.art}
                      onClick={() => navigate(`/product/${encodeURIComponent(m.art)}`)}
                      className={`cursor-pointer transition-colors hover:bg-primary/5 ${
                        i % 2 === 0 ? "bg-card" : "bg-muted/20"
                      }`}
                    >
                      <td className="px-4 py-2.5 font-medium text-primary">{m.art}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{m.vol.toLocaleString("ru-RU")}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{m.d.toLocaleString("ru-RU")}</td>
                      <td className="px-4 py-2.5 text-center text-foreground">{m.h.toLocaleString("ru-RU")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Кликните на строку для перехода в карточку товара</p>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10 scroll-mt-8">
          <div className="rounded-xl bg-slate-900 text-white p-6 sm:p-8">
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

const EmkostiEvppConical = () => (
  <CartProvider><EmkostiEvppConicalInner /></CartProvider>
);

export default EmkostiEvppConical;
