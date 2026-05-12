import { useCallback, useEffect, useMemo, useState } from "react";
import { catalogService } from "../../catalog/services/catalogService";
import adminService from "../services/adminService";
import useToastStore from "../../../store/toastStore";

const normalizeProductos = (data) =>
  Array.isArray(data) ? data : (data?.productos ?? []);

const normalizeCategorias = (data) =>
  Array.isArray(data) ? data : (data?.categorias ?? []);

const useAdminProductos = () => {
  const addToast = useToastStore((s) => s.addToast);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => {
        if (filtroEstado === "activo") return p.estado === true;
        if (filtroEstado === "inactivo") return p.estado === false;
        return true;
      })
      .filter((p) => !filtroCategoria || p.categoria?._id === filtroCategoria)
      .filter((p) => !busqueda ||
        (p.nombreProducto ?? "").toLowerCase().includes(busqueda.toLowerCase())
      );
  }, [productos, filtroEstado, filtroCategoria, busqueda]);

  const cargar = useCallback(async () => {
    setLoading(true);

    try {
      const [{ data: productosData }, { data: categoriasData }] = await Promise.all([
        catalogService.getProductos({ limite: 200 }),
        catalogService.getCategorias(),
      ]);

      setProductos(normalizeProductos(productosData));
      setCategorias(normalizeCategorias(categoriasData));
    } catch {
      addToast("No se pudo cargar el panel de productos.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const eliminar = useCallback(async (id) => {
    const snapshot = productos;
    setProductos((prev) => prev.filter((item) => (item._id ?? item.id) !== id));

    try {
      await adminService.eliminarProducto(id);
      addToast("Producto eliminado.", "success");
    } catch {
      setProductos(snapshot);
      addToast("No se pudo eliminar el producto.", "error");
    }
  }, [addToast, productos]);

  const toggleEstado = useCallback(async (id, estadoActual) => {
    const snapshot = productos;
    const siguiente = !estadoActual;

    setProductos((prev) =>
      prev.map((item) =>
        (item._id ?? item.id) === id ? { ...item, estado: siguiente } : item
      )
    );

    try {
      await adminService.toggleEstado(id, siguiente);
      addToast(`Producto ${siguiente ? "activado" : "desactivado"}.`, "success");
    } catch {
      setProductos(snapshot);
      addToast("No se pudo actualizar el estado.", "error");
    }
  }, [addToast, productos]);

  return {
    productos,
    productosFiltrados,
    categorias,
    loading,
    eliminar,
    toggleEstado,
    recargar: cargar,
    busqueda,
    setBusqueda,
    filtroEstado,
    setFiltroEstado,
    filtroCategoria,
    setFiltroCategoria,
  };
};

export default useAdminProductos;
