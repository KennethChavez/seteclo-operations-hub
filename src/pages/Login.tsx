import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import setecloLogo from "@/assets/seteclo-logo.png";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

const QUICK_ACCESS = [
  { label: "Kenneth", email: "kenneth@seteclo.com" },
  { label: "Hersen", email: "hersen@seteclo.com" },
  { label: "Esly", email: "esly@seteclo.com" },
  { label: "Maynor", email: "maynor@seteclo.com" },
  { label: "Aaron", email: "aaron@seteclo.com" },
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
    <div className="min-h-screen flex bg-card">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-foreground relative overflow-hidden flex-col items-center justify-center p-12">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.5) 59px, rgba(255,255,255,0.5) 60px)`,
        }} />
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          <img src={setecloLogo} alt="SETECLO" className="h-20 mx-auto mb-8 brightness-0 invert" />
          <h1 className="text-3xl font-bold tracking-tight text-card mb-3">
            Control Total de<br />Operaciones Logísticas
          </h1>
          <p className="text-steel text-sm max-w-sm mx-auto leading-relaxed">
            Sistema de gestión industrial para flota, mantenimiento, inventario y facturación.
          </p>
          <div className="flex items-center justify-center gap-6 mt-10 text-[10px] font-bold uppercase tracking-widest text-steel">
            <span>CRM</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>ERP</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span>Field Service</span>
          </div>
        </motion.div>

        <p className="absolute bottom-6 text-[10px] text-steel tracking-wider">
          SETECLO © 2017–2026 · San Pedro Sula, Honduras
        </p>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.2, 1, 0.3, 1] }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src={setecloLogo} alt="SETECLO" className="h-12" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Iniciar Sesión</h2>
            <p className="text-sm text-muted-foreground mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150"
                  placeholder="usuario@seteclo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-150"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/5 px-3 py-2 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? "Ingresando..." : (
                <>
                  Entrar al Sistema
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick access */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Acceso Rápido
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACCESS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => quickLogin(u.email)}
                  className="px-3.5 py-2 text-xs font-medium border border-border rounded-lg bg-background hover:border-secondary hover:text-secondary transition-all duration-150"
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
