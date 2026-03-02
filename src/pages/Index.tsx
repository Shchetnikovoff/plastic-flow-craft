import { useState } from "react";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductTable from "@/components/ProductTable";
import CartSheet from "@/components/CartSheet";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header onCartOpen={() => setCartOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <ProductGallery />
            <ProductInfo />
          </div>
          <ProductTable />
        </main>
        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </div>
    </CartProvider>
  );
};

export default Index;
