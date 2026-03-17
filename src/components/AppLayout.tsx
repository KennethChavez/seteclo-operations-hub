import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Search, Bell } from "lucide-react";

export default function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-card flex-shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar OT#, serial, cliente..."
              className="w-full pl-10 pr-4 py-1.5 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-150"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded hover:bg-muted transition-all duration-150">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>
            <span className="text-sm font-medium">{user?.name}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
