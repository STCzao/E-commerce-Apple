import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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

const inputCls = "w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-white/40 transition-colors";
const errCls = "text-red-400/80 text-xs px-1";
const NAME_RE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const SPECIAL_RE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const computeAge = (dateStr) => {
  if (!dateStr) return null;
  const birth = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  return hasBirthday ? age : age - 1;
};

const validate = (form) => {
  const e = {};
  if (!form.nombreUsuario.trim()) e.nombreUsuario = "El nombre es obligatorio.";
  else if (form.nombreUsuario.trim().length < 3) e.nombreUsuario = "Mínimo 3 caracteres.";
  else if (form.nombreUsuario.trim().length > 40) e.nombreUsuario = "Máximo 40 caracteres.";
  else if (!NAME_RE.test(form.nombreUsuario)) e.nombreUsuario = "Solo letras y espacios.";

  if (!form.correo.trim()) e.correo = "El correo es requerido.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = "Ingresá un correo válido.";

  if (!form.fechaNacimiento) e.fechaNacimiento = "La fecha de nacimiento es requerida.";
  else if (new Date(form.fechaNacimiento) >= new Date()) e.fechaNacimiento = "Debe ser una fecha en el pasado.";
  else if (computeAge(form.fechaNacimiento) < 18) e.fechaNacimiento = "Debés tener al menos 18 años para registrarte.";

  if (!form.contraseña) e.contraseña = "La contraseña es requerida.";
  else if (form.contraseña.length < 8) e.contraseña = "Mínimo 8 caracteres.";
  else if (form.contraseña.length > 64) e.contraseña = "Máximo 64 caracteres.";
  else if (!/[A-Z]/.test(form.contraseña)) e.contraseña = "Debe incluir al menos una mayúscula.";
  else if (!/\d/.test(form.contraseña)) e.contraseña = "Debe incluir al menos un número.";
  else if (!SPECIAL_RE.test(form.contraseña)) e.contraseña = "Debe incluir al menos un carácter especial.";

  if (!form.confirmarContraseña) e.confirmarContraseña = "Confirmá tu contraseña.";
  else if (form.confirmarContraseña !== form.contraseña) e.confirmarContraseña = "Las contraseñas no coinciden.";

  return e;
};

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);
const maxDateStr = maxDate.toISOString().split("T")[0];

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombreUsuario: "", correo: "", fechaNacimiento: "", contraseña: "", confirmarContraseña: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register } = useAuth();

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
      await register(form);
      setSuccess(true);
    } catch (err) {
      setServerError(err.response?.data?.message || "No se pudo crear la cuenta. Intentá de nuevo.");
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
        <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/12 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-white/70" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">¡Cuenta creada!</h2>
        <p className="text-white/40 text-sm leading-relaxed mb-6">
          Revisá tu bandeja de entrada para confirmar tu correo antes de iniciar sesión.
        </p>
        <Link to="/login">
          <button className="w-full bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
            Ir al inicio de sesión
          </button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-sm bg-white/[0.07] backdrop-blur-xl border border-white/12 rounded-2xl p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-white mb-1">Crear cuenta</h2>
      <p className="text-white/40 text-sm mb-7">Unite a la familia Apple</p>

      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <input name="nombreUsuario" type="text" placeholder="Nombre completo"
            value={form.nombreUsuario} onChange={handle} autoComplete="name"
            className={inputCls} />
          {errors.nombreUsuario && <span className={errCls}>{errors.nombreUsuario}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <input name="correo" type="email" placeholder="Correo electrónico"
            value={form.correo} onChange={handle} autoComplete="email"
            className={inputCls} />
          {errors.correo && <span className={errCls}>{errors.correo}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/35 text-xs px-1">Fecha de nacimiento</label>
          <input name="fechaNacimiento" type="date" max={maxDateStr}
            value={form.fechaNacimiento} onChange={handle}
            className={`${inputCls} [color-scheme:dark]`} />
          {errors.fechaNacimiento && <span className={errCls}>{errors.fechaNacimiento}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <div className="relative">
            <input name="contraseña" type={showPass ? "text" : "password"} placeholder="Contraseña"
              value={form.contraseña} onChange={handle} autoComplete="new-password"
              className={`${inputCls} pr-11`} />
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
            <input name="confirmarContraseña" type={showConfirm ? "text" : "password"} placeholder="Confirmar contraseña"
              value={form.confirmarContraseña} onChange={handle} autoComplete="new-password"
              className={`${inputCls} pr-11`} />
            <button type="button" onClick={() => setShowConfirm(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {errors.confirmarContraseña && <span className={errCls}>{errors.confirmarContraseña}</span>}
        </div>

        {serverError && (
          <p className="text-red-400/80 text-xs bg-red-500/10 border border-red-500/15 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <button type="submit" disabled={loading}
          className="mt-1 bg-white text-black font-medium py-3 rounded-xl text-sm hover:bg-white/90 transition-colors disabled:opacity-50">
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="text-white/35 text-xs text-center mt-6">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-white/60 hover:text-white transition-colors underline">
          Iniciá sesión
        </Link>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
