import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductoDetalle from "../features/catalog/components/ProductoDetalle/ProductoDetalle";
import {
  iPhonesCatalogo,
  iPadsCatalogo,
  MacsCatalogo,
  WatchsCatalogo,
} from "../features/catalog/data/catalogData";

const allProducts = [
  ...iPhonesCatalogo,
  ...iPadsCatalogo,
  ...MacsCatalogo,
  ...WatchsCatalogo,
];

const ProductoDetallePage = () => {
  const { id } = useParams();

  const product = useMemo(
    () => allProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="text-6xl" aria-hidden="true">🔍</p>
        <h1 className="text-2xl font-semibold text-[#1d1d1f]">Producto no encontrado</h1>
        <p className="text-[#6e6e73]">Este producto no existe o fue removido del catálogo.</p>
        <Link
          to="/catalogo"
          className="mt-2 px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 transition-colors"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return <ProductoDetalle product={product} />;
};

export default ProductoDetallePage;
