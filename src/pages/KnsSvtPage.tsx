import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { AdvantagesGrid, FeatureChecklist, FAQSection } from "@/components/corporate/sections";
import { Check, ShieldCheck, Wrench, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { knsSvtProducts } from "@/data/knsSvtProducts";

const stats = [
  { value: "SVT / ПП", label: "типы корпусов" },
  { value: "PP / PE", label: "материалы" },
  { value: "от 21 дня", label: "сроки" },
  { value: "5 лет", label: "гарантия" },
];

const features = [
  "Корпус из стеклопластика SVT — высокая прочность и коррозионная стойкость",
  "Подземное размещение, устойчивость к грунтовым водам и давлению грунта",
  "Диаметр корпуса от 1300 до 1500 мм, глубина заложения до 10 м",
  "Комплектация погружными насосами (Grundfos, Wilo, KSB)",
  "Шкаф управления с датчиками уровня, защита от сухого хода",
  "Вентиляция, обратные клапаны, направляющие для насосов",
];

const specs = [
  { icon: Settings, title: "Конструкция", text: "Цилиндрический корпус SVT с усиленными рёбрами жёсткости. Днище плоское или коническое." },
  { icon: ShieldCheck, title: "Материал", text: "Стеклопластик SVT — не подвержен коррозии, срок службы от 30 лет." },
  { icon: Wrench, title: "Комплектация", text: "2 погружных насоса (1 рабочий + 1 резервный), запорная арматура, обратные клапаны, люк, вентиляция." },
];

const faq = [
  { q: "Из каких материалов?", a: "PP, PE, PVC — подбор по рабочей среде и температуре." },
  { q: "Какие сроки изготовления?", a: "14–30 рабочих дней в зависимости от сложности." },
  { q: "Проектируете под заказ?", a: "Да, по вашим ТЗ или с нуля." },
  { q: "Доставка и монтаж?", a: "Спецтранспорт по всей РФ, шеф-монтаж на объекте." },
  { q: "Какая гарантия?", a: "5 лет на всё оборудование." },
];

const KnsSvtPage = () => (
  <CorporatePageShell
      catalogTabs="kns"
    breadcrumbs={[
      { label: "Каталог", href: "/catalog" },
      { label: "КНС", href: "/catalog/kns" },
      { label: "КНС в корпусе SVT" },
    ]}
    title="Канализационные насосные станции в корпусе SVT"
    subtitle="КНС из стеклопластика — максимальная прочность и долговечность для подземного размещения."
    heroImage="/images/kns-svt-cutaway.jpg"
    stats={stats}
  >
    {/* Product Table */}
    <section className="w-full bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Типоразмерный ряд</h2>
        <div className="rounded-lg border border-slate-200 overflow-x-auto">
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
              {knsSvtProducts.map((p) => (
                <TableRow key={p.article} className="hover:bg-slate-100/50">
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
      </div>
    </section>

    <FeatureChecklist title="Особенности конструкции" items={features} />

    {/* Specs cards */}
    <section className="w-full bg-slate-50 border-y border-slate-200 py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Технические характеристики</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {specs.map((s) => (
            <Card key={s.title}>
              <CardContent className="p-4 flex items-start gap-3">
                <s.icon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-1">{s.title}</p>
                  <p className="text-xs text-slate-500">{s.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <FAQSection items={faq} />
  </CorporatePageShell>
);

export default KnsSvtPage;
