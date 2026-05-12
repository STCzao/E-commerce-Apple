import { useCallback, useEffect, useMemo, useState } from "react";
import { catalogService } from "../../catalog/services/catalogService";
import adminService from "../services/adminService";
import useToastStore from "../../../store/toastStore";

const normalizeCategorias = (data) =>
  Array.isArray(data) ? data : (data?.categorias ?? []);

const useAdminCategorias = () => {
  const addToast = useToastStore((s) => s.addToast);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    setLoading(true);
    try {
      const [{ data: cats }, { data: prods }] = await Promise.all([
        catalogService.getCategorias(),
        catalogService.getProductos({ limite: 200 }),
      ]);
      setCategorias(normalizeCategorias(cats));
      setProductos(Array.isArray(prods) ? prods : (prods?.productos ?? []));
    } catch {
      addToast("No se pudieron cargar las categorías.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => { cargar(); }, [cargar]);

  const conteo = useMemo(() => {
    const map = {};
    productos.forEach((p) => {
      const id = p.categoria?._id;
      if (id) map[id] = (map[id] || 0) + 1;
    });
    return map;
  }, [productos]);

  const crear = useCallback(async (data) => {
    const { data: res } = await adminService.crearCategoria(data);
    setCategorias((prev) => [...prev, res.categoria ?? res]);
    addToast("Categoría creada.", "success");
  }, [addToast]);

  const editar = useCallback(async (id, data) => {
    const { data: res } = await adminService.actualizarCategoria(id, data);
    setCategorias((prev) =>
      prev.map((c) => (c._id === id ? (res.categoria ?? res) : c))
    );
    addToast("Categoría actualizada.", "success");
  }, [addToast]);

  const eliminar = useCallback(async (id) => {
    const snapshot = categorias;
    setCategorias((prev) => prev.filter((c) => c._id !== id));
    try {
      await adminService.eliminarCategoria(id);
      addToast("Categoría eliminada.", "success");
    } catch {
      setCategorias(snapshot);
      addToast("No se pudo eliminar la categoría.", "error");
    }
  }, [addToast, categorias]);

  return { categorias, conteo, loading, crear, editar, eliminar };
};

export default useAdminCategorias;
