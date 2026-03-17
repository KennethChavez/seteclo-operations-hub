import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import setecloLogo from "@/assets/seteclo-logo.png";
import { Lock, Mail, AlertCircle } from "lucide-react";

const QUICK_ACCESS = [
  { label: "Kenneth (Superadmin)", email: "kenneth@seteclo.com" },
  { label: "Hersen (Admin)", email: "hersen@seteclo.com" },
  { label: "Esly (Comercial)", email: "esly@seteclo.com" },
  { label: "Maynor (Técnico)", email: "maynor@seteclo.com" },
  { label: "Aaron (Técnico)", email: "aaron@seteclo.com" },
];

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(email, password);
    if (!ok) setError("Credenciales incorrectas");
    setLoading(false);
  };

  const quickLogin = async (em: string) => {
    setEmail(em);
    setPassword("Temporal2026");
    setLoading(true);
    setError("");
    const ok = await login(em, "Temporal2026");
    if (!ok) setError("Error de acceso");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={setecloLogo} alt="SETECLO" className="h-16 mb-4 brightness-0 invert" />
          <p className="text-steel text-sm">Sistema de Gestión Industrial</p>
        </div>

        <div className="industrial-card bg-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                  placeholder="usuario@seteclo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider rounded hover:opacity-90 transition-all duration-150 disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "ENTRAR AL SISTEMA"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Acceso Rápido (Demo)
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACCESS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => quickLogin(u.email)}
                  className="px-3 py-1.5 text-xs border border-border rounded bg-muted hover:bg-secondary hover:text-secondary-foreground transition-all duration-150"
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-steel text-xs mt-6">
          SETECLO © 2017–2026 · San Pedro Sula, Honduras
        </p>
      </motion.div>
    </div>
  );
}
