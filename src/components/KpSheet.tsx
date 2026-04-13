import { Trash2, Plus, Minus, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useKp } from "@/contexts/KpContext";
import { generateLetterheadPdf } from "@/lib/generateLetterheadPdf";
import { toast } from "sonner";

interface KpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KpSheet = ({ open, onOpenChange }: KpSheetProps) => {
  const { items, removeItem, updateItem, clearItems } = useKp();

  const handlePriceChange = (article: string, value: string) => {
    const cleaned = value.replace(/[^0-9.,]/g, "").slice(0, 15);
    const num = parseFloat(cleaned.replace(",", "."));
    updateItem(article, { pricePerUnit: isNaN(num) ? 0 : num });
  };

  const grandTotal = items.reduce((s, i) => s + i.quantity * i.pricePerUnit, 0);
  const grandTotalVat = grandTotal * 1.2;

  const handleDownload = async () => {
    if (items.length === 0) {
      toast.error("Добавьте хотя бы один товар в КП");
      return;
    }
    await generateLetterheadPdf(
      items.length === 1
        ? { ...items[0] }
        : undefined,
      items.length > 1 ? items : undefined
    );
    toast.success("Коммерческое предложение скачано");
  };

  const fmt = (n: number) =>
    n > 0
      ? n.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "—";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Коммерческое предложение</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Добавьте товары для формирования КП"
              : `${items.length} позиц${items.length === 1 ? "ия" : items.length < 5 ? "ии" : "ий"}`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4 space-y-3">
          {items.map((item) => (
            <div key={item.article} className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{item.model}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{item.article}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeItem(item.article)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItem(item.article, { quantity: Math.max(1, item.quantity - 1) })}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateItem(item.article, { quantity: item.quantity + 1 })}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Цена за ед."
                    className="flex h-8 w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={item.pricePerUnit > 0 ? item.pricePerUnit : ""}
                    onChange={(e) => handlePriceChange(item.article, e.target.value)}
                  />
                </div>
              </div>

              {item.pricePerUnit > 0 && (
                <p className="text-[11px] text-muted-foreground">
                  Сумма: {fmt(item.quantity * item.pricePerUnit)} руб.
                </p>
              )}
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-2">
            <Separator />
            {grandTotal > 0 && (
              <div className="text-xs space-y-0.5 text-center">
                <p className="text-muted-foreground">Итого: <span className="font-semibold text-foreground">{fmt(grandTotal)} руб.</span> (без НДС)</p>
                <p className="text-muted-foreground">С НДС (20%): <span className="font-semibold text-foreground">{fmt(grandTotalVat)} руб.</span></p>
              </div>
            )}
            <Button className="w-full gap-2" onClick={handleDownload}>
              <FileDown className="h-4 w-4" /> Скачать КП (PDF)
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={clearItems}>
              Очистить список
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default KpSheet;
