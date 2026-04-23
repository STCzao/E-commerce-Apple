import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const features = [
  {
    num: "01",
    title: "Garantía oficial Apple",
    desc: "Todos los productos incluyen garantía de fábrica y acceso al soporte técnico certificado en todo el país.",
  },
  {
    num: "02",
    title: "Stock en tiempo real",
    desc: "El inventario se actualiza al instante. Si está disponible en la web, está disponible para vos.",
  },
  {
    num: "03",
    title: "Envíos a todo el país",
    desc: "Despacho en 24–48 h hábiles con seguimiento en tiempo real a cualquier punto de Argentina.",
  },
  {
    num: "04",
    title: "Hasta 18 cuotas sin interés",
    desc: "Financiación con todos los bancos y billeteras digitales del país.",
  },
  {
    num: "05",
    title: "Asesoría personalizada",
    desc: "Expertos disponibles por WhatsApp para ayudarte a elegir el producto ideal para tu caso.",
  },
  {
    num: "06",
    title: "5 años de confianza",
    desc: "Miles de clientes en todo el país respaldan nuestra trayectoria como distribuidores autorizados.",
  },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3M13 3H6M13 3v7" />
  </svg>
);

const FeatureRow = ({ f, i }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
    >
      <button
        className="group w-full flex items-start gap-5 py-5 text-left transition-colors duration-200"
        style={{ borderBottom: "1px solid #1c1c1e" }}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {/* Número */}
        <span
          className="text-xs font-mono pt-0.5 w-7 shrink-0 transition-colors duration-200"
          style={{ color: open ? "#aeaeb2" : "#3a3a3c" }}
        >
          {f.num}
        </span>

        {/* Título + descripción (mobile: expandible; desktop: siempre visible) */}
        <div className="flex-1 min-w-0">
          <span
            className="block text-[15px] font-medium transition-colors duration-200"
            style={{ color: open ? "#ffffff" : "rgba(255,255,255,0.65)", letterSpacing: "-0.01em" }}
          >
            {f.title}
          </span>

          {/* Descripción mobile: expandible */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="text-sm leading-relaxed overflow-hidden md:hidden"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                {f.desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Descripción desktop: siempre visible, reveal en hover */}
        <p
          className="hidden md:block text-sm leading-relaxed max-w-xs transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {f.desc}
        </p>

        {/* Flecha */}
        <span
          className="transition-colors duration-200 mt-0.5"
          style={{ color: open ? "#aeaeb2" : "rgba(255,255,255,0.18)" }}
        >
          <ArrowIcon />
        </span>
      </button>
    </motion.li>
  );
};

const FeatureGrid = () => (
  <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-28" style={{ borderTop: "1px solid #1c1c1e" }}>
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-14 flex flex-col md:flex-row md:items-end gap-4 md:gap-16"
      >
        <div className="shrink-0">
          <p className="text-xs font-medium tracking-[0.28em] uppercase mb-4" style={{ color: "#6e6e73" }}>
            Por qué elegirnos
          </p>
          <h2
            className="font-semibold text-white"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Todo lo que
            <br />
            <span style={{ color: "#aeaeb2" }}>necesitás.</span>
          </h2>
        </div>

        {/* Regla de titanio horizontal */}
        <div className="flex-1 rule-metal hidden md:block" />
      </motion.div>

      {/* Lista editorial */}
      <ul style={{ borderTop: "1px solid #1c1c1e" }}>
        {features.map((f, i) => (
          <FeatureRow key={f.num} f={f} i={i} />
        ))}
      </ul>

    </div>
  </section>
);

export default FeatureGrid;
