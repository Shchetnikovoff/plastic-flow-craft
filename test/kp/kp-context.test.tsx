import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { KPProvider, useKP } from "@/contexts/KPContext";
import type { KPClient, KPItem, KPTerms } from "@/types/kp";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <KPProvider>{children}</KPProvider>
);

const testClient: KPClient = {
  name: "Иванов И.И.",
  organization: 'ООО "Водоканал"',
  inn: "7712345678",
  email: "ivanov@vodokanal.ru",
  phone: "+79001234567",
};

const testItems: KPItem[] = [
  {
    id: "1",
    type: "product",
    article: "СЗПК.ЕВПП.PPC.7032.5000",
    name: "Ёмкость вертикальная",
    imageUrl: "/images/evpp.png",
    specs: { "Объём": "5000 л" },
    quantity: 2,
    pricePerUnit: 185000,
  },
];

const testTerms: KPTerms = {
  productionDays: 14,
  warrantyMonths: 24,
  validUntil: "2026-04-30",
  paymentTerms: "Предоплата 50%, 50% по готовности",
};

describe("KPContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a KP document with auto-number", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    let doc: any;
    act(() => {
      doc = result.current.createKP(testClient, testItems, testTerms);
    });
    expect(doc.number).toMatch(/^КП-\d{4}-0001$/);
    expect(doc.client.name).toBe("Иванов И.И.");
    expect(doc.items).toHaveLength(1);
    expect(doc.totalWithoutVat).toBe(370000);
    expect(doc.vat).toBe(74000);
    expect(doc.totalWithVat).toBe(444000);
    expect(doc.status).toBe("draft");
    expect(result.current.documents).toHaveLength(1);
  });

  it("persists documents to localStorage", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.createKP(testClient, testItems, testTerms);
    });
    const stored = JSON.parse(localStorage.getItem("pfc-kp-registry") || "[]");
    expect(stored).toHaveLength(1);
  });

  it("updates a KP document", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    let doc: any;
    act(() => {
      doc = result.current.createKP(testClient, testItems, testTerms);
    });
    act(() => {
      result.current.updateKP(doc.id, { status: "sent" });
    });
    expect(result.current.documents[0].status).toBe("sent");
  });

  it("deletes a KP document", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    let doc: any;
    act(() => {
      doc = result.current.createKP(testClient, testItems, testTerms);
    });
    act(() => {
      result.current.deleteKP(doc.id);
    });
    expect(result.current.documents).toHaveLength(0);
  });

  it("duplicates a KP document with new number", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.createKP(testClient, testItems, testTerms);
    });
    const originalId = result.current.documents[0].id;
    act(() => {
      result.current.duplicateKP(originalId);
    });
    expect(result.current.documents).toHaveLength(2);
    expect(result.current.documents[1].number).toMatch(/^КП-\d{4}-0002$/);
    expect(result.current.documents[1].id).not.toBe(originalId);
  });

  it("saves and retrieves clients for autocomplete", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.saveClient(testClient);
    });
    expect(result.current.savedClients).toHaveLength(1);
    expect(result.current.savedClients[0].organization).toBe('ООО "Водоканал"');
  });

  it("filters by status", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.createKP(testClient, testItems, testTerms);
      result.current.createKP({ ...testClient, name: "Петров" }, testItems, testTerms);
    });
    act(() => {
      result.current.setStatus(result.current.documents[0].id, "sent");
    });
    expect(result.current.getByStatus("sent")).toHaveLength(1);
    expect(result.current.getByStatus("draft")).toHaveLength(1);
  });

  it("searches by client name or organization", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.createKP(testClient, testItems, testTerms);
      result.current.createKP(
        { ...testClient, name: "Петров П.П.", organization: 'ООО "Газпром"' },
        testItems,
        testTerms
      );
    });
    expect(result.current.searchKP("Водоканал")).toHaveLength(1);
    expect(result.current.searchKP("Петров")).toHaveLength(1);
    expect(result.current.searchKP("КП-")).toHaveLength(2);
  });

  it("increments counter across creates", () => {
    const { result } = renderHook(() => useKP(), { wrapper });
    act(() => {
      result.current.createKP(testClient, testItems, testTerms);
      result.current.createKP(testClient, testItems, testTerms);
      result.current.createKP(testClient, testItems, testTerms);
    });
    expect(result.current.documents[2].number).toMatch(/^КП-\d{4}-0003$/);
  });
});
