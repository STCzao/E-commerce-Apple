import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-3 text-[#1d1d1f] placeholder-[#6e6e73]/60 text-sm outline-none focus:border-black/20 focus:bg-white transition-colors";
const errCls = "text-red-500 text-xs px-1";
const labelCls = "text-xs font-medium text-[#6e6e73] px-1";

const NAME_RE = /^[a-zA-Z\s]+$/;
const SPECIAL_RE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

const computeAge = (dateStr) => {
  if (!dateStr) return null;
  const birth = new Date(dateStr);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasBirthday = today.getMonth() > birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
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
  else if (computeAge(form.fechaNacimiento) < 18) e.fechaNacimiento = "Debés tener al menos 18 años.";

  if (!form.contrasena) e.contrasena = "La contraseña es requerida.";
  else if (form.contrasena.length < 8) e.contrasena = "Mínimo 8 caracteres.";
  else if (form.contrasena.length > 64) e.contrasena = "Máximo 64 caracteres.";
  else if (!/[A-Z]/.test(form.contrasena)) e.contrasena = "Debe incluir al menos una mayúscula.";
  else if (!/\d/.test(form.contrasena)) e.contrasena = "Debe incluir al menos un número.";
  else if (!SPECIAL_RE.test(form.contrasena)) e.contrasena = "Debe incluir al menos un carácter especial.";

  if (!form.confirmarContrasena) e.confirmarContrasena = "Confirmá tu contraseña.";
  else if (form.confirmarContrasena !== form.contrasena) e.confirmarContrasena = "Las contraseñas no coinciden.";

  return e;
};

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

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);
const maxDateStr = maxDate.toISOString().split("T")[0];

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombreUsuario: "",
    correo: "",
    fechaNacimiento: "",
    contrasena: "",
    confirmarContrasena: "",
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
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await register({
        nombreUsuario: form.nombreUsuario,
        correo: form.correo,
        fechaNacimiento: form.fechaNacimiento,
        ["contraseña"]: form.contrasena,
        ["confirmarContraseña"]: form.confirmarContrasena,
      });
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
        className="w-full bg-white rounded-2xl p-8 text-center"
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.07)" }}>
          <svg className="w-7 h-7 text-[#1d1d1f]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2" style={{ letterSpacing: "-0.02em" }}>
          ¡Cuenta creada!
        </h2>
        <p className="text-[#6e6e73] text-sm leading-relaxed mb-6">
          Revisá tu bandeja de entrada para confirmar tu correo antes de iniciar sesión.
        </p>
        <Link to="/login">
          <button className="w-full bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors">
            Ir al inicio de sesión
          </button>
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
        Crear cuenta
      </h2>
      <p className="text-[#6e6e73] text-sm mb-7">Únite a la familia Apple</p>

      <form onSubmit={submit} className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1">
          <label htmlFor="nombreUsuario" className={labelCls}>Nombre completo</label>
          <input id="nombreUsuario" name="nombreUsuario" type="text" placeholder="Nombre completo" value={form.nombreUsuario} onChange={handle} autoComplete="name" className={inputCls} />
          {errors.nombreUsuario && <span className={errCls}>{errors.nombreUsuario}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="correo" className={labelCls}>Correo electrónico</label>
          <input id="correo" name="correo" type="email" placeholder="Correo electrónico" value={form.correo} onChange={handle} autoComplete="email" className={inputCls} />
          {errors.correo && <span className={errCls}>{errors.correo}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="fechaNacimiento" className={labelCls}>Fecha de nacimiento</label>
          <input id="fechaNacimiento" name="fechaNacimiento" type="date" max={maxDateStr} value={form.fechaNacimiento} onChange={handle} className={inputCls} />
          {errors.fechaNacimiento && <span className={errCls}>{errors.fechaNacimiento}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="contrasena" className={labelCls}>Contraseña</label>
          <div className="relative">
            <input id="contrasena" name="contrasena" type={showPass ? "text" : "password"} placeholder="Contraseña" value={form.contrasena} onChange={handle} autoComplete="new-password" className={`${inputCls} pr-11`} />
            <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73]/60 hover:text-[#1d1d1f] transition-colors">
              <EyeIcon visible={showPass} />
            </button>
          </div>
          {errors.contrasena && <span className={errCls}>{errors.contrasena}</span>}
          <span className="text-[#6e6e73]/50 text-[11px] px-1">
            Mínimo 8 caracteres, mayúscula, número y símbolo
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmarContrasena" className={labelCls}>Confirmar contraseña</label>
          <div className="relative">
            <input id="confirmarContrasena" name="confirmarContrasena" type={showConfirm ? "text" : "password"} placeholder="Confirmar contraseña" value={form.confirmarContrasena} onChange={handle} autoComplete="new-password" className={`${inputCls} pr-11`} />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e6e73]/60 hover:text-[#1d1d1f] transition-colors">
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {errors.confirmarContrasena && <span className={errCls}>{errors.confirmarContrasena}</span>}
        </div>

        {serverError && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">{serverError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 bg-[#1d1d1f] text-white font-medium py-3 rounded-xl text-sm hover:bg-black transition-colors disabled:opacity-60 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Creando cuenta...
            </>
          ) : "Registrarse"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-black/[0.06]">
        <p className="text-[#6e6e73] text-xs text-center">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-[#6e6e73] font-medium underline hover:text-[#1d1d1f] transition-colors">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
