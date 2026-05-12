import { motion } from "framer-motion";
import ContactoForm from "../ContactoForm/ContactoForm";
import PageHeader from "../../../../shared/components/PageHeader/PageHeader";

const SupportIcon = ({ children }) => (
  <div
    className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shrink-0 mt-0.5"
    style={{ border: "1px solid rgba(0,0,0,0.07)" }}
  >
    {children}
  </div>
);

const ContactoComponente = () => (
  <div className="min-h-screen" style={{ background: "#f5f5f7" }}>
    <PageHeader
      compact
      label="Soporte técnico"
      title="¿Necesitás ayuda?"
      subtitle="Nuestro equipo responde en menos de 24 horas hábiles."
      fadeColor="#f5f5f7"
    />

    <div className="max-w-6xl mx-auto px-6 md:px-16 pt-8 pb-28">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-start">
        <div className="flex flex-col gap-8 pt-2">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-[#6e6e73] mb-4">Canales de atención</p>
          </div>

          <div className="rule-metal-light" />

          <ul className="flex flex-col gap-5">
            <li className="flex items-start gap-3">
              <SupportIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-[#1d1d1f]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.5a5 5 0 1110 0v1.25a1.75 1.75 0 001.75 1.75v.25A2.25 2.25 0 0116.5 16H15a1 1 0 00-1 1v1a2 2 0 11-4 0" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 13.5A1.5 1.5 0 015 12v-1.5A1.5 1.5 0 016.5 9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 9a1.5 1.5 0 011.5 1.5V12a1.5 1.5 0 01-1.5 1.5" />
                </svg>
              </SupportIcon>
              <div>
                <p className="text-sm font-medium text-[#1d1d1f]">WhatsApp</p>
                <p className="text-xs text-[#6e6e73] mt-0.5">Respuesta en menos de 1 hora</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <SupportIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-[#1d1d1f]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </SupportIcon>
              <div>
                <p className="text-sm font-medium text-[#1d1d1f]">Horario</p>
                <p className="text-xs text-[#6e6e73] mt-0.5">Atención de lunes a sábado</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <SupportIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 text-[#1d1d1f]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.5-2.9 7.6-7 9-4.1-1.4-7-4.5-7-9V7l7-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                </svg>
              </SupportIcon>
              <div>
                <p className="text-sm font-medium text-[#1d1d1f]">Soporte certificado</p>
                <p className="text-xs text-[#6e6e73] mt-0.5">Asistencia oficial para productos Apple</p>
              </div>
            </li>
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl p-8"
          style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
        >
          <ContactoForm />
        </motion.div>
      </div>
    </div>
  </div>
);

export default ContactoComponente;
