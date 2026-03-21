import React, { createContext, useContext, useState, useCallback } from "react";

export interface DocItem {
  qty: number;
  description: string;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface Cotizacion {
  id: string;
  client: string;
  contact: string;
  rtn: string;
  date: string;
  validUntil: string;
  status: "pendiente" | "enviada" | "aprobada" | "vencida" | "facturada";
  items: DocItem[];
  subtotal: number;
  isv: number;
  total: number;
  notes: string;
  preparedBy: string;
}

export interface Factura {
  id: string;
  client: string;
  contact: string;
  rtn: string;
  date: string;
  dueDate: string;
  status: "pendiente" | "pagada" | "vencida";
  items: DocItem[];
  subtotal: number;
  isv: number;
  total: number;
  concept: string;
  preparedBy: string;
  fromCotizacion?: string;
}

interface DocumentContextType {
  cotizaciones: Cotizacion[];
  facturas: Factura[];
  convertToInvoice: (cotizacionId: string) => void;
}

const INITIAL_COTIZACIONES: Cotizacion[] = [
  {
    id: "COT-2026-019", client: "Gildan", contact: "Luis Hernández", rtn: "0501-2005-01234",
    date: "2026-03-17", validUntil: "2026-04-17", status: "enviada",
    items: [{ qty: 2, description: "Renta montacargas eléctrico Toyota 7FBE15 — 3 meses", unit: "Mes", unitPrice: 7500, total: 45000 }],
    subtotal: 45000, isv: 6750, total: 51750,
    notes: "Incluye mantenimiento preventivo mensual. No incluye combustible.", preparedBy: "Esly",
  },
  {
    id: "COT-2026-018", client: "Cervecería Hondureña", contact: "José Martínez", rtn: "0801-1960-00456",
    date: "2026-03-15", validUntil: "2026-04-15", status: "pendiente",
    items: [
      { qty: 1, description: "Reparación sistema hidráulico completo — Hyster H50XT", unit: "Servicio", unitPrice: 18000, total: 18000 },
      { qty: 4, description: "Kit de sellos cilindro hidráulico", unit: "Pza", unitPrice: 890, total: 3560 },
    ],
    subtotal: 21560, isv: 3234, total: 24794,
    notes: "Garantía de 6 meses en mano de obra.", preparedBy: "Hersen Carballo",
  },
  {
    id: "COT-2026-017", client: "DIUNSA", contact: "Carlos Méndez", rtn: "0801-1992-00234",
    date: "2026-03-12", validUntil: "2026-04-12", status: "aprobada",
    items: [
      { qty: 1, description: "Renta montacargas Toyota 7FGU25 — 6 meses", unit: "Mes", unitPrice: 12000, total: 72000 },
      { qty: 6, description: "Mantenimiento preventivo mensual", unit: "Servicio", unitPrice: 2500, total: 15000 },
    ],
    subtotal: 87000, isv: 13050, total: 100050,
    notes: "Incluye traslado del equipo. Combustible por cuenta del cliente.", preparedBy: "Esly",
  },
  {
    id: "COT-2026-016", client: "Lacthosa", contact: "Ana Reyes", rtn: "0801-1985-00123",
    date: "2026-03-08", validUntil: "2026-04-08", status: "vencida",
    items: [{ qty: 2, description: "Llanta sólida 6.00-9 con instalación", unit: "Pza", unitPrice: 3200, total: 6400 }],
    subtotal: 6400, isv: 960, total: 7360,
    notes: "", preparedBy: "Hersen Carballo",
  },
];

const INITIAL_FACTURAS: Factura[] = [
  {
    id: "FAC-2026-045", client: "DIUNSA", contact: "Carlos Méndez", rtn: "0801-1992-00234",
    date: "2026-03-14", dueDate: "2026-04-14", status: "pagada",
    items: [{ qty: 1, description: "Renta mensual montacargas Toyota 7FGU25", unit: "Mes", unitPrice: 24500, total: 24500 }],
    subtotal: 24500, isv: 3675, total: 28175,
    concept: "Renta mensual montacargas Toyota 7FGU25", preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-044", client: "Cargill", contact: "Roberto Flores", rtn: "0501-2001-00890",
    date: "2026-03-12", dueDate: "2026-04-12", status: "pendiente",
    items: [
      { qty: 1, description: "Mantenimiento correctivo Yale GDP080", unit: "Servicio", unitPrice: 14000, total: 14000 },
      { qty: 2, description: "Kit sellos cilindro hidráulico", unit: "Pza", unitPrice: 890, total: 1780 },
      { qty: 1, description: "Manguera hidráulica 3/4\"", unit: "Pza", unitPrice: 220, total: 220 },
      { qty: 4, description: "Aceite Hidráulico 10W-30 (Galón)", unit: "Gal", unitPrice: 320, total: 1280 },
    ],
    subtotal: 17280, isv: 2592, total: 19872,
    concept: "Mantenimiento correctivo Yale GDP080", preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-043", client: "Lady Lee", contact: "María López", rtn: "0801-1998-00567",
    date: "2026-03-10", dueDate: "2026-04-10", status: "pagada",
    items: [
      { qty: 1, description: "Renta mensual montacargas", unit: "Mes", unitPrice: 24000, total: 24000 },
      { qty: 1, description: "Mantenimiento preventivo mensual", unit: "Servicio", unitPrice: 8000, total: 8000 },
    ],
    subtotal: 32000, isv: 4800, total: 36800,
    concept: "Renta mensual + mantenimiento preventivo", preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-042", client: "Lacthosa", contact: "Ana Reyes", rtn: "0801-1985-00123",
    date: "2026-03-08", dueDate: "2026-03-23", status: "vencida",
    items: [{ qty: 1, description: "Reparación sistema hidráulico Hyster H40XT", unit: "Servicio", unitPrice: 12800, total: 12800 }],
    subtotal: 12800, isv: 1920, total: 14720,
    concept: "Reparación sistema hidráulico Hyster H40XT", preparedBy: "Hersen Carballo",
  },
];

const DocumentContext = createContext<DocumentContextType | null>(null);

let invoiceCounter = 46;

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>(INITIAL_COTIZACIONES);
  const [facturas, setFacturas] = useState<Factura[]>(INITIAL_FACTURAS);

  const convertToInvoice = useCallback((cotizacionId: string) => {
    setCotizaciones(prev => {
      const cot = prev.find(c => c.id === cotizacionId);
      if (!cot || cot.status !== "aprobada") return prev;

      const today = new Date();
      const due = new Date(today);
      due.setDate(due.getDate() + 30);

      const newInvoice: Factura = {
        id: `FAC-2026-${String(invoiceCounter++).padStart(3, "0")}`,
        client: cot.client,
        contact: cot.contact,
        rtn: cot.rtn,
        date: today.toISOString().split("T")[0],
        dueDate: due.toISOString().split("T")[0],
        status: "pendiente",
        items: cot.items,
        subtotal: cot.subtotal,
        isv: cot.isv,
        total: cot.total,
        concept: cot.items.map(i => i.description).join(", "),
        preparedBy: cot.preparedBy,
        fromCotizacion: cot.id,
      };

      setFacturas(f => [newInvoice, ...f]);
      return prev.map(c => c.id === cotizacionId ? { ...c, status: "facturada" as const } : c);
    });
  }, []);

  return (
    <DocumentContext.Provider value={{ cotizaciones, facturas, convertToInvoice }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocuments must be inside DocumentProvider");
  return ctx;
}
