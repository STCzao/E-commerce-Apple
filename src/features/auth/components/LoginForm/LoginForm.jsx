import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

/* ── Inputs con estilo claro (carta blanca sobre fondo oscuro) ── */
const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#6e6e73]/60 text-sm outline-none focus:border-black/20 focus:bg-white transition-colors";
const errCls   = "text-red-500 text-xs px-1";

const EyeIcon = ({ visible }) =>
  visible ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

const validate = ({ correo, contraseña }) => {
  const e = {};
  if (!correo.trim()) e.correo = "El correo es requerido.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) e.correo = "Ingresá un correo válido.";
  if (!contraseña) e.contraseña = "La contraseña es requerida.";
  else if (contraseña.length < 8) e.contraseña = "Mínimo 8 caracteres.";
  return e;
};

const LoginForm = () => {
  const [form, setForm]           = useState({ correo: "", contraseña: "" });
  const [errors, setErrors]       = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const { state }   = useLocation();

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(form);
      navigate(state?.from?.pathname ?? "/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-white rounded-2xl p-8"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.06)" }}
    >
      <h2
        className="font-semibold text-[#1d1d1f] mb-1"
        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
      >
        Iniciar sesión
      </h2>
      <p className="text-[#6e6e73] text-sm mb-7">Bienvenido de nuevo</p>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            name="correo" type="email" placeholder="Correo electrónico"
            value={form.correo} onChange={handle} autoComplete="email"
            className={inputCls}
          />
          {errors.correo && <span className={errCls}>{errors.correo}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              name="contraseña" type={showPass ? "text" : "password"} placeholder="Contraseña"
              value={form.contraseña} onChange={handle} autoComplete="current-password"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button" onClick={() => setShowPass(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73]/60 hover:text-[#1d1d1f] transition-colors"
            >
              <EyeIcon visible={showPass} />
            </button>
          </div>
          {errors.contraseña && <span className={errCls}>{errors.contraseña}</span>}
        </div>

        {serverError && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
            {serverError}
          </p>
        )}

        <button
          type="submit" disabled={loading}
          className="mt-1 bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors disabled:opacity-50 active:scale-[0.99]"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-black/[0.06]">
        <p className="text-[#6e6e73] text-xs text-center">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-[#1d1d1f] font-medium hover:underline transition-colors">
            Registrate
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginForm;
