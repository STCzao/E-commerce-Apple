import { useEffect, useState } from "react";
import { catalogService } from "../../features/catalog/services/catalogService";
import ProductoForm from "../../features/admin/components/ProductoForm/ProductoForm";
import useToastStore from "../../store/toastStore";

const NuevoProductoPage = () => {
  const addToast = useToastStore((s) => s.addToast);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    catalogService.getCategorias()
      .then(({ data }) => setCategorias(Array.isArray(data) ? data : (data?.categorias ?? [])))
      .catch(() => addToast("No se pudieron cargar las categorías.", "error"))
      .finally(() => setLoading(false));
  }, [addToast]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-[#1d1d1f]">Nuevo producto</h2>
        <p className="text-sm text-[#6e6e73] mt-0.5">Cargá una nueva publicación para el catálogo.</p>
      </div>
      <ProductoForm categorias={categorias} loading={loading} />
    </div>
  );
};

export default NuevoProductoPage;
