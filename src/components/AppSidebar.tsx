import {
  LayoutDashboard, Users, Package, Truck, ClipboardList,
  FileText, Settings, LogOut, ChevronDown, Receipt,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import setecloLogo from "@/assets/seteclo-logo.png";

const NAV_MAIN = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/", module: "dashboard" },
  { label: "Clientes", icon: Users, path: "/clientes", module: "clientes" },
  { label: "Inventario", icon: Package, path: "/inventario", module: "inventario" },
  { label: "Flota", icon: Truck, path: "/flota", module: "flota" },
  { label: "Órdenes", icon: ClipboardList, path: "/ordenes", module: "ordenes" },
  { label: "Facturación", icon: FileText, path: "/facturacion", module: "facturacion" },
];

const NAV_BOTTOM = [
  { label: "Configuración", icon: Settings, path: "/configuracion", module: "configuracion" },
];

export default function AppSidebar() {
  const { user, logout, hasAccess } = useAuth();
  const mainItems = NAV_MAIN.filter((item) => hasAccess([item.module]));
  const bottomItems = NAV_BOTTOM.filter((item) => hasAccess([item.module]));

  return (
    <aside className="w-[240px] min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border flex-shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5">
        <img src={setecloLogo} alt="SETECLO" className="h-8" />
      </div>

      {/* User profile */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-sidebar-accent cursor-pointer hover:bg-muted transition-colors">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-xs font-bold flex-shrink-0">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground truncate">{user?.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 custom-scrollbar overflow-y-auto">
        {mainItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom items */}
      <div className="px-3 pb-4 space-y-0.5">
        <div className="border-t border-sidebar-border mb-3" />
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-muted-foreground hover:bg-destructive/5 hover:text-destructive transition-all duration-200 w-full"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
