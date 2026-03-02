import { useState } from "react";
import { Trash2, Plus, Minus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ContactFormFields, { type ContactFormData, type ContactFormErrors, validateContactForm } from "@/components/ContactFormFields";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [contactData, setContactData] = useState<ContactFormData>({ name: "", email: "", phone: "", inn: "" });
  const [contactErrors, setContactErrors] = useState<ContactFormErrors>({});

  const handleContactChange = (field: keyof ContactFormData, value: string) => {
    setContactData((prev) => ({ ...prev, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const errors = validateContactForm(contactData);
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) return;

    toast.success(
      "Заявка сформирована! Свяжемся с вами для уточнения деталей.",
      { duration: 6000 }
    );
    clearCart();
    setContactData({ name: "", email: "", phone: "", inn: "" });
    setContactErrors({});
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? "Корзина пуста" : `${items.length} позиций`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto py-4 space-y-3">
          {items.map((item) => (
            <div key={item.article} className="rounded-lg border bg-muted/30 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs font-semibold">{item.article}</p>
                  <p className="text-sm text-muted-foreground">∅{item.diameter} мм, стенка {item.wallThickness} мм</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.article)}>
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.article, item.quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">{item.quantity} шт.</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.article, item.quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          {items.length > 0 && (
            <div className="pt-3">
              <Separator className="mb-4" />
              <p className="text-sm font-semibold text-foreground mb-3">Контактные данные</p>
              <ContactFormFields data={contactData} errors={contactErrors} onChange={handleContactChange} />
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-2">
            <Separator />
            <p className="text-center text-xs text-muted-foreground">Цена — по запросу. Мы свяжемся с вами для уточнения.</p>
            <Button className="w-full gap-2" onClick={handleSubmit}>
              <Send className="h-4 w-4" /> Отправить заявку
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
