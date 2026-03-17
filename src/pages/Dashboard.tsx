import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Truck, ClipboardList, Package, DollarSign,
  AlertTriangle, Wrench, ArrowUpRight, ArrowRight,
  MapPin, Clock, Activity, MoreHorizontal,
} from "lucide-react";

/* ── data ── */
const STATS = [
  { label: "Total SKU", value: "285", change: "+2.58%", icon: Package, iconBg: "bg-primary/10", iconColor: "text-primary" },
  { label: "Equipos en Renta", value: "8", change: "+1", icon: Truck, iconBg: "bg-secondary/10", iconColor: "text-secondary" },
  { label: "Órdenes Activas", value: "12", change: "+3", icon: ClipboardList, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "Ingresos del Mes", value: "L 485,200", change: "+12%", icon: DollarSign, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
];

const RECENT_ORDERS = [
  { id: "OT-2026-102", client: "DIUNSA", equipment: "Hyster H50XT", tech: "Maynor", status: "progreso" },
  { id: "OT-2026-101", client: "Lady Lee", equipment: "Toyota 7FGU25", tech: "Aaron", status: "pendiente" },
  { id: "OT-2026-100", client: "Cargill", equipment: "Yale GDP080", tech: "Edwin", status: "completado" },
  { id: "OT-2026-099", client: "DIUNSA", equipment: "Toyota 8FGU30", tech: "Maynor", status: "progreso" },
  { id: "OT-2026-098", client: "Lacthosa", equipment: "Hyster H40XT", tech: "Julio", status: "completado" },
];

const WAREHOUSE_STORAGE = [
  { zone: "Zona A", section: "A1–A10", category: "Filtros & Aceites", used: 80, total: 100, color: "bg-primary" },
  { zone: "Zona B", section: "B1–B10", category: "Hidráulica", used: 60, total: 100, color: "bg-secondary" },
  { zone: "Zona C", section: "C1–C10", category: "Llantas & Rodamientos", used: 90, total: 100, color: "bg-destructive" },
  { zone: "Zona D", section: "D1–D10", category: "Eléctrico", used: 50, total: 100, color: "bg-blue-500" },
  { zone: "Zona E", section: "E1–E5", category: "Sellado & Juntas", used: 35, total: 50, color: "bg-amber-500" },
];

const FLEET = [
  { name: "Toyota 7FGU25", serial: "7FGU25-60234", status: "renta", client: "DIUNSA", location: "SPS" },
  { name: "Hyster H50XT", serial: "H50XT-D2145", status: "taller", client: "—", location: "Taller #1" },
  { name: "Kenworth T800", serial: "KW-T800-019", status: "operativo", client: "—", location: "Puerto Cortés" },
  { name: "Yale GDP080", serial: "GDP080-BX442", status: "renta", client: "Cargill", location: "SPS" },
  { name: "Toyota 8FGU30", serial: "8FGU30-81023", status: "renta", client: "DIUNSA", location: "SPS" },
];

const ACTIVITY_LOG = [
  { user: "Maynor", action: "cerró orden OT-2026-100 con evidencia fotográfica", time: "Hace 15 min", color: "bg-emerald-500" },
  { user: "Hersen", action: "creó cotización COT-2026-019 para Gildan — L 45,000", time: "Hace 32 min", color: "bg-blue-500" },
  { user: "Aaron", action: "registró entrada de 20 unidades Filtro Aceite Toyota", time: "Hace 1 hora", color: "bg-secondary" },
  { user: "Esly", action: "asignó OT-2026-103 a Edwin — Cervecería Hondureña", time: "Hace 2 horas", color: "bg-primary" },
];

const LOW_STOCK = [
  { name: "Filtro Aceite Hyster", sku: "FO-HYS-001", stock: 2, min: 5 },
  { name: "Manguera Hidráulica 1/2\"", sku: "MH-050", stock: 3, min: 10 },
  { name: "Llanta Sólida 6.00-9", sku: "LS-609", stock: 1, min: 4 },
  { name: "Kit Sellos Cilindro", sku: "KS-CIL-01", stock: 4, min: 8 },
];

const statusMap: Record<string, string> = {
  progreso: "status-progreso", pendiente: "status-pendiente", completado: "status-completado",
  renta: "status-operativo", taller: "status-taller", operativo: "status-disponible",
};
const statusLabel: Record<string, string> = {
  progreso: "En Progreso", pendiente: "Pendiente", completado: "Completado",
  renta: "En Renta", taller: "En Taller", operativo: "Disponible",
};

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.4 },
});

/* ── Main Dashboard ── */
export default function Dashboard() {
  const { user } = useAuth();
  if (user?.role === "tecnico") return <TecnicoDashboard />;

  const capacityUsed = WAREHOUSE_STORAGE.reduce((a, b) => a + b.used, 0);
  const capacityTotal = WAREHOUSE_STORAGE.reduce((a, b) => a + b.total, 0);
  const capacityPct = Math.round((capacityUsed / capacityTotal) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Resumen de operaciones SETECLO · Bienvenido, {user?.name}
          </p>
        </div>
        <div className="flex gap-2">
          {["Montacargas", "Grúas", "Taller"].map((tab, i) => (
            <button key={tab} className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${i === 0 ? "bg-foreground text-background" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} {...fadeUp(i)} className="card-modern">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              <div className={`p-2 rounded-xl ${s.iconBg}`}>
                <s.icon className={`h-4 w-4 ${s.iconColor}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold tabular-nums text-foreground">{s.value}</p>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" />{s.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main grid: 3 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Warehouse Storage */}
        <motion.div {...fadeUp(4)} className="lg:col-span-5 card-modern">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground">Almacén — Zonas</h2>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] font-medium text-muted-foreground">
                <th className="text-left pb-3">Zona</th>
                <th className="text-left pb-3">Categoría</th>
                <th className="text-left pb-3">Uso</th>
                <th className="text-right pb-3">Disponible</th>
              </tr>
            </thead>
            <tbody>
              {WAREHOUSE_STORAGE.map((z) => (
                <tr key={z.zone} className="border-t border-border/50">
                  <td className="py-3">
                    <p className="font-semibold text-foreground text-xs">{z.zone}</p>
                    <p className="text-[10px] text-muted-foreground">{z.section}</p>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{z.category}</td>
                  <td className="py-3 w-28">
                    <div className="progress-bar">
                      <div className={`progress-bar-fill ${z.color}`} style={{ width: `${(z.used / z.total) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{z.used}%</p>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-xs tabular-nums font-medium text-foreground">{z.total - z.used}</span>
                    <span className="text-[10px] text-muted-foreground">/{z.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Center: Capacity + Recent Orders */}
        <div className="lg:col-span-4 space-y-6">
          {/* Capacity Usage */}
          <motion.div {...fadeUp(5)} className="card-modern">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Capacidad Almacén</h2>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center justify-center py-4">
              {/* Donut chart via SVG */}
              <div className="relative">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="56" fill="none" strokeWidth="14" className="stroke-muted" />
                  <circle
                    cx="70" cy="70" r="56"
                    fill="none" strokeWidth="14"
                    strokeLinecap="round"
                    className="stroke-primary"
                    strokeDasharray={`${capacityPct * 3.52} ${352 - capacityPct * 3.52}`}
                    strokeDashoffset="88"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground tabular-nums">{capacityPct}%</span>
                  <span className="text-[10px] text-muted-foreground">Uso Total</span>
                </div>
              </div>
            </div>
            <div className="flex justify-around text-center pt-2 border-t border-border/50">
              <div>
                <p className="text-lg font-bold tabular-nums text-foreground">{capacityUsed}</p>
                <p className="text-[10px] text-muted-foreground">Ocupados</p>
              </div>
              <div>
                <p className="text-lg font-bold tabular-nums text-foreground">{capacityTotal - capacityUsed}</p>
                <p className="text-[10px] text-muted-foreground">Disponibles</p>
              </div>
            </div>
          </motion.div>

          {/* Low Stock */}
          <motion.div {...fadeUp(6)} className="card-modern-warning">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <AlertTriangle className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">Stock Crítico</h2>
            </div>
            {LOW_STOCK.map((item) => (
              <div key={item.sku} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                <div>
                  <p className="text-xs font-medium text-foreground">{item.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold tabular-nums ${item.stock <= 2 ? "text-destructive" : "text-primary"}`}>
                    {item.stock}
                  </span>
                  <span className="text-[10px] text-muted-foreground"> / {item.min}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Activity Log + Fleet */}
        <div className="lg:col-span-3 space-y-6">
          {/* Activity Log */}
          <motion.div {...fadeUp(7)} className="card-modern">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Actividad Reciente</h2>
              <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-4">
              {ACTIVITY_LOG.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full ${a.color} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">
                      <span className="font-semibold text-secondary">{a.user}</span>{" "}
                      {a.action}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fleet mini */}
          <motion.div {...fadeUp(8)} className="card-modern">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Flota</h2>
              <button className="text-[10px] font-medium text-secondary hover:text-secondary/80 flex items-center gap-0.5 transition-colors">
                Ver Todo <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            {FLEET.map((f) => (
              <div key={f.serial} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                <div>
                  <p className="text-xs font-medium text-foreground">{f.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-2.5 w-2.5 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground">{f.location}</p>
                  </div>
                </div>
                <span className={statusMap[f.status]}>{statusLabel[f.status]}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom: Recent Orders (full width) */}
      <motion.div {...fadeUp(9)} className="card-modern">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-foreground">Órdenes de Trabajo Recientes</h2>
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
                <tr key={o.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="py-3 font-mono text-xs font-semibold text-foreground">{o.id}</td>
                  <td className="py-3 font-medium text-foreground">{o.client}</td>
                  <td className="py-3 text-muted-foreground text-xs">{o.equipment}</td>
                  <td className="py-3 text-muted-foreground">{o.tech}</td>
                  <td className="py-3"><span className={statusMap[o.status]}>{statusLabel[o.status]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Técnico Dashboard ── */
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
          <motion.div key={o.id} {...fadeUp(i)} whileHover={{ y: -2 }} className="card-modern-accent cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-bold text-foreground">{o.id}</span>
              <span className={statusMap[o.status]}>{statusLabel[o.status]}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{o.client}</span> — {o.equipment}
            </p>
            <button className="mt-4 w-full py-2.5 bg-secondary text-secondary-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all duration-200">
              Iniciar Trabajo
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
