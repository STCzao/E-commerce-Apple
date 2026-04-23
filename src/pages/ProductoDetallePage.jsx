import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogService } from "../features/catalog/services/catalogService";
import ProductoDetalle from "../features/catalog/components/ProductoDetalle/ProductoDetalle";

const SkeletonDetalle = () => (
  <div className="bg-[#f5f5f7] min-h-screen">
    <div className="pt-28 pb-0 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="h-4 w-32 bg-black/[0.06] rounded-full animate-pulse" />
    </div>
    <div className="px-6 md:px-16 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-[55%]">
          <div className="aspect-square bg-white rounded-3xl border border-black/[0.05] animate-pulse" />
        </div>
        <div className="lg:w-[45%] flex flex-col gap-6 pt-4">
          <div className="h-3 w-20 bg-black/[0.06] rounded-full animate-pulse" />
          <div className="h-8 w-3/4 bg-black/[0.07] rounded-xl animate-pulse" />
          <div className="h-6 w-1/3 bg-black/[0.06] rounded-xl animate-pulse" />
          <div className="flex flex-col gap-2 pt-4">
            <div className="h-4 w-full bg-black/[0.04] rounded-full animate-pulse" />
            <div className="h-4 w-5/6 bg-black/[0.04] rounded-full animate-pulse" />
            <div className="h-4 w-4/6 bg-black/[0.04] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center gap-5 px-6 text-center"
  >
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.05)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-8 h-8 text-black/30">
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
    </div>
    <div>
      <h1 className="text-xl font-semibold text-[#1d1d1f] mb-2">Producto no encontrado</h1>
      <p className="text-[#6e6e73] text-sm">Este producto no existe o fue removido del catálogo.</p>
    </div>
    <Link
      to="/catalogo"
      className="px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-black transition-colors"
    >
      Volver al catálogo
    </Link>
  </motion.div>
);

const ProductoDetallePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    catalogService.getProductoById(id)
      .then(({ data }) => {
        const p = data?.producto ?? data;
        if (!p?._id && !p?.id) { setNotFound(true); return; }
        setProduct(p);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <SkeletonDetalle />;
  if (notFound || !product) return <NotFound />;
  return <ProductoDetalle product={product} />;
};

export default ProductoDetallePage;
