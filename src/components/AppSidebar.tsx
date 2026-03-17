import {
  LayoutDashboard, Users, Package, Truck, ClipboardList,
  FileText, Settings, LogOut, Wrench, ChevronLeft, ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import setecloLogo from "@/assets/seteclo-logo.png";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/", module: "dashboard" },
  { label: "Clientes", icon: Users, path: "/clientes", module: "clientes" },
  { label: "Inventario", icon: Package, path: "/inventario", module: "inventario" },
  { label: "Flota", icon: Truck, path: "/flota", module: "flota" },
  { label: "Órdenes de Trabajo", icon: ClipboardList, path: "/ordenes", module: "ordenes" },
  { label: "Facturación", icon: FileText, path: "/facturacion", module: "facturacion" },
  { label: "Configuración", icon: Settings, path: "/configuracion", module: "configuracion" },
];

export default function AppSidebar() {
  const { user, logout, hasAccess } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = NAV_ITEMS.filter((item) => hasAccess([item.module]));

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-150 flex-shrink-0`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-3 border-b border-sidebar-border">
        {!collapsed && (
          <img src={setecloLogo} alt="SETECLO" className="h-8 brightness-0 invert" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground transition-all duration-150"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded text-sm transition-all duration-150 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-xs font-bold flex-shrink-0">
            {user?.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">{user?.name}</p>
              <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground">{user?.role}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="p-1.5 rounded hover:bg-sidebar-accent text-sidebar-foreground transition-all duration-150"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
