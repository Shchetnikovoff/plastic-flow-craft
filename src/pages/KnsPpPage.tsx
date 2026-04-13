import { Link } from "react-router-dom";
import ProductPageShell from "@/components/configurator/ProductPageShell";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, ShieldCheck, Wrench, Settings } from "lucide-react";
import { knsPpProducts } from "@/data/knsPpProducts";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import PageFooter from "@/components/PageFooter";
import { removeWatermark } from "@/lib/removeWatermark";

const features = [
  "Корпус из листового полипропилена — химическая стойкость к кислотам и щелочам",
  "Сварная конструкция с рёбрами жёсткости для подземного размещения",
  "Диаметр корпуса от 1300 до 1500 мм, глубина заложения до 8 м",
  "Комплектация погружными насосами (Grundfos, Wilo, KSB)",
  "Шкаф управления с датчиками уровня, защита от сухого хода",
  "Облегчённый монтаж, малый вес конструкции",
];

const specs = [
  { icon: Settings, title: "Конструкция", text: "Цилиндрический корпус из полипропилена с рёбрами жёсткости. Сварные швы — экструзионная сварка." },
  { icon: ShieldCheck, title: "Материал", text: "Полипропилен PP-H / PP-B — устойчив к агрессивным стокам, срок службы от 25 лет." },
  { icon: Wrench, title: "Комплектация", text: "2 погружных насоса (1 рабочий + 1 резервный), запорная арматура, обратные клапаны, люк, вентиляция." },
];

const KnsPpPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  const scrollToForm = () => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <ProductPageShell productType="otvod">
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/kns">КНС</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>КНС в корпусе из полипропилена</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">9.2 КНС в корпусе из полипропилена</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Канализационные насосные станции в корпусе из полипропилена
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            КНС из полипропилена — лёгкий монтаж, химическая стойкость и долговечность для агрессивных сред.
          </p>
          <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          <div className="mt-6 rounded-lg border border-border overflow-hidden bg-card">
            <img src="/images/kns-pp-cutaway.jpg" alt="КНС в корпусе из полипропилена — разрез" className="w-full object-contain" />
          </div>
        </section>

        {/* Product Table */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Модель</TableHead>
                  <TableHead className="text-xs text-center">D, мм</TableHead>
                  <TableHead className="text-xs text-center">H, мм</TableHead>
                  <TableHead className="text-xs text-center">Q, м³/ч</TableHead>
                  <TableHead className="text-xs text-center">H, м</TableHead>
                  <TableHead className="text-xs text-center">Qmax</TableHead>
                  <TableHead className="text-xs text-center">Hmax</TableHead>
                  <TableHead className="text-xs text-center">Насосы</TableHead>
                  <TableHead className="text-xs text-center">P, кВт</TableHead>
                  <TableHead className="text-xs text-right">Цена, ₽</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {knsPpProducts.map((p) => (
                  <TableRow key={p.article} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">{p.model}</TableCell>
                    <TableCell className="text-sm text-center">{p.diameter}</TableCell>
                    <TableCell className="text-sm text-center">{p.height}</TableCell>
                    <TableCell className="text-sm text-center">{p.flow}</TableCell>
                    <TableCell className="text-sm text-center">{p.head}</TableCell>
                    <TableCell className="text-sm text-center">{p.maxFlow}</TableCell>
                    <TableCell className="text-sm text-center">{p.maxHead}</TableCell>
                    <TableCell className="text-sm text-center">{p.pumpCount}</TableCell>
                    <TableCell className="text-sm text-center">{p.pumpPower}</TableCell>
                    <TableCell className="text-sm text-right whitespace-nowrap">{p.price.toLocaleString("ru-RU")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Особенности конструкции</h2>
          <ul className="space-y-2">
            {features.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Specs cards */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Технические характеристики</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {specs.map((s) => (
              <Card key={s.title}>
                <CardContent className="p-4 flex items-start gap-3">
                  <s.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.text}</p>
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
              <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Заказать КНС из полипропилена</h2>
              <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
                <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
                <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
                <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Расход, напор, глубина заложения…" rows={3} maxLength={1000} /></div>
                <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
              </form>
            </CardContent>
          </Card>
        </section>

        <PageFooter />
      </main>
    </ProductPageShell>
  );
};

export default KnsPpPage;
