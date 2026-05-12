import { Link } from "react-router-dom";
import useAdminProductos from "../../features/admin/hooks/useAdminProductos";
import ProductosList from "../../features/admin/components/ProductosList/ProductosList";

const AdminPage = () => {
  const {
    productos, productosFiltrados, categorias, loading,
    eliminar, toggleEstado,
    busqueda, setBusqueda,
    filtroEstado, setFiltroEstado,
    filtroCategoria, setFiltroCategoria,
  } = useAdminProductos();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1d1d1f]">Mis publicaciones</h2>
          <p className="text-sm text-[#6e6e73] mt-0.5">
            {productos.length} productos ·{" "}
            {productos.filter((p) => p.estado).length} activos ·{" "}
            {productos.filter((p) => !p.estado).length} inactivos
          </p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="px-4 py-2 rounded-full text-sm font-medium bg-[#1d1d1f] text-white hover:bg-black transition-colors"
        >
          + Nuevo producto
        </Link>
      </div>

      <ProductosList
        productos={productosFiltrados}
        categorias={categorias}
        loading={loading}
        eliminar={eliminar}
        toggleEstado={toggleEstado}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
      />
    </div>
  );
};

export default AdminPage;
