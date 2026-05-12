import useConfirmStore from "../../../../store/confirmStore";

const CategoriasList = ({ categorias, conteo, loading, onEditar, onEliminar }) => {
  const confirm = useConfirmStore((s) => s.confirm);

  if (loading) return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
      <p className="text-sm text-[#6e6e73]">Cargando categorías...</p>
    </div>
  );

  if (!categorias.length) return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-10 shadow-sm text-center">
      <p className="text-[#1d1d1f] font-medium mb-1">No hay categorías cargadas.</p>
      <p className="text-sm text-[#6e6e73]">Creá la primera desde el botón de arriba.</p>
    </div>
  );

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-[#f5f5f7] text-[#6e6e73]">
          <tr>
            <th className="text-left font-medium px-6 py-3">Nombre</th>
            <th className="text-left font-medium px-6 py-3">Descripción</th>
            <th className="text-left font-medium px-6 py-3">Productos</th>
            <th className="text-right font-medium px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => {
            const count = conteo[cat._id] ?? 0;
            return (
              <tr key={cat._id} className="border-t border-black/[0.05] align-middle">
                <td className="px-6 py-4 font-medium text-[#1d1d1f]">{cat.nombreCategoria}</td>
                <td className="px-6 py-4 text-[#6e6e73] max-w-xs truncate">
                  {cat.descripcion || <span className="text-[#aeaeb2]">Sin descripción</span>}
                </td>
                <td className="px-6 py-4 text-[#6e6e73]">{count}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEditar(cat)} className="px-3 py-1.5 rounded-full text-xs font-medium text-[#1d1d1f] border border-black/[0.08] hover:bg-black/[0.04] transition-colors">
                      Editar
                    </button>
                    <button
                      onClick={() => confirm({
                        title: "Eliminar categoría",
                        message: count > 0
                          ? `La categoría "${cat.nombreCategoria}" tiene ${count} producto${count > 1 ? "s" : ""} asociado${count > 1 ? "s" : ""}. Si la eliminás, esos productos quedarán sin categoría. ¿Confirmás?`
                          : `¿Eliminás la categoría "${cat.nombreCategoria}"?`,
                        confirmLabel: "Eliminar",
                        danger: true,
                        onConfirm: () => onEliminar(cat._id),
                      })}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriasList;
