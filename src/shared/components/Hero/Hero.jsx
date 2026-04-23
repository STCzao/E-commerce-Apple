import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
const productImage = import.meta.env.VITE_ASSET_LANZAMIENTO_1;

const Hero = () => {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 280], [1, 0]);
  const contentY       = useTransform(scrollY, [0, 280], [0, -40]);
  const imgY           = useTransform(scrollY, [0, 600], ["0%", "10%"]);

  return (
    <section
      aria-label="Presentación principal"
      className="relative w-full min-h-screen overflow-hidden bg-[#111111]"
    >
      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      <div className="absolute inset-0 dot-grid-dark opacity-[0.45]" aria-hidden="true" />

      {/* Fade inferior — hacia el blanco de la sección Stats */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-white to-transparent z-10" aria-hidden="true" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 xl:px-32 max-w-8xl mx-auto gap-12 pt-24 pb-12"
      >
        {/* Texto */}
        <div className="flex flex-col gap-7 lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" aria-hidden="true" />
            <span className="text-white/65 text-xs tracking-[0.2em] uppercase">Distribuidor Autorizado Apple</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-white">
            {"La mejor manera de comprar los productos que amas"
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: "blur(8px)", y: 14 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                  className="mr-[0.2em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            Tecnología de vanguardia. Garantía oficial. Soporte certificado en todo Argentina.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="flex gap-3"
          >
            <Link to="/catalogo">
              <button className="px-7 py-3 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors">
                Ver catálogo
              </button>
            </Link>
            <Link to="/login">
              <button className="px-7 py-3 rounded-full text-sm border border-white/20 text-white/80 bg-white/[0.06] hover:bg-white/[0.10] hover:border-white/30 transition-all backdrop-blur-sm">
                Ingresar
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Imagen del producto */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ y: imgY }}
          className="hidden lg:flex flex-1 justify-center items-center relative"
        >
          <div className="absolute w-80 h-80 rounded-full bg-white/[0.04] blur-3xl" aria-hidden="true" />
          <img
            src={productImage}
            alt="iPhone — producto destacado"
            fetchPriority="high"
            crossOrigin="anonymous"
            className="relative max-h-[75vh] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
          />
        </motion.div>
      </motion.div>

      
    </section>
  );
};

export default Hero;
