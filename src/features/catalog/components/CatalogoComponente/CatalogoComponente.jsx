import { useMemo } from "react";
import { motion } from "framer-motion";
import Cards from "../Cards/Cards";
import useCatalogStore from "../../../../store/catalogStore";
import useCatalog from "../../hooks/useCatalog";
import PageHeader from "../../../../shared/components/PageHeader/PageHeader";

const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(0,0,0,0.05)" }}>
    <div className="aspect-square" style={{ background: "rgba(0,0,0,0.04)" }} />
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(0,0,0,0.06)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(0,0,0,0.05)" }} />
    </div>
  </div>
);

const GhostCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay: i * 0.04 }}
    className="rounded-2xl overflow-hidden"
    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)", opacity: 0.5 }}
  >
    <div className="aspect-square flex items-center justify-center" style={{ background: "rgba(0,0,0,0.03)" }}>
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10" style={{ color: "rgba(0,0,0,0.12)" }}>
        <rect x="4" y="4" width="32" height="32" rx="4" />
        <circle cx="14" cy="14" r="3" />
        <path strokeLinecap="round" d="M36 28l-9-9-9 9" />
      </svg>
    </div>
    <div className="p-4 flex flex-col gap-2.5">
      <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(0,0,0,0.06)" }} />
      <div className="h-3 rounded-full w-2/5" style={{ background: "rgba(0,0,0,0.05)" }} />
      <div className="mt-1 h-8 rounded-full" style={{ background: "rgba(0,0,0,0.04)" }} />
    </div>
  </motion.div>
);

const EmptySearch = ({ search }) => (
  <div className="flex flex-col items-center gap-4 py-24 text-center">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7 text-[#6e6e73]">
        <circle cx="11" cy="11" r="8" />
        <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-[#1d1d1f]/80 mb-1">Sin resultados para "{search}"</p>
      <p className="text-sm text-[#6e6e73]">Probá con otro término de búsqueda.</p>
    </div>
  </div>
);

const EmptyCatalog = () => (
  <div className="relative">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => <GhostCard key={i} i={i} />)}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl px-8 py-7 text-center max-w-xs mx-4"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(0,0,0,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <p className="font-semibold text-[#1d1d1f]/85 mb-2" style={{ letterSpacing: "-0.01em" }}>
          Próximamente
        </p>
        <p className="text-sm text-[#6e6e73] leading-relaxed">
          El catálogo está en preparación. Volvé pronto para ver todos los productos.
        </p>
      </motion.div>
    </div>
  </div>
);

const CatalogoComponente = () => {
  const search = useCatalogStore((s) => s.search);
  const categoriaActiva = useCatalogStore((s) => s.categoriaActiva);
  const setCategoriaActiva = useCatalogStore((s) => s.setCategoriaActiva);
  const { productos, categorias, loading, error } = useCatalog();

  const filtrados = useMemo(() => {
    let lista = productos;

    if (categoriaActiva) {
      lista = lista.filter((p) => p.categoria?._id === categoriaActiva);
    }

    if (search) {
      const q = search.toLowerCase();
      lista = lista.filter((p) =>
        (p.nombreProducto ?? p.name ?? "").toLowerCase().includes(q)
      );
    }

    return lista;
  }, [productos, categorias, categoriaActiva, search]);

  const agrupado = useMemo(() => {
    if (categoriaActiva || search) return null;

    return categorias
      .map((cat) => ({
        ...cat,
        productos: productos.filter((p) => p.categoria?._id === cat._id),
      }))
      .filter((g) => g.productos.length > 0);
  }, [productos, categorias, categoriaActiva, search]);

  return (
    <div className="min-h-screen" style={{ background: "#f5f5f7" }}>
      <PageHeader
        label="Catálogo oficial"
        title="Todos nuestros dispositivos"
        subtitle="Distribuidores autorizados por Apple en Argentina. Garantía oficial y soporte certificado."
        fadeColor="#f5f5f7"
      >
        {categorias.length > 0 && !search && (
          <nav aria-label="Categorías" className="flex flex-wrap justify-center gap-2">
            {categorias.map((cat) => {
              const activa = categoriaActiva === cat._id;

              return (
                <button
                  key={cat._id}
                  onClick={() => {
                    setCategoriaActiva(cat._id);
                    if (!activa) {
                      document.getElementById(cat._id)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full transition-all ${
                    activa
                      ? "bg-[#1d1d1f] text-white border-transparent"
                      : "text-[#6e6e73] hover:text-[#1d1d1f]"
                  }`}
                >
                  {cat.nombreCategoria}
                </button>
              );
            })}
          </nav>
        )}
      </PageHeader>

      {search && !loading && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-0">
          <p className="text-[#6e6e73] text-sm mb-1">Resultados para</p>
          <p
            className="font-semibold text-[#1d1d1f] mb-10"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em" }}
          >
            "{search}"
          </p>
        </div>
      )}

      {loading && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 pb-28 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-24 px-8">
          <p className="text-[#6e6e73] text-sm">No se pudo cargar el catálogo. Intentá de nuevo.</p>
        </div>
      )}

      {!loading && !error && filtrados.length === 0 && search && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-28">
          <EmptySearch search={search} />
        </div>
      )}

      {!loading && !error && productos.length === 0 && !search && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 pb-28">
          <EmptyCatalog />
        </div>
      )}

      {!loading && !error && (search || categoriaActiva) && filtrados.length > 0 && (
        <div className="pb-28">
          <Cards productos={filtrados} />
        </div>
      )}

      {!loading && !error && !search && !categoriaActiva && agrupado?.length > 0 && (
        <div className="pb-28 flex flex-col gap-12">
          {agrupado.map((grupo) => (
            <Cards
              key={grupo._id}
              id={grupo._id}
              title={grupo.nombreCategoria}
              productos={grupo.productos}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogoComponente;
