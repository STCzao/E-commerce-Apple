import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const NavbarCat = ({ buscarName, setBuscarName }) => {
  const links = [{ name: "Inicio", path: "/" }, { name: "Soporte", path: "/soporte" }];
  const cats = [
    { name: "Volver al principio", to: "/Inicio" },
    { name: "iPhones", to: "/iPhone" },
    { name: "iPads", to: "/iPad" },
    { name: "Macs", to: "/Mac" },
    { name: "Apple Watchs", to: "/Watch" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [selected, setSelected] = useState("Categorías");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pick = (cat) => {
    setSelected(cat.name); setDropOpen(false); setMenuOpen(false);
    document.getElementById(cat.to.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24 transition-all duration-500 ${
      scrolled ? "py-3 bg-black/55 backdrop-blur-xl border-b border-white/[0.05]" : "py-5"
    }`}>
      <Link to="/"><img src={Logo} alt="logo" className="h-8 invert opacity-80" /></Link>

      <div className="hidden lg:flex items-center gap-6">
        {links.map((l, i) => (
          <Link key={i} to={l.path} className="group flex flex-col gap-0.5 text-sm text-white/50 hover:text-white transition-colors">
            {l.name}
            <div className="h-px w-0 group-hover:w-full bg-white/50 transition-all duration-300" />
          </Link>
        ))}

        <div className="relative">
          <button onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white border border-white/12 px-4 py-2 rounded-lg hover:border-white/22 bg-white/[0.03] backdrop-blur-sm transition-all">
            {selected}
            <svg className={`w-4 h-4 transition-transform ${dropOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropOpen && (
            <ul className="absolute top-full mt-2 w-48 bg-[#0e0e10]/95 backdrop-blur-xl border border-white/[0.07] rounded-xl py-1 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {cats.map(cat => (
                <li key={cat.name} onClick={() => pick(cat)}
                  className="px-4 py-2.5 text-sm text-white/45 hover:text-white hover:bg-white/[0.05] cursor-pointer transition-colors">
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center border border-white/12 pl-4 gap-2 h-10 rounded-full bg-white/[0.03] backdrop-blur-sm hover:border-white/22 transition-colors focus-within:border-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 30 30" fill="rgba(255,255,255,0.25)">
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input type="text" placeholder="Buscar" value={buscarName} onChange={e => setBuscarName(e.target.value)}
            className="w-28 h-full outline-none bg-transparent text-sm text-white placeholder-white/20 pr-4" />
        </div>
      </div>

      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white/50 hover:text-white">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      <div className={`fixed inset-0 bg-[#080808]/97 backdrop-blur-2xl flex flex-col md:hidden items-center justify-center gap-7 transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 dot-grid opacity-15" />
        <button className="absolute top-6 right-6 p-2 text-white/30 hover:text-white" onClick={() => setMenuOpen(false)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {links.map((l, i) => (
          <Link key={i} to={l.path} className="text-xl text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>{l.name}</Link>
        ))}
        <div className="flex items-center border border-white/12 pl-4 gap-2 h-11 rounded-full w-64 bg-white/[0.03]">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 30 30" fill="rgba(255,255,255,0.25)">
            <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
          </svg>
          <input type="text" placeholder="Buscar" value={buscarName} onChange={e => setBuscarName(e.target.value)}
            className="flex-1 h-full outline-none bg-transparent text-sm text-white placeholder-white/20 pr-4" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarCat;
