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
          <h1 className="text-2xl font-bold">Inventario</h1>
          <p className="text-sm text-muted-foreground">
            {INVENTORY.length} items · {critical > 0 && (
              <span className="text-destructive font-semibold">{critical} bajo stock mínimo</span>
            )}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider rounded hover:opacity-90 transition-all duration-150">
          <Plus className="h-4 w-4" /> Nuevo Repuesto
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por SKU o nombre..."
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-150"
          />
        </div>
      </div>

      <div className="industrial-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["SKU", "Repuesto", "Categoría", "Stock", "Mín", "Costo Unit.", "Proveedor"].map((h) => (
                <th key={h} className="text-left py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
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
                  className={`border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-150 ${isLow ? "bg-destructive/5" : ""}`}
                >
                  <td className="py-2.5 font-mono text-xs font-semibold">{item.sku}</td>
                  <td className="py-2.5 font-medium">
                    <div className="flex items-center gap-2">
                      {isLow && <AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
                      {item.name}
                    </div>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{item.category}</td>
                  <td className={`py-2.5 font-bold tabular-nums ${isLow ? "text-destructive" : ""}`}>{item.stock}</td>
                  <td className="py-2.5 tabular-nums text-muted-foreground">{item.min}</td>
                  <td className="py-2.5 tabular-nums">{item.cost}</td>
                  <td className="py-2.5 text-muted-foreground text-xs">{item.supplier}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
