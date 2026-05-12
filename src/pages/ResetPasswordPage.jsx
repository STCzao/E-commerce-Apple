import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../features/auth/services/authService";

const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#6e6e73]/60 text-sm outline-none focus:border-black/20 focus:bg-white transition-colors pr-11";
const hintCls = "text-[#aeaeb2] text-[11px] px-1";
const errCls = "text-red-500 text-xs px-1";
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

const validate = (contrasena, confirmar) => {
  const errors = {};
  if (!contrasena) errors.contrasena = "La contraseña es requerida.";
  else if (contrasena.length < 8) errors.contrasena = "Mínimo 8 caracteres.";
  else if (contrasena.length > 64) errors.contrasena = "Máximo 64 caracteres.";
  else if (!/[A-Z]/.test(contrasena)) errors.contrasena = "Debe incluir al menos una mayúscula.";
  else if (!/\d/.test(contrasena)) errors.contrasena = "Debe incluir al menos un número.";
  else if (!SPECIAL_RE.test(contrasena)) errors.contrasena = "Debe incluir al menos un carácter especial.";

  if (!confirmar) errors.confirmar = "Confirmá tu contraseña.";
  else if (confirmar !== contrasena) errors.confirmar = "Las contraseñas no coinciden.";

  return errors;
};

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(contrasena, confirmar);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      setServerError("Token no encontrado.");
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      await authService.resetPassword(token, contrasena);
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
        className="w-full max-w-sm bg-white border border-black/[0.06] rounded-2xl p-8 shadow-sm text-center"
      >
        <div className="w-14 h-14 rounded-full bg-black/[0.04] border border-black/[0.06] flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-[#1d1d1f]/60" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2">Contraseña restablecida</h2>
        <p className="text-[#6e6e73] text-sm mb-6">Ya podés iniciar sesión con tu nueva contraseña.</p>
        <Link to="/login">
          <button className="w-full bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-[#2c2c2e] transition-colors">
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
      className="w-full max-w-sm bg-white border border-black/[0.06] rounded-2xl p-8 shadow-sm"
    >
      <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-1">Nueva contraseña</h2>
      <p className="text-[#6e6e73] text-sm mb-7">Elegí una contraseña segura para tu cuenta.</p>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Nueva contraseña"
              value={contrasena}
              onChange={(e) => {
                setContrasena(e.target.value);
                setErrors((prev) => ({ ...prev, contrasena: "" }));
                setServerError("");
              }}
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73]/60 hover:text-[#1d1d1f] transition-colors"
            >
              <EyeIcon visible={showPass} />
            </button>
          </div>
          {errors.contrasena ? (
            <span className={errCls}>{errors.contrasena}</span>
          ) : (
            <span className={hintCls}>Mínimo 8 caracteres, mayúscula, número y símbolo</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmar}
              onChange={(e) => {
                setConfirmar(e.target.value);
                setErrors((prev) => ({ ...prev, confirmar: "" }));
              }}
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73]/60 hover:text-[#1d1d1f] transition-colors"
            >
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {errors.confirmar && <span className={errCls}>{errors.confirmar}</span>}
        </div>

        {serverError && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Restablecer contraseña"}
        </button>
      </form>
    </motion.div>
  );
};

export default ResetPasswordPage;
