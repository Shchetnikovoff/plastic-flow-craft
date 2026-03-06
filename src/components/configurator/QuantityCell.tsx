import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface QuantityCellProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export const QuantityCell = ({ quantity, onDecrement, onIncrement }: QuantityCellProps) => (
  <div className="flex items-center justify-center gap-1">
    <Button variant="outline" size="icon" className="h-6 w-6" onClick={onDecrement}>
      <Minus className="h-3 w-3" />
    </Button>
    <span className="w-7 text-center text-xs font-medium">{quantity}</span>
    <Button variant="outline" size="icon" className="h-6 w-6" onClick={onIncrement}>
      <Plus className="h-3 w-3" />
    </Button>
  </div>
);

interface AddToCartButtonProps {
  onClick: () => void;
}

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => (
  <Button size="sm" className="h-7 gap-1 text-xs whitespace-nowrap" onClick={onClick}>
    <ShoppingCart className="h-3 w-3" />
    <span className="hidden sm:inline">В корзину</span>
  </Button>
);
