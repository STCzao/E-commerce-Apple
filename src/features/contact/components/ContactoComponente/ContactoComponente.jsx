import { motion } from "framer-motion";
import ContactoForm from "../ContactoForm/ContactoForm";

const ContactoComponente = () => (
  <div className="bg-[#f5f5f7] min-h-screen">
    {/* Header oscuro con fade */}
    <div className="relative bg-[#111111] pt-32 pb-28 px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
      </div>
      <div className="absolute inset-0 dot-grid-dark opacity-[0.4]" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f5f5f7] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Soporte técnico</span>
        <h1 className="text-5xl md:text-6xl font-semibold text-gradient mt-3 mb-5 leading-tight">
          ¿Necesitás ayuda?
        </h1>
        <p className="text-white/35 text-lg">
          Nuestro equipo responde en menos de 24 horas hábiles.
        </p>
      </motion.div>
    </div>

    {/* Formulario */}
    <div className="px-6 pb-24 -mt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="bg-white rounded-2xl border border-black/[0.06] shadow-sm p-8 max-w-lg mx-auto"
      >
        <ContactoForm />
      </motion.div>
    </div>
  </div>
);

export default ContactoComponente;
