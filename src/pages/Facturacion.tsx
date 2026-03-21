import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, FileDown, Printer, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import DocumentPDFTemplate, { type DocumentData } from "@/components/DocumentPDFTemplate";
import { useDocuments } from "@/contexts/DocumentContext";

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
  const { facturas } = useDocuments();
  const [preview, setPreview] = useState<DocumentData | null>(null);

  const openPreview = (inv: typeof facturas[0]) => {
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
      subtotal: inv.subtotal,
      isv: inv.isv,
      total: inv.total,
      paymentTerms: "Neto 30 días",
      preparedBy: inv.preparedBy,
    });
  };

  const exportExcel = async (inv: typeof facturas[0]) => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();

    const header = [
      ["SETECLO — Servicios Técnicos Logísticos"],
      ["San Pedro Sula, Honduras · Tel: +504 9879-9033"],
      [],
      ["FACTURA", inv.id],
      ["Fecha:", inv.date],
      ["Vencimiento:", inv.dueDate],
      [],
      ["Cliente:", inv.client],
      ["RTN:", inv.rtn],
      ["Contacto:", inv.contact],
      [],
      ["Cant.", "Descripción", "Unidad", "P. Unitario", "Total"],
    ];

    const rows = inv.items.map(item => [item.qty, item.description, item.unit, item.unitPrice, item.total]);
    const footer = [
      [],
      ["", "", "", "Subtotal", inv.subtotal],
      ["", "", "", "ISV (15%)", inv.isv],
      ["", "", "", "TOTAL", inv.total],
      [],
      ["Elaborado por:", inv.preparedBy],
    ];

    const ws = XLSX.utils.aoa_to_sheet([...header, ...rows, ...footer]);
    ws["!cols"] = [{ wch: 8 }, { wch: 50 }, { wch: 12 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws, "Factura");
    XLSX.writeFile(wb, `Factura_${inv.id}.xlsx`);
    toast.success("Excel exportado correctamente");
  };

  const totalIngresos = facturas.filter(i => i.status === "pagada").reduce((a, b) => a + b.total, 0);
  const totalPendiente = facturas.filter(i => i.status === "pendiente").reduce((a, b) => a + b.total, 0);
  const totalVencida = facturas.filter(i => i.status === "vencida").reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facturación</h1>
          <p className="text-sm text-muted-foreground">{facturas.length} facturas</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
          <Plus className="h-4 w-4" /> Nueva Factura
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Ingresos Cobrados", value: `L ${totalIngresos.toLocaleString()}`, cls: "text-secondary" },
          { label: "Pendiente Cobro", value: `L ${totalPendiente.toLocaleString()}`, cls: "text-primary" },
          { label: "Vencidas", value: `L ${totalVencida.toLocaleString()}`, cls: "text-destructive" },
          { label: "Total Facturas", value: facturas.length.toString(), cls: "text-foreground" },
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
            {facturas.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-5 font-mono text-xs font-semibold text-foreground">
                  {inv.id}
                  {inv.fromCotizacion && (
                    <span className="block text-[10px] text-muted-foreground font-normal">de {inv.fromCotizacion}</span>
                  )}
                </td>
                <td className="py-3 px-5 font-medium text-foreground">{inv.client}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{inv.date}</td>
                <td className="py-3 px-5 tabular-nums text-muted-foreground">{inv.dueDate}</td>
                <td className="py-3 px-5 text-xs text-muted-foreground max-w-[200px] truncate">{inv.concept}</td>
                <td className="py-3 px-5 font-bold tabular-nums text-foreground">L {inv.total.toLocaleString()}</td>
                <td className="py-3 px-5"><span className={statusMap[inv.status]}>{statusLabel[inv.status]}</span></td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openPreview(inv)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Vista previa PDF">
                      <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => exportExcel(inv)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Exportar Excel">
                      <FileSpreadsheet className="h-3.5 w-3.5 text-muted-foreground" />
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

      {preview && (
        <DocumentPDFTemplate data={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
