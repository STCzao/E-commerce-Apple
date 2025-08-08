import React, { useState, useEffect } from "react";
import Logo from "../../assets/apple-icon1.png"; // Asegúrate de que la ruta sea correcta

const NavbarCat = ({ buscarName, setBuscarName }) => {
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
  ];

  const categorias = [
    { name: "Volver al principio", to: "/Inicio" },
    { name: "iPhones", to: "/iPhone" },
    { name: "iPads", to: "/iPad" },
    { name: "Macs", to: "/Mac" },
    { name: "Apple Watchs", to: "/Watch" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Categorías");

  const handleSelect = (categoria) => {
    setSelected(categoria.name);
    setIsOpen(false);
    const targetId = categoria.to.slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    {
      /* Si la ventana tiene un scroll mayor a los 10px, 
      setisScrolled cambia su valor */
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  {
    /* Seteamos y removemos un evento de window */
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-10 py-2 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/50 shadow-md text-black backdrop-blur-lg py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <a href="/" className="flex items-center gap-2">
        <img
          src={Logo}
          alt="logo"
          className={`h-9 transition-all duration-300 ${
            isScrolled ? "invert-0" : "invert"
          }`}
        />
      </a>

      <div className="hidden lg:flex items-center gap-4 xl:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isScrolled ? "text-black border-black" : "text-white border-white"
            } w-full text-left px-4 pr-2 py-2 border rounded bg-transparent shadow-sm focus:outline-none flex items-center justify-between`}
          >
            <span>{selected}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            <ul
              className={`absolute mt-5 w-43 ${
                isScrolled
                  ? "text-black border-black bg-white/50"
                  : "text-white border-white"
              } border rounded py-2`}
            >
              {categorias.map((categoria) => (
                <li
                  key={categoria.name}
                  className={`px-4 py-2 hover:bg-black/10 cursor-pointer ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                  onClick={() => handleSelect(categoria)}
                >
                  {categoria.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={`flex items-center border pl-4 gap-2 h-[46px] rounded-full overflow-hidden ${
            isScrolled ? "border-black" : "border-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 30 30"
            fill={isScrolled ? "#000000" : "#ffffff"}
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            value={buscarName}
            onChange={(e) => setBuscarName(e.target.value)}
            className={`w-25 h-full outline-none bg-transparent text-sm ${
              isScrolled
                ? "placeholder-black/70 text-black"
                : "placeholder-white/70 text-white"
            }`}
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <button
          className={`${
            isScrolled ? "bg-black text-white" : "bg-white text-black"
          } px-8 py-2.5 rounded-full ml-4 transition-all duration-500`}
        >
          Iniciar Sesión
        </button>
      </div>

      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 ${isScrolled ? "text-gray-700" : "text-white"}`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 p-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}

        <div className="relative text-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl flex items-center gap-2"
          >
            {selected}
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            <ul className="mt-2 w-45">
              {categorias.map((categoria) => (
                <li
                  key={categoria.name}
                  className="px-4 py-2 hover:bg-black/10 cursor-pointer"
                  onClick={() => handleSelect(categoria)}
                >
                  {categoria.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center border border-black pl-4 gap-2 h-[46px] rounded-full overflow-hidden ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="#000000"
          >
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input
            type="text"
            placeholder="Buscar"
            value={buscarName}
            onChange={(e) => setBuscarName(e.target.value)}
            className="w-25 h-full outline-none bg-transparent text-gray-800 placeholder-black/70 text-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarCat;
