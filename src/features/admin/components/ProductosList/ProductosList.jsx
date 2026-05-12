import { Link } from "react-router-dom";
import useConfirmStore from "../../../../store/confirmStore";
import { getProductImage, getProductName, getProductPrice } from "../../../../shared/utils/product";

const formatPrice = (price) => {
  if (typeof price === "number") {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(price);
  }

  return price || "Sin precio";
};

const ProductosList = ({
  productos, categorias = [], loading,
  eliminar, toggleEstado,
  busqueda, setBusqueda,
  filtroEstado, setFiltroEstado,
  filtroCategoria, setFiltroCategoria,
}) => {
  const confirm = useConfirmStore((s) => s.confirm);

  if (loading) {
    return (
      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-sm">
        <p className="text-sm text-[#6e6e73]">Cargando productos...</p>
      </div>
    );
  }

  if (!productos.length) {
    return (
      <div className="rounded-3xl border border-black/[0.06] bg-white p-10 shadow-sm text-center">
        <p className="text-[#1d1d1f] font-medium mb-2">Todavía no hay productos cargados.</p>
        <p className="text-sm text-[#6e6e73]">Creá el primero desde el acceso rápido de la parte superior.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-black/[0.06] flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-3 py-2 text-sm text-[#1d1d1f] outline-none focus:border-black/20 focus:bg-white transition-colors"
        />
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-3 py-2 text-sm text-[#6e6e73] outline-none focus:border-black/20 transition-colors"
        >
          <option value="todos">Todos</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="bg-[#f5f5f7] border border-black/[0.08] rounded-xl px-3 py-2 text-sm text-[#6e6e73] outline-none focus:border-black/20 transition-colors"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.nombreCategoria}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-[#f5f5f7] text-[#6e6e73]">
            <tr>
              <th className="text-left font-medium px-6 py-3">Imagen</th>
              <th className="text-left font-medium px-6 py-3">Producto</th>
              <th className="text-left font-medium px-6 py-3">Categoría</th>
              <th className="text-left font-medium px-6 py-3">Precio</th>
              <th className="text-left font-medium px-6 py-3">Estado</th>
              <th className="text-left font-medium px-6 py-3">Destacado</th>
              <th className="text-right font-medium px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => {
              const id = producto._id ?? producto.id;
              const image = getProductImage(producto);
              const estadoActivo = Boolean(producto.estado);

              return (
                <tr key={id} className="border-t border-black/[0.05] align-middle">
                  <td className="px-6 py-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] overflow-hidden flex items-center justify-center">
                      {image ? (
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[11px] text-[#aeaeb2]">Sin imagen</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1d1d1f]">{getProductName(producto)}</p>
                    {(producto.marca ?? producto.brand) && (
                      <p className="text-xs text-[#6e6e73] mt-1">{producto.marca ?? producto.brand}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#6e6e73]">
                    {producto.categoria?.nombreCategoria ?? "Sin categoría"}
                  </td>
                  <td className="px-6 py-4 text-[#1d1d1f] font-medium">
                    {formatPrice(getProductPrice(producto))}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => toggleEstado(id, estadoActivo)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        estadoActivo
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-black/[0.05]"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${estadoActivo ? "bg-emerald-500" : "bg-[#aeaeb2]"}`} />
                      {estadoActivo ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {producto.destacado ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        Destacado
                      </span>
                    ) : (
                      <span className="text-xs text-[#aeaeb2]">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/productos/${id}/editar`}
                        className="px-3 py-2 rounded-full text-xs font-medium text-[#1d1d1f] border border-black/[0.08] hover:bg-black/[0.04] transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          confirm({
                            title: "Eliminar producto",
                            message: `¿Querés eliminar "${getProductName(producto)}"?`,
                            confirmLabel: "Eliminar",
                            danger: true,
                            onConfirm: () => eliminar(id),
                          })
                        }
                        className="px-3 py-2 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
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
    </div>
  );
};

export default ProductosList;
