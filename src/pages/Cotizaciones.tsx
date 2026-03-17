import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, FileDown, Printer, Send, MoreHorizontal, CheckCircle2 } from "lucide-react";
import DocumentPDFTemplate, { type DocumentData } from "@/components/DocumentPDFTemplate";

const COTIZACIONES = [
  {
    id: "COT-2026-019", client: "Gildan", contact: "Luis Hernández", rtn: "0501-2005-01234",
    date: "2026-03-17", validUntil: "2026-04-17", status: "enviada",
    items: [
      { qty: 2, description: "Renta montacargas eléctrico Toyota 7FBE15 — 3 meses", unit: "Mes", unitPrice: 7500, total: 45000 },
    ],
    subtotal: 45000, isv: 6750, total: 51750,
    notes: "Incluye mantenimiento preventivo mensual. No incluye combustible.",
    preparedBy: "Esly",
  },
  {
    id: "COT-2026-018", client: "Cervecería Hondureña", contact: "José Martínez", rtn: "0801-1960-00456",
    date: "2026-03-15", validUntil: "2026-04-15", status: "pendiente",
    items: [
      { qty: 1, description: "Reparación sistema hidráulico completo — Hyster H50XT", unit: "Servicio", unitPrice: 18000, total: 18000 },
      { qty: 4, description: "Kit de sellos cilindro hidráulico", unit: "Pza", unitPrice: 890, total: 3560 },
    ],
    subtotal: 21560, isv: 3234, total: 24794,
    notes: "Garantía de 6 meses en mano de obra.",
    preparedBy: "Hersen Carballo",
  },
  {
    id: "COT-2026-017", client: "DIUNSA", contact: "Carlos Méndez", rtn: "0801-1992-00234",
    date: "2026-03-12", validUntil: "2026-04-12", status: "aprobada",
    items: [
      { qty: 1, description: "Renta montacargas Toyota 7FGU25 — 6 meses", unit: "Mes", unitPrice: 12000, total: 72000 },
      { qty: 6, description: "Mantenimiento preventivo mensual", unit: "Servicio", unitPrice: 2500, total: 15000 },
    ],
    subtotal: 87000, isv: 13050, total: 100050,
    notes: "Incluye traslado del equipo. Combustible por cuenta del cliente.",
    preparedBy: "Esly",
  },
  {
    id: "COT-2026-016", client: "Lacthosa", contact: "Ana Reyes", rtn: "0801-1985-00123",
    date: "2026-03-08", validUntil: "2026-04-08", status: "vencida",
    items: [
      { qty: 2, description: "Llanta sólida 6.00-9 con instalación", unit: "Pza", unitPrice: 3200, total: 6400 },
    ],
    subtotal: 6400, isv: 960, total: 7360,
    notes: "",
    preparedBy: "Hersen Carballo",
  },
];

const statusMap: Record<string, string> = {
  pendiente: "status-pendiente",
  enviada: "status-progreso",
  aprobada: "status-completado",
  vencida: "status-critico",
};
const statusLabel: Record<string, string> = {
  pendiente: "Pendiente",
  enviada: "Enviada",
  aprobada: "Aprobada",
  vencida: "Vencida",
};

export default function Cotizaciones() {
  const [preview, setPreview] = useState<DocumentData | null>(null);

  const openPreview = (cot: typeof COTIZACIONES[0]) => {
    setPreview({
      type: "cotizacion",
      number: cot.id,
      date: cot.date,
      validUntil: cot.validUntil,
      client: {
        name: cot.client,
        rtn: cot.rtn,
        address: "San Pedro Sula, Honduras",
        phone: "",
        contact: cot.contact,
      },
      items: cot.items,
      subtotal: cot.subtotal,
      isv: cot.isv,
      total: cot.total,
      notes: cot.notes,
      paymentTerms: "50% anticipo, 50% contra entrega",
      preparedBy: cot.preparedBy,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cotizaciones</h1>
          <p className="text-sm text-muted-foreground">{COTIZACIONES.length} cotizaciones</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
          <Plus className="h-4 w-4" /> Nueva Cotización
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Cotizado", value: `L ${COTIZACIONES.reduce((a, c) => a + c.total, 0).toLocaleString()}`, cls: "text-foreground" },
          { label: "Aprobadas", value: COTIZACIONES.filter(c => c.status === "aprobada").length.toString(), cls: "text-secondary" },
          { label: "Pendientes", value: COTIZACIONES.filter(c => c.status === "pendiente" || c.status === "enviada").length.toString(), cls: "text-primary" },
          { label: "Vencidas", value: COTIZACIONES.filter(c => c.status === "vencida").length.toString(), cls: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="card-modern text-center">
            <p className="text-xs font-medium text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-xl font-bold tabular-nums ${s.cls}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input type="text" placeholder="Buscar cotización..." className="w-full pl-11 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200" />
      </div>

      {/* Table */}
      <div className="card-modern overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Cotización#", "Cliente", "Contacto", "Fecha", "Válida Hasta", "Total", "Estado", "Acciones"].map((h) => (
                <th key={h} className="text-left py-3 px-5 text-[11px] font-medium text-muted-foreground first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COTIZACIONES.map((cot, i) => (
              <motion.tr
                key={cot.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-5 font-mono text-xs font-semibold text-foreground">{cot.id}</td>
                <td className="py-3 px-5 font-medium text-foreground">{cot.client}</td>
                <td className="py-3 px-5 text-muted-foreground text-xs">{cot.contact}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{cot.date}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{cot.validUntil}</td>
                <td className="py-3 px-5 font-bold tabular-nums text-foreground">L {cot.total.toLocaleString()}</td>
                <td className="py-3 px-5"><span className={statusMap[cot.status]}>{statusLabel[cot.status]}</span></td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openPreview(cot)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Vista previa">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Enviar al cliente">
                      <Send className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    {cot.status !== "aprobada" && cot.status !== "vencida" && (
                      <button className="p-1.5 rounded-lg hover:bg-emerald-50 transition-colors" title="Marcar como aprobada">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Preview Modal */}
      {preview && (
        <DocumentPDFTemplate data={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
