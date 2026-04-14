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
import { nutchFiltrProducts } from "@/data/nutchFiltrProducts";
import ArticleBreakdown from "@/components/configurator/ArticleBreakdown";
import { toast } from "sonner";
import { useState } from "react";
import PageFooter from "@/components/PageFooter";

const features = [
  "Корпус из листового полипропилена — стойкость к кислотам, щелочам и органическим растворителям",
  "Перфорированная решётка с диаметром отверстий 3 мм, шаг 10 мм",
  "Площадь фильтрации от 0,05 до 1,54 м² — лабораторные и промышленные модели",
  "Работа под вакуумом или под давлением",
  "Компактные модели (НК) для ограниченных пространств",
  "Изготовление из ПП, ПНД и ПВДФ по требованию заказчика",
];

const specs = [
  { icon: Settings, title: "Конструкция", text: "Цилиндрический корпус с перфорированной решёткой, ёмкость для суспензии (верхняя) и ёмкость для фильтрата (нижняя). Сварные швы — экструзионная сварка." },
  { icon: ShieldCheck, title: "Материал", text: "Полипропилен PP-H — устойчив к агрессивным средам. Возможно изготовление из ПНД и ПВДФ. Срок службы от 25 лет." },
  { icon: Wrench, title: "Применение", text: "Вакуумная фильтрация пульп и суспензий в гидрометаллургии, химической и фармацевтической промышленности." },
];

const articleSegments = [
  { value: "НФ", label: "Тип", desc: "Нутч-фильтр" },
  { value: "П", label: "Класс", desc: "Лабораторный (Л) / Промышленный (П)" },
  { value: "0,79", label: "S фильтр.", desc: "Площадь фильтрации, м²" },
  { value: "1000", label: "∅ корпуса", desc: "Диаметр корпуса, мм" },
  { value: "ПП", label: "Материал", desc: "ПП, ПНД или ПВДФ" },
];

const formatPrice = (p: number) => p.toLocaleString("ru-RU") + " ₽";

const NutchFiltrPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { toast.error("Заполните обязательные поля"); return; }
    toast.success("Заявка отправлена!");
    setForm({ name: "", phone: "", email: "", description: "" });
  };

  const scrollToForm = () => document.getElementById("cta-form")?.scrollIntoView({ behavior: "smooth" });

  const standardProducts = nutchFiltrProducts.filter(p => p.group === "standard");
  const compactProducts = nutchFiltrProducts.filter(p => p.group === "compact");

  const renderTable = (products: typeof nutchFiltrProducts, title: string) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Артикул</TableHead>
              <TableHead className="text-xs text-center">∅ корпуса, мм</TableHead>
              <TableHead className="text-xs text-center">S фильтр., м²</TableHead>
              <TableHead className="text-xs text-center">V суспензии, л</TableHead>
              <TableHead className="text-xs text-center">V фильтрата, л</TableHead>
              <TableHead className="text-xs text-center">Перфорация, мм</TableHead>
              <TableHead className="text-xs text-right">Цена с НДС</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.article} className="hover:bg-muted/50">
                <TableCell className="text-sm font-medium">{p.article}</TableCell>
                <TableCell className="text-sm text-center">{p.diam}</TableCell>
                <TableCell className="text-sm text-center">{p.area}</TableCell>
                <TableCell className="text-sm text-center">{p.suspVol}</TableCell>
                <TableCell className="text-sm text-center">{p.filtVol}</TableCell>
                <TableCell className="text-sm text-center">{p.perforation}</TableCell>
                <TableCell className="text-sm text-right font-medium">{formatPrice(p.price)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <ProductPageShell productType="otvod">
      <main className="mx-auto max-w-[960px] px-4 sm:px-6 py-6 sm:py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog">Каталог</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/gidrometallurgiya">Гидрометаллургия</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Нутч-фильтры</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero */}
        <section className="mb-10">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Гидрометаллургия · Нутч-фильтры</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
            Нутч-фильтры из полипропилена
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Ёмкостные вакуумные фильтры для фильтрации пульп и суспензий — 13 типоразмеров, площадь фильтрации от 0,05 до 1,54 м².
          </p>
          <Button onClick={scrollToForm}>Получить расчёт стоимости</Button>
          <div className="mt-6 rounded-lg border border-border overflow-hidden bg-card">
            <img src="/images/nutch-filtr-vakuum.jpg" alt="Нутч-фильтр из полипропилена" className="w-full object-contain" />
          </div>
        </section>

        <section className="mb-10">
          <ArticleBreakdown
            exampleArticle="НФ-П-0,79-1000-ПП"
            segments={articleSegments}
          />
        </section>

        {/* Product Tables */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Типоразмерный ряд</h2>
          {renderTable(standardProducts, "Стандартные модели")}
          {renderTable(compactProducts, "Компактные модели (НК — низкий корпус)")}
          <p className="text-xs text-muted-foreground mt-3">Изготовление нутч-фильтров нестандартных размеров — по запросу. Свяжитесь с нами для расчёта.</p>
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
              <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Заказать нутч-фильтр</h2>
              <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
                <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
                <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
                <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип суспензии, объём, требуемая площадь фильтрации…" rows={3} maxLength={1000} /></div>
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

export default NutchFiltrPage;
