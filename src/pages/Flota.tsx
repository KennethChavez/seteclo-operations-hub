import { motion } from "framer-motion";
import { Plus, Search, Truck, Wrench } from "lucide-react";

const EQUIPMENT = [
  { id: 1, name: "Toyota 7FGU25", type: "Montacargas", serial: "7FGU25-60234", capacity: "2.5 Ton", fuel: "GLP", status: "renta", location: "DIUNSA - Bodega 3, SPS", nextMaint: "2026-04-01" },
  { id: 2, name: "Hyster H50XT", type: "Montacargas", serial: "H50XT-D2145", capacity: "2.5 Ton", fuel: "Diesel", status: "taller", location: "Taller SETECLO #1", nextMaint: "—" },
  { id: 3, name: "Toyota 8FGU30", type: "Montacargas", serial: "8FGU30-81023", capacity: "3.0 Ton", fuel: "GLP", status: "renta", location: "DIUNSA - Centro Distribución", nextMaint: "2026-03-28" },
  { id: 4, name: "Yale GDP080", type: "Montacargas", serial: "GDP080-BX442", capacity: "3.5 Ton", fuel: "Diesel", status: "renta", location: "Cargill - Planta SPS", nextMaint: "2026-04-15" },
  { id: 5, name: "Kenworth T800 Grúa", type: "Grúa Plataforma", serial: "KW-T800-019", capacity: "12 Ton", fuel: "Diesel", status: "operativo", location: "Base SETECLO #2", nextMaint: "2026-03-20" },
  { id: 6, name: "Hyster H40XT", type: "Montacargas", serial: "H40XT-E3087", capacity: "2.0 Ton", fuel: "GLP", status: "renta", location: "Lacthosa - Planta", nextMaint: "2026-04-10" },
  { id: 7, name: "Toyota 7FBE15", type: "Montacargas Eléctrico", serial: "7FBE15-44521", capacity: "1.5 Ton", fuel: "Eléctrico", status: "disponible", location: "Taller SETECLO #1", nextMaint: "2026-05-01" },
  { id: 8, name: "Grúa Plataforma #2", type: "Grúa Plataforma", serial: "GP-SETECLO-002", capacity: "8 Ton", fuel: "Diesel", status: "operativo", location: "En ruta - Puerto Cortés", nextMaint: "2026-04-20" },
];

const statusMap: Record<string, string> = {
  renta: "status-operativo",
  taller: "status-taller",
  operativo: "status-completado",
  disponible: "status-disponible",
};
const statusLabel: Record<string, string> = {
  renta: "En Renta",
  taller: "En Taller",
  operativo: "Operativo",
  disponible: "Disponible",
};

export default function Flota() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Flota & Maquinaria</h1>
          <p className="text-sm text-muted-foreground">{EQUIPMENT.length} equipos registrados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider rounded hover:opacity-90 transition-all duration-150">
          <Plus className="h-4 w-4" /> Nuevo Equipo
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "En Renta", count: EQUIPMENT.filter(e => e.status === "renta").length, cls: "text-secondary" },
          { label: "En Taller", count: EQUIPMENT.filter(e => e.status === "taller").length, cls: "text-primary" },
          { label: "Operativo", count: EQUIPMENT.filter(e => e.status === "operativo").length, cls: "text-secondary" },
          { label: "Disponible", count: EQUIPMENT.filter(e => e.status === "disponible").length, cls: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="industrial-card text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className={`text-2xl font-bold tabular-nums ${s.cls}`}>{s.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {EQUIPMENT.map((eq, i) => (
          <motion.div
            key={eq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.15 }}
            whileHover={{ y: -2 }}
            className="industrial-card-accent cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{eq.type}</p>
                <h3 className="text-base font-bold">{eq.name}</h3>
              </div>
              <span className={statusMap[eq.status]}>{statusLabel[eq.status]}</span>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground mt-3">
              <p><span className="font-semibold text-foreground">Serial:</span> <span className="font-mono">{eq.serial}</span></p>
              <p><span className="font-semibold text-foreground">Capacidad:</span> {eq.capacity} · {eq.fuel}</p>
              <p><span className="font-semibold text-foreground">Ubicación:</span> {eq.location}</p>
              {eq.nextMaint !== "—" && (
                <p><span className="font-semibold text-foreground">Próx. Mant.:</span> {eq.nextMaint}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
