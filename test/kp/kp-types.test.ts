import { describe, it, expect } from "vitest";
import { computeKPTotals, generateKPNumber, type KPItem, type KPProductItem, type KPCustomItem } from "@/types/kp";

describe("KP Types", () => {
  const productItem: KPProductItem = {
    id: "1",
    type: "product",
    article: "СЗПК.ЕВПП.PPC.7032.5000",
    name: "Ёмкость вертикальная с плоским дном",
    imageUrl: "/images/evpp.png",
    specs: { "Объём": "5000 л", "Диаметр": "1800 мм" },
    quantity: 2,
    pricePerUnit: 185000,
  };

  const customItem: KPCustomItem = {
    id: "2",
    type: "custom",
    name: "Монтаж и пусконаладка",
    quantity: 1,
    pricePerUnit: 45000,
  };

  describe("computeKPTotals", () => {
    it("computes totals for mixed items", () => {
      const result = computeKPTotals([productItem, customItem]);
      expect(result.totalWithoutVat).toBe(415000);
      expect(result.vat).toBe(83000);
      expect(result.totalWithVat).toBe(498000);
    });

    it("returns zeros for empty items", () => {
      const result = computeKPTotals([]);
      expect(result.totalWithoutVat).toBe(0);
      expect(result.vat).toBe(0);
      expect(result.totalWithVat).toBe(0);
    });
  });

  describe("generateKPNumber", () => {
    it("generates formatted number with year and padded counter", () => {
      expect(generateKPNumber(2026, 1)).toBe("КП-2026-0001");
      expect(generateKPNumber(2026, 42)).toBe("КП-2026-0042");
      expect(generateKPNumber(2027, 100)).toBe("КП-2027-0100");
    });
  });
});
