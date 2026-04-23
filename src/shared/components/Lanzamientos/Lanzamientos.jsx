import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const items = [
  { title: "iPhone 16", sub: "La cámara que piensa.", image: import.meta.env.VITE_ASSET_LANZAMIENTO_1 },
  { title: "iPhone 16 Pro Max", sub: "Titanio. El más potente.", image: import.meta.env.VITE_ASSET_LANZAMIENTO_2 },
  { title: "iPhone 16e", sub: "Lo esencial, redefinido.", image: import.meta.env.VITE_ASSET_LANZAMIENTO_3 },
  { title: "iPhone 15", sub: "Potencia a tu alcance.", image: import.meta.env.VITE_ASSET_LANZAMIENTO_4 },
];

const Card = ({ item, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    viewport={{ once: true }}
    className={`relative overflow-hidden rounded-2xl border border-white/[0.07] group cursor-pointer ${className}`}
  >
    <img
      src={item.image}
      alt={item.title}
      loading="lazy"
      decoding="async"
      crossOrigin="anonymous"
      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/0 group-hover:via-white/20 to-transparent transition-all duration-500" />

    <div className="absolute bottom-0 inset-x-0 p-5">
      <p className="text-white/90 font-semibold text-base leading-tight">{item.title}</p>
      <p className="text-white/38 text-sm mt-0.5">{item.sub}</p>
      <div className="mt-3 h-px w-0 group-hover:w-10 bg-white/40 transition-all duration-500" />
    </div>
  </motion.div>
);

const Lanzamientos = () => (
  <section className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-8xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="flex items-baseline gap-4 mb-7"
    >
      <h2 className="text-4xl font-semibold text-gradient">Lo último en Apple</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      <Link to="/catalogo">
        <span className="text-sm text-white/28 hover:text-white/60 transition-colors cursor-pointer">Ver todo →</span>
      </Link>
    </motion.div>

    {/* Desktop: flex con altura fija */}
    <div className="hidden md:flex gap-3 h-[500px]">
      <Card item={items[0]} className="flex-[1.2]" delay={0} />
      <div className="flex-1 flex flex-col gap-3">
        <Card item={items[1]} className="flex-1" delay={0.08} />
        <Card item={items[2]} className="flex-1" delay={0.14} />
      </div>
      <Card item={items[3]} className="flex-[1.2]" delay={0.2} />
    </div>

    {/* Mobile: 2×2 */}
    <div className="md:hidden grid grid-cols-2 gap-3">
      {items.map((item, i) => (
        <Card key={i} item={item} className="h-56" delay={i * 0.07} />
      ))}
    </div>
  </section>
);

export default Lanzamientos;
