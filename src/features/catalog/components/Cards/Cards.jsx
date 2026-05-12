import { motion } from "framer-motion";
import CardItem from "./CardItem";

const Cards = ({ productos, title, id }) => {
  if (!productos?.length) return null;

  return (
    <section
      id={id}
      aria-label={title}
      className="relative mt-4 max-w-7xl mx-auto px-4 md:px-8"
    >
      {/* Glow cenital sobre el grid */}
      {title && (
        <div
          className="absolute -top-20 inset-x-0 h-48 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,0,0,0.02) 0%, transparent 100%)" }}
          aria-hidden="true"
        />
      )}

      {title && (
        <div className="relative flex items-baseline gap-3 mb-8 px-1">
          <h2
            className="font-semibold text-[#1d1d1f]"
            style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
          <span className="text-sm text-[#6e6e73]">{productos.length} productos</span>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.07), transparent)" }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {productos.map((card, i) => (
          <motion.div
            key={card._id ?? card.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: Math.min(i * 0.04, 0.22) }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <CardItem card={card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
