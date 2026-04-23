import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogService } from "../../../features/catalog/services/catalogService";
import CardItem from "../../../features/catalog/components/Cards/CardItem";

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }}>
    <div className="aspect-square" style={{ background: "rgba(255,255,255,0.04)" }} />
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  </div>
);

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    catalogService.getProductos({ limite: 4 })
      .then(({ data }) => {
        const lista = Array.isArray(data) ? data : (data?.productos ?? []);
        setProductos(lista.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && productos.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Glow ambiental — fuente de luz cenital sobre los productos */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-white/25 mb-4">
              Catálogo
            </p>
            <h2
              className="font-semibold text-white leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em" }}
            >
              Productos destacados
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-white/35 hover:text-white/70 transition-colors shrink-0 group"
          >
            Ver todo
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        {/* Grid — cards blancos sobre superficie negra */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : productos.map((card, i) => (
                <motion.div
                  key={card._id ?? card.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.42, delay: i * 0.09 }}
                >
                  <CardItem card={card} />
                </motion.div>
              ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link to="/catalogo">
            <button className="group flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-200">
              Ver catálogo completo
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductosDestacados;
