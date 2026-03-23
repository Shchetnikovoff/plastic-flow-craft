import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import { CartProvider } from "@/contexts/CartContext";
import { Check, ShieldCheck, Clock, Truck, Settings, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import PageFooter from "@/components/PageFooter";

const models = [
  { art: "СЗПК.ЕВПП.1000", vol: 1000, d: 940, h: 1500 },
  { art: "СЗПК.ЕВПП.2000", vol: 2000, d: 1330, h: 1500 },
  { art: "СЗПК.ЕВПП.3000", vol: 3000, d: 1600, h: 1500 },
  { art: "СЗПК.ЕВПП.4000", vol: 4000, d: 1600, h: 2000 },
  { art: "СЗПК.ЕВПП.5000", vol: 5000, d: 1700, h: 2300 },
  { art: "СЗПК.ЕВПП.6000", vol: 6000, d: 1850, h: 2300 },
  { art: "СЗПК.ЕВПП.8000", vol: 8000, d: 2260, h: 2000 },
  { art: "СЗПК.ЕВПП.10000", vol: 10000, d: 2350, h: 2350 },
  { art: "СЗПК.ЕВПП.12000", vol: 12000, d: 2350, h: 2800 },
  { art: "СЗПК.ЕВПП.15000", vol: 15000, d: 2350, h: 3500 },
  { art: "СЗПК.ЕВПП.20000", vol: 20000, d: 2380, h: 4500 },
  { art: "СЗПК.ЕВПП.25000", vol: 25000, d: 2370, h: 5700 },
  { art: "СЗПК.ЕВПП.30000", vol: 30000, d: 2400, h: 6650 },
  { art: "СЗПК.ЕВПП.35000", vol: 35000, d: 3050, h: 4800 },
  { art: "СЗПК.ЕВПП.40000", vol: 40000, d: 3050, h: 5600 },
  { art: "СЗПК.ЕВПП.45000", vol: 45000, d: 3050, h: 6200 },
  { art: "СЗПК.ЕВПП.50000", vol: 50000, d: 3050, h: 7000 },
];

const advantages = [
  { icon: Settings, title: "Индивидуальный проект", text: "Изготовление ёмкости по вашему техническому заданию с учётом условий эксплуатации." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Каждый сварной шов проходит проверку на герметичность." },
  { icon: Clock, title: "Срок изготовления", text: "Стандартные модели — от 10 рабочих дней." },
  { icon: Truck, title: "Доставка по РФ", text: "Организуем доставку крупногабаритных ёмкостей в любой регион." },
  { icon: Wrench, title: "Гарантия 5 лет", text: "Гарантийное и послегарантийное обслуживание." },
];

const EmkostiVertikalnyePloskayaInner = () => {
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/emkosti">Ёмкости</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Вертикальные с плоской крышей</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">ООО СЗПК «Пласт-Металл ПРО»</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Ёмкости цилиндрические вертикальные с плоской крышей и плоским дном
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Ёмкости из полипропилена (ПП) — стандартная форма с плоской крышей и плоским дном. Объём от 1 000 до 50 000 литров.
          </p>
          <Button onClick={scrollToForm} className="gap-2">
            Получить расчёт стоимости
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/evpp-flat-hero.png" alt="Вертикальная цилиндрическая ёмкость с плоской крышей" className="w-full object-contain" width={1024} height={1024} />
            </div>
            <div className="rounded-lg border border-border overflow-hidden bg-card">
              <img src="/images/evpp-flat-schema.png" alt="Схема вертикальной ёмкости с плоской крышей" className="w-full object-contain" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Anchor nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          {[
            { id: "opisanie", label: "Описание" },
            { id: "modeli", label: "Модельный ряд" },
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

        {/* Description */}
        <section id="opisanie" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
            Описание конструкции
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Вертикальная цилиндрическая ёмкость с плоской крышей и плоским дном — полностью закрытая конструкция с приваренной к цилиндру крышей.
            Стандартная форма. Отличительная черта — полностью закрытая вертикальная цилиндрическая ёмкость с установленным в верхней части люком
            диаметром 800 мм со съёмной на болтовом соединении крышкой.
          </p>
          <ul className="space-y-2">
            {[
              "Материал: листовой полипропилен (ПП)",
              "Полностью закрытая конструкция с приваренной крышей",
              "Люк Ø800 мм со съёмной крышкой на болтах",
              "Объём от 1 000 до 50 000 литров",
              "Возможность установки штуцеров, уровнемеров, датчиков",
              "Изготовление по индивидуальному техническому заданию",
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
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Модельный ряд</h2>
          <div className="rounded-lg border border-border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs text-right">Объём, л</TableHead>
                  <TableHead className="text-xs text-right">Ø, мм</TableHead>
                  <TableHead className="text-xs text-right">H, мм</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((m) => (
                  <TableRow key={m.art} className="cursor-pointer hover:bg-accent/60 transition-colors">
                    <TableCell className="text-sm font-medium">
                      <Link to={`/product/${encodeURIComponent(m.art)}`} className="text-primary underline underline-offset-2 hover:text-primary/80">
                        {m.art}
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-right">{m.vol.toLocaleString("ru-RU")}</TableCell>
                    <TableCell className="text-sm text-right">{m.d.toLocaleString("ru-RU")}</TableCell>
                    <TableCell className="text-sm text-right">{m.h.toLocaleString("ru-RU")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Advantages */}
        <section id="preimushchestva" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Преимущества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages.map((a) => (
              <Card key={a.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <a.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Form */}
        <section id="cta-form" className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Оставить заявку</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs">Имя *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs">Телефон *</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="desc" className="text-xs">Описание задачи</Label>
              <Textarea id="desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Опишите требования: объём, среда, условия эксплуатации…" rows={3} />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit">Отправить заявку</Button>
            </div>
          </form>
        </section>

        <PageFooter />
      </main>
    </>
  );
};

const EmkostiVertikalnyePloskaya = () => (
  <CartProvider>
    <EmkostiVertikalnyePloskayaInner />
  </CartProvider>
);

export default EmkostiVertikalnyePloskaya;
