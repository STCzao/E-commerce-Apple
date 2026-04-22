import { useState, useEffect } from "react";
import { catalogService } from "../services/catalogService";

const useCatalog = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductos = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await catalogService.getProductos(params);
      setProductos(data);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const { data } = await catalogService.getCategorias();
      setCategorias(data);
    } catch (err) {
      setError(err.response?.data?.msg || "Error al cargar categorías");
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
  }, []);

  return { productos, categorias, loading, error, fetchProductos };
};

export default useCatalog;
