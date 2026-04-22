import { motion } from "framer-motion";
import ContactoForm from "../ContactoForm/ContactoForm";

const ContactoComponente = () => (
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
          Soporte técnico
          <span className="w-1 h-1 rounded-full bg-white/50" aria-hidden="true" />
        </span>
        <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-5">
          ¿Necesitás ayuda?
        </h1>
        <p className="text-white/60 text-lg leading-relaxed">
          Nuestro equipo responde en menos de 24 horas hábiles.
        </p>
      </motion.div>
    </header>

    {/* Formulario */}
    <div className="px-6 pb-24 -mt-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8 max-w-lg mx-auto"
      >
        <ContactoForm />
      </motion.div>
    </div>
  </div>
);

export default ContactoComponente;
