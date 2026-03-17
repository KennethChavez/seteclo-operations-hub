import { useAuth } from "@/contexts/AuthContext";
import { Shield, Users, Building } from "lucide-react";

const SYSTEM_USERS = [
  { name: "Kenneth Chávez", email: "kenneth@seteclo.com", role: "Superadmin", status: "Activo" },
  { name: "Hersen Carballo", email: "hersen@seteclo.com", role: "Admin", status: "Activo" },
  { name: "Esly", email: "esly@seteclo.com", role: "Comercial", status: "Activo" },
  { name: "Maynor", email: "maynor@seteclo.com", role: "Técnico", status: "Activo" },
  { name: "Aaron Pacheco", email: "aaron@seteclo.com", role: "Técnico", status: "Activo" },
  { name: "Edwin", email: "edwin@seteclo.com", role: "Técnico", status: "Pendiente" },
  { name: "Julio", email: "julio@seteclo.com", role: "Técnico", status: "Activo" },
  { name: "Gerson", email: "gerson@seteclo.com", role: "Técnico", status: "Activo" },
];

export default function Configuracion() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">Administración del sistema SETECLO</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="card-modern">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Building className="h-4 w-4 text-secondary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Datos Empresa</h2>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ["Empresa", "SETECLO"],
              ["Razón Social", "Servicios Técnicos Logísticos"],
              ["Ciudad", "San Pedro Sula, Honduras"],
              ["WhatsApp", "+504 9879-9033"],
              ["Web", "seteclo.com"],
              ["Fundada", "2017"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-1">
                <span className="text-muted-foreground">{label}</span>
                <span className={`font-medium text-foreground ${label === "Web" ? "text-secondary" : ""}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="card-modern">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="p-1.5 rounded-lg bg-secondary/10">
              <Shield className="h-4 w-4 text-secondary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Roles del Sistema</h2>
          </div>
          <div className="space-y-0 text-sm">
            {[
              { role: "Superadmin", access: "Acceso total + gestión de usuarios" },
              { role: "Admin", access: "Acceso total operativo" },
              { role: "Comercial", access: "Dashboard, clientes, órdenes, flota" },
              { role: "Técnico", access: "Órdenes asignadas, flota" },
              { role: "Motorista", access: "Órdenes de traslado" },
              { role: "Operario", access: "Órdenes asignadas" },
            ].map((r) => (
              <div key={r.role} className="flex justify-between py-2.5 border-b border-border/50 last:border-0">
                <span className="font-medium text-foreground">{r.role}</span>
                <span className="text-muted-foreground text-xs">{r.access}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-modern p-0 overflow-x-auto">
        <div className="flex items-center gap-2.5 p-5 pb-0">
          <div className="p-1.5 rounded-lg bg-secondary/10">
            <Users className="h-4 w-4 text-secondary" />
          </div>
          <h2 className="text-sm font-semibold text-foreground">Usuarios del Sistema</h2>
        </div>
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {["Nombre", "Email", "Rol", "Estado"].map((h) => (
                <th key={h} className="text-left py-3 px-5 text-[11px] font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SYSTEM_USERS.map((u) => (
              <tr key={u.email} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-5 font-medium text-foreground">{u.name}</td>
                <td className="py-3 px-5 font-mono text-xs text-muted-foreground">{u.email}</td>
                <td className="py-3 px-5">
                  <span className={u.role === "Superadmin" ? "status-taller" : u.role === "Admin" ? "status-progreso" : u.role === "Comercial" ? "status-operativo" : "status-disponible"}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-5">
                  <span className={u.status === "Activo" ? "status-completado" : "status-pendiente"}>{u.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
