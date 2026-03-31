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
  { article: "СЗПК.ЖУГ.1.ПП", name: "ЖУГ-1", throughput: "1", peakDischarge: "500", dimensions: "Ø800×L1200" },
  { article: "СЗПК.ЖУГ.2.ПП", name: "ЖУГ-2", throughput: "2", peakDischarge: "1000", dimensions: "Ø1000×L1500" },
  { article: "СЗПК.ЖУГ.3.ПП", name: "ЖУГ-3", throughput: "3", peakDischarge: "1500", dimensions: "Ø1000×L2000" },
  { article: "СЗПК.ЖУГ.4.ПП", name: "ЖУГ-4", throughput: "4", peakDischarge: "2000", dimensions: "Ø1200×L2000" },
  { article: "СЗПК.ЖУГ.5.ПП", name: "ЖУГ-5", throughput: "5", peakDischarge: "2500", dimensions: "Ø1200×L2400" },
  { article: "СЗПК.ЖУГ.6.ПП", name: "ЖУГ-6", throughput: "6", peakDischarge: "3000", dimensions: "Ø1280×L2600" },
  { article: "СЗПК.ЖУГ.7.ПП", name: "ЖУГ-7", throughput: "7", peakDischarge: "3500", dimensions: "Ø1280×L2900" },
  { article: "СЗПК.ЖУГ.8.ПП", name: "ЖУГ-8", throughput: "8", peakDischarge: "4000", dimensions: "Ø1280×L3300" },
  { article: "СЗПК.ЖУГ.9.ПП", name: "ЖУГ-9", throughput: "9", peakDischarge: "4500", dimensions: "Ø1280×L3750" },
  { article: "СЗПК.ЖУГ.10.ПП", name: "ЖУГ-10", throughput: "10", peakDischarge: "5000", dimensions: "Ø1400×L3500" },
  { article: "СЗПК.ЖУГ.15.ПП", name: "ЖУГ-15", throughput: "15", peakDischarge: "7500", dimensions: "Ø1600×L3900" },
  { article: "СЗПК.ЖУГ.20.ПП", name: "ЖУГ-20", throughput: "20", peakDischarge: "10000", dimensions: "Ø1600×L5100" },
  { article: "СЗПК.ЖУГ.25.ПП", name: "ЖУГ-25", throughput: "25", peakDischarge: "12500", dimensions: "Ø1600×L6300" },
];

const optionsList = [
  "Дренажный насос для откачки осадка",
  "Датчик уровня жира с сигнализацией",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
  "Утеплённый корпус для эксплуатации при низких температурах",
  "Лестница для обслуживания (подземные модели)",
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
  { label: "Горизонтальные" },
];

/* ── component ── */

const ZhuGorizontalnye = () => {
  const navigate = useNavigate();

  return (
    <CatalogPageShell
      breadcrumbs={breadcrumbs}
      title="Горизонтальные жироуловители"
      seoDescription="Горизонтальные жироуловители из ПП для общепита."
      seoKeywords="жироуловитель горизонтальный, СЗПК"
      subtitle="Увеличенная зона отстаивания для больших объёмов стоков. Подземное исполнение. Производительность до 25 л/с."
      heroImages={["/images/zhu-g-hero-ral7032.jpg", "/images/zhu-g-schema1.png", "/images/zhu-g-schema3.png"]}
      sections={sections}
      formTitle="Оставить заявку"
      formSubtitle="Тип объекта, требуемая производительность — мы подберём оптимальный жироуловитель."
    >
      {/* Описание (slate-50) */}
      <FullBleedSection id="opisanie" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Описание</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>Подземный горизонтальный жироуловитель представляет собой цилиндрическую пластиковую ёмкость, внутри которой оборудованы две камеры. Сверху жироуловитель закрывается крышкой. Сточная вода через входной патрубок поступает в 1-й отсек, выполняющий роль отстойника ила, где происходит отделение крупного мусора и тяжёлых загрязнений, оседающих на дне.</p>
          <p>Далее вода поступает во 2-й отсек, выполняющий функцию жироуловителя, в котором происходит окончательное отделение жиров. Очищенная вода через распределительный карман поступает в отводящий патрубок и отводится в канализационную сеть.</p>
          <p>Изготовление в стандартном варианте с диаметром патрубков 110, 160 или 200 мм, а также по проекту заказчика. В комплекте — колодец высотой 500 мм и диаметром 700 мм. Монтаж на бетонное основание H-200 мм с обсыпкой пескоцементной смесью 1:10, слоем не менее 200 мм.</p>
        </div>
      </FullBleedSection>

      {/* MidPageCTA */}
      <MidPageCTA text="Нужна консультация по подбору горизонтального жироуловителя?" />

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
                <TableHead className="text-xs text-right">Пик. сброс, л</TableHead>
                <TableHead className="text-xs text-right">Габариты, мм</TableHead>
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

export default ZhuGorizontalnye;
