import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../features/auth/services/authService";

const ConfirmarEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) { setStatus("error"); setMessage("Token no encontrado."); return; }

    authService.confirmarEmail(token)
      .then(() => setStatus("ok"))
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.message || "El enlace es inválido o ya expiró.");
      });
  }, []);

  useEffect(() => {
    if (status !== "ok") return;
    const interval = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) { clearInterval(interval); navigate("/login"); }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm bg-white/[0.07] backdrop-blur-xl border border-white/12 rounded-2xl p-8 shadow-2xl text-center"
    >
      {status === "loading" && (
        <>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-5 animate-pulse bg-white/[0.05]" />
          <p className="text-white/50 text-sm">Verificando tu cuenta...</p>
        </>
      )}

      {status === "ok" && (
        <>
          <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">¡Cuenta verificada!</h2>
          <p className="text-white/40 text-sm mb-1">Tu correo fue confirmado exitosamente.</p>
          <p className="text-white/25 text-xs mb-6">Redirigiendo al inicio de sesión en {countdown}s...</p>
          <Link to="/login">
            <button className="w-full bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
              Iniciar sesión ahora
            </button>
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/15 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-red-400/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Enlace inválido</h2>
          <p className="text-white/40 text-sm mb-6">{message}</p>
          <Link to="/login">
            <button className="w-full bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
              Volver al inicio de sesión
            </button>
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default ConfirmarEmailPage;
