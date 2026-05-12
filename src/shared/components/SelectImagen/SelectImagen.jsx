import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clOptimize } from "../../utils/cloudinary";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SelectImage = () => {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
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

  const imgWidth = isMobile ? 700 : 1200;
  const heroWidth = isMobile ? 800 : 1400;

  const images = useMemo(
    () => [
      clOptimize(import.meta.env.VITE_ASSET_HOME_1, { width: imgWidth }),
      clOptimize(import.meta.env.VITE_ASSET_HOME_2, { width: imgWidth }),
      clOptimize(import.meta.env.VITE_ASSET_HOME_3, { width: imgWidth }),
      clOptimize(import.meta.env.VITE_ASSET_HOME_4, { width: imgWidth }),
    ],
    [imgWidth]
  );

  const heroImage = useMemo(
    () => clOptimize(import.meta.env.VITE_ASSET_HOME_5, { width: heroWidth }),
    [heroWidth]
  );

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-16">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#6e6e73] mb-4">Producto destacado</span>
        <span className="text-5xl font-semibold text-gradient-dark">iPhone 16 Pro</span>
        <span className="text-[#6e6e73] text-lg mt-3">Creado para Apple Intelligence.</span>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-4 w-full"
      >
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={selected}
              src={images[selected]}
              alt={`iPhone 16 Pro vista ${selected + 1}`}
              initial={reduced ? false : { opacity: 0, scale: 1.04 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
                selected === i
                  ? "ring-1 ring-[#1d1d1f]/30 ring-offset-2 ring-offset-white scale-105 border-black/10"
                  : "opacity-40 hover:opacity-70 border-black/[0.06]"
              }`}
            >
              <img src={src} alt="" loading="lazy" decoding="async" crossOrigin="anonymous" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </motion.div>

      {heroImage && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center w-full mt-20"
        >
          <span className="text-2xl font-semibold text-gradient-dark mb-8">Miralo más de cerca.</span>
          <div className="relative w-full rounded-2xl overflow-hidden border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <img src={heroImage} alt="iPhone 16 Pro detalle" loading="lazy" decoding="async" crossOrigin="anonymous" className="w-full" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SelectImage;
