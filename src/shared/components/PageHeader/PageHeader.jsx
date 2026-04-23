import { motion } from "framer-motion";

const PageHeader = ({
  label,
  title,
  subtitle,
  fadeColor = null,
  compact = false,
  children,
}) => (
  <header className="surface-metal relative overflow-hidden">

    {/* Arista de luz superior */}
    <div className="edge-light absolute top-0 inset-x-0 h-px" aria-hidden="true" />

    {/* Fade a la sección siguiente (opcional) */}
    {fadeColor && fadeColor !== "#000" && (
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }}
        aria-hidden="true"
      />
    )}

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-10 max-w-3xl mx-auto text-center px-6 ${compact ? "pt-28 pb-16" : "pt-36 pb-24"}`}
    >
      {label && (
        <p className="text-xs font-medium tracking-[0.28em] uppercase mb-5" style={{ color: "#6e6e73" }}>
          {label}
        </p>
      )}

      <h1
        className="font-semibold text-white"
        style={{
          fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.06,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-lg mt-5 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
          {subtitle}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </motion.div>

    {/* Regla inferior metálica */}
    <div className="rule-metal mx-auto" style={{ maxWidth: "80%", opacity: 0.5 }} aria-hidden="true" />
  </header>
);

export default PageHeader;
