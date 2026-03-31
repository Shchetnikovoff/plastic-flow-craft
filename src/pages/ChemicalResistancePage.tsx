import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import { FeatureChecklist } from "@/components/corporate/sections";

const materials = [
  "PP (полипропилен) — стойкость к кислотам и щелочам до 100 °C",
  "PE (полиэтилен) — устойчив к большинству неорганических кислот",
  "PVC (поливинилхлорид) — хорошая стойкость к кислотам, щелочам, солям",
  "PVDF (поливинилиденфторид) — высокая химическая и термическая стойкость",
  "Все материалы сертифицированы и соответствуют ГОСТ",
];

const ChemicalResistancePage = () => (
  <CorporatePageShell
    title="Химическая"
    accentWord="стойкость материалов"
  >
    <section>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Мы используем инженерные полимеры с высокой химической стойкостью для производства
        оборудования, работающего в агрессивных средах. Ниже представлены основные характеристики
        материалов, применяемых в нашей продукции.
      </p>
    </section>

    <FeatureChecklist title="Материалы и свойства" items={materials} />

    <section>
      <h2 className="text-base font-bold text-foreground mb-3 tracking-wide uppercase">
        Подбор материала
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Для подбора оптимального материала под вашу среду свяжитесь с нашими инженерами.
        Мы проведём расчёт и предложим решение с учётом температуры, концентрации и давления рабочей среды.
      </p>
    </section>
  </CorporatePageShell>
);

export default ChemicalResistancePage;
