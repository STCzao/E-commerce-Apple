import { useState, useEffect } from "react";
import { catalogService } from "../services/catalogService";

const useCatalog = () => {
  const [productos, setProductos]   = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const fetchProductos = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await catalogService.getProductos({ limite: 100, ...params });
      // Backend returns { total, productos: [...] }
      const lista = Array.isArray(data) ? data : (data?.productos ?? []);
      setProductos(lista);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const { data } = await catalogService.getCategorias();
      setCategorias(Array.isArray(data) ? data : (data?.categorias ?? []));
    } catch {
      // no-op: las categorías son opcionales para el filtro
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  return { productos, categorias, loading, error, fetchProductos };
};

export default useCatalog;
