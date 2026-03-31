import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { emkostGroups } from "@/data/emkostiProducts";
import type { KPProductItem } from "@/types/kp";

interface ProductEntry {
  article: string;
  name: string;
  specs: Record<string, string>;
}

function buildProductIndex(): ProductEntry[] {
  const entries: ProductEntry[] = [];
  for (const group of emkostGroups) {
    for (const cat of group.categories) {
      for (const item of cat.items) {
        entries.push({
          article: item.article,
          name: `${cat.title} — ${item.volume} л`,
          specs: {
            "Объём": `${item.volume} л`,
            "Диаметр": `${item.diameter} мм`,
            [cat.heightLabel.replace(", мм", "")]: `${item.height} мм`,
          },
        });
      }
    }
  }
  return entries;
}

interface KPAddProductDialogProps {
  onAdd: (item: KPProductItem) => void;
}

export function KPAddProductDialog({ onAdd }: KPAddProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const products = useMemo(() => buildProductIndex(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return products.slice(0, 20);
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.article.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [search, products]);

  const handleSelect = (entry: ProductEntry) => {
    const item: KPProductItem = {
      id: crypto.randomUUID(),
      type: "product",
      article: entry.article,
      name: entry.name,
      imageUrl: "/images/products/default.png",
      specs: entry.specs,
      quantity: 1,
      pricePerUnit: 0,
    };
    onAdd(item);
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" /> Добавить товар</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[70vh]">
        <DialogHeader><DialogTitle>Добавить товар в КП</DialogTitle></DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по артикулу или названию..." className="pl-9" autoFocus />
        </div>
        <div className="overflow-y-auto max-h-80 space-y-1">
          {filtered.map((p) => (
            <button key={p.article} type="button"
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
              onClick={() => handleSelect(p)}>
              <div className="font-medium text-sm">{p.name}</div>
              <div className="text-xs text-blue-600">{p.article}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`).join(" | ")}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-gray-400 py-8">Ничего не найдено</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
