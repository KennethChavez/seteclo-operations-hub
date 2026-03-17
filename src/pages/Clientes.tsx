import { motion } from "framer-motion";
import { Plus, Search, Phone, Mail, MapPin, Building2 } from "lucide-react";

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
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-sm text-muted-foreground">{CLIENTS.length} clientes registrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Cliente
        </button>
      </div>

      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-card focus:border-border focus:ring-2 focus:ring-primary/10 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {CLIENTS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            whileHover={{ y: -2 }}
            className="card-modern cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-secondary transition-colors">{c.name}</h3>
                  <p className="text-[10px] font-mono text-muted-foreground">RTN: {c.rtn}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5" />{c.phone}</div>
              <div className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5" />{c.email}</div>
              <div className="flex items-center gap-2.5"><MapPin className="h-3.5 w-3.5" />{c.city}</div>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
              <div>
                <p className="text-[10px] font-medium text-muted-foreground">Órdenes</p>
                <p className="text-lg font-bold tabular-nums text-foreground">{c.orders}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-medium text-muted-foreground">Ingresos</p>
                <p className="text-lg font-bold tabular-nums text-secondary">{c.revenue}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
