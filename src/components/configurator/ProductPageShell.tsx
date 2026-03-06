import { useState, type ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import CartSheet from "@/components/CartSheet";
import type { ProductType } from "@/components/Header";
import type { AngleType, ConnectionType } from "@/data/products";

interface ProductPageShellProps {
  children: ReactNode;
  productType?: ProductType;
  angle?: AngleType;
  connectionType?: ConnectionType;
}

const ProductPageShell = ({ children, productType = "otvod", angle, connectionType }: ProductPageShellProps) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} productType={productType} angle={angle} connectionType={connectionType} />
        {children}
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default ProductPageShell;
