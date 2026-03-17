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
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card flex-shrink-0">
          <div className="relative w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Buscar OT#, serial, cliente..."
              className="w-full pl-11 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:bg-card focus:border-border focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-muted transition-all duration-200">
              <Bell className="h-[18px] w-[18px] text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary/80 to-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold">
                {user?.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
