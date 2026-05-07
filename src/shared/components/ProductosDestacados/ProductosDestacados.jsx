import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogService } from "../../../features/catalog/services/catalogService";
import CardItem from "../../../features/catalog/components/Cards/CardItem";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(0,0,0,0.05)" }}>
    <div className="aspect-square" style={{ background: "rgba(0,0,0,0.04)" }} />
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(0,0,0,0.06)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(0,0,0,0.05)" }} />
    </div>
  </div>
);

const ProductosDestacados = () => {
  const reduced = useReducedMotion();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    catalogService
      .getProductos({ limite: 4 })
      .then(({ data }) => {
        const lista = Array.isArray(data) ? data : data?.productos ?? [];
        setProductos(lista.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && productos.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 py-28"
      style={{ background: "#f5f5f7", borderTop: "1px solid rgba(0,0,0,0.05)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,0,0,0.025) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: isMobile ? 6 : 12 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
          className="mb-12 flex items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.28em] uppercase text-[#6e6e73] mb-4">
              Catálogo
            </p>
            <h2
              className="font-semibold text-[#1d1d1f] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em" }}
            >
              Productos destacados
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden sm:flex items-center text-sm font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors shrink-0"
          >
            Ver todo
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : productos.map((card, i) => (
                <motion.div
                  key={card._id ?? card.id}
                  initial={reduced ? false : { opacity: 0, y: isMobile ? 6 : 18 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.32, delay: isMobile ? 0 : i * 0.09 }}
                >
                  <CardItem card={card} />
                </motion.div>
              ))}
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: isMobile ? 6 : 8 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32, delay: isMobile ? 0 : 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link to="/catalogo">
            <button className="px-8 py-3 rounded-full text-sm font-semibold bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85 active:scale-[0.98] transition-all duration-200">
              Ver catálogo completo
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductosDestacados;
