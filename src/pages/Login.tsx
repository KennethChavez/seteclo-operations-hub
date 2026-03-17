import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import setecloLogo from "@/assets/seteclo-logo.png";
import { Lock, Mail, AlertCircle, ArrowRight, Wrench, Truck, ClipboardList } from "lucide-react";

const QUICK_ACCESS = [
  { label: "Hersen", email: "hersen@seteclo.com" },
  { label: "Esly", email: "esly@seteclo.com" },
  { label: "Maynor", email: "maynor@seteclo.com" },
  { label: "Aaron", email: "aaron@seteclo.com" },
];

const FEATURES = [
  { icon: Truck, title: "Flota & Maquinaria", desc: "Control total de grúas, montacargas y equipos" },
  { icon: Wrench, title: "Mantenimiento", desc: "Órdenes de trabajo y seguimiento en campo" },
  { icon: ClipboardList, title: "Inventario & CRM", desc: "Repuestos, clientes y facturación integrada" },
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
    <div className="min-h-screen flex">
      {/* Left panel - Dark gradient branding */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: "linear-gradient(160deg, hsl(210 11% 11%) 0%, hsl(210 15% 18%) 50%, hsl(210 11% 11%) 100%)" }}
      >
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(173 70% 37%), transparent 70%)" }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(25 93% 47%), transparent 70%)" }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={setecloLogo} alt="SETECLO" className="h-14 brightness-0 invert" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 -mt-8"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
            Sistema de Gestión
          </h1>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-5"
            style={{ color: "hsl(173 70% 50%)" }}
          >
            de Operaciones
          </h2>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Gestión integral de flota, mantenimiento, inventario y facturación
            para todas las operaciones de SETECLO.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "hsla(173, 70%, 37%, 0.15)" }}
                >
                  <f.icon className="h-5 w-5" style={{ color: "hsl(173 70% 50%)" }} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/25 text-xs"
        >
          © 2017–2026 SETECLO · San Pedro Sula, Honduras
        </motion.p>
      </div>

      {/* Right panel - Clean white form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-gradient-to-b from-background to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <img src={setecloLogo} alt="SETECLO" className="h-12" />
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl p-8 sm:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Iniciar Sesión</h2>
              <p className="text-sm text-muted-foreground mt-1.5">Ingresa tus credenciales para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-card transition-all duration-200"
                    placeholder="tu.email@seteclo.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground/50" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-card transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 text-destructive text-sm bg-destructive/5 px-4 py-3 rounded-xl"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 group shadow-[0_4px_16px_rgba(232,99,10,0.3)]"
              >
                {loading ? "Ingresando..." : (
                  <>
                    Iniciar Sesión
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
            </div>

            {/* Help link */}
            <p className="text-center text-xs text-muted-foreground">
              ¿Necesitas ayuda?{" "}
              <span className="text-secondary font-semibold cursor-pointer hover:underline">Contacta a IT</span>
            </p>
          </div>

          {/* Quick access outside card */}
          <div className="mt-6 px-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">
              Acceso Rápido
            </p>
            <div className="flex justify-center gap-2">
              {QUICK_ACCESS.map((u) => (
                <button
                  key={u.email}
                  onClick={() => quickLogin(u.email)}
                  className="px-4 py-2 text-xs font-semibold border border-border rounded-lg bg-card hover:border-secondary hover:text-secondary hover:shadow-sm transition-all duration-200"
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
