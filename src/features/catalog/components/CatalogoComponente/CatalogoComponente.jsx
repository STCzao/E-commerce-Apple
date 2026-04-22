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
      {/* Header oscuro con fade */}
      <div className="relative bg-[#111111] pt-32 pb-24 px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="aurora-blob aurora-1" />
          <div className="aurora-blob aurora-2" />
        </div>
        <div className="absolute inset-0 dot-grid-dark opacity-[0.4]" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f5f5f7] to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Catálogo oficial</span>
          <h1 className="text-5xl md:text-6xl font-semibold text-gradient mt-3 mb-5 leading-tight">
            Todos nuestros dispositivos
          </h1>
          <p className="text-white/35 text-lg max-w-md mx-auto">
            Distribuidores autorizados por Apple en Argentina. Garantía oficial y soporte certificado.
          </p>
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="pb-24">
        {search ? (
          <div className="text-center pt-16 px-8">
            <p className="text-[#6e6e73] text-sm mb-1">Resultados para</p>
            <p className="text-2xl font-medium text-[#1d1d1f] mb-12">"{search}"</p>
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
