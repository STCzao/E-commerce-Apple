import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";
import useToastStore from "../../../../store/toastStore";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const inputCls = "w-full bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-4 py-2 text-[#1d1d1f] text-sm outline-none focus:border-black/20 focus:bg-white transition-colors";
const labelCls = "text-xs font-medium uppercase tracking-[0.18em] text-[#6e6e73]";
const errorCls = "text-red-500 text-xs mt-1";

const normalizeImage = (img) => {
  if (!img) return null;
  if (typeof img === "string") return { url: img };
  return { url: img.url ?? img.secure_url ?? "" };
};

const buildInitialForm = (producto) => ({
  nombreProducto: producto?.nombreProducto ?? producto?.name ?? "",
  marca: producto?.marca ?? producto?.brand ?? "",
  precio: producto?.precio ?? producto?.price ?? "",
  categoria: producto?.categoria?._id ?? producto?.categoria ?? "",
  descripcion: producto?.descripcion ?? producto?.description ?? "",
  imagenes: (producto?.imagenes ?? []).map(normalizeImage).filter((img) => img?.url),
  destacado: Boolean(producto?.destacado),
  estado: producto?.estado ?? true,
  whatsappActivo: Boolean(producto?.whatsappActivo),
  whatsappMensaje: producto?.whatsappMensaje ?? "",
});

const validate = (form) => {
  const errors = {};
  const nombre = form.nombreProducto.trim();
  const marca = form.marca.trim();
  const descripcion = form.descripcion.trim();
  const precio = Number(form.precio);
  const mensaje = form.whatsappMensaje.trim();

  if (nombre.length < 3 || nombre.length > 50) errors.nombreProducto = "El nombre debe tener entre 3 y 50 caracteres.";
  if (marca.length < 2 || marca.length > 30) errors.marca = "La marca debe tener entre 2 y 30 caracteres.";
  if (Number.isNaN(precio) || precio < 0) errors.precio = "El precio debe ser un número mayor o igual a 0.";
  if (!form.categoria) errors.categoria = "Seleccioná una categoría.";
  if (descripcion.length < 10 || descripcion.length > 500) errors.descripcion = "La descripción debe tener entre 10 y 500 caracteres.";
  if (!form.imagenes.length) errors.imagenes = "Cargá al menos una imagen.";
  if (form.whatsappActivo && mensaje.length > 300) errors.whatsappMensaje = "El mensaje de WhatsApp no puede superar los 300 caracteres.";

  return errors;
};

const ToggleField = ({ checked, onChange, label, hint }) => (
  <button
    type="button"
    onClick={onChange}
    className="flex items-center justify-between gap-4 px-4 py-3 rounded-2xl border border-black/[0.08] bg-[#f5f5f7] hover:bg-white transition-colors text-left"
  >
    <div>
      <p className="text-sm font-medium text-[#1d1d1f]">{label}</p>
      {hint && <p className="text-xs text-[#6e6e73] mt-1">{hint}</p>}
    </div>
    <span className={`w-11 h-6 rounded-full p-1 transition-colors ${checked ? "bg-[#1d1d1f]" : "bg-black/[0.12]"}`}>
      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </span>
  </button>
);

const ProductoForm = ({ producto = null, categorias = [], loading = false }) => {
  const navigate = useNavigate();
  const addToast = useToastStore((s) => s.addToast);
  const inputFileRef = useRef(null);
  const isEdit = Boolean(producto?._id ?? producto?.id);

  const [form, setForm] = useState(buildInitialForm(producto));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(buildInitialForm(producto));
    setErrors({});
  }, [producto]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const uploadImages = async (files) => {
    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const body = new FormData();
          body.append("file", file);
          body.append("upload_preset", UPLOAD_PRESET);
          body.append("folder", "apple-store/productos");

          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body,
          });
          const data = await res.json();

          if (!res.ok) throw new Error(data.error?.message ?? "No se pudo subir una imagen.");
          return { url: data.secure_url };
        })
      );

      setForm((prev) => ({ ...prev, imagenes: [...prev.imagenes, ...uploaded] }));
      setErrors((prev) => ({ ...prev, imagenes: "" }));
    } catch (err) {
      console.error(err);
      addToast(err.message || "No se pudieron subir las imágenes.", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    await uploadImages(files);
    e.target.value = "";
  };

  const removeImage = (url) => {
    setForm((prev) => ({ ...prev, imagenes: prev.imagenes.filter((img) => img.url !== url) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      nombreProducto: form.nombreProducto.trim(),
      marca: form.marca.trim(),
      precio: Number(form.precio),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria,
      imagenes: form.imagenes.map((img) => ({ url: img.url })),
      destacado: form.destacado,
      estado: form.estado,
      whatsappActivo: form.whatsappActivo,
      whatsappMensaje: form.whatsappActivo ? form.whatsappMensaje.trim() : "",
    };

    setSaving(true);
    try {
      if (isEdit) {
        await adminService.actualizarProducto(producto._id ?? producto.id, payload);
        addToast("Producto actualizado.", "success");
      } else {
        await adminService.crearProducto(payload);
        addToast("Producto creado.", "success");
      }
      navigate("/admin");
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || "No se pudo guardar el producto.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
        <p className="text-sm text-[#6e6e73]">Cargando formulario...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls}>Nombre del producto</label>
              <input className={`${inputCls} mt-1.5`} value={form.nombreProducto} onChange={(e) => updateField("nombreProducto", e.target.value)} />
              {errors.nombreProducto && <p className={errorCls}>{errors.nombreProducto}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Marca</label>
                <input className={`${inputCls} mt-1.5`} value={form.marca} onChange={(e) => updateField("marca", e.target.value)} />
                {errors.marca && <p className={errorCls}>{errors.marca}</p>}
              </div>
              <div>
                <label className={labelCls}>Precio</label>
                <input type="number" min="0" step="0.01" className={`${inputCls} mt-1.5`} value={form.precio} onChange={(e) => updateField("precio", e.target.value)} />
                {errors.precio && <p className={errorCls}>{errors.precio}</p>}
              </div>
            </div>

            <div>
              <label className={labelCls}>Categoría</label>
              <select className={`${inputCls} mt-1.5`} value={form.categoria} onChange={(e) => updateField("categoria", e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.nombreCategoria}</option>
                ))}
              </select>
              {errors.categoria && <p className={errorCls}>{errors.categoria}</p>}
            </div>

            <div className="flex-1">
              <label className={labelCls}>Descripción</label>
              <textarea rows={4} className={`${inputCls} mt-1.5 resize-none`} value={form.descripcion} onChange={(e) => updateField("descripcion", e.target.value)} />
              {errors.descripcion && <p className={errorCls}>{errors.descripcion}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={labelCls}>Imágenes</label>
                <button
                  type="button"
                  onClick={() => inputFileRef.current?.click()}
                  className="text-xs font-medium text-[#1d1d1f] underline underline-offset-2 hover:opacity-60 transition-opacity"
                >
                  {uploading ? "Subiendo..." : "+ Agregar"}
                </button>
                <input ref={inputFileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </div>
              {errors.imagenes && <p className={`${errorCls} mb-2`}>{errors.imagenes}</p>}
              <div className="grid grid-cols-3 gap-2">
                {form.imagenes.map((img) => (
                  <div key={img.url} className="relative rounded-xl overflow-hidden border border-black/[0.08] aspect-square">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(img.url)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs hover:bg-black transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {!form.imagenes.length && (
                  <div className="col-span-3 rounded-xl border border-dashed border-black/[0.08] bg-[#f5f5f7] py-8 text-center text-xs text-[#aeaeb2]">
                    Sin imágenes
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ToggleField checked={form.destacado} onChange={() => updateField("destacado", !form.destacado)} label="Destacado" hint="Se muestra en los módulos principales." />
              <ToggleField checked={form.estado} onChange={() => updateField("estado", !form.estado)} label="Estado activo" hint="Ocultar temporalmente del catálogo." />
              <ToggleField checked={form.whatsappActivo} onChange={() => updateField("whatsappActivo", !form.whatsappActivo)} label="WhatsApp activo" hint="Mensaje personalizado para consultas." />
            </div>

            {form.whatsappActivo && (
              <div>
                <label className={labelCls}>Mensaje de WhatsApp</label>
                <textarea rows={3} className={`${inputCls} mt-1.5 resize-none`} value={form.whatsappMensaje} onChange={(e) => updateField("whatsappMensaje", e.target.value)} />
                <div className="flex justify-between mt-1">
                  {errors.whatsappMensaje ? <p className={errorCls}>{errors.whatsappMensaje}</p> : <span />}
                  <span className="text-xs text-[#aeaeb2]">{form.whatsappMensaje.length}/300</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => navigate("/admin")} className="px-5 py-3 rounded-full text-sm text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={saving || uploading} className="px-5 py-3 rounded-full text-sm font-medium bg-[#1d1d1f] text-white hover:bg-black transition-colors disabled:opacity-60">
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;
