import { useEffect, useState } from "react";

const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-2 text-[#1d1d1f] text-sm outline-none focus:border-black/20 focus:bg-white transition-colors";
const labelCls = "text-xs font-medium uppercase tracking-[0.18em] text-[#6e6e73]";

const CategoriaForm = ({ categoria = null, onSave, onClose, loading }) => {
  const isEdit = Boolean(categoria?._id);
  const [nombre, setNombre] = useState(categoria?.nombreCategoria ?? "");
  const [desc, setDesc] = useState(categoria?.descripcion ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setNombre(categoria?.nombreCategoria ?? "");
    setDesc(categoria?.descripcion ?? "");
    setError("");
  }, [categoria]);

  const submit = async (e) => {
    e.preventDefault();
    if (nombre.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }
    await onSave({ nombreCategoria: nombre.trim(), descripcion: desc.trim() });
  };

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-[#1d1d1f] mb-4">
        {isEdit ? "Editar categoría" : "Nueva categoría"}
      </h3>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <div>
          <label className={labelCls}>Nombre *</label>
          <input className={`${inputCls} mt-1.5`} value={nombre} onChange={(e) => { setNombre(e.target.value); setError(""); }} />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <div>
          <label className={labelCls}>Descripción (opcional)</label>
          <textarea rows={2} className={`${inputCls} mt-1.5 resize-none`} value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-full text-sm text-[#6e6e73] hover:bg-black/[0.04] transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-full text-sm font-medium bg-[#1d1d1f] text-white hover:bg-black transition-colors disabled:opacity-60">
            {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriaForm;
