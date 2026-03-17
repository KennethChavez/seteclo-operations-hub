import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, FileDown, Printer, Save, MoreHorizontal } from "lucide-react";
import DocumentPDFTemplate, { type DocumentData } from "@/components/DocumentPDFTemplate";

const INVOICES = [
  {
    id: "FAC-2026-045", client: "DIUNSA", contact: "Carlos Méndez", rtn: "0801-1992-00234",
    date: "2026-03-14", dueDate: "2026-04-14", status: "pagada", amount: 24500,
    items: [
      { qty: 1, description: "Renta mensual montacargas Toyota 7FGU25", unit: "Mes", unitPrice: 24500, total: 24500 },
    ],
    concept: "Renta mensual montacargas Toyota 7FGU25",
    preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-044", client: "Cargill", contact: "Roberto Flores", rtn: "0501-2001-00890",
    date: "2026-03-12", dueDate: "2026-04-12", status: "pendiente", amount: 18200,
    items: [
      { qty: 1, description: "Mantenimiento correctivo Yale GDP080", unit: "Servicio", unitPrice: 14000, total: 14000 },
      { qty: 2, description: "Kit sellos cilindro hidráulico", unit: "Pza", unitPrice: 890, total: 1780 },
      { qty: 1, description: "Manguera hidráulica 3/4\"", unit: "Pza", unitPrice: 220, total: 220 },
      { qty: 4, description: "Aceite Hidráulico 10W-30 (Galón)", unit: "Gal", unitPrice: 320, total: 1280 },
    ],
    concept: "Mantenimiento correctivo Yale GDP080",
    preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-043", client: "Lady Lee", contact: "María López", rtn: "0801-1998-00567",
    date: "2026-03-10", dueDate: "2026-04-10", status: "pagada", amount: 32000,
    items: [
      { qty: 1, description: "Renta mensual montacargas", unit: "Mes", unitPrice: 24000, total: 24000 },
      { qty: 1, description: "Mantenimiento preventivo mensual", unit: "Servicio", unitPrice: 8000, total: 8000 },
    ],
    concept: "Renta mensual + mantenimiento preventivo",
    preparedBy: "Hersen Carballo",
  },
  {
    id: "FAC-2026-042", client: "Lacthosa", contact: "Ana Reyes", rtn: "0801-1985-00123",
    date: "2026-03-08", dueDate: "2026-03-23", status: "vencida", amount: 12800,
    items: [
      { qty: 1, description: "Reparación sistema hidráulico Hyster H40XT", unit: "Servicio", unitPrice: 12800, total: 12800 },
    ],
    concept: "Reparación sistema hidráulico Hyster H40XT",
    preparedBy: "Hersen Carballo",
  },
];

const statusMap: Record<string, string> = {
  pagada: "status-completado",
  pendiente: "status-pendiente",
  vencida: "status-critico",
};
const statusLabel: Record<string, string> = {
  pagada: "Pagada",
  pendiente: "Pendiente",
  vencida: "Vencida",
};

export default function Facturacion() {
  const [preview, setPreview] = useState<DocumentData | null>(null);

  const openPreview = (inv: typeof INVOICES[0]) => {
    const subtotal = inv.items.reduce((a, b) => a + b.total, 0);
    const isv = Math.round(subtotal * 0.15);
    setPreview({
      type: "factura",
      number: inv.id,
      date: inv.date,
      dueDate: inv.dueDate,
      client: {
        name: inv.client,
        rtn: inv.rtn,
        address: "San Pedro Sula, Honduras",
        phone: "",
        contact: inv.contact,
      },
      items: inv.items,
      subtotal,
      isv,
      total: subtotal + isv,
      paymentTerms: "Neto 30 días",
      preparedBy: inv.preparedBy,
    });
  };

  const totalIngresos = INVOICES.filter(i => i.status === "pagada").reduce((a, b) => a + b.amount, 0);
  const totalPendiente = INVOICES.filter(i => i.status === "pendiente").reduce((a, b) => a + b.amount, 0);
  const totalVencida = INVOICES.filter(i => i.status === "vencida").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facturación</h1>
          <p className="text-sm text-muted-foreground">{INVOICES.length} facturas</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
            <Plus className="h-4 w-4" /> Nueva Factura
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Ingresos Cobrados", value: `L ${totalIngresos.toLocaleString()}`, cls: "text-secondary" },
          { label: "Pendiente Cobro", value: `L ${totalPendiente.toLocaleString()}`, cls: "text-primary" },
          { label: "Vencidas", value: `L ${totalVencida.toLocaleString()}`, cls: "text-destructive" },
          { label: "Total Facturas", value: INVOICES.length.toString(), cls: "text-foreground" },
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
        <input type="text" placeholder="Buscar factura..." className="w-full pl-11 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/30 transition-all duration-200" />
      </div>

      {/* Table */}
      <div className="card-modern overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Factura#", "Cliente", "Fecha", "Vencimiento", "Concepto", "Monto", "Estado", "Acciones"].map((h) => (
                <th key={h} className="text-left py-3 px-5 text-[11px] font-medium text-muted-foreground first:rounded-tl-2xl last:rounded-tr-2xl">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-5 font-mono text-xs font-semibold text-foreground">{inv.id}</td>
                <td className="py-3 px-5 font-medium text-foreground">{inv.client}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{inv.date}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{inv.dueDate}</td>
                <td className="py-3 px-5 text-xs text-muted-foreground max-w-[200px] truncate">{inv.concept}</td>
                <td className="py-3 px-5 font-bold tabular-nums text-foreground">L {inv.amount.toLocaleString()}</td>
                <td className="py-3 px-5"><span className={statusMap[inv.status]}>{statusLabel[inv.status]}</span></td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openPreview(inv)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Vista previa PDF">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Exportar PDF">
                      <FileDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Imprimir">
                      <Printer className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
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
