import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../shared/components/Hero/Hero";
import SelectImagen from "../shared/components/SelectImagen/SelectImagen";

const stats = [
  { value: "23", label: "Productos" },
  { value: "5+", label: "Años de experiencia" },
  { value: "100%", label: "Garantía oficial" },
  { value: "ARG", label: "Cobertura nacional" },
];

const HomePage = () => (
  <div className="bg-[#f5f5f7]">
    <Hero />

    {/* Stats */}
    <div className="bg-white border-b border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-semibold text-[#1d1d1f]">{s.value}</span>
            <span className="text-xs text-[#6e6e73] tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#6e6e73]">Acceso exclusivo</span>
        <h3 className="text-4xl md:text-5xl font-semibold text-gradient-dark leading-tight">
          Unite a la familia Apple
        </h3>
        <p className="text-[#6e6e73] text-lg max-w-sm">
          Guardá tus favoritos y accedé a novedades antes que nadie.
        </p>
        <div className="flex gap-3 mt-2 flex-wrap justify-center">
          <Link to="/register">
            <button className="px-8 py-3 rounded-full font-medium bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85 transition-colors text-sm">
              Crear cuenta
            </button>
          </Link>
          <Link to="/login">
            <button className="px-8 py-3 rounded-full text-sm border border-black/10 text-[#6e6e73] bg-white hover:bg-black/[0.03] hover:border-black/15 transition-all">
              Iniciar sesión
            </button>
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Galería */}
    <div className="bg-white pb-20">
      <SelectImagen />
    </div>
  </div>
);

export default HomePage;
