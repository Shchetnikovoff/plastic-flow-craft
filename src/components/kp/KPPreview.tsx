import { computeKPTotals } from "@/types/kp";
import type { KPClient, KPItem, KPTerms } from "@/types/kp";

interface KPPreviewProps {
  number: string;
  date: string;
  client: KPClient;
  items: KPItem[];
  terms: KPTerms;
}

export function KPPreview({ number, date, client, items, terms }: KPPreviewProps) {
  const totals = computeKPTotals(items);
  const isSingleProduct = items.length === 1 && items[0].type === "product";

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 text-sm" style={{ fontFamily: "sans-serif" }}>
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-blue-800 pb-3 mb-4">
        <div>
          <div className="font-bold text-blue-800">ООО СЗПК «Пласт-Металл Про»</div>
          <div className="text-xs text-gray-500">+7 963 322-55-40 | osobenkov@list.ru</div>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div>{number}</div>
          <div>от {date}</div>
        </div>
      </div>

      <div className="text-center font-bold text-blue-800 mb-3">КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</div>

      {/* Client */}
      <div className="bg-blue-50 p-2 rounded text-xs mb-4">
        <b>Заказчик:</b> {client.organization || "—"} | <b>Контакт:</b> {client.name || "—"}
        {client.inn && <> | <b>ИНН:</b> {client.inn}</>}
      </div>

      {/* Items */}
      {isSingleProduct && items[0].type === "product" ? (
        <div className="flex gap-4 mb-4">
          <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-content text-gray-400 text-xs flex-shrink-0">
            Фото
          </div>
          <div className="flex-1">
            <div className="font-bold">{items[0].name}</div>
            <div className="text-blue-600 text-xs mb-1">{items[0].article}</div>
            <div className="space-y-0.5">
              {Object.entries(items[0].specs).map(([k, v]) => (
                <div key={k} className="text-xs"><span className="text-gray-500">{k}:</span> <b>{v}</b></div>
              ))}
            </div>
            <div className="mt-2 text-xs">
              Кол-во: <b>{items[0].quantity}</b> | Цена: <b>{items[0].pricePerUnit.toLocaleString("ru-RU")} ₽</b>
            </div>
          </div>
        </div>
      ) : items.length > 0 ? (
        <table className="w-full text-xs border-collapse mb-4">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="p-1 text-left">№</th>
              <th className="p-1 text-left">Наименование</th>
              <th className="p-1 text-center">Кол-во</th>
              <th className="p-1 text-right">Цена</th>
              <th className="p-1 text-right">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="border-b">
                <td className="p-1">{i + 1}</td>
                <td className="p-1">
                  <div className="font-medium">{item.name}</div>
                  {item.type === "product" && <div className="text-blue-600">{item.article}</div>}
                </td>
                <td className="p-1 text-center">{item.quantity}</td>
                <td className="p-1 text-right">{item.pricePerUnit.toLocaleString("ru-RU")} ₽</td>
                <td className="p-1 text-right font-medium">{(item.quantity * item.pricePerUnit).toLocaleString("ru-RU")} ₽</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      {/* Totals */}
      {items.length > 0 && (
        <div className="text-right mb-3">
          <div className="text-xs text-gray-500">Без НДС: {totals.totalWithoutVat.toLocaleString("ru-RU")} ₽</div>
          <div className="text-xs text-gray-500">НДС (20%): {totals.vat.toLocaleString("ru-RU")} ₽</div>
          <div className="font-bold text-green-700">{totals.totalWithVat.toLocaleString("ru-RU")} ₽</div>
        </div>
      )}

      {/* Terms */}
      <div className="text-xs text-gray-600 border-t pt-2 space-y-0.5">
        <div>Срок изготовления: <b>{terms.productionDays} р.д.</b> | Гарантия: <b>{terms.warrantyMonths} мес</b></div>
        <div>Действует до: <b>{terms.validUntil}</b></div>
        <div>Оплата: <b>{terms.paymentTerms}</b></div>
        {terms.projectSchedule && <div>График: <b>{terms.projectSchedule}</b></div>}
      </div>
    </div>
  );
}
