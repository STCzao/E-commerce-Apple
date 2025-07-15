import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";
import { motion } from "framer-motion";

const CatalogoComponente = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("Categorías");

  const categorias = [
    { name: "iPhones", to: "/iPhone" },
    { name: "iPads", to: "/iPad" },
    { name: "Macs", to: "/Mac" },
    { name: "Apple Watchs", to: "/Watch" },
  ];

  const handleSelect = (categoria) => {
    setSelected(categoria.name);
    setIsOpen(false);
    const targetId = categoria.to.slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-catalogo.png)] bg-cover bg-center text-white flex flex-col items-center justify-center">
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
          <motion.span className="xl:mt-5 sm:mt-30 flex text-center text-5xl font-semibold mb-15">
            Todos nuestro dispositivos al alcance de tu mano
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
            <div className="flex flex-col w-44 text-sm text-white relative mt-6">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-2 border rounded bg-transparent border-white shadow-sm focus:outline-none"
              >
                <span>{selected}</span>
                <svg
                  className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className="w-full border border-white rounded shadow-md mt-1 py-2 z-10 absolute top-full">
                  {categorias.map((categoria) => (
                    <li
                      key={categoria.name}
                      className="px-4 py-2 hover:bg-white/20 hover:text-white cursor-pointer"
                      onClick={() => handleSelect(categoria)}
                    >
                      {categoria.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.span>
        </motion.div>
      </div>

      <Cards />
      <Footer />
    </div>
  );
};

export default CatalogoComponente;
