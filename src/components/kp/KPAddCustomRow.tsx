import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { KPCustomItem } from "@/types/kp";

interface KPAddCustomRowProps {
  onAdd: (item: KPCustomItem) => void;
}

export function KPAddCustomRow({ onAdd }: KPAddCustomRowProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      type: "custom",
      name: name.trim(),
      quantity: 1,
      pricePerUnit: parseFloat(price) || 0,
    });
    setName("");
    setPrice("");
  };

  return (
    <div className="flex items-center gap-2">
      <Input value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Доп. позиция (монтаж, доставка...)" className="flex-1 text-sm h-8"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
      <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
        placeholder="Цена" className="w-28 text-right text-sm h-8"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
      <Button variant="outline" size="sm" onClick={handleAdd} disabled={!name.trim()}>
        <Plus className="h-4 w-4 mr-1" /> Добавить
      </Button>
    </div>
  );
}
