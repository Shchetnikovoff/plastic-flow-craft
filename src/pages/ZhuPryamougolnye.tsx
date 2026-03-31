import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import CatalogPageShell from "@/components/layout/CatalogPageShell";
import FullBleedSection from "@/components/layout/FullBleedSection";
import MidPageCTA from "@/components/catalog-sections/MidPageCTA";

/* ── static data ── */

const models = [
  { article: "СЗПК.ЖУП.1.ПП", name: "ЖУП-1", throughput: "1", peakDischarge: "500", dimensions: "1050×750×1120" },
  { article: "СЗПК.ЖУП.2.ПП", name: "ЖУП-2", throughput: "2", peakDischarge: "1000", dimensions: "1400×850×1320" },
  { article: "СЗПК.ЖУП.3.ПП", name: "ЖУП-3", throughput: "3", peakDischarge: "1500", dimensions: "1500×1000×1320" },
  { article: "СЗПК.ЖУП.4.ПП", name: "ЖУП-4", throughput: "4", peakDischarge: "2000", dimensions: "1650×1000×1500" },
  { article: "СЗПК.ЖУП.5.ПП", name: "ЖУП-5", throughput: "5", peakDischarge: "2500", dimensions: "1650×1200×1520" },
  { article: "СЗПК.ЖУП.6.ПП", name: "ЖУП-6", throughput: "6", peakDischarge: "3000", dimensions: "1750×1250×1670" },
  { article: "СЗПК.ЖУП.7.ПП", name: "ЖУП-7", throughput: "7", peakDischarge: "3500", dimensions: "2000×1300×1670" },
  { article: "СЗПК.ЖУП.8.ПП", name: "ЖУП-8", throughput: "8", peakDischarge: "4000", dimensions: "2000×1500×1670" },
  { article: "СЗПК.ЖУП.9.ПП", name: "ЖУП-9", throughput: "9", peakDischarge: "4500", dimensions: "2300×1500×1670" },
  { article: "СЗПК.ЖУП.10.ПП", name: "ЖУП-10", throughput: "10", peakDischarge: "5000", dimensions: "2550×1500×1670" },
  { article: "СЗПК.ЖУП.15.ПП", name: "ЖУП-15", throughput: "15", peakDischarge: "7500", dimensions: "2800×1500×2020" },
  { article: "СЗПК.ЖУП.20.ПП", name: "ЖУП-20", throughput: "20", peakDischarge: "10000", dimensions: "3500×1600×2020" },
  { article: "СЗПК.ЖУП.25.ПП", name: "ЖУП-25", throughput: "25", peakDischarge: "12500", dimensions: "4000×1650×2120" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Рёбра жёсткости для повышенных нагрузок",
];

const sections = [
  { id: "opisanie", label: "Описание" },
  { id: "modeli", label: "Модели" },
  { id: "opcii", label: "Опции" },
  { id: "cta-form", label: "Заявка" },
];

const breadcrumbs = [
  { label: "Каталог", href: "/catalog" },
  { label: "Водоочистка", href: "/catalog/vodoochistka" },
  { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
  { label: "Прямоугольные наземные" },
];

/* ── component ── */

const ZhuPryamougolnye = () => {
  const navigate = useNavigate();

  return (
    <CatalogPageShell
      breadcrumbs={breadcrumbs}
      title="Прямоугольные наземные жироуловители"
      seoDescription="Прямоугольные жироуловители из ПП."
      seoKeywords="жироуловитель прямоугольный, СЗПК"
      subtitle="Корпус прямоугольного сечения из листового ПП с рёбрами жёсткости. Оптимальны для встраивания в ограниченные пространства технических помещений."
      heroImages={["/images/zhu-p-hero-ral7032.jpg"]}
      sections={sections}
      formTitle="Оставить заявку"
      formSubtitle="Тип объекта, требуемая производительность — мы подберём оптимальный жироуловитель."
    >
      {/* Описание (slate-50) */}
      <FullBleedSection id="opisanie" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Описание</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>Прямоугольные жироуловители из листового полипропилена толщиной 5–10 мм с рёбрами жёсткости — оптимальное решение для ограниченных пространств технических помещений. Компактная прямоугольная форма позволяет устанавливать оборудование вплотную к стенам.</p>
          <p>Корпус оснащён герметичной откидной крышкой с уплотнителем EPDM, внутренними седиментационными пластинами для повышения эффективности сепарации и патрубками для подключения к канализации. Производительность от 1 до 25 л/с, пиковый сброс от 500 до 12 500 литров.</p>
          <p>Предназначены для улавливания неэмульгированных жиров и масел из сточных вод кухонь, ресторанов, столовых, мясоперерабатывающих предприятий в соответствии со СНиП 2.04.01-85. Срок службы — не менее 25 лет.</p>
        </div>
      </FullBleedSection>

      {/* MidPageCTA */}
      <MidPageCTA text="Нужна консультация по подбору прямоугольного жироуловителя?" />

      {/* Модельный ряд (white) */}
      <FullBleedSection id="modeli" className="bg-white py-10 md:py-14" wide>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Модельный ряд</h2>
        <div className="rounded-lg border border-slate-200 overflow-auto mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Артикул</TableHead>
                <TableHead className="text-xs">Модель</TableHead>
                <TableHead className="text-xs text-right">Произв., л/с</TableHead>
                <TableHead className="text-xs text-right">Пиковый сброс, л</TableHead>
                <TableHead className="text-xs text-right">Габариты (Д×Ш×В), мм</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((m, i) => (
                <TableRow
                  key={m.article}
                  className={`cursor-pointer hover:bg-amber-50 transition-colors ${i % 2 === 1 ? "bg-muted/50" : ""}`}
                  onClick={() => navigate(`/product/${encodeURIComponent(m.article)}`)}
                >
                  <TableCell className="text-xs font-mono font-medium text-amber-600 underline">{m.article}</TableCell>
                  <TableCell className="text-xs font-medium">{m.name}</TableCell>
                  <TableCell className="text-xs text-right">{m.throughput}</TableCell>
                  <TableCell className="text-xs text-right">{m.peakDischarge}</TableCell>
                  <TableCell className="text-xs text-right">{m.dimensions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-slate-500">Возможно изготовление по индивидуальным размерам.</p>
      </FullBleedSection>

      {/* Опции (slate-50) */}
      <FullBleedSection id="opcii" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Дополнительное оборудование</h2>
        <ul className="space-y-1.5">
          {optionsList.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <Check className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </FullBleedSection>
    </CatalogPageShell>
  );
};

export default ZhuPryamougolnye;
