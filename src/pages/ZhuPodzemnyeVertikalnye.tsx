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
  { article: "СЗПК.ЖУ.1.ПП", name: "ЖУ-1", throughput: "1", peakDischarge: "500", diameter: "800", height: "1300" },
  { article: "СЗПК.ЖУ.2.ПП", name: "ЖУ-2", throughput: "2", peakDischarge: "1000", diameter: "1000", height: "1600" },
  { article: "СЗПК.ЖУ.3.ПП", name: "ЖУ-3", throughput: "3", peakDischarge: "1500", diameter: "1200", height: "1500" },
  { article: "СЗПК.ЖУ.4.ПП", name: "ЖУ-4", throughput: "4", peakDischarge: "2000", diameter: "1350", height: "1550" },
  { article: "СЗПК.ЖУ.5.ПП", name: "ЖУ-5", throughput: "5", peakDischarge: "2500", diameter: "1350", height: "2000" },
  { article: "СЗПК.ЖУ.6.ПП", name: "ЖУ-6", throughput: "6", peakDischarge: "3000", diameter: "1450", height: "2000" },
  { article: "СЗПК.ЖУ.7.ПП", name: "ЖУ-7", throughput: "7", peakDischarge: "3500", diameter: "1550", height: "2000" },
  { article: "СЗПК.ЖУ.8.ПП", name: "ЖУ-8", throughput: "8", peakDischarge: "4000", diameter: "1650", height: "2000" },
  { article: "СЗПК.ЖУ.9.ПП", name: "ЖУ-9", throughput: "9", peakDischarge: "4500", diameter: "1750", height: "2000" },
  { article: "СЗПК.ЖУ.10.ПП", name: "ЖУ-10", throughput: "10", peakDischarge: "5000", diameter: "1850", height: "2000" },
  { article: "СЗПК.ЖУ.15.ПП", name: "ЖУ-15", throughput: "15", peakDischarge: "7500", diameter: "2200", height: "2000" },
];

const processSteps = [
  { step: "1", title: "Приём стоков", desc: "Жиросодержащие сточные воды поступают через входной патрубок в приёмную камеру." },
  { step: "2", title: "Гравитационное разделение", desc: "Жиры и масла всплывают на поверхность благодаря разности плотностей. Тяжёлые частицы оседают на дно." },
  { step: "3", title: "Накопление жира", desc: "Жировой слой накапливается в верхней зоне и периодически удаляется (вручную или автоматически)." },
  { step: "4", title: "Отвод очищенной воды", desc: "Очищенная вода забирается из средней зоны через выходной патрубок и направляется в канализацию." },
];

const optionsList = [
  "Надставка технического колодца (10–50 см)",
  "Лестница для обслуживания",
  "Крышка жироуловителя промышленного (чугун / ПП)",
  "Дозатор биопрепаратов",
  "Сигнализатор уровня жира",
  "Автоматический сборщик жира с таймером",
  "Коалесцентный модуль для повышения эффективности",
];

const sections = [
  { id: "opisanie", label: "Описание" },
  { id: "modeli", label: "Модели" },
  { id: "princip", label: "Принцип работы" },
  { id: "opcii", label: "Опции" },
  { id: "cta-form", label: "Заявка" },
];

const breadcrumbs = [
  { label: "Каталог", href: "/catalog" },
  { label: "Водоочистка", href: "/catalog/vodoochistka" },
  { label: "Жироуловители", href: "/catalog/vodoochistka/zhirouloviteli" },
  { label: "Подземные вертикальные" },
];

/* ── component ── */

const ZhuPodzemnyeVertikalnye = () => {
  const navigate = useNavigate();

  return (
    <CatalogPageShell
      breadcrumbs={breadcrumbs}
      title="Подземные вертикальные жироуловители"
      seoDescription="Подземные вертикальные жироуловители из ПП."
      seoKeywords="жироуловитель подземный, СЗПК"
      subtitle="Цилиндрический корпус для заглублённого монтажа. Минимальная занимаемая площадь, обслуживание через горловину технического колодца."
      heroImages={["/images/zhu-pv-hero-ral7032.jpg", "/images/zhu-pv-schema1.png", "/images/zhu-pv-schema2.png"]}
      sections={sections}
      formTitle="Оставить заявку"
      formSubtitle="Тип объекта, требуемая производительность — мы подберём оптимальный жироуловитель."
    >
      {/* Описание (slate-50) */}
      <FullBleedSection id="opisanie" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Описание</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-3">
          <p>Подземные вертикальные жироуловители размещаются в грунте — на поверхность выходит только крышка технического колодца. Монтаж производится на бетонное основание (H-200 мм), с обсыпкой пескоцементной смесью 1:10, слоем не менее 200 мм.</p>
          <p>Предназначены для улавливания и удаления неэмульгированных жиров и масел из сточных вод кухонь, ресторанов, мясоперерабатывающих предприятий в соответствии со СНиП 2.04.01-85. Корпус из пищевого полипропилена, срок службы — не менее 25 лет.</p>
        </div>
      </FullBleedSection>

      {/* MidPageCTA */}
      <MidPageCTA text="Нужна консультация по подбору подземного жироуловителя?" />

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

      {/* Принцип работы (slate-50) */}
      <FullBleedSection id="princip" className="bg-slate-50 border-y border-slate-200 py-10 md:py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Принцип работы</h2>
        <div className="space-y-3">
          {processSteps.map((s) => (
            <div key={s.step} className="flex gap-3 items-start rounded-xl border-l-4 border-l-amber-500 bg-white border border-slate-200 p-4">
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-amber-500 text-white text-xs font-bold shrink-0">
                {s.step}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{s.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FullBleedSection>

      {/* Опции (white) */}
      <FullBleedSection id="opcii" className="bg-white py-10 md:py-14">
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

export default ZhuPodzemnyeVertikalnye;
