import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Truck, ClipboardList, Package, DollarSign,
  AlertTriangle, Wrench, TrendingUp, ArrowUpRight, ArrowRight,
} from "lucide-react";

const STATS = [
  { label: "Órdenes Activas", value: "12", change: "+3", icon: ClipboardList, iconBg: "bg-primary/10", iconColor: "text-primary" },
  { label: "Equipos en Renta", value: "8", change: "+1", icon: Truck, iconBg: "bg-secondary/10", iconColor: "text-secondary" },
  { label: "Técnicos en Campo", value: "4", change: "0", icon: Wrench, iconBg: "bg-blue-500/10", iconColor: "text-blue-500" },
  { label: "Ingresos del Mes", value: "L 485,200", change: "+12%", icon: DollarSign, iconBg: "bg-success/10", iconColor: "text-green-600" },
];

const RECENT_ORDERS = [
  { id: "OT-2026-102", client: "DIUNSA", equipment: "Hyster H50XT", tech: "Maynor", status: "progreso" },
  { id: "OT-2026-101", client: "Lady Lee", equipment: "Toyota 7FGU25", tech: "Aaron", status: "pendiente" },
  { id: "OT-2026-100", client: "Cargill", equipment: "Yale GDP080", tech: "Edwin", status: "completado" },
  { id: "OT-2026-099", client: "DIUNSA", equipment: "Toyota 8FGU30", tech: "Maynor", status: "progreso" },
  { id: "OT-2026-098", client: "Lacthosa", equipment: "Hyster H40XT", tech: "Julio", status: "completado" },
];

const LOW_STOCK = [
  { name: "Filtro Aceite Hyster", sku: "FO-HYS-001", stock: 2, min: 5 },
  { name: "Manguera Hidráulica 1/2\"", sku: "MH-050", stock: 3, min: 10 },
  { name: "Llanta Sólida 6.00-9", sku: "LS-609", stock: 1, min: 4 },
  { name: "Kit Sellos Cilindro", sku: "KS-CIL-01", stock: 4, min: 8 },
];

const FLEET = [
  { name: "Toyota 7FGU25", serial: "7FGU25-60234", status: "renta", client: "DIUNSA" },
  { name: "Hyster H50XT", serial: "H50XT-D2145", status: "taller", client: "—" },
  { name: "Kenworth T800 Grúa", serial: "KW-T800-019", status: "operativo", client: "—" },
  { name: "Yale GDP080", serial: "GDP080-BX442", status: "renta", client: "Cargill" },
  { name: "Toyota 8FGU30", serial: "8FGU30-81023", status: "renta", client: "DIUNSA" },
];

const statusMap: Record<string, string> = {
  progreso: "status-progreso",
  pendiente: "status-pendiente",
  completado: "status-completado",
  renta: "status-operativo",
  taller: "status-taller",
  operativo: "status-disponible",
};

const statusLabel: Record<string, string> = {
  progreso: "En Progreso",
  pendiente: "Pendiente",
  completado: "Completado",
  renta: "En Renta",
  taller: "En Taller",
  operativo: "Disponible",
};

export default function Dashboard() {
  const { user } = useAuth();
  const isTecnico = user?.role === "tecnico";

  if (isTecnico) return <TecnicoDashboard />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Bienvenido, {user?.name} · Resumen de operaciones SETECLO
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="card-modern flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${s.iconBg}`}>
              <s.icon className={`h-5 w-5 ${s.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold tabular-nums text-foreground">{s.value}</p>
                {s.change !== "0" && (
                  <span className="text-[10px] font-semibold text-green-600 flex items-center gap-0.5">
                    <ArrowUpRight className="h-3 w-3" />{s.change}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-7 card-modern">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground">Órdenes Recientes</h2>
            <button className="text-xs font-medium text-secondary hover:text-secondary/80 flex items-center gap-1 transition-colors">
              Ver Todas <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["OT#", "Cliente", "Equipo", "Técnico", "Estado"].map((h) => (
                    <th key={h} className="text-left py-2.5 text-[11px] font-medium text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="py-3 font-mono text-xs font-semibold text-foreground">{o.id}</td>
                    <td className="py-3 font-medium">{o.client}</td>
                    <td className="py-3 text-muted-foreground text-xs">{o.equipment}</td>
                    <td className="py-3 text-muted-foreground">{o.tech}</td>
                    <td className="py-3"><span className={statusMap[o.status]}>{statusLabel[o.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Fleet Status */}
          <div className="card-modern">
            <h2 className="text-sm font-semibold text-foreground mb-4">Estado de Flota</h2>
            <div className="space-y-0">
              {FLEET.map((f) => (
                <div key={f.serial} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.name}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">{f.serial}</p>
                  </div>
                  <div className="text-right">
                    <span className={statusMap[f.status]}>{statusLabel[f.status]}</span>
                    {f.client !== "—" && (
                      <p className="text-[10px] text-muted-foreground mt-1">{f.client}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock */}
          <div className="card-modern-warning">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">Stock Crítico</h2>
            </div>
            <div className="space-y-0">
              {LOW_STOCK.map((item) => (
                <div key={item.sku} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">{item.sku}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold tabular-nums ${item.stock <= 2 ? "text-destructive" : "text-primary"}`}>
                      {item.stock}
                    </span>
                    <span className="text-[11px] text-muted-foreground"> / {item.min}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TecnicoDashboard() {
  const { user } = useAuth();
  const myOrders = RECENT_ORDERS.filter(
    (o) => o.tech.toLowerCase() === user?.name.toLowerCase() || o.status !== "completado"
  ).slice(0, 3);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hola, {user?.name}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Tienes {myOrders.length} órdenes asignadas
        </p>
      </div>

      <div className="space-y-3">
        {myOrders.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="card-modern-accent cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-bold text-foreground">{o.id}</span>
              <span className={statusMap[o.status]}>{statusLabel[o.status]}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{o.client}</span> — {o.equipment}
            </p>
            <button className="mt-4 w-full py-2.5 bg-secondary text-secondary-foreground font-semibold text-sm rounded-lg hover:opacity-90 transition-all duration-200">
              Iniciar Trabajo
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
