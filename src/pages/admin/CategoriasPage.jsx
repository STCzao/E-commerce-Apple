import { useState } from "react";
import useAdminCategorias from "../../features/admin/hooks/useAdminCategorias";
import CategoriasList from "../../features/admin/components/CategoriasList/CategoriasList";
import CategoriaForm from "../../features/admin/components/CategoriaForm/CategoriaForm";

const CategoriasPage = () => {
  const { categorias, conteo, loading, crear, editar, eliminar } = useAdminCategorias();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editando) await editar(editando._id, data);
      else await crear(data);
      setMostrarForm(false);
      setEditando(null);
    } catch {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1d1d1f]">Categorías</h2>
          <p className="text-sm text-[#6e6e73] mt-0.5">{categorias.length} categorías registradas</p>
        </div>
        {!mostrarForm && (
          <button
            onClick={() => { setEditando(null); setMostrarForm(true); }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#1d1d1f] text-white hover:bg-black transition-colors"
          >
            + Nueva categoría
          </button>
        )}
      </div>

      {mostrarForm && (
        <CategoriaForm
          categoria={editando}
          loading={saving}
          onSave={handleSave}
          onClose={() => { setMostrarForm(false); setEditando(null); }}
        />
      )}

      <CategoriasList
        categorias={categorias}
        conteo={conteo}
        loading={loading}
        onEditar={(cat) => { setEditando(cat); setMostrarForm(true); }}
        onEliminar={eliminar}
      />
    </div>
  );
};

export default CategoriasPage;
