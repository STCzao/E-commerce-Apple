import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../shared/components/Hero/Hero";
import Marquee from "../shared/components/Marquee/Marquee";
import ProductosDestacados from "../shared/components/ProductosDestacados/ProductosDestacados";
import FeatureGrid from "../shared/components/FeatureGrid/FeatureGrid";
import SelectImagen from "../shared/components/SelectImagen/SelectImagen";
import { useReducedMotion } from "../shared/hooks/useReducedMotion";

const stats = [
  { value: "5+", label: "A\u00f1os de experiencia" },
  { value: "100%", label: "Garant\u00eda oficial" },
  { value: "24h", label: "Soporte" },
  { value: "ARG", label: "Cobertura nacional" },
];

const HomePage = () => {
  const reduced = useReducedMotion();

  return (
  <div>
    <Hero />

    <div className="fade-dark-to-light" style={{ height: "120px" }} aria-hidden="true" />

    <section style={{ background: "#f5f5f7" }}>
      <div className="rule-metal-light" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-8 py-0 grid grid-cols-2 md:grid-cols-4 divide-x" style={{ "--tw-divide-opacity": 1 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex flex-col items-center gap-1.5 py-10 overflow-hidden"
            style={{ borderRight: i < 3 ? "1px solid rgba(0,0,0,0.07)" : "none" }}
          >
            <span
              className="absolute font-semibold text-[#1d1d1f] pointer-events-none select-none"
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
              className="relative font-semibold text-[#1d1d1f]"
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
      <div className="rule-metal-light" aria-hidden="true" />
    </section>

    <ProductosDestacados />
    <Marquee />
    <FeatureGrid />

    <div style={{ background: "#f5f5f7" }}>
      <SelectImagen />
    </div>

    <section
      className="px-6 py-28 flex flex-col items-center text-center gap-6"
      style={{ background: "#f5f5f7", borderTop: "1px solid rgba(0,0,0,0.06)" }}
    >
      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={{ once: true }}
        className="text-[#6e6e73] text-xs tracking-[0.3em] uppercase font-medium"
      >
        Distribuidor Autorizado Apple
      </motion.p>
      <motion.h2
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-[#1d1d1f] font-semibold max-w-lg"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
      >
        {"\u00bfListo para elegir tu pr\u00f3ximo Apple?"}
      </motion.h2>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Link to="/catalogo">
          <button className="px-9 py-3.5 rounded-full text-sm font-semibold bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85 active:scale-[0.98] transition-all duration-200">
            {"Ver cat\u00e1logo completo"}
          </button>
        </Link>
      </motion.div>
    </section>
  </div>
  );
};

export default HomePage;
