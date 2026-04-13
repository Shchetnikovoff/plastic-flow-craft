import React, { createContext, useContext, useState, useCallback } from "react";

export interface KpItem {
  article: string;
  model: string;
  specs: [string, string][];
  quantity: number;
  pricePerUnit: number;
}

interface KpContextType {
  items: KpItem[];
  addItem: (item: Omit<KpItem, "quantity" | "pricePerUnit">) => void;
  removeItem: (article: string) => void;
  updateItem: (article: string, updates: Partial<Pick<KpItem, "quantity" | "pricePerUnit">>) => void;
  clearItems: () => void;
  totalItems: number;
}

const KpContext = createContext<KpContextType | null>(null);

export const useKp = () => {
  const ctx = useContext(KpContext);
  if (!ctx) throw new Error("useKp must be used within KpProvider");
  return ctx;
};

export const KpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<KpItem[]>([]);

  const addItem = useCallback((item: Omit<KpItem, "quantity" | "pricePerUnit">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.article === item.article);
      if (existing) return prev; // already added
      return [...prev, { ...item, quantity: 1, pricePerUnit: 0 }];
    });
  }, []);

  const removeItem = useCallback((article: string) => {
    setItems((prev) => prev.filter((i) => i.article !== article));
  }, []);

  const updateItem = useCallback((article: string, updates: Partial<Pick<KpItem, "quantity" | "pricePerUnit">>) => {
    setItems((prev) =>
      prev.map((i) => (i.article === article ? { ...i, ...updates } : i))
    );
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  const totalItems = items.length;

  return (
    <KpContext.Provider value={{ items, addItem, removeItem, updateItem, clearItems, totalItems }}>
      {children}
    </KpContext.Provider>
  );
};
