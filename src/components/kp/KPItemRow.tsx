import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { KPItem } from "@/types/kp";

interface KPItemRowProps {
  item: KPItem;
  onUpdate: (item: KPItem) => void;
  onRemove: () => void;
}

export function KPItemRow({ item, onUpdate, onRemove }: KPItemRowProps) {
  const subtotal = item.quantity * item.pricePerUnit;
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-white">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{item.name}</div>
        {item.type === "product" && <div className="text-xs text-blue-600">{item.article}</div>}
        {item.type === "custom" && item.description && <div className="text-xs text-gray-500">{item.description}</div>}
      </div>
      <div className="w-20">
        <Input type="number" min={1} value={item.quantity}
          onChange={(e) => onUpdate({ ...item, quantity: parseInt(e.target.value) || 1 })}
          className="text-center text-sm h-8" />
      </div>
      <div className="w-28">
        <Input type="number" min={0} value={item.pricePerUnit}
          onChange={(e) => onUpdate({ ...item, pricePerUnit: parseFloat(e.target.value) || 0 })}
          className="text-right text-sm h-8" />
      </div>
      <div className="w-28 text-right text-sm font-medium whitespace-nowrap">
        {subtotal.toLocaleString("ru-RU")} ₽
      </div>
      <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8 text-red-500">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
