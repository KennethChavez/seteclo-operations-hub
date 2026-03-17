import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import {
  Truck, ClipboardList, Package, DollarSign,
  AlertTriangle, Wrench, Users, TrendingUp,
} from "lucide-react";

const STATS = [
  { label: "Órdenes Activas", value: "12", icon: ClipboardList, color: "text-primary" },
  { label: "Equipos en Renta", value: "8", icon: Truck, color: "text-secondary" },
  { label: "Técnicos en Campo", value: "4", icon: Wrench, color: "text-secondary" },
  { label: "Ingresos del Mes", value: "L 485,200", icon: DollarSign, color: "text-primary" },
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

  if (isTecnico) {
    return <TecnicoDashboard />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenido, {user?.name}. Resumen de operaciones SETECLO.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.15 }}
            className="industrial-card flex items-center gap-4"
          >
            <div className={`p-2.5 rounded bg-muted ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="text-xl font-bold tabular-nums">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-7 industrial-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Órdenes Recientes
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Ver Todas →</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">OT#</th>
                  <th className="text-left py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cliente</th>
                  <th className="text-left py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Equipo</th>
                  <th className="text-left py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Técnico</th>
                  <th className="text-left py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors duration-150">
                    <td className="py-2.5 font-mono text-xs font-semibold">{o.id}</td>
                    <td className="py-2.5">{o.client}</td>
                    <td className="py-2.5 font-mono text-xs">{o.equipment}</td>
                    <td className="py-2.5">{o.tech}</td>
                    <td className="py-2.5"><span className={statusMap[o.status]}>{statusLabel[o.status]}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="industrial-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Estado de Flota
            </h2>
            <div className="space-y-2">
              {FLEET.map((f) => (
                <div key={f.serial} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold">{f.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{f.serial}</p>
                  </div>
                  <div className="text-right">
                    <span className={statusMap[f.status]}>{statusLabel[f.status]}</span>
                    {f.client !== "—" && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">{f.client}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock */}
          <div className="industrial-card-warning">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Stock Crítico
              </h2>
            </div>
            <div className="space-y-2">
              {LOW_STOCK.map((item) => (
                <div key={item.sku} className="flex items-center justify-between py-1.5">
                  <div>
                    <p className="text-sm">{item.name}</p>
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
        <h1 className="text-2xl font-bold">Hola, {user?.name}</h1>
        <p className="text-sm text-muted-foreground">
          Tienes {myOrders.length} órdenes pendientes.
        </p>
      </div>

      <div className="space-y-3">
        {myOrders.map((o) => (
          <motion.div
            key={o.id}
            whileHover={{ y: -2 }}
            className="industrial-card-accent cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg font-bold">{o.id}</span>
              <span className={statusMap[o.status]}>{statusLabel[o.status]}</span>
            </div>
            <p className="text-sm">
              <span className="font-semibold">{o.client}</span> — {o.equipment}
            </p>
            <button className="mt-3 w-full py-2.5 bg-secondary text-secondary-foreground font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-all duration-150">
              INICIAR TRABAJO
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
