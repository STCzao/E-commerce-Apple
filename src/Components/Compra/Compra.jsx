import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Compra = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-compra.png)] bg-cover bg-center text-white flex items-center justify-center">
        <div className="flex flex-col items-center text-white/90">
          <h1 className="text-5xl font-semibold mb-15 text-center">
            {"Estás muy cerca de pertenecer a la familia Apple"
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
            Contáctate con nuestro equipo de ventas:
            <div className="flex items-center justify-between">
              <button className="mt-10 bg-white/10 text-white/80 border hover:border-slate-400/70 rounded-full px-6 py-2 text-sm sm:text-base">
                <Link to={"/"}>Volver al inicio</Link>
              </button>
              <button className="mt-10 bg-white/10 text-white/80 border hover:border-slate-400/70 rounded-full px-6 py-2 text-sm sm:text-base">
                <Link to={"/catalogo"}>Volver al catálogo</Link>
              </button>
            </div>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Compra;
