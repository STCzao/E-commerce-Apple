import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { catalogService } from "../../features/catalog/services/catalogService";
import ProductoForm from "../../features/admin/components/ProductoForm/ProductoForm";
import useToastStore from "../../store/toastStore";

const EditarProductoPage = () => {
  const { id } = useParams();
  const addToast = useToastStore((s) => s.addToast);
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      catalogService.getProductoById(id),
      catalogService.getCategorias(),
    ])
      .then(([productoRes, categoriasRes]) => {
        setProducto(productoRes.data?.producto ?? productoRes.data);
        setCategorias(Array.isArray(categoriasRes.data) ? categoriasRes.data : (categoriasRes.data?.categorias ?? []));
      })
      .catch(() => addToast("No se pudo cargar el producto para editar.", "error"))
      .finally(() => setLoading(false));
  }, [addToast, id]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-[#1d1d1f]">Editar producto</h2>
        <p className="text-sm text-[#6e6e73] mt-0.5">Actualizá la información y la publicación del producto.</p>
      </div>
      <ProductoForm producto={producto} categorias={categorias} loading={loading} />
    </div>
  );
};

export default EditarProductoPage;
