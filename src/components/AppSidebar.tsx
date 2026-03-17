import {
  LayoutDashboard, Users, Package, Truck, ClipboardList,
  FileText, Settings, LogOut, ChevronLeft, ChevronRight,
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
  { label: "Órdenes", icon: ClipboardList, path: "/ordenes", module: "ordenes" },
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
        collapsed ? "w-[72px]" : "w-[250px]"
      } min-h-screen bg-sidebar flex flex-col transition-all duration-200 flex-shrink-0`}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <img src={setecloLogo} alt="SETECLO" className="h-7 brightness-0 invert opacity-90" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 custom-scrollbar overflow-y-auto">
        {!collapsed && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40 px-3 mb-3">
            Módulos
          </p>
        )}
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-primary/10 text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User area */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-1">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sidebar-primary/80 to-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-xs font-bold flex-shrink-0">
            {user?.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-sidebar-accent-foreground truncate">{user?.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50 capitalize">{user?.role}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-destructive transition-all duration-200"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
