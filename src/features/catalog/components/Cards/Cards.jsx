import { motion } from "framer-motion";
import CardItem from "./CardItem";

const Cards = ({ busqueda, title, id }) => {
  if (!busqueda || busqueda.length === 0) return null;
  const [featured, ...rest] = busqueda;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-60px" }}
      className="mt-20 px-6 max-w-7xl mx-auto"
      id={id}
    >
      {title && (
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-5xl font-semibold text-gradient-dark">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-black/8 to-transparent" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        <div className="sm:col-span-2 sm:row-span-2">
          <CardItem card={featured} featured />
        </div>
        {rest.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            viewport={{ once: true }}
          >
            <CardItem card={card} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cards;
