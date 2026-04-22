import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import useCatalogStore from "../../../store/catalogStore";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const links = [
  { name: "Inicio", path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  { name: "Soporte", path: "/soporte" },
];

const categories = [
  { name: "iPhones", id: "iPhone" },
  { name: "iPads", id: "iPad" },
  { name: "Macs", id: "Mac" },
  { name: "Apple Watch", id: "Watch" },
];

const AppNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCatalog = location.pathname === "/catalogo";
  const isHome = location.pathname === "/";

  const { isAuthenticated, clearAuth } = useAuthStore();
  const { search, setSearch } = useCatalogStore();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Home: el hero es oscuro, la navbar arranca transparente con texto blanco.
     Al hacer scroll (sobre las secciones claras) pasa a vidrio blanco con texto oscuro.
     Otras páginas: siempre vidrio blanco con texto oscuro. */
  const isDark = isHome && !scrolled;

  const navBg = isDark
    ? "py-5"
    : "py-3 bg-white/85 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]";

  const linkActive = isDark ? "text-white" : "text-[#1d1d1f]";
  const linkMuted  = isDark ? "text-white/50 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]";
  const underlineActive = isDark ? "bg-white/50" : "bg-[#1d1d1f]/40";
  const underlineHover  = isDark ? "bg-white/40" : "bg-[#1d1d1f]/30";

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const handleSearch = (val) => {
    setSearch(val);
    if (!isCatalog && val) navigate("/catalogo");
  };

  const SearchBox = ({ mobile = false }) => (
    <div className={`flex items-center gap-2 ${
      mobile
        ? "border border-white/12 pl-3 h-10 rounded-full w-64 bg-white/[0.04]"
        : isDark
          ? "border border-white/15 pl-3 gap-2 h-9 rounded-full bg-white/[0.05] hover:border-white/25 focus-within:border-white/35"
          : "border border-black/10 pl-3 gap-2 h-9 rounded-full bg-black/[0.03] hover:border-black/18 focus-within:border-black/25"
    } transition-colors`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 30 30"
        fill={mobile || isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}>
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
      </svg>
      <input
        type="text"
        placeholder={mobile ? "Buscar" : "Buscar producto"}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className={`${mobile ? "flex-1" : "w-36"} h-full outline-none bg-transparent text-sm pr-3 ${
          mobile || isDark
            ? "text-white placeholder-white/22"
            : "text-[#1d1d1f] placeholder-[#6e6e73]/50"
        }`}
      />
    </div>
  );

  return (
    <>
      {/* Barra principal */}
      <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24 transition-all duration-500 ${navBg}`}>
        <Link to="/">
          <img src={Logo} alt="logo" className={`h-8 opacity-80 transition-all duration-500 ${isDark ? "invert" : ""}`} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <Link key={l.path} to={l.path}
              className={`group flex flex-col gap-0.5 text-sm transition-colors ${
                location.pathname === l.path ? linkActive : linkMuted
              }`}>
              {l.name}
              <div className={`h-px transition-all duration-300 ${
                location.pathname === l.path
                  ? `w-full ${underlineActive}`
                  : `w-0 group-hover:w-full ${underlineHover}`
              }`} />
            </Link>
          ))}

          <SearchBox />

          {isAuthenticated ? (
            <button onClick={clearAuth}
              className={`text-sm px-4 py-1.5 rounded-full border transition-all ${
                isDark
                  ? "border-white/12 text-white/45 hover:text-white hover:border-white/25"
                  : "border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/20"
              }`}>
              Salir
            </button>
          ) : (
            <Link to="/login">
              <button className={`text-sm px-5 py-2 rounded-full font-medium transition-colors ${
                isDark
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85"
              }`}>
                Ingresar
              </button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 transition-colors ${isDark ? "text-white/50 hover:text-white" : "text-[#1d1d1f]/40 hover:text-[#1d1d1f]"}`}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile panel — siempre oscuro */}
        <div className={`fixed inset-0 bg-[#080808]/97 backdrop-blur-2xl flex flex-col md:hidden items-center justify-center gap-7 transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
          <div className="absolute inset-0 dot-grid-dark opacity-10" />
          <button className="absolute top-5 right-6 p-2 text-white/30 hover:text-white" onClick={() => setOpen(false)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {links.map((l) => (
            <Link key={l.path} to={l.path} className="text-2xl text-white/60 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              {l.name}
            </Link>
          ))}

          {isCatalog && (
            <div className="flex flex-wrap justify-center gap-2 px-8">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => scrollTo(cat.id)}
                  className="text-sm text-white/40 border border-white/10 px-4 py-1.5 rounded-full hover:text-white hover:border-white/25 transition-all">
                  {cat.name}
                </button>
              ))}
            </div>
          )}

          <SearchBox mobile />

          {isAuthenticated ? (
            <button onClick={() => { clearAuth(); setOpen(false); }} className="text-white/30 text-lg">Salir</button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="bg-white text-black px-10 py-3 rounded-full text-lg font-medium">Ingresar</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Sub-barra de categorías — solo en catálogo */}
      {isCatalog && (
        <div className={`fixed z-40 inset-x-0 flex justify-center gap-1 px-8 py-2 transition-all duration-500 bg-white/80 backdrop-blur-xl border-b border-black/[0.04] ${
          scrolled ? "top-[52px]" : "top-[68px]"
        }`}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => scrollTo(cat.id)}
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] px-3 py-1.5 rounded-full hover:bg-black/[0.04] transition-all">
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AppNavbar;
