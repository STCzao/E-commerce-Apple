import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../shared/components/Hero/Hero";
import Marquee from "../shared/components/Marquee/Marquee";
import ProductosDestacados from "../shared/components/ProductosDestacados/ProductosDestacados";
import FeatureGrid from "../shared/components/FeatureGrid/FeatureGrid";

/* ─────────────────────────────────────────────────────────────────────
   Una sola superficie oscura. Sin secciones con fondos alternados.
   Los productos y el contenido SON la fuente de luz en la página.
───────────────────────────────────────────────────────────────────── */

const stats = [
  { value: "5+",   label: "Años de experiencia" },
  { value: "100%", label: "Garantía oficial"     },
  { value: "24h",  label: "Soporte"              },
  { value: "ARG",  label: "Cobertura nacional"   },
];

const HomePage = () => (
  <div style={{ background: "#000" }}>

    <Hero />

    {/* Stats — continuación directa del Hero, misma superficie */}
    <section style={{ borderTop: "1px solid #1c1c1e" }}>
      {/* Regla de titanio */}
      <div className="rule-metal" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-8 py-0 grid grid-cols-2 md:grid-cols-4 divide-x" style={{ "--tw-divide-opacity": 1 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex flex-col items-center gap-1.5 py-10 overflow-hidden"
            style={{ borderRight: i < 3 ? "1px solid #1c1c1e" : "none" }}
          >
            {/* Número como textura tipográfica */}
            <span
              className="absolute font-semibold text-white pointer-events-none select-none"
              style={{
                fontSize: "clamp(72px, 12vw, 120px)",
                opacity: 0.045,
                letterSpacing: "-0.06em",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            >
              {s.value}
            </span>
            <span
              className="relative font-semibold text-white"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.03em" }}
            >
              {s.value}
            </span>
            <span className="relative text-xs font-medium text-center" style={{ color: "#6e6e73", letterSpacing: "0.04em" }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="rule-metal" aria-hidden="true" />
    </section>

    {/* Productos — cards blancos emergen de la superficie oscura */}
    <ProductosDestacados />

    <Marquee />
    <FeatureGrid />

    {/* CTA final */}
    <section
      className="px-6 py-28 flex flex-col items-center text-center gap-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-white/20 text-xs tracking-[0.3em] uppercase font-medium"
      >
        Distribuidor Autorizado Apple
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-white font-semibold max-w-lg"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
      >
        ¿Listo para elegir tu próximo Apple?
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Link to="/catalogo">
          <button className="px-9 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-200">
            Ver catálogo completo
          </button>
        </Link>
      </motion.div>
    </section>

  </div>
);

export default HomePage;
