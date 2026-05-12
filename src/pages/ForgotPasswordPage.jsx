import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../features/auth/services/authService";

const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#6e6e73]/60 text-sm outline-none focus:border-black/20 focus:bg-white transition-colors";
const errCls = "text-red-500 text-xs px-1";
const labelCls = "text-xs font-medium text-[#6e6e73] px-1";

const validateEmail = (correo) => {
  if (!correo.trim()) return "El correo es requerido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return "Ingresá un correo válido.";
  return "";
};

const ForgotPasswordPage = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const nextError = validateEmail(correo);
    if (nextError) {
      setError(nextError);
      return;
    }

    setLoading(true);
    setError("");
    setServerError("");

    try {
      await authService.forgotPassword(correo);
      setSent(true);
    } catch (err) {
      setServerError(err.response?.data?.message || "No pudimos procesar la solicitud en este momento.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white rounded-2xl p-8 text-center"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
      >
        <div className="w-14 h-14 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#1d1d1f]/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2">Revisá tu correo</h2>
        <p className="text-[#6e6e73] text-sm mb-2">Si el correo existe en nuestra base, recibirás el link en los próximos minutos.</p>
        <p className="text-[#aeaeb2] text-xs mb-6">También revisá spam o promociones por si el mensaje tarda en aparecer.</p>
        <Link to="/login" className="inline-flex items-center justify-center w-full bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors">
          Volver al login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-white rounded-2xl p-8"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
    >
      <h2 className="font-semibold text-[#1d1d1f] mb-1" style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
        Recuperar acceso
      </h2>
      <p className="text-[#6e6e73] text-sm mb-7">Ingresá tu correo y te enviaremos un link para restablecer tu contraseña.</p>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="correo" className={labelCls}>Correo electrónico</label>
          <input
            id="correo"
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              setError("");
              setServerError("");
            }}
            autoComplete="email"
            className={inputCls}
          />
          {error && <span className={errCls}>{error}</span>}
        </div>

        {serverError && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar link de recuperación"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-black/[0.06]">
        <p className="text-[#6e6e73] text-xs text-center">
          <Link to="/login" className="text-[#6e6e73] font-medium underline hover:text-[#1d1d1f] transition-colors">
            Volver al login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
