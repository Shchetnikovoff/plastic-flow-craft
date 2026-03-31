import { KPClientForm } from "./KPClientForm";
import { KPTermsForm } from "./KPTermsForm";
import { KPItemRow } from "./KPItemRow";
import { KPAddCustomRow } from "./KPAddCustomRow";
import { KPAddProductDialog } from "./KPAddProductDialog";
import { computeKPTotals } from "@/types/kp";
import type { KPClient, KPItem, KPTerms, KPCustomItem, KPProductItem } from "@/types/kp";

interface KPFormProps {
  client: KPClient;
  onClientChange: (client: KPClient) => void;
  items: KPItem[];
  onItemsChange: (items: KPItem[]) => void;
  terms: KPTerms;
  onTermsChange: (terms: KPTerms) => void;
  savedClients: KPClient[];
}

export function KPForm({ client, onClientChange, items, onItemsChange, terms, onTermsChange, savedClients }: KPFormProps) {
  const totals = computeKPTotals(items);

  const updateItem = (index: number, updated: KPItem) => {
    const next = [...items];
    next[index] = updated;
    onItemsChange(next);
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const addProduct = (item: KPProductItem) => { onItemsChange([...items, item]); };
  const addCustom = (item: KPCustomItem) => { onItemsChange([...items, item]); };

  return (
    <div className="space-y-6">
      <KPClientForm client={client} onChange={onClientChange} savedClients={savedClients} />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Позиции</h3>
        {items.length === 0 && (
          <div className="text-center text-sm text-gray-400 py-6 border rounded-lg border-dashed">
            Добавьте товары или дополнительные позиции
          </div>
        )}
        {items.map((item, i) => (
          <KPItemRow key={item.id} item={item} onUpdate={(updated) => updateItem(i, updated)} onRemove={() => removeItem(i)} />
        ))}
        <div className="flex gap-2">
          <KPAddProductDialog onAdd={addProduct} />
          <KPAddCustomRow onAdd={addCustom} />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-right space-y-1">
        <div className="text-sm text-gray-500">Итого без НДС: <span className="font-medium text-gray-700">{totals.totalWithoutVat.toLocaleString("ru-RU")} ₽</span></div>
        <div className="text-sm text-gray-500">НДС (20%): <span className="font-medium text-gray-700">{totals.vat.toLocaleString("ru-RU")} ₽</span></div>
        <div className="text-lg font-bold text-green-700">Итого: {totals.totalWithVat.toLocaleString("ru-RU")} ₽</div>
      </div>

      <KPTermsForm terms={terms} onChange={onTermsChange} />
    </div>
  );
}
