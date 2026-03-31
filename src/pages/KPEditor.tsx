import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useKP } from "@/contexts/KPContext";
import { KPForm } from "@/components/kp/KPForm";
import { KPPreview } from "@/components/kp/KPPreview";
import { generateKPPdf } from "@/lib/generateKPPdf";
import { computeKPTotals } from "@/types/kp";
import { Button } from "@/components/ui/button";
import { Save, FileDown, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import CorporatePageShell from "@/components/corporate/CorporatePageShell";
import type { KPClient, KPItem, KPTerms } from "@/types/kp";

const DEFAULT_CLIENT: KPClient = {
  name: "",
  organization: "",
  inn: "",
  email: "",
  phone: "",
};

function defaultValidUntil(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

const DEFAULT_TERMS: KPTerms = {
  productionDays: 14,
  warrantyMonths: 24,
  validUntil: defaultValidUntil(),
  paymentTerms: "Предоплата 50%, 50% по готовности",
};

export default function KPEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { documents, createKP, updateKP, savedClients } = useKP();

  const isNew = !id || id === "new";
  const existing = isNew ? undefined : documents.find((d) => d.id === id);

  const [client, setClient] = useState<KPClient>(existing?.client ?? DEFAULT_CLIENT);
  const [items, setItems] = useState<KPItem[]>(existing?.items ?? []);
  const [terms, setTerms] = useState<KPTerms>(existing?.terms ?? DEFAULT_TERMS);
  const [saving, setSaving] = useState(false);

  // Sync if navigating to an existing KP
  useEffect(() => {
    if (existing) {
      setClient(existing.client);
      setItems(existing.items);
      setTerms(existing.terms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const previewNumber = existing?.number ?? "КП-XXXX-0000";
  const previewDate = existing?.date ?? new Date().toISOString().split("T")[0];

  const handleSave = () => {
    setSaving(true);
    try {
      if (isNew) {
        const doc = createKP(client, items, terms);
        toast.success(`КП ${doc.number} создано`);
        navigate(`/kp/${doc.id}`, { replace: true });
      } else if (existing) {
        updateKP(existing.id, { client, items, terms, ...computeKPTotals(items) });
        toast.success("КП сохранено");
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePdf = async () => {
    if (isNew) {
      // Save first, then generate PDF
      const doc = createKP(client, items, terms);
      await generateKPPdf(doc);
      toast.success(`КП ${doc.number} создано и скачано`);
      navigate(`/kp/${doc.id}`, { replace: true });
    } else if (existing) {
      const updated = { ...existing, client, items, terms, ...computeKPTotals(items) };
      await generateKPPdf(updated);
    }
  };

  return (
    <CorporatePageShell
      breadcrumbs={[
        { label: "Реестр КП", href: "/kp" },
        { label: isNew ? "Новое КП" : existing?.number ?? "Редактирование" },
      ]}
      title={isNew ? "Новое коммерческое" : "Редактирование КП"}
      accentWord={isNew ? "предложение" : undefined}
      hideCTA
    >
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/kp")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к реестру
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePdf}>
              <FileDown className="h-4 w-4 mr-2" />
              Скачать PDF
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div>
            <KPForm
              client={client}
              onClientChange={setClient}
              items={items}
              onItemsChange={setItems}
              terms={terms}
              onTermsChange={setTerms}
              savedClients={savedClients}
            />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
              Предпросмотр
            </div>
            <KPPreview
              number={previewNumber}
              date={previewDate}
              client={client}
              items={items}
              terms={terms}
            />
          </div>
        </div>
      </section>
    </CorporatePageShell>
  );
}
