import { FileText, Plus } from "lucide-react";

const INVOICES = [
  { id: "FAC-2026-045", client: "DIUNSA", date: "2026-03-14", amount: "L 24,500", status: "pagada", concept: "Renta mensual montacargas Toyota 7FGU25" },
  { id: "FAC-2026-044", client: "Cargill", date: "2026-03-12", amount: "L 18,200", status: "pendiente", concept: "Mantenimiento correctivo Yale GDP080" },
  { id: "FAC-2026-043", client: "Lady Lee", date: "2026-03-10", amount: "L 32,000", status: "pagada", concept: "Renta mensual + mantenimiento preventivo" },
  { id: "FAC-2026-042", client: "Lacthosa", date: "2026-03-08", amount: "L 12,800", status: "vencida", concept: "Reparación sistema hidráulico Hyster H40XT" },
  { id: "COT-2026-018", client: "Gildan", date: "2026-03-15", amount: "L 45,000", status: "cotizacion", concept: "Renta 2 montacargas eléctricos x 3 meses" },
];

const statusMap: Record<string, string> = {
  pagada: "status-completado",
  pendiente: "status-pendiente",
  vencida: "status-critico",
  cotizacion: "status-progreso",
};
const statusLabel: Record<string, string> = {
  pagada: "Pagada",
  pendiente: "Pendiente",
  vencida: "Vencida",
  cotizacion: "Cotización",
};

export default function Facturacion() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facturación & Cotizaciones</h1>
          <p className="text-sm text-muted-foreground">{INVOICES.length} documentos</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
            <FileText className="h-4 w-4" /> Nueva Cotización
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
            <Plus className="h-4 w-4" /> Nueva Factura
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Ingresos Mes", value: "L 485,200", cls: "text-secondary" },
          { label: "Pendiente Cobro", value: "L 31,000", cls: "text-primary" },
          { label: "Vencidas", value: "L 12,800", cls: "text-destructive" },
          { label: "Cotizaciones", value: "L 45,000", cls: "text-foreground" },
        ].map((s) => (
          <div key={s.label} className="card-modern text-center">
            <p className="text-xs font-medium text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-xl font-bold tabular-nums ${s.cls}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card-modern overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Doc#", "Cliente", "Fecha", "Concepto", "Monto", "Estado"].map((h) => (
                <th key={h} className="text-left py-3 px-5 text-[11px] font-medium text-muted-foreground first:rounded-tl-xl last:rounded-tr-xl">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="py-3 px-5 font-mono text-xs font-semibold text-foreground">{inv.id}</td>
                <td className="py-3 px-5 font-medium text-foreground">{inv.client}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{inv.date}</td>
                <td className="py-3 px-5 text-xs text-muted-foreground max-w-xs truncate">{inv.concept}</td>
                <td className="py-3 px-5 font-bold tabular-nums text-foreground">{inv.amount}</td>
                <td className="py-3 px-5"><span className={statusMap[inv.status]}>{statusLabel[inv.status]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
