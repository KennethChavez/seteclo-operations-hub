import { motion } from "framer-motion";
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react";

const CLIENTS = [
  { id: 1, name: "DIUNSA", rtn: "0801-1992-00234", contact: "Carlos Méndez", phone: "+504 2556-8900", city: "San Pedro Sula", email: "compras@diunsa.hn", orders: 24, revenue: "L 182,400" },
  { id: 2, name: "Lady Lee", rtn: "0801-1998-00567", contact: "María López", phone: "+504 2553-4500", city: "San Pedro Sula", email: "logistica@ladylee.hn", orders: 18, revenue: "L 134,600" },
  { id: 3, name: "Cargill Honduras", rtn: "0501-2001-00890", contact: "Roberto Flores", phone: "+504 2668-1200", city: "San Pedro Sula", email: "maint@cargill.hn", orders: 15, revenue: "L 98,500" },
  { id: 4, name: "Lacthosa", rtn: "0801-1985-00123", contact: "Ana Reyes", phone: "+504 2557-3400", city: "San Pedro Sula", email: "operaciones@lacthosa.hn", orders: 8, revenue: "L 56,200" },
  { id: 5, name: "Cervecería Hondureña", rtn: "0801-1960-00456", contact: "José Martínez", phone: "+504 2559-8000", city: "San Pedro Sula", email: "planta@cerveceria.hn", orders: 6, revenue: "L 45,000" },
  { id: 6, name: "Gildan Activewear", rtn: "0501-2005-01234", contact: "Luis Hernández", phone: "+504 2668-5500", city: "Choloma", email: "facilities@gildan.com", orders: 10, revenue: "L 72,800" },
];

export default function Clientes() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">{CLIENTS.length} clientes registrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider rounded hover:opacity-90 transition-all duration-150">
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </button>
      </div>

      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-150"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CLIENTS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.15 }}
            whileHover={{ y: -2 }}
            className="industrial-card-accent cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold">{c.name}</h3>
              <span className="text-[10px] font-mono text-muted-foreground">RTN: {c.rtn}</span>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-3 w-3" />{c.phone}</div>
              <div className="flex items-center gap-2"><Mail className="h-3 w-3" />{c.email}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3 w-3" />{c.city}</div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Órdenes</p>
                <p className="text-lg font-bold tabular-nums">{c.orders}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ingresos</p>
                <p className="text-lg font-bold tabular-nums text-secondary">{c.revenue}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
