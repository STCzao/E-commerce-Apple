import { motion } from "framer-motion";

const PageHeader = ({
  label,
  title,
  subtitle,
  fadeColor = null,
  compact = false,
  children,
}) => (
  <header className="relative overflow-hidden" style={{ background: "#f5f5f7" }}>
    {fadeColor && fadeColor !== "#f5f5f7" && (
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
        className="font-semibold text-[#1d1d1f]"
        style={{
          fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.06,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p className="text-lg mt-5 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
          {subtitle}
        </p>
      )}

      {children && <div className="mt-8">{children}</div>}
    </motion.div>

    <div className="rule-metal-light mx-auto" style={{ maxWidth: "80%", opacity: 0.5 }} aria-hidden="true" />
  </header>
);

export default PageHeader;
