import { motion } from "framer-motion";
import { Plus, Search, AlertTriangle, Package } from "lucide-react";

const INVENTORY = [
  { sku: "FO-HYS-001", name: "Filtro Aceite Hyster", category: "Filtros", stock: 2, min: 5, cost: "L 245", supplier: "Repuestos Industriales SPS" },
  { sku: "FO-TOY-001", name: "Filtro Aceite Toyota", category: "Filtros", stock: 8, min: 5, cost: "L 280", supplier: "Toyota Honduras" },
  { sku: "MH-050", name: "Manguera Hidráulica 1/2\"", category: "Hidráulica", stock: 3, min: 10, cost: "L 150", supplier: "Hidráulicos del Norte" },
  { sku: "MH-075", name: "Manguera Hidráulica 3/4\"", category: "Hidráulica", stock: 12, min: 8, cost: "L 220", supplier: "Hidráulicos del Norte" },
  { sku: "LS-609", name: "Llanta Sólida 6.00-9", category: "Llantas", stock: 1, min: 4, cost: "L 3,200", supplier: "Llantas & Más" },
  { sku: "LS-700", name: "Llanta Sólida 7.00-12", category: "Llantas", stock: 6, min: 4, cost: "L 4,100", supplier: "Llantas & Más" },
  { sku: "KS-CIL-01", name: "Kit Sellos Cilindro", category: "Sellos", stock: 4, min: 8, cost: "L 890", supplier: "Repuestos Industriales SPS" },
  { sku: "AH-10W30", name: "Aceite Hidráulico 10W-30 (Galón)", category: "Lubricantes", stock: 15, min: 10, cost: "L 320", supplier: "Shell Honduras" },
  { sku: "RD-FORK-01", name: "Rodamiento Mástil Montacargas", category: "Rodamientos", stock: 3, min: 6, cost: "L 560", supplier: "Repuestos Industriales SPS" },
  { sku: "CT-IGN-01", name: "Cables de Ignición Toyota", category: "Eléctrico", stock: 5, min: 4, cost: "L 410", supplier: "Toyota Honduras" },
];

export default function Inventario() {
  const critical = INVENTORY.filter((i) => i.stock < i.min).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
          <p className="text-sm text-muted-foreground">
            {INVENTORY.length} items {critical > 0 && (
              <span className="text-destructive font-semibold">· {critical} bajo stock mínimo</span>
            )}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Repuesto
        </button>
      </div>

      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input
          type="text"
          placeholder="Buscar por SKU o nombre..."
          className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-card focus:border-border focus:ring-2 focus:ring-primary/10 transition-all duration-200"
        />
      </div>

      <div className="card-modern overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["SKU", "Repuesto", "Categoría", "Stock", "Mín", "Costo Unit.", "Proveedor"].map((h) => (
                <th key={h} className="text-left py-3 px-5 text-[11px] font-medium text-muted-foreground first:rounded-tl-xl last:rounded-tr-xl">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INVENTORY.map((item, i) => {
              const isLow = item.stock < item.min;
              return (
                <motion.tr
                  key={item.sku}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer ${isLow ? "bg-destructive/[0.03]" : ""}`}
                >
                  <td className="py-3 px-5 font-mono text-xs font-semibold text-foreground">{item.sku}</td>
                  <td className="py-3 px-5 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      {isLow && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                      {item.name}
                    </div>
                  </td>
                  <td className="py-3 px-5 text-muted-foreground">{item.category}</td>
                  <td className={`py-3 px-5 font-bold tabular-nums ${isLow ? "text-destructive" : "text-foreground"}`}>{item.stock}</td>
                  <td className="py-3 px-5 tabular-nums text-muted-foreground">{item.min}</td>
                  <td className="py-3 px-5 tabular-nums text-foreground">{item.cost}</td>
                  <td className="py-3 px-5 text-muted-foreground text-xs">{item.supplier}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
