import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  import.meta.env.VITE_ASSET_HOME_1,
  import.meta.env.VITE_ASSET_HOME_2,
  import.meta.env.VITE_ASSET_HOME_3,
  import.meta.env.VITE_ASSET_HOME_4,
];
const heroImage = import.meta.env.VITE_ASSET_HOME_5;

const SelectImage = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#6e6e73] mb-4">Producto destacado</span>
        <span className="text-5xl font-semibold text-gradient-dark">iPhone 16 Pro</span>
        <span className="text-[#6e6e73] text-lg mt-3">Creado para Apple Intelligence.</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-black/[0.06] bg-[#f5f5f7] shadow-sm">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected}
              src={images[selected]}
              alt={`iPhone 16 Pro vista ${selected + 1}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {images.map((src, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                selected === i
                  ? "ring-1 ring-[#1d1d1f]/30 ring-offset-2 ring-offset-white scale-105 border-black/10"
                  : "opacity-40 hover:opacity-70 border-black/[0.06]"
              }`}
            >
              <img src={src} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      {heroImage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center w-full mt-20"
        >
          <span className="text-2xl font-semibold text-gradient-dark mb-8">Míralo más de cerca.</span>
          <div className="relative w-full rounded-2xl overflow-hidden border border-black/[0.06] shadow-sm">
            <img src={heroImage} alt="iPhone 16 Pro detalle" className="w-full" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SelectImage;
