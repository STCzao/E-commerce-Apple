import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../features/auth/services/authService";

const inputCls = "w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 transition-colors pr-11";
const errCls = "text-red-400/80 text-xs px-1";
const SPECIAL_RE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

const validate = (contraseña, confirmar) => {
  const e = {};
  if (!contraseña) e.contraseña = "La contraseña es requerida.";
  else if (contraseña.length < 8) e.contraseña = "Mínimo 8 caracteres.";
  else if (contraseña.length > 64) e.contraseña = "Máximo 64 caracteres.";
  else if (!/[A-Z]/.test(contraseña)) e.contraseña = "Debe incluir al menos una mayúscula.";
  else if (!/\d/.test(contraseña)) e.contraseña = "Debe incluir al menos un número.";
  else if (!SPECIAL_RE.test(contraseña)) e.contraseña = "Debe incluir al menos un carácter especial.";
  if (!confirmar) e.confirmar = "Confirmá tu contraseña.";
  else if (confirmar !== contraseña) e.confirmar = "Las contraseñas no coinciden.";
  return e;
};

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [contraseña, setContraseña] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(contraseña, confirmar);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const token = searchParams.get("token");
    if (!token) { setServerError("Token no encontrado."); return; }

    setLoading(true);
    try {
      await authService.resetPassword(token, contraseña);
      setSuccess(true);
    } catch (err) {
      setServerError(err.response?.data?.message || "El enlace es inválido o ya expiró.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white/[0.07] backdrop-blur-xl border border-white/12 rounded-2xl p-8 shadow-2xl text-center"
      >
        <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Contraseña restablecida</h2>
        <p className="text-white/40 text-sm mb-6">Ya podés iniciar sesión con tu nueva contraseña.</p>
        <Link to="/login">
          <button className="w-full bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
            Iniciar sesión
          </button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm bg-white/[0.07] backdrop-blur-xl border border-white/12 rounded-2xl p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-white mb-1">Nueva contraseña</h2>
      <p className="text-white/40 text-sm mb-7">Elegí una contraseña segura para tu cuenta.</p>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input type={showPass ? "text" : "password"} placeholder="Nueva contraseña"
              value={contraseña} onChange={(e) => { setContraseña(e.target.value); setErrors({}); setServerError(""); }}
              className={inputCls} />
            <button type="button" onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              <EyeIcon visible={showPass} />
            </button>
          </div>
          {errors.contraseña
            ? <span className={errCls}>{errors.contraseña}</span>
            : <span className="text-white/20 text-[11px] px-1">Mínimo 8 caracteres, mayúscula, número y símbolo</span>
          }
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input type={showConfirm ? "text" : "password"} placeholder="Confirmar contraseña"
              value={confirmar} onChange={(e) => { setConfirmar(e.target.value); setErrors({}); }}
              className={inputCls} />
            <button type="button" onClick={() => setShowConfirm(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {errors.confirmar && <span className={errCls}>{errors.confirmar}</span>}
        </div>

        {serverError && (
          <p className="text-red-400/80 text-xs bg-red-500/10 border border-red-500/15 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={loading}
          className="mt-1 bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors disabled:opacity-50">
          {loading ? "Guardando..." : "Restablecer contraseña"}
        </button>
      </form>
    </motion.div>
  );
};

export default ResetPasswordPage;
