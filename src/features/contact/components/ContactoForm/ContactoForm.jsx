import { useState } from "react";

const field = "flex flex-col gap-1.5";
const label = "text-xs text-[#6e6e73] font-medium";
const inputCls = "h-10 px-4 rounded-full bg-[#f5f5f7] border border-black/[0.09] text-sm text-[#1d1d1f] placeholder-[#6e6e73]/50 outline-none focus:border-black/25 focus:bg-white transition-all";
const errMsg = "text-red-500/70 text-[11px] px-1";

const ContactoForm = () => {
  const [values, setValues] = useState({ nombre: "", telefono: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");

  const set = (k) => (e) => setValues(v => ({ ...v, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!values.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!values.telefono.trim()) e.telefono = "El teléfono es obligatorio.";
    else if (!/^\d{10,15}$/.test(values.telefono)) e.telefono = "Ingrese un número válido (10-15 dígitos).";
    if (!values.email.trim()) e.email = "El email es obligatorio.";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) e.email = "Ingrese un email válido.";
    if (!values.mensaje.trim()) e.mensaje = "El mensaje es obligatorio.";
    else if (values.mensaje.trim().length <= 10) e.mensaje = "Mínimo 10 caracteres.";
    else if (values.mensaje.trim().length >= 200) e.mensaje = "Máximo 200 caracteres.";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) { setResult("error"); return; }

    setResult("sending");
    const fd = new FormData(e.target);
    fd.append("access_key", "bef8a01e-8777-42f5-9390-10e86de92262");
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
    const data = await res.json();

    if (data.success) {
      setResult("ok");
      setValues({ nombre: "", telefono: "", email: "", mensaje: "" });
      setErrors({});
      e.target.reset();
    } else {
      setResult("fail");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className={field}>
        <label className={label}>Nombre</label>
        <input type="text" name="Nombre" className={inputCls} placeholder="Tu nombre completo"
          value={values.nombre} onChange={set("nombre")} />
        {errors.nombre && <span className={errMsg}>{errors.nombre}</span>}
      </div>

      <div className={field}>
        <label className={label}>Teléfono</label>
        <input type="tel" name="Teléfono" className={inputCls} placeholder="Número de teléfono"
          value={values.telefono} onChange={set("telefono")} />
        {errors.telefono && <span className={errMsg}>{errors.telefono}</span>}
      </div>

      <div className={field}>
        <label className={label}>Email</label>
        <input type="email" name="Email" className={inputCls} placeholder="tu@email.com"
          value={values.email} onChange={set("email")} />
        {errors.email && <span className={errMsg}>{errors.email}</span>}
      </div>

      <div className={field}>
        <label className={label}>Mensaje</label>
        <textarea name="Mensaje" rows="5"
          className="px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-black/[0.09] text-sm text-[#1d1d1f] placeholder-[#6e6e73]/50 outline-none focus:border-black/25 focus:bg-white transition-all resize-none"
          placeholder="Describí tu consulta..."
          value={values.mensaje} onChange={set("mensaje")} />
        {errors.mensaje && <span className={errMsg}>{errors.mensaje}</span>}
      </div>

      <button type="submit" disabled={result === "sending"}
        className="mt-1 h-11 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 disabled:opacity-50 transition-all">
        {result === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {result === "ok" && (
        <p className="text-center text-sm text-green-600">¡Mensaje enviado correctamente!</p>
      )}
      {result === "fail" && (
        <p className="text-center text-sm text-red-500">Ocurrió un error. Intentá de nuevo.</p>
      )}
    </form>
  );
};

export default ContactoForm;
