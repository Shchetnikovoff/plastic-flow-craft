import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCart } from "@/contexts/CartContext";
import { productSizes } from "@/data/products";
import { toast } from "sonner";

const ProductTable = () => {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(productSizes.map((s) => [s.article, 1]))
  );

  const setQty = (article: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [article]: Math.max(1, (prev[article] || 1) + delta),
    }));
  };

  const handleAdd = (size: typeof productSizes[0]) => {
    addItem(
      { article: size.article, diameter: size.diameter, wallThickness: size.wallThickness },
      quantities[size.article]
    );
    toast.success(`${size.article} (${quantities[size.article]} шт.) добавлен в корзину`);
  };

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">Типоразмерный ряд</h2>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5">
              <TableHead className="font-semibold">Артикул</TableHead>
              <TableHead className="font-semibold">∅ трубы, мм</TableHead>
              <TableHead className="font-semibold">Стенка, мм</TableHead>
              <TableHead className="font-semibold">Длина, мм</TableHead>
              <TableHead className="font-semibold">Раструб, мм</TableHead>
              <TableHead className="font-semibold">Цена</TableHead>
              <TableHead className="font-semibold text-center">Кол-во</TableHead>
              <TableHead className="font-semibold text-center">Действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productSizes.map((size) => (
              <TableRow
                key={size.article}
                className="cursor-pointer transition-colors hover:bg-primary/5"
              >
                <TableCell className="font-mono text-xs font-medium">{size.article}</TableCell>
                <TableCell>{size.diameter}</TableCell>
                <TableCell>{size.wallThickness}</TableCell>
                <TableCell>{size.availableLength}</TableCell>
                <TableCell>{size.socketThickness}</TableCell>
                <TableCell className="text-muted-foreground text-xs italic">По запросу</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => { e.stopPropagation(); setQty(size.article, -1); }}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{quantities[size.article]}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => { e.stopPropagation(); setQty(size.article, 1); }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={(e) => { e.stopPropagation(); handleAdd(size); }}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">В корзину</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductTable;
