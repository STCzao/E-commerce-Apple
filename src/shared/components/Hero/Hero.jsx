import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const HeroInner = ({ mobile }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 260], [1, 0]);
  const y = useTransform(scrollY, [0, 260], [0, -40]);

  return (
    <motion.div
      style={mobile ? undefined : { opacity, y }}
      className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 max-w-4xl mx-auto pt-28 pb-20 gap-8"
    >
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ color: "rgba(255,255,255,0.38)" }}
        className="text-lg leading-relaxed max-w-md"
      >
        Garantía oficial. Envíos a todo el país. Soporte certificado.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-3"
      >
        <Link to="/catalogo">
          <button className="px-8 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/92 active:scale-[0.98] transition-all duration-200">
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
    </motion.div>
  );
};

const Hero = () => {
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

  return (
    <section
      aria-label="Presentación principal"
      className="surface-metal relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    >
      <div className="edge-light absolute top-0 inset-x-0 h-px" aria-hidden="true" />

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

      <HeroInner mobile={isMobile} />
    </section>
  );
};

export default Hero;
