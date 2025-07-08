import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-hero.png)] bg-cover bg-center text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center text-white/90"
        >
          <motion.span className="text-5xl font-semibold mb-15">
            La mejor manera de comprar los productos que amas.
          </motion.span>
          <motion.span
            className="text-xl"
            initial={{ opacity: 0.0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            Sumérgete en el mundo Apple
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
