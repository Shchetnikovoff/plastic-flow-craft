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
  { article: "СЗПК.ЖУН.1.ПП", name: "ЖУН-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУН.2.ПП", name: "ЖУН-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУН.3.ПП", name: "ЖУН-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУН.4.ПП", name: "ЖУН-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУН.5.ПП", name: "ЖУН-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУН.6.ПП", name: "ЖУН-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУН.7.ПП", name: "ЖУН-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУН.8.ПП", name: "ЖУН-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУН.9.ПП", name: "ЖУН-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУН.10.ПП", name: "ЖУН-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУН.15.ПП", name: "ЖУН-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const optionsList = [
  "Откидная крышка для обслуживания",
  "Датчик уровня жира с сигнализацией",
  "Дренажный насос для откачки осадка",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Утеплённый корпус для эксплуатации при низких температурах",
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
  { label: "Наземные вертикальные" },
];

/* ── component ── */

const ZhuNazemnyeVertikalnye = () => {
  const navigate = useNavigate();

  return (
    <CatalogPageShell
      breadcrumbs={breadcrumbs}
      title="Наземные вертикальные жироуловители"
      seoDescription="Наземные вертикальные жироуловители из ПП."
      seoKeywords="жироуловитель вертикальный наземный, СЗПК"
      subtitle="Устанавливаются на ровную площадку внутри помещения или под навесом. Удобный доступ ко всем узлам, откидная крышка для обслуживания."
      heroImages={["/images/zhu-vertical-ral.jpg", "/images/zhu-underground-ral.jpg"]}
      sections={sections}
      formTitle="Оставить заявку"
      formSubtitle="Тип объекта, требуемая производительность — мы подберём оптимальный жироуловитель."
    >
      {/* Описание (slate-50) */}
      <FullBleedSection id="opisanie" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Описание</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>Наземные вертикальные жироуловители устанавливаются в технических и подвальных помещениях с учётом удобства подхода для обслуживания и подключаются к производственной канализационной сети. Конструкция без технического колодца — корпус открытый, с откидной крышкой.</p>
          <p>Корпус из листового полипропилена, устойчив к агрессивным средам. Производительность от 1 до 15 л/с. Изготовление по индивидуальным размерам и конфигурации.</p>
        </div>
      </FullBleedSection>

      {/* MidPageCTA */}
      <MidPageCTA text="Нужна консультация по подбору наземного жироуловителя?" />

      {/* Модельный ряд (white) */}
      <FullBleedSection id="modeli" className="bg-white py-10 md:py-14" wide>
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Модельный ряд</h2>
        <div className="rounded-lg border border-slate-200 overflow-auto mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Артикул</TableHead>
                <TableHead className="text-xs">Модель</TableHead>
                <TableHead className="text-xs text-right">л/с</TableHead>
                <TableHead className="text-xs text-right">Пиковый сброс, л</TableHead>
                <TableHead className="text-xs text-right">Ø корпуса, мм</TableHead>
                <TableHead className="text-xs text-right">Высота, мм</TableHead>
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
                  <TableCell className="text-xs text-right">{m.diameter}</TableCell>
                  <TableCell className="text-xs text-right">{m.height}</TableCell>
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

export default ZhuNazemnyeVertikalnye;
