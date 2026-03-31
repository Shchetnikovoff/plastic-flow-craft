import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { KPTerms } from "@/types/kp";

interface KPTermsFormProps {
  terms: KPTerms;
  onChange: (terms: KPTerms) => void;
}

export function KPTermsForm({ terms, onChange }: KPTermsFormProps) {
  const update = (field: keyof KPTerms, value: string | number) => {
    onChange({ ...terms, [field]: value });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Условия</h3>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="kp-production">Срок изготовления (р.д.)</Label>
          <Input id="kp-production" type="number" min={1} value={terms.productionDays}
            onChange={(e) => update("productionDays", parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <Label htmlFor="kp-warranty">Гарантия (мес)</Label>
          <Input id="kp-warranty" type="number" min={0} value={terms.warrantyMonths}
            onChange={(e) => update("warrantyMonths", parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <Label htmlFor="kp-valid">Действует до</Label>
          <Input id="kp-valid" type="date" value={terms.validUntil}
            onChange={(e) => update("validUntil", e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="kp-payment">Условия оплаты</Label>
        <Input id="kp-payment" value={terms.paymentTerms}
          onChange={(e) => update("paymentTerms", e.target.value)} placeholder="Предоплата 50%, 50% по готовности" />
      </div>
      <div>
        <Label htmlFor="kp-schedule">График реализации проекта</Label>
        <Textarea id="kp-schedule" value={terms.projectSchedule || ""}
          onChange={(e) => update("projectSchedule", e.target.value)}
          placeholder="Этапы, сроки, промежуточные платежи..." rows={3} />
      </div>
    </div>
  );
}
