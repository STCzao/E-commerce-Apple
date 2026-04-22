import { motion } from "framer-motion";
import Cards from "../Cards/Cards";
import useCatalogStore from "../../../../store/catalogStore";
import {
  iPadsCatalogo,
  iPhonesCatalogo,
  MacsCatalogo,
  WatchsCatalogo,
} from "../../data/catalogData";
import { useMemo } from "react";

const mobileCats = [
  { name: "iPhones", id: "iPhone" },
  { name: "iPads", id: "iPad" },
  { name: "Macs", id: "Mac" },
  { name: "Watch", id: "Watch" },
];

const CatalogoComponente = () => {
  const search = useCatalogStore((s) => s.search);

  const data = useMemo(
    () => [...iPhonesCatalogo, ...iPadsCatalogo, ...MacsCatalogo, ...WatchsCatalogo],
    []
  );

  const busqueda = useMemo(
    () => data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
    [search, data]
  );

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      {/* Header oscuro */}
      <header className="relative bg-[#111111] pt-36 pb-32 px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
        </div>
        <div className="absolute inset-0 dot-grid-dark opacity-[0.35]" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#f5f5f7] to-transparent" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
            <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
            Catálogo oficial
            <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
          </span>
          <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-5">
            Todos nuestros dispositivos
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
            Distribuidores autorizados por Apple en Argentina. Garantía oficial y soporte certificado.
          </p>
        </motion.div>
      </header>

      {/* Categorías — solo mobile (desktop usa el sub-bar del navbar) */}
      {!search && (
        <nav aria-label="Categorías" className="md:hidden flex gap-2 overflow-x-auto px-6 pt-8 pb-2 scrollbar-hide">
          {mobileCats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth" })}
              className="shrink-0 text-xs text-[#6e6e73] border border-black/10 bg-white px-4 py-1.5 rounded-full hover:text-[#1d1d1f] hover:border-black/20 transition-all"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}

      {/* Contenido */}
      <div className="pb-24">
        {search ? (
          <div className="text-center pt-16 px-8">
            <p className="text-[#6e6e73] text-sm mb-1">Resultados para</p>
            <p className="text-2xl font-semibold text-[#1d1d1f] mb-12">"{search}"</p>
            <Cards busqueda={busqueda} />
          </div>
        ) : (
          <>
            <Cards busqueda={iPhonesCatalogo} title="iPhones" id="iPhone" />
            <Cards busqueda={iPadsCatalogo} title="iPads" id="iPad" />
            <Cards busqueda={MacsCatalogo} title="Macs" id="Mac" />
            <Cards busqueda={WatchsCatalogo} title="Apple Watch" id="Watch" />
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogoComponente;
