import { useState } from "react";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FeatureChecklist, AdvantagesGrid, SpecTable, FAQSection, DarkInfoBlock } from "@/components/corporate/sections";
import {
  Settings, ShieldCheck, Clock, Wrench, Truck, FlaskConical,
  Filter, Droplets, Eye, Gauge, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

/* ── static data ── */

const whyUs = [
  "Степень очистки ≥ 96%",
  "Производительность от 2 500 до 80 000 м³/ч",
  "Фильтрующий элемент — иглопробивное полотно на основе полипропилена",
  "Сухое и мокрое (с системой орошения) исполнение",
  "Корпус из ПП, ПНД или ПВХ",
  "Двустороннее обслуживание (кроме ФВГ-6,4)",
];

const specs = [
  { model: "ФВГ-0,37", flow: "2 500–5 000", area: "0,37", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-0,74", flow: "5 000–10 000", area: "0,74", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-1,6", flow: "10 000–20 000", area: "1,6", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-3,2", flow: "20 000–40 000", area: "3,2", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
  { model: "ФВГ-6,4", flow: "60 000–80 000", area: "6,4", conc: "10", rStart: "350", rEnd: "700", eff: "≥ 96" },
];

const dims = [
  { model: "ФВГ-0,37", L: "1050", L1: "480", H: "1000", H1: "600", H2: "700", D: "355", D1: "355", D2: "450" },
  { model: "ФВГ-0,74", L: "1100", L1: "480", H: "1000", H1: "600", H2: "700", D: "400", D1: "400", D2: "700" },
  { model: "ФВГ-1,6", L: "1150", L1: "480", H: "1200", H1: "830", H2: "900", D: "400", D1: "400", D2: "950" },
  { model: "ФВГ-3,2", L: "1350", L1: "480", H: "1250", H1: "830", H2: "950", D: "630", D1: "630", D2: "1050" },
  { model: "ФВГ-6,4", L: "1600", L1: "480", H: "2000", H1: "1550", H2: "2000", D: "1300", D1: "1300", D2: "1800" },
];

const designation = [
  { code: "ФВГ", meaning: "фильтр волокнистый для гальванических ванн" },
  { code: "ФВК", meaning: "фильтр кассетный гальванический" },
  { code: "0,37 / 0,74 / 1,6 / 3,2 / 6,4", meaning: "площадь поверхности фильтрования, м²" },
  { code: "1", meaning: "сухой фильтр (без системы орошения)" },
  { code: "2", meaning: "мокрый фильтр (с системой орошения)" },
  { code: "ПП, ПНД, ПВХ", meaning: "материал корпуса" },
  { code: "Л / П", meaning: "сторона обслуживания (только для ФВГ-6,4)" },
];

const wetAdvantages = [
  { icon: Package, title: "Простота конструкции", text: "Сравнительно невысокая стоимость изготовления и обслуживания." },
  { icon: Filter, title: "Высокая эффективность", text: "Превосходит сухие механические пылеуловители инерционного типа." },
  { icon: Gauge, title: "Компактные габариты", text: "Меньшие размеры по сравнению с тканевыми фильтрами и электрофильтрами." },
  { icon: Droplets, title: "Комплексная очистка", text: "Улавливание твёрдых частиц вместе с парами и газообразными компонентами." },
];

const extras = [
  { icon: Droplets, text: "Ёмкость для орошающей жидкости" },
  { icon: Settings, text: "Насос орошения" },
  { icon: Gauge, text: "Визуальный уровнемер жидкости" },
  { icon: Eye, text: "Смотровые окна в корпусе ФВГ" },
  { icon: Wrench, text: "Химически стойкая запорная арматура" },
];

const partnershipAdvantages = [
  { icon: Settings, title: "Индивидуальное проектирование", text: "Расчёт фильтра под конкретный состав выбросов, производительность и условия эксплуатации." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Испытания каждого изделия. Сварка по ГОСТ, материалы с сертификатами." },
  { icon: Clock, title: "Оперативность", text: "Изготовление — 10–25 рабочих дней. Монтаж — 1–3 дня." },
  { icon: Wrench, title: "Монтаж и сервис", text: "Шеф-монтаж, пусконаладка, обучение персонала, гарантийное обслуживание." },
  { icon: Truck, title: "Доставка по РФ", text: "Доставка спецтранспортом по всей России. Надёжная упаковка." },
  { icon: FlaskConical, title: "Документация", text: "Паспорт изделия, проект, сертификаты соответствия." },
];

const stats = [
  { value: "Скрубберы / ФВГ", label: "типы оборудования" },
  { value: "PP / PVC", label: "материалы" },
  { value: "от 14 дней", label: "срок изготовления" },
  { value: "5 лет", label: "гарантия" },
];

const faqItems = [
  { q: "Какие типы газоочистного оборудования?", a: "Скрубберы (вертикальные и горизонтальные), фильтры ФВГ, каплеуловители." },
  { q: "Из каких материалов?", a: "Полипропилен (PP) и ПВХ (PVC) — стойкие к агрессивным газам и парам." },
  { q: "Какая производительность?", a: "От 500 до 100 000 м³/ч в зависимости от модели." },
  { q: "Сроки изготовления?", a: "14–30 рабочих дней." },
  { q: "Выполняете монтаж?", a: "Да, шеф-монтаж и пусконаладка включены." },
];

/* ── component ── */

const GazoochistkaFvg = () => {
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
    <CorporatePageShell
      catalogTabs="gazoochistka"
      title="Фильтры волокнистые гальванические (ФВГ / ФВК)"
      subtitle="Высокоэффективная очистка воздушных вентиляционных выбросов в гальванических, травильных и химических производствах, из вытяжных шкафов и лабораторных помещений. Производительность от 2 500 до 80 000 м³/ч."
      heroImage="/images/gazoochistka-hero-1.png"
      breadcrumbs={[
        { label: "Каталог", href: "/catalog" },
        { label: "Газоочистка", href: "/catalog/gazoochistka" },
        { label: "Фильтры ФВГ / ФВК" },
      ]}
      stats={stats}
    >
      <FeatureChecklist
        id="opisanie"
        title="Почему выбирают наши фильтры"
        items={whyUs}
      />

      {/* Filter sizes info */}
      <DarkInfoBlock title="Размерный ряд фильтров">
        <p>
          Выпускаются 5 типоразмеров фильтров с площадью поверхности фильтрования: <span className="font-semibold text-slate-900">0,37</span>, <span className="font-semibold text-slate-900">0,74</span>, <span className="font-semibold text-slate-900">1,6</span>, <span className="font-semibold text-slate-900">3,2</span> и <span className="font-semibold text-slate-900">6,4</span> м².
        </p>
        <p>
          Производительность — от <span className="font-semibold text-slate-900">2 500</span> до <span className="font-semibold text-slate-900">80 000</span> м³/ч, что позволяет подобрать оптимальное решение для любого масштаба производства.
        </p>
      </DarkInfoBlock>

      {/* Principle */}
      <DarkInfoBlock id="princip" title="Принцип работы">
        <p>
          Внутри корпуса фильтра размещена кассета с фильтрующим иглопробивным полотном на основе полипропилена. Кассета изготовлена в виде вертикально расположенных складок. Установка и смена кассет осуществляются через монтажный люк в верхней части корпуса.
        </p>
        <p>
          Фильтр работает в режиме накопления уловленного продукта на поверхности фильтрующего материала с частичным стоком жидкости. При достижении перепада давления 700 Па (70 мм рт. ст.) фильтр подвергается периодической промывке — обычно один раз в 15–20 суток — с помощью переносной форсунки через промывочные люки.
        </p>
        <p>
          Система орошения (для мокрого исполнения) включает патрубок для подключения трубопровода орошающей жидкости, одну или несколько форсунок и патрубок отвода жидкости.
        </p>
      </DarkInfoBlock>

      {/* Designation */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-slate-900 mb-3 tracking-wide uppercase">Условное обозначение</h2>
        <p className="text-sm text-slate-500 mb-3">Пример: <span className="font-semibold text-slate-900">ФВГ-0,37-1-ПП</span></p>
        <div className="rounded-lg border border-slate-200 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Обозначение</TableHead>
                <TableHead className="text-xs">Расшифровка</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designation.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs font-medium whitespace-nowrap">{d.code}</TableCell>
                  <TableCell className="text-xs text-slate-500">{d.meaning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <SpecTable
        id="harakteristiki"
        title="Технические характеристики"
        columns={[
          { key: "model", label: "Фильтр" },
          { key: "flow", label: "Произв., м³/ч", align: "right" },
          { key: "area", label: "Площадь, м²", align: "right" },
          { key: "conc", label: "Макс. конц., мг/м³", align: "right" },
          { key: "rStart", label: "Сопр. нач., Па", align: "right" },
          { key: "rEnd", label: "Сопр. кон., Па", align: "right" },
          { key: "eff", label: "Очистка, %", align: "right" },
        ]}
        rows={specs}
      />

      <SpecTable
        title="Габаритные размеры, мм"
        columns={[
          { key: "model", label: "Тип" },
          { key: "L", label: "L", align: "right" },
          { key: "L1", label: "L1", align: "right" },
          { key: "H", label: "H", align: "right" },
          { key: "H1", label: "H1", align: "right" },
          { key: "H2", label: "H2", align: "right" },
          { key: "D", label: "D", align: "right" },
          { key: "D1", label: "D1", align: "right" },
          { key: "D2", label: "D2", align: "right" },
        ]}
        rows={dims}
      />

      <AdvantagesGrid
        title="Достоинства мокрой очистки газов"
        items={wetAdvantages}
        columns={2}
      />

      {/* Extras */}
      <section className="mb-10">
        <h2 className="text-base font-bold text-slate-900 mb-3 tracking-wide uppercase">Дополнительная комплектация</h2>
        <ul className="space-y-2">
          {extras.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
              <item.icon className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <AdvantagesGrid
        id="preimushchestva"
        title="Преимущества сотрудничества"
        items={partnershipAdvantages}
      />

      <FAQSection items={faqItems} />

      {/* CTA form */}
      <section id="cta-form" className="mb-10 scroll-mt-24">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <h2 className="text-base font-bold text-slate-900 mb-1 tracking-wide uppercase">Запросить расчёт</h2>
            <p className="text-xs text-slate-500 mb-4">Заполните форму — мы подберём фильтр под ваши параметры и подготовим коммерческое предложение.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">Имя *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Иван Петров" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">Телефон *</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 (___) ___-__-__" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email" className="text-xs">E-mail</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@company.ru" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description" className="text-xs">Описание задачи</Label>
                <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Тип производства, состав выбросов, требуемая производительность…" rows={4} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full sm:w-auto">Отправить заявку</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </CorporatePageShell>
  );
};

export default GazoochistkaFvg;
