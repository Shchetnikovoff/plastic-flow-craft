import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  type KPDocument,
  type KPClient,
  type KPItem,
  type KPTerms,
  type KPStatus,
  computeKPTotals,
  generateKPNumber,
} from "@/types/kp";

const STORAGE_KEY = "pfc-kp-registry";
const CLIENTS_KEY = "pfc-kp-clients";
const COUNTER_KEY = "pfc-kp-counter";

interface KPCounter {
  year: number;
  counter: number;
}

interface KPContextType {
  documents: KPDocument[];
  createKP: (client: KPClient, items: KPItem[], terms: KPTerms) => KPDocument;
  updateKP: (id: string, updates: Partial<KPDocument>) => void;
  deleteKP: (id: string) => void;
  duplicateKP: (id: string) => KPDocument;
  setStatus: (id: string, status: KPStatus) => void;
  getByStatus: (status: KPStatus) => KPDocument[];
  searchKP: (query: string) => KPDocument[];
  savedClients: KPClient[];
  saveClient: (client: KPClient) => void;
}

const KPContext = createContext<KPContextType | null>(null);

export const useKP = () => {
  const ctx = useContext(KPContext);
  if (!ctx) throw new Error("useKP must be used within KPProvider");
  return ctx;
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function initCounter(): KPCounter {
  return loadFromStorage<KPCounter>(COUNTER_KEY, {
    year: new Date().getFullYear(),
    counter: 0,
  });
}

export const KPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<KPDocument[]>(() =>
    loadFromStorage(STORAGE_KEY, [])
  );
  const [savedClients, setSavedClients] = useState<KPClient[]>(() =>
    loadFromStorage(CLIENTS_KEY, [])
  );

  // Use a ref for the counter to avoid React batching issues when multiple
  // createKP calls happen within the same act()/batch
  const counterRef = useRef<KPCounter>(null as unknown as KPCounter);
  if (counterRef.current === null) {
    counterRef.current = initCounter();
  }

  // Keep a ref to documents for duplicateKP to avoid stale closures
  const documentsRef = useRef(documents);
  useEffect(() => {
    documentsRef.current = documents;
  }, [documents]);

  useEffect(() => saveToStorage(STORAGE_KEY, documents), [documents]);
  useEffect(() => saveToStorage(CLIENTS_KEY, savedClients), [savedClients]);

  const nextNumber = useCallback((): string => {
    const currentYear = new Date().getFullYear();
    const prev = counterRef.current;
    const newCount = prev.year === currentYear ? prev.counter + 1 : 1;
    const newCounter: KPCounter = { year: currentYear, counter: newCount };
    counterRef.current = newCounter;
    saveToStorage(COUNTER_KEY, newCounter);
    return generateKPNumber(currentYear, newCount);
  }, []);

  const createKP = useCallback(
    (client: KPClient, items: KPItem[], terms: KPTerms): KPDocument => {
      const number = nextNumber();
      const totals = computeKPTotals(items);
      const now = new Date().toISOString();
      const doc: KPDocument = {
        id: crypto.randomUUID(),
        number,
        date: now.split("T")[0],
        client,
        items,
        terms,
        status: "draft",
        ...totals,
        createdAt: now,
        updatedAt: now,
      };
      setDocuments((prev) => [...prev, doc]);
      return doc;
    },
    [nextNumber]
  );

  const updateKP = useCallback((id: string, updates: Partial<KPDocument>) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              ...updates,
              ...(updates.items ? computeKPTotals(updates.items) : {}),
              updatedAt: new Date().toISOString(),
            }
          : d
      )
    );
  }, []);

  const deleteKP = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const duplicateKP = useCallback(
    (id: string): KPDocument => {
      const original = documentsRef.current.find((d) => d.id === id);
      if (!original) throw new Error(`KP ${id} not found`);
      const number = nextNumber();
      const now = new Date().toISOString();
      const dup: KPDocument = {
        ...original,
        id: crypto.randomUUID(),
        number,
        date: now.split("T")[0],
        status: "draft",
        createdAt: now,
        updatedAt: now,
      };
      setDocuments((prev) => [...prev, dup]);
      return dup;
    },
    [nextNumber]
  );

  const setStatus = useCallback(
    (id: string, status: KPStatus) => {
      updateKP(id, { status });
    },
    [updateKP]
  );

  const getByStatus = useCallback(
    (status: KPStatus) => documents.filter((d) => d.status === status),
    [documents]
  );

  const searchKP = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return documents.filter(
        (d) =>
          d.number.toLowerCase().includes(q) ||
          d.client.name.toLowerCase().includes(q) ||
          d.client.organization.toLowerCase().includes(q)
      );
    },
    [documents]
  );

  const saveClient = useCallback((client: KPClient) => {
    setSavedClients((prev) => {
      const exists = prev.some(
        (c) => c.inn === client.inn && c.organization === client.organization
      );
      if (exists) return prev;
      return [...prev, client];
    });
  }, []);

  return (
    <KPContext.Provider
      value={{
        documents,
        createKP,
        updateKP,
        deleteKP,
        duplicateKP,
        setStatus,
        getByStatus,
        searchKP,
        savedClients,
        saveClient,
      }}
    >
      {children}
    </KPContext.Provider>
  );
};
