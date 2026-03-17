import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "superadmin" | "admin" | "comercial" | "tecnico" | "motorista" | "operario";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasAccess: (modules: string[]) => boolean;
}

const MOCK_USERS: Record<string, User & { password: string }> = {
  "kenneth@seteclo.com": {
    id: "1", email: "kenneth@seteclo.com", name: "Kenneth Chávez",
    role: "superadmin", password: "Temporal2026",
  },
  "hersen@seteclo.com": {
    id: "2", email: "hersen@seteclo.com", name: "Hersen Carballo",
    role: "admin", password: "Temporal2026",
  },
  "esly@seteclo.com": {
    id: "3", email: "esly@seteclo.com", name: "Esly",
    role: "comercial", password: "Temporal2026",
  },
  "maynor@seteclo.com": {
    id: "4", email: "maynor@seteclo.com", name: "Maynor",
    role: "tecnico", password: "Temporal2026",
  },
  "aaron@seteclo.com": {
    id: "5", email: "aaron@seteclo.com", name: "Aaron Pacheco",
    role: "tecnico", password: "Temporal2026",
  },
};

const ROLE_MODULES: Record<UserRole, string[]> = {
  superadmin: ["dashboard", "clientes", "inventario", "flota", "ordenes", "cotizaciones", "facturacion", "configuracion", "reportes"],
  admin: ["dashboard", "clientes", "inventario", "flota", "ordenes", "cotizaciones", "facturacion", "reportes"],
  comercial: ["dashboard", "clientes", "ordenes", "flota", "cotizaciones"],
  tecnico: ["ordenes", "flota"],
  motorista: ["ordenes"],
  operario: ["ordenes"],
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const found = MOCK_USERS[email.toLowerCase()];
    if (found && found.password === password) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const hasAccess = useCallback(
    (modules: string[]) => {
      if (!user) return false;
      const allowed = ROLE_MODULES[user.role];
      return modules.some((m) => allowed.includes(m));
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
