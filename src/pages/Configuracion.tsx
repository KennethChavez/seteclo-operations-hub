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
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-muted-foreground">Administración del sistema SETECLO</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="industrial-card">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-4 w-4 text-secondary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Datos Empresa</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Empresa</span><span className="font-semibold">SETECLO</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Razón Social</span><span className="font-semibold">Servicios Técnicos Logísticos</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Ciudad</span><span>San Pedro Sula, Honduras</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">WhatsApp</span><span>+504 9879-9033</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Web</span><span className="text-secondary">seteclo.com</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Fundada</span><span>2017</span></div>
          </div>
        </div>

        {/* Roles */}
        <div className="industrial-card">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-secondary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Roles del Sistema</h2>
          </div>
          <div className="space-y-2 text-sm">
            {[
              { role: "Superadmin", access: "Acceso total + gestión de usuarios" },
              { role: "Admin", access: "Acceso total operativo" },
              { role: "Comercial", access: "Dashboard, clientes, órdenes, flota" },
              { role: "Técnico", access: "Órdenes asignadas, flota" },
              { role: "Motorista", access: "Órdenes de traslado" },
              { role: "Operario", access: "Órdenes asignadas" },
            ].map((r) => (
              <div key={r.role} className="flex justify-between py-1.5 border-b border-border last:border-0">
                <span className="font-semibold">{r.role}</span>
                <span className="text-muted-foreground text-xs">{r.access}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="industrial-card">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-4 w-4 text-secondary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Usuarios del Sistema</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Nombre", "Email", "Rol", "Estado"].map((h) => (
                <th key={h} className="text-left py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SYSTEM_USERS.map((u) => (
              <tr key={u.email} className="border-b border-border last:border-0">
                <td className="py-2.5 font-medium">{u.name}</td>
                <td className="py-2.5 font-mono text-xs text-muted-foreground">{u.email}</td>
                <td className="py-2.5">
                  <span className={u.role === "Superadmin" ? "status-taller" : u.role === "Admin" ? "status-progreso" : u.role === "Comercial" ? "status-operativo" : "status-disponible"}>
                    {u.role}
                  </span>
                </td>
                <td className="py-2.5">
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
