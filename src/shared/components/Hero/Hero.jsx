import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity     = useTransform(scrollY, [0, 260], [1, 0]);
  const y           = useTransform(scrollY, [0, 260], [0, -40]);

  return (
    <section
      aria-label="Presentación principal"
      className="surface-metal relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Arista de luz superior — como luz rasante en el borde de un panel de metal */}
      <div className="edge-light absolute top-0 inset-x-0 h-px" aria-hidden="true" />

      {/* Tipografía ambiental — watermark estructural, no decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center" aria-hidden="true">
        {["iPhone", "Mac", "iPad", "Watch"].map((word, i) => (
          <span
            key={word}
            className="block font-semibold text-white leading-none"
            style={{
              fontSize: "clamp(80px, 19vw, 260px)",
              opacity: 0.028,
              letterSpacing: "-0.05em",
              paddingLeft: `${4 + i * 8}%`,
              lineHeight: 0.88,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Contenido principal */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 max-w-4xl mx-auto pt-28 pb-20 gap-8"
      >
        {/* Badge en titanio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(174,174,178,0.18)", background: "rgba(174,174,178,0.05)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#aeaeb2" }} aria-hidden="true" />
          <span className="text-xs tracking-[0.22em] uppercase font-medium" style={{ color: "#aeaeb2" }}>
            Distribuidor Autorizado Apple
          </span>
        </motion.div>

        {/* Headline — una sola unidad, sin word-by-word */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold text-white"
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)",
            letterSpacing: "-0.035em",
            lineHeight: 1.03,
          }}
        >
          La mejor manera de comprar{" "}
          <span style={{ color: "#aeaeb2" }}>los productos que amás.</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ color: "rgba(255,255,255,0.38)" }}
          className="text-lg leading-relaxed max-w-md"
        >
          Garantía oficial. Envíos a todo el país. Soporte certificado.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link to="/catalogo">
            <button
              className="px-8 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/92 active:scale-[0.98] transition-all duration-200"
            >
              Ver catálogo
            </button>
          </Link>
          <Link to="/login">
            <button
              className="px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/[0.06]"
              style={{
                border: "1px solid rgba(174,174,178,0.2)",
                color: "rgba(174,174,178,0.7)",
              }}
            >
              Ingresar
            </button>
          </Link>
        </motion.div>

        {/* Indicador de scroll — línea de titanio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-center gap-2 pt-4"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(174,174,178,0.35)" }}>
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 origin-top"
            style={{ background: "linear-gradient(to bottom, #aeaeb2, transparent)" }}
          />
        </motion.div>
      </motion.div>

      {/* Sin fade inferior — la superficie continúa hacia Stats */}
    </section>
  );
};

export default Hero;
