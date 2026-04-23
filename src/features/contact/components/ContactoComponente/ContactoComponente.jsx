import { motion } from "framer-motion";
import ContactoForm from "../ContactoForm/ContactoForm";
import PageHeader from "../../../../shared/components/PageHeader/PageHeader";

const ContactoComponente = () => (
  <div className="min-h-screen" style={{ background: "#000" }}>

    <PageHeader
      label="Soporte técnico"
      title="¿Necesitás ayuda?"
      subtitle="Nuestro equipo responde en menos de 24 horas hábiles."
      fadeColor="#000"
    />

    {/* Formulario como carta blanca sobre superficie oscura */}
    <div className="px-6 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-white rounded-2xl p-8 max-w-lg mx-auto"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.06)" }}
      >
        <ContactoForm />
      </motion.div>
    </div>

  </div>
);

export default ContactoComponente;
