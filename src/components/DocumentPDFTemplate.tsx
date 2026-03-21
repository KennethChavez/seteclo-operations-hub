import { useRef, useState } from "react";
import { FileDown, Printer, X, Loader2 } from "lucide-react";
import setecloLogo from "@/assets/seteclo-logo.png";

export interface DocumentItem {
  qty: number;
  description: string;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface DocumentData {
  type: "cotizacion" | "factura";
  number: string;
  date: string;
  dueDate?: string;
  validUntil?: string;
  client: {
    name: string;
    rtn: string;
    address: string;
    phone: string;
    contact: string;
  };
  items: DocumentItem[];
  subtotal: number;
  isv: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  preparedBy: string;
}

interface Props {
  data: DocumentData;
  onClose?: () => void;
}

export default function DocumentPDFTemplate({ data, onClose }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const generatePDF = async () => {
    const content = printRef.current;
    if (!content) return null;

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "letter");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf;
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const pdf = await generatePDF();
      if (pdf) {
        const fileName = `${data.type === "cotizacion" ? "Cotizacion" : "Factura"}_${data.number}.pdf`;
        pdf.save(fileName);
      }
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = async () => {
    setExporting(true);
    try {
      const pdf = await generatePDF();
      if (pdf) {
        const blobUrl = pdf.output("bloburl");
        window.open(blobUrl as unknown as string, "_blank");
      }
    } finally {
      setExporting(false);
    }
  };

  const typeLabel = data.type === "cotizacion" ? "COTIZACIÓN" : "FACTURA";
  const accentColor = data.type === "cotizacion" ? "#1d9e8f" : "#e8630a";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card rounded-t-2xl z-10">
          <h2 className="text-sm font-semibold text-foreground">Vista Previa — {typeLabel} {data.number}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileDown className="h-3.5 w-3.5" />}
              Exportar PDF
            </button>
            <button
              onClick={handlePrint}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Printer className="h-3.5 w-3.5" />}
              Imprimir
            </button>
            {onClose && (
              <button onClick={onClose} className="p-2 rounded-lg border border-border hover:bg-muted transition-all text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* PDF Content */}
        <div ref={printRef}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 48px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1a1a2e", background: "#ffffff" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <img src={setecloLogo} alt="SETECLO" style={{ height: 40, marginBottom: 8 }} crossOrigin="anonymous" />
                <p style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.6 }}>
                  Servicios Técnicos Logísticos<br />
                  San Pedro Sula, Honduras<br />
                  Tel: +504 9879-9033<br />
                  info@seteclo.com
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: accentColor, letterSpacing: 1 }}>{typeLabel}</p>
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{data.number}</p>
                <div style={{ marginTop: 12, fontSize: 11, color: "#6b7280" }}>
                  <p>Fecha: <strong style={{ color: "#1a1a2e" }}>{data.date}</strong></p>
                  {data.dueDate && <p>Vencimiento: <strong style={{ color: "#1a1a2e" }}>{data.dueDate}</strong></p>}
                  {data.validUntil && <p>Válida hasta: <strong style={{ color: "#1a1a2e" }}>{data.validUntil}</strong></p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 3, background: accentColor, borderRadius: 2, marginBottom: 24 }} />

            {/* Client info */}
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: "#6b7280", marginBottom: 8 }}>Facturar a</p>
              <p style={{ fontSize: 15, fontWeight: 700 }}>{data.client.name}</p>
              <p style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                RTN: {data.client.rtn}{data.client.phone ? ` · ${data.client.phone}` : ""}<br />
                {data.client.address}<br />
                Atención: {data.client.contact}
              </p>
            </div>

            {/* Items Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  {["Cant.", "Descripción", "Unidad", "P. Unitario", "Total"].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i >= 3 ? "right" : "left",
                      padding: "10px 12px",
                      fontSize: 10,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      color: "#6b7280",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{item.qty}</td>
                    <td style={{ padding: "12px" }}>{item.description}</td>
                    <td style={{ padding: "12px", color: "#6b7280" }}>{item.unit}</td>
                    <td style={{ padding: "12px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>L {item.unitPrice.toLocaleString()}</td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>L {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
              <div style={{ width: 260 }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12, color: "#6b7280" }}>
                  <span>Subtotal</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>L {data.subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 12, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>
                  <span>ISV (15%)</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>L {data.isv.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 16, fontWeight: 800, color: accentColor }}>
                  <span>TOTAL</span>
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>L {data.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(data.notes || data.paymentTerms) && (
              <div style={{ background: "#f8fafc", borderRadius: 8, padding: "16px 20px", marginBottom: 24, fontSize: 11 }}>
                {data.paymentTerms && (
                  <p style={{ marginBottom: data.notes ? 8 : 0 }}>
                    <strong>Condiciones de pago:</strong> {data.paymentTerms}
                  </p>
                )}
                {data.notes && (
                  <p><strong>Notas:</strong> {data.notes}</p>
                )}
              </div>
            )}

            {/* Footer */}
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9ca3af" }}>
              <p>Elaborado por: <strong style={{ color: "#1a1a2e" }}>{data.preparedBy}</strong></p>
              <p>SETECLO © 2017–2026 · seteclo.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
