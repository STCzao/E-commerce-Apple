import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Compra = () => (
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
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
          <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
          Proceso de compra
          <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-5">
          Estás muy cerca
        </h1>
        <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
          Nuestro equipo de ventas te acompaña en cada paso del proceso.
        </p>
      </motion.div>
    </header>

    {/* Contenido */}
    <div className="px-6 pb-24 -mt-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="max-w-lg mx-auto"
      >
        {/* WhatsApp CTA */}
        <div className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8 flex flex-col items-center gap-5 text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#1d1d1f]" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[#1d1d1f] mb-1">Contactate por WhatsApp</p>
            <p className="text-[#6e6e73] text-sm leading-relaxed">
              Respondemos en minutos en horario comercial.
            </p>
          </div>
          <a
            href="https://wa.me/543816754618"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Iniciar conversación por WhatsApp"
            className="px-8 py-3 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 transition-colors"
          >
            Iniciar conversación
          </a>
        </div>

        {/* Navegación */}
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <button className="px-6 py-2.5 rounded-full border border-black/10 text-[#6e6e73] text-sm hover:text-[#1d1d1f] hover:border-black/20 bg-white transition-all">
              Volver al inicio
            </button>
          </Link>
          <Link to="/catalogo">
            <button className="px-6 py-2.5 rounded-full border border-black/10 text-[#6e6e73] text-sm hover:text-[#1d1d1f] hover:border-black/20 bg-white transition-all">
              Ver catálogo
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Compra;
