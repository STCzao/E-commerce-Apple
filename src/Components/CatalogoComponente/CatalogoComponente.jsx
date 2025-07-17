import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards"; // Asegúrate de que la ruta sea correcta si cambias el nombre del archivo de Cards.jsx
import { motion } from "framer-motion";
import NavbarCat from "../NavbarCat/NavbarCat";
import {
  iPadsCatalogo,
  iPhonesCatalogo,
  MacsCatalogo,
  WatchsCatalogo,
} from "../../../api"; // Asegúrate de que la ruta sea correcta
import { useState, useMemo } from "react";

const CatalogoComponente = () => {
  const [buscarName, setBuscarName] = useState("");

  const data = useMemo(
    () => [
      ...iPhonesCatalogo,
      ...iPadsCatalogo,
      ...MacsCatalogo,
      ...WatchsCatalogo,
    ],
    []
  );

  const busqueda = useMemo(
    () =>
      data.filter((item) =>
        item.name.toLowerCase().includes(buscarName.toLowerCase())
      ),
    [buscarName, data]
  );

  return (
    <div>
      <NavbarCat setBuscarName={setBuscarName} buscarName={buscarName} />
      <div
        id="Inicio"
        className="min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-catalogo.png)] bg-cover bg-center text-white flex flex-col items-center justify-center"
      >
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
            Todos nuestros dispositivos al alcance de tu mano
          </motion.span>

          <motion.span
            className="text-center text-xl m-5"
            initial={{ opacity: 0.0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            Somos los únicos distribuidores autorizados por Apple en Argentina,
            ofreciendo productos genuinos con garantía oficial y soporte técnico
            certificado en todo el país
          </motion.span>
        </motion.div>
      </div>

      {buscarName ? (
        <div className="text-center mt-20 mb-25">
          <div className="text-5xl">Resultados para: "{buscarName}"</div>
          <Cards busqueda={busqueda} />
        </div>
      ) : (
        <>
          <Cards busqueda={iPhonesCatalogo} title="iPhones" id="iPhone" />
          <Cards busqueda={iPadsCatalogo} title="iPads" id="iPad" />
          <Cards busqueda={MacsCatalogo} title="Macs" id="Mac" />
          <Cards busqueda={WatchsCatalogo} title="Apple Watchs" id="Watch" />
        </>
      )}
      <Footer />
    </div>
  );
};

export default CatalogoComponente;
