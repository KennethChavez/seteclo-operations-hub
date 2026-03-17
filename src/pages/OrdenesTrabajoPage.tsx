import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";

const ORDERS = [
  { id: "OT-2026-102", client: "DIUNSA", equipment: "Hyster H50XT", serial: "H50XT-D2145", tech: "Maynor", type: "Correctivo", status: "progreso", date: "2026-03-15", desc: "Fuga en cilindro de levante, reemplazo de sellos" },
  { id: "OT-2026-101", client: "Lady Lee", equipment: "Toyota 7FGU25", serial: "7FGU25-60234", tech: "Aaron Pacheco", type: "Preventivo", status: "pendiente", date: "2026-03-16", desc: "Mantenimiento 500 horas: filtros, aceite, inspección general" },
  { id: "OT-2026-100", client: "Cargill", equipment: "Yale GDP080", serial: "GDP080-BX442", tech: "Edwin", type: "Correctivo", status: "completado", date: "2026-03-14", desc: "Reemplazo de cadena de levante y ajuste de mástil" },
  { id: "OT-2026-099", client: "DIUNSA", equipment: "Toyota 8FGU30", serial: "8FGU30-81023", tech: "Maynor", type: "Preventivo", status: "progreso", date: "2026-03-14", desc: "Mantenimiento 1000 horas, cambio de llantas sólidas" },
  { id: "OT-2026-098", client: "Lacthosa", equipment: "Hyster H40XT", serial: "H40XT-E3087", tech: "Julio", type: "Correctivo", status: "completado", date: "2026-03-13", desc: "Reparación de sistema hidráulico de dirección" },
  { id: "OT-2026-097", client: "Gildan", equipment: "Toyota 7FBE15", serial: "7FBE15-44521", tech: "Gerson", type: "Preventivo", status: "pendiente", date: "2026-03-17", desc: "Inspección de baterías y sistema eléctrico" },
];

const statusMap: Record<string, string> = {
  progreso: "status-progreso",
  pendiente: "status-pendiente",
  completado: "status-completado",
};
const statusLabel: Record<string, string> = {
  progreso: "En Progreso",
  pendiente: "Pendiente",
  completado: "Completado",
};
const typeMap: Record<string, string> = {
  Correctivo: "status-taller",
  Preventivo: "status-operativo",
};

const statusColors: Record<string, string> = {
  completado: "border-l-secondary",
  progreso: "border-l-blue-500",
  pendiente: "border-l-warning",
};

export default function OrdenesTrabajoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Órdenes de Trabajo</h1>
          <p className="text-sm text-muted-foreground">{ORDERS.length} órdenes · {ORDERS.filter(o => o.status === "progreso").length} en progreso</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm">
          <Plus className="h-4 w-4" /> Nueva Orden
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <input type="text" placeholder="Buscar OT#, cliente, equipo..." className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-card focus:border-border focus:ring-2 focus:ring-primary/10 transition-all duration-200" />
        </div>
        <div className="flex gap-2">
          {["Todos", "Pendiente", "En Progreso", "Completado"].map((f) => (
            <button key={f} className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${f === "Todos" ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {ORDERS.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            whileHover={{ y: -1 }}
            className={`card-modern cursor-pointer border-l-[3px] ${statusColors[o.status] || ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="font-mono text-base font-bold text-foreground">{o.id}</span>
                  <span className={statusMap[o.status]}>{statusLabel[o.status]}</span>
                  <span className={typeMap[o.type]}>{o.type}</span>
                </div>
                <p className="text-sm mb-1">
                  <span className="font-semibold text-foreground">{o.client}</span>
                  <span className="text-muted-foreground"> — {o.equipment}</span>
                  <span className="font-mono text-[11px] text-muted-foreground/60 ml-2">{o.serial}</span>
                </p>
                <p className="text-xs text-muted-foreground">{o.desc}</p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-xs text-muted-foreground">{o.date}</p>
                <p className="text-xs font-semibold text-foreground mt-1">{o.tech}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
