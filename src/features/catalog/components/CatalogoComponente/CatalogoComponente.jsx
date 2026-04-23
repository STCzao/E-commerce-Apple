import { useMemo } from "react";
import { motion } from "framer-motion";
import Cards from "../Cards/Cards";
import useCatalogStore from "../../../../store/catalogStore";
import useCatalog from "../../hooks/useCatalog";
import PageHeader from "../../../../shared/components/PageHeader/PageHeader";

const CATS = [
  { name: "iPhones", id: "iPhone" },
  { name: "iPads",   id: "iPad"   },
  { name: "Macs",    id: "Mac"    },
  { name: "Watch",   id: "Watch"  },
];

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }}>
    <div className="aspect-square" style={{ background: "rgba(255,255,255,0.04)" }} />
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(255,255,255,0.05)" }} />
    </div>
  </div>
);

const GhostCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: i * 0.04 }}
    className="rounded-2xl overflow-hidden"
    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", opacity: 0.5 }}
  >
    <div
      className="aspect-square flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10" style={{ color: "rgba(255,255,255,0.08)" }}>
        <rect x="4" y="4" width="32" height="32" rx="4" />
        <circle cx="14" cy="14" r="3" />
        <path strokeLinecap="round" d="M36 28l-9-9-9 9" />
      </svg>
    </div>
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.07)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(255,255,255,0.05)" }} />
      <div className="mt-1 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
    </div>
  </motion.div>
);

const EmptySearch = ({ search }) => (
  <div className="flex flex-col items-center gap-4 py-24 text-center">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7 text-white/25">
        <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-white/80 mb-1">Sin resultados para "{search}"</p>
      <p className="text-sm text-white/35">Probá con otro término de búsqueda.</p>
    </div>
  </div>
);

const EmptyCatalog = () => (
  <div className="relative">
    {/* Ghost grid mantiene la estructura */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => <GhostCard key={i} i={i} />)}
    </div>
    {/* Mensaje flotante */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl px-8 py-7 text-center max-w-xs mx-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="font-semibold text-white/85 mb-2" style={{ letterSpacing: "-0.01em" }}>
          Próximamente
        </p>
        <p className="text-sm text-white/40 leading-relaxed">
          El catálogo está en preparación. Volvé pronto para ver todos los productos.
        </p>
      </motion.div>
    </div>
  </div>
);

const CatalogoComponente = () => {
  const search = useCatalogStore((s) => s.search);
  const { productos, loading, error } = useCatalog();

  const filtrados = useMemo(() => {
    if (!search) return productos;
    const q = search.toLowerCase();
    return productos.filter(
      (p) => (p.nombreProducto ?? p.name ?? "").toLowerCase().includes(q)
    );
  }, [search, productos]);

  return (
    <div className="min-h-screen" style={{ background: "#000" }}>

      {/* Header — misma superficie oscura, sin fade a otro color */}
      <PageHeader
        label="Catálogo oficial"
        title="Todos nuestros dispositivos"
        subtitle="Distribuidores autorizados por Apple en Argentina. Garantía oficial y soporte certificado."
        fadeColor="#000"
      >
        {!search && (
          <nav aria-label="Categorías" className="flex flex-wrap justify-center gap-2">
            {CATS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-xs font-medium text-white/40 px-4 py-1.5 rounded-full hover:text-white/70 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        )}
      </PageHeader>

      {/* Header de búsqueda */}
      {search && !loading && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-0">
          <p className="text-white/30 text-sm mb-1">Resultados para</p>
          <p
            className="font-semibold text-white mb-10"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
          >
            "{search}"
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 pb-28 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-24 px-8">
          <p className="text-white/30 text-sm">No se pudo cargar el catálogo. Intentá de nuevo.</p>
        </div>
      )}

      {/* Vacío con búsqueda */}
      {!loading && !error && filtrados.length === 0 && search && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-28">
          <EmptySearch search={search} />
        </div>
      )}

      {/* Vacío sin búsqueda — ghost grid */}
      {!loading && !error && filtrados.length === 0 && !search && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 pb-28">
          <EmptyCatalog />
        </div>
      )}

      {/* Productos */}
      {!loading && !error && filtrados.length > 0 && (
        <div className="pb-28">
          {search
            ? <Cards productos={filtrados} />
            : <Cards productos={filtrados} title="Productos" id="productos" />
          }
        </div>
      )}

    </div>
  );
};

export default CatalogoComponente;
