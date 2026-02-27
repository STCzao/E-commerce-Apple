"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-hero.png)] bg-cover bg-center text-white flex items-center justify-center">
        <div className="flex flex-col gap-15 items-center text-white/90">
          <h1 className="text-5xl font-semibold text-center">
            {"La mejor manera de comprar los productos que amas"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="text-xl"
          >
            Sumérgete en el mundo Apple
          </motion.p>
          <Link to={"/catalogo"}>
            <motion.button
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
                delay: 0.8,
              }}
              className="bg-white/80 cursor-pointer flex items-center justify-center text-black border hover:border-slate-400/70 text-black/80 py-2 px-4 rounded-full"
            >
              Ver catálogo
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
