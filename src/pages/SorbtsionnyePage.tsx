import { Link, useNavigate } from "react-router-dom";
import ProductPageShell from "@/components/configurator/ProductPageShell";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, ShieldCheck, Wrench, Settings } from "lucide-react";
import { sorbtsionnyeProducts } from "@/data/sorbtsionnyeProducts";
import ArticleBreakdown from "@/components/configurator/ArticleBreakdown";
import { toast } from "sonner";
import { useState } from "react";
import PageFooter from "@/components/PageFooter";

const features = [
  "Корпус из листового полипропилена PP-H — устойчив к кислотным и щелочным растворам",
  "Конусное, наклонное или плоское дно — в зависимости от объёма и задачи",
  "Штуцеры для подачи раствора, отвода фильтрата, загрузки и выгрузки сорбента",
  "Нижняя часть может усиливаться обечайкой из нержавеющей стали",
  "Комплектация запорной арматурой, трубопроводами, люками",
  "Объём от 0,1 до 30 м³ — для лабораторных и промышленных задач",
];

const specs = [
  { icon: Settings, title: "Конструкция", text: "Цилиндрическая колонна с конусным/наклонным/плоским дном. Сварка полифузионная и экструзионная. Оборудование по ТУ." },
  { icon: ShieldCheck, title: "Материал", text: "Полипропилен PP-H или полиэтилен ПНД. Химическая стойкость по ГОСТ 26996-86. Гарантия — 1 год, ресурс — от 10 лет." },
  { icon: Wrench, title: "Применение", text: "Угольно-сорбционное извлечение золота, серебра. Ионообменная сорбция цветных и редкоземельных металлов. Десорбция и регенерация." },
];

const articleSegments = [
  { value: "СК", label: "Тип", desc: "Сорбционная колонна" },
  { value: "5,0", label: "Объём", desc: "Рабочий объём, м³" },
  { value: "1400", label: "∅ корпуса", desc: "Диаметр корпуса, мм" },
  { value: "ПП", label: "Материал", desc: "ПП или ПНД" },
];

const SorbtsionnyePage = () => {
  const navigate = useNavigate();
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
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/catalog/gidrometallurgiya">Гидрометаллургия</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Сорбционные установки</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">Сорбционные колонны и установки</h1>
          <p className="text-sm text-muted-foreground mb-4">Полипропиленовые колонны для угольно-сорбционного и ионообменного извлечения металлов из растворов. Объём от 0,1 до 30 м³.</p>
          <Button onClick={scrollToForm} size="sm">Запросить расчёт</Button>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Типоразмерный ряд</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Артикул</TableHead>
                  <TableHead className="text-xs text-center">Объём, м³</TableHead>
                  <TableHead className="text-xs text-center">∅, мм</TableHead>
                  <TableHead className="text-xs text-center">Высота, мм</TableHead>
                  <TableHead className="text-xs text-center">Тип дна</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorbtsionnyeProducts.map((p) => (
                  <TableRow key={p.article} className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => navigate(`/product/${encodeURIComponent(p.article)}`)}>
                    <TableCell className="text-xs font-medium text-primary">{p.article}</TableCell>
                    <TableCell className="text-xs text-center">{p.volume}</TableCell>
                    <TableCell className="text-xs text-center">{p.diam}</TableCell>
                    <TableCell className="text-xs text-center">{p.height}</TableCell>
                    <TableCell className="text-xs text-center">{p.bottomType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Расшифровка артикула</h2>
          <ArticleBreakdown exampleArticle="СК-5,0-1400 ПП" segments={articleSegments} />
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">Особенности конструкции</h2>
          <ul className="space-y-2">{features.map((f, i) => (<li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{f}</span></li>))}</ul>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold text-foreground mb-4 tracking-wide uppercase">Характеристики</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {specs.map((s) => (
              <Card key={s.title}><CardContent className="p-4 flex items-start gap-3"><s.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div><p className="text-sm font-semibold text-foreground mb-1">{s.title}</p><p className="text-xs text-muted-foreground">{s.text}</p></div></CardContent></Card>
            ))}
          </div>
        </section>

        <section id="cta-form" className="mb-10 scroll-mt-20">
          <Card><CardContent className="p-6">
            <h2 className="text-base font-bold text-foreground mb-2 tracking-wide uppercase">Заказать сорбционную установку</h2>
            <p className="text-sm text-muted-foreground mb-5">Оставьте заявку — расчёт в течение 24 часов.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label className="text-xs">Имя *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" maxLength={100} /></div>
              <div className="space-y-1.5"><Label className="text-xs">Телефон *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" maxLength={20} /></div>
              <div className="space-y-1.5"><Label className="text-xs">E-mail</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="mail@example.com" maxLength={255} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label className="text-xs">Описание задачи</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Укажите тип сорбента, среду, объём…" rows={3} maxLength={1000} /></div>
              <div className="sm:col-span-2"><Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button></div>
            </form>
          </CardContent></Card>
        </section>
        <PageFooter />
      </main>
    </ProductPageShell>
  );
};

export default SorbtsionnyePage;
