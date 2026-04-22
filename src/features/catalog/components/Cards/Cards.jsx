import { motion } from "framer-motion";
import CardItem from "./CardItem";

const Cards = ({ busqueda, title, id }) => {
  if (!busqueda || busqueda.length === 0) return null;

  return (
    <section
      id={id}
      aria-label={title}
      className="mt-16 max-w-7xl mx-auto px-4 md:px-8"
    >
      {title && (
        <div className="flex items-baseline gap-3 mb-6 px-1">
          <h2 className="text-3xl font-semibold text-gradient-dark">{title}</h2>
          <span className="text-sm text-[#6e6e73]">{busqueda.length} productos</span>
          <div className="flex-1 h-px bg-gradient-to-r from-black/[0.07] to-transparent" aria-hidden="true" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {busqueda.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.25) }}
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
