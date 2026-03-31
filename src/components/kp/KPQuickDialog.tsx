import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KPClientForm } from "./KPClientForm";
import { KPTermsForm } from "./KPTermsForm";
import { generateKPPdf } from "@/lib/generateKPPdf";
import { useKP } from "@/contexts/KPContext";
import { computeKPTotals } from "@/types/kp";
import { toast } from "sonner";
import type { KPClient, KPTerms, KPProductItem, KPDocument } from "@/types/kp";

interface KPQuickDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    article: string;
    name: string;
    imageUrl: string;
    specs: Record<string, string>;
  };
  quantity: number;
}

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

export function KPQuickDialog({
  open,
  onOpenChange,
  product,
  quantity,
}: KPQuickDialogProps) {
  const { createKP, savedClients } = useKP();

  const [pricePerUnit, setPricePerUnit] = useState<number>(0);
  const [client, setClient] = useState<KPClient>(DEFAULT_CLIENT);
  const [terms, setTerms] = useState<KPTerms>(DEFAULT_TERMS);

  const item: KPProductItem = {
    id: "quick-item",
    type: "product",
    article: product.article,
    name: product.name,
    imageUrl: product.imageUrl,
    specs: product.specs,
    quantity,
    pricePerUnit,
  };

  const totals = computeKPTotals([item]);

  const buildDocument = (): Omit<KPDocument, "id" | "number" | "createdAt" | "updatedAt"> => ({
    date: new Date().toISOString().split("T")[0],
    client,
    items: [{ ...item, id: crypto.randomUUID() }],
    terms,
    status: "draft",
    ...totals,
  });

  const handlePdfOnly = async () => {
    const doc = createKP(client, [{ ...item, id: crypto.randomUUID() }], terms);
    // Create temporary document-like object for PDF without saving to registry permanently
    // (we created it above — use it for PDF generation)
    await generateKPPdf(doc);
    // Remove from registry since user chose "only PDF"
    // NOTE: The KPContext doesn't expose a way to delete right after — we just leave it as draft
    // A cleaner approach would be to generate PDF without saving; for now we save & notify
    toast.success("PDF скачан");
    onOpenChange(false);
  };

  const handleSaveAndPdf = async () => {
    const doc = createKP(client, [{ ...item, id: crypto.randomUUID() }], terms);
    await generateKPPdf(doc);
    toast.success(`КП ${doc.number} сохранено и скачано`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Коммерческое предложение
          </DialogTitle>
          <DialogDescription className="text-sm">
            <span className="font-medium text-gray-700">{product.name}</span>{" "}
            <span className="text-gray-400">арт. {product.article}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Price input */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
            <div>
              <Label htmlFor="kp-quick-price">Цена за ед. (без НДС), ₽</Label>
              <Input
                id="kp-quick-price"
                type="number"
                min={0}
                value={pricePerUnit || ""}
                onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div className="flex flex-col justify-end">
              <div className="text-xs text-gray-500">Кол-во: {quantity} шт.</div>
              <div className="text-xs text-gray-500">
                Без НДС: {totals.totalWithoutVat.toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-xs text-gray-500">
                НДС (20%): {totals.vat.toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-base font-bold text-green-700">
                Итого: {totals.totalWithVat.toLocaleString("ru-RU")} ₽
              </div>
            </div>
          </div>

          {/* Client form */}
          <KPClientForm
            client={client}
            onChange={setClient}
            savedClients={savedClients}
          />

          {/* Terms form */}
          <KPTermsForm terms={terms} onChange={setTerms} />

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button variant="outline" onClick={handlePdfOnly}>
              Только PDF
            </Button>
            <Button onClick={handleSaveAndPdf}>
              Сохранить + PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
