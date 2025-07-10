import React from "react";
import Logo from "../../assets/apple-icon1.png";

const Footer = () => {
  return (
    <div>
      <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
          <div className="md:max-w-96">
            <img className="w-36 h-auto" src={Logo} alt="logo" />
            <p className="mt-6 text-sm">
              Inspirate. Descubrí. Comprá con confianza. Tecnología de
              vanguardia, atención personalizada. Distribuidor autorizado de
              productos Apple.
            </p>
          </div>
        </div>
        <p className="pt-4 text-center text-sm pb-5">
          © 2025 STCzao. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
