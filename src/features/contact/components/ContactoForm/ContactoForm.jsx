import { useState } from "react";
import { motion } from "framer-motion";

const field = "flex flex-col gap-1.5";
const label = "text-xs text-[#6e6e73] font-medium";
const inputCls = "h-10 px-4 rounded-xl bg-[#f5f5f7] border border-black/[0.09] text-sm text-[#1d1d1f] placeholder-[#6e6e73]/50 outline-none focus:border-black/25 focus:bg-white transition-all";
const errMsg = "text-red-500/70 text-[11px] px-1";

const initialValues = { nombre: "", email: "", telefono: "", mensaje: "" };

const ContactoForm = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState("");

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) {
      setErrors((prev) => ({ ...prev, [k]: "" }));
    }
    if (result === "fail" || result === "ok") {
      setResult("");
    }
  };

  const validate = () => {
    const e = {};
    if (!values.nombre.trim()) e.nombre = "El nombre es obligatorio.";

    if (!values.email.trim()) e.email = "El email es obligatorio.";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) e.email = "Ingresá un email válido.";

    if (values.telefono.trim() && !/^[\d\s\-\+\(\)]{8,20}$/.test(values.telefono)) {
      e.telefono = "Ingresá un número válido.";
    }

    if (!values.mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
    else if (values.mensaje.trim().length < 10) e.mensaje = "Mínimo 10 caracteres.";
    else if (values.mensaje.trim().length > 200) e.mensaje = "Máximo 200 caracteres.";

    return e;
  };

  const handleBlur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [k]: errs[k] || "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setTouched({ nombre: true, email: true, telefono: true, mensaje: true });
    setErrors(errs);

    if (Object.keys(errs).length) {
      setResult("error");
      return;
    }

    setResult("sending");
    const fd = new FormData(e.target);
    fd.append("access_key", import.meta.env.WEB_FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const data = await res.json();

      if (data.success) {
        setResult("ok");
        setValues(initialValues);
        setErrors({});
        setTouched({});
        e.target.reset();
      } else {
        setResult("fail");
      }
    } catch {
      setResult("fail");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className={field}>
        <label htmlFor="nombre" className={label}>Nombre</label>
        <input
          id="nombre"
          type="text"
          name="Nombre"
          className={inputCls}
          placeholder="Tu nombre completo"
          value={values.nombre}
          onChange={set("nombre")}
          onBlur={handleBlur("nombre")}
        />
        {touched.nombre && errors.nombre && <span className={errMsg}>{errors.nombre}</span>}
      </div>

      <div className={field}>
        <label htmlFor="email" className={label}>Email</label>
        <input
          id="email"
          type="email"
          name="Email"
          className={inputCls}
          placeholder="tu@email.com"
          value={values.email}
          onChange={set("email")}
          onBlur={handleBlur("email")}
        />
        {touched.email && errors.email && <span className={errMsg}>{errors.email}</span>}
      </div>

      <div className={field}>
        <label htmlFor="telefono" className={label}>
          Teléfono <span className="text-[#6e6e73]/50 font-normal">(opcional)</span>
        </label>
        <input
          id="telefono"
          type="tel"
          name="Telefono"
          className={inputCls}
          placeholder="Número de teléfono"
          value={values.telefono}
          onChange={set("telefono")}
          onBlur={handleBlur("telefono")}
        />
        {touched.telefono && errors.telefono && <span className={errMsg}>{errors.telefono}</span>}
      </div>

      <div className={field}>
        <label htmlFor="mensaje" className={label}>Mensaje</label>
        <div className="relative">
          <textarea
            id="mensaje"
            name="Mensaje"
            rows="5"
            maxLength={200}
            className="w-full px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-black/[0.09] text-sm text-[#1d1d1f] placeholder-[#6e6e73]/50 outline-none focus:border-black/25 focus:bg-white transition-all resize-none"
            placeholder="Describí tu consulta..."
            value={values.mensaje}
            onChange={set("mensaje")}
            onBlur={handleBlur("mensaje")}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-[#6e6e73]/50">
            {values.mensaje.length}/200
          </span>
        </div>
        {touched.mensaje && errors.mensaje && <span className={errMsg}>{errors.mensaje}</span>}
      </div>

      <button
        type="submit"
        disabled={result === "sending"}
        className="mt-1 h-11 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
      >
        {result === "sending" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Enviando...
          </>
        ) : "Enviar mensaje"}
      </button>

      {result === "ok" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 text-green-500">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" />
          </svg>
          ¡Mensaje enviado correctamente!
        </motion.div>
      )}

      {result === "fail" && <p className="text-center text-sm text-red-500">Ocurrió un error. Intentá de nuevo.</p>}
    </form>
  );
};

export default ContactoForm;
