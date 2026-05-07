import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import useCatalogStore from "../../../store/catalogStore";
import useConfirmStore from "../../../store/confirmStore";
import useToastStore from "../../../store/toastStore";
import useAuth from "../../../features/auth/hooks/useAuth";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const WA_LINKS = [
  { name: "Inicio",    path: "/" },
  { name: "Catálogo", path: "/catalogo" },
  { name: "Soporte",  path: "/soporte" },
];

const NAV_ICONS = {
  "/": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
    </svg>
  ),
  "/catalogo": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  "/soporte": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const CATEGORIES = [
  { name: "iPhones",    id: "iPhone" },
  { name: "iPads",      id: "iPad" },
  { name: "Macs",       id: "Mac" },
  { name: "Apple Watch",id: "Watch" },
];

const SearchSVG = ({ fill = "rgba(0,0,0,0.3)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 30 30" fill={fill} aria-hidden="true">
    <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
  </svg>
);

const UserMenu = ({ user, isDark }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const confirm    = useConfirmStore((s) => s.confirm);
  const addToast   = useToastStore((s) => s.addToast);
  const { logout } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    confirm({
      title: "Cerrar sesión",
      message: "¿Querés cerrar tu sesión?",
      confirmLabel: "Salir",
      danger: true,
      onConfirm: async () => {
        await logout();
        addToast("Sesión cerrada", "info");
        navigate("/");
      },
    });
  };

  const initial = user?.nombreUsuario?.[0]?.toUpperCase() ?? "U";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú de usuario"
        aria-expanded={open}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-sm ${
          isDark
            ? "border-white/20 text-white/80 hover:border-white/35 hover:bg-white/[0.06]"
            : "border-black/10 text-[#1d1d1f] hover:border-black/20 hover:bg-black/[0.03]"
        }`}
      >
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold overflow-hidden ${
          isDark ? "bg-white/20" : "bg-black/[0.08]"
        }`}>
          {user?.img
            ? <img src={user.img} alt="" className="w-full h-full object-cover" />
            : initial}
        </div>
        <span className="max-w-[90px] truncate">{user?.nombreUsuario ?? "Perfil"}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-1.5 z-10">
          <Link
            to="/perfil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 text-[#6e6e73]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            Mi perfil
          </Link>
          <div className="h-px bg-black/[0.05] my-1" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

const AppNavbar = () => {
  const location   = useLocation();
  const navigate   = useNavigate();
  const isCatalog  = location.pathname === "/catalogo";
  const isHome     = location.pathname === "/";

  const { isAuthenticated, user } = useAuthStore();
  const { search, setSearch }     = useCatalogStore();

  const [scrolled, setScrolled]     = useState(false);
  const [inputValue, setInputValue] = useState(search);
  const desktopRef = useRef(null);
  const mobileRef  = useRef(null);

  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  // Páginas que arrancan con sección oscura (header negro o full-dark)
  const DARK_TOP_ROUTES = ["/"];
  const isDark = DARK_TOP_ROUTES.includes(location.pathname) && !scrolled;

  const navBg      = isDark ? "py-5" : "py-3 bg-white/95 md:bg-white/85 md:backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]";
  const linkActive = isDark ? "text-white"  : "text-[#1d1d1f]";
  const linkMuted  = isDark ? "text-white/55 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]";
  const ulActive   = isDark ? "bg-white/50"  : "bg-[#1d1d1f]/40";
  const ulHover    = isDark ? "bg-white/40"  : "bg-[#1d1d1f]/30";

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleChange = useCallback((val) => setInputValue(val), []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!isCatalog) navigate("/catalogo");
  };

  return (
    <>
      {/* ── Barra superior ─────────────────────────────────────────── */}
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-16 lg:px-24 transition-all duration-500 ${navBg}`}
      >
        <Link to="/" className="shrink-0">
          <img
            src={Logo}
            alt="Apple Store — inicio"
            crossOrigin="anonymous"
            className={`h-7 md:h-8 opacity-80 transition-all duration-500 ${isDark ? "invert" : ""}`}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {WA_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              aria-current={location.pathname === l.path ? "page" : undefined}
              className={`group flex flex-col gap-0.5 text-sm transition-colors ${
                location.pathname === l.path ? linkActive : linkMuted
              }`}
            >
              {l.name}
              <div
                aria-hidden="true"
                className={`h-px transition-all duration-300 ${
                  location.pathname === l.path ? `w-full ${ulActive}` : `w-0 group-hover:w-full ${ulHover}`
                }`}
              />
            </Link>
          ))}

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            role="search"
            className={`flex items-center gap-2 transition-colors ${
              isDark
                ? "border border-white/15 pl-3 h-9 rounded-full bg-white/[0.05] hover:border-white/25 focus-within:border-white/35"
                : "border border-black/10 pl-3 h-9 rounded-full bg-black/[0.03] hover:border-black/18 focus-within:border-black/25"
            }`}
          >
            <button type="submit" aria-label="Buscar" className="shrink-0 flex items-center">
              <SearchSVG fill={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)"} />
            </button>
            <input
              ref={desktopRef}
              type="search"
              aria-label="Buscar producto"
              placeholder="Buscar producto"
              value={inputValue}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-36 h-full outline-none bg-transparent text-sm pr-3 ${
                isDark ? "text-white placeholder-white/30" : "text-[#1d1d1f] placeholder-[#6e6e73]/50"
              }`}
            />
          </form>

          {/* Auth */}
          {isAuthenticated ? (
            <UserMenu user={user} isDark={isDark} />
          ) : (
            <Link to="/login">
              <button className={`text-sm px-5 py-2 rounded-full font-medium transition-colors ${
                isDark ? "bg-white text-black hover:bg-white/90" : "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85"
              }`}>
                Ingresar
              </button>
            </Link>
          )}
        </div>

        {/* Mobile: búsqueda prominente en el top */}
        <form
          onSubmit={handleSubmit}
          role="search"
          className={`flex md:hidden flex-1 mx-3 items-center gap-2 h-9 pl-3 rounded-full transition-colors ${
            isDark
              ? "border border-white/15 bg-white/[0.05] hover:border-white/25 focus-within:border-white/35"
              : "border border-black/10 bg-black/[0.04] hover:border-black/18 focus-within:border-black/25"
          }`}
        >
          <button type="submit" aria-label="Buscar" className="shrink-0 flex items-center">
            <SearchSVG fill={isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"} />
          </button>
          <input
            ref={mobileRef}
            type="search"
            aria-label="Buscar producto"
            placeholder="Buscar..."
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            className={`flex-1 h-full outline-none bg-transparent text-sm pr-3 ${
              isDark ? "text-white placeholder-white/30" : "text-[#1d1d1f] placeholder-[#6e6e73]/55"
            }`}
          />
        </form>
      </nav>

      {/* ── Bottom nav móvil ──────────────────────────────────────── */}
      <nav
        aria-label="Navegación móvil"
        className={`fixed bottom-0 inset-x-0 z-50 md:hidden transition-all duration-500 ${
          scrolled
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-3 mb-3 relative rounded-2xl bg-white md:bg-white/88 md:backdrop-blur-2xl border border-black/[0.07] shadow-[0_-2px_20px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" aria-hidden="true" />
          <div className="flex items-center justify-around px-1 py-2.5">
            {WA_LINKS.map((l) => {
              const isActive = location.pathname === l.path;
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all duration-200 ${
                    isActive ? "text-[#1d1d1f]" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                  }`}
                >
                  {NAV_ICONS[l.path]}
                  <span className="text-[9px] tracking-wide font-medium">{l.name}</span>
                  {isActive && <span className="w-1 h-1 rounded-full bg-[#1d1d1f]/40" aria-hidden="true" />}
                </Link>
              );
            })}

            {/* Auth en bottom bar */}
            <div className="flex flex-col items-center gap-1 px-3 py-1">
              {isAuthenticated ? (
                <Link
                  to="/perfil"
                  className="flex flex-col items-center gap-1 transition-colors"
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold overflow-hidden ${
                    location.pathname === "/perfil" ? "bg-[#1d1d1f] text-white" : "bg-black/[0.08] text-[#6e6e73]"
                  }`}>
                    {user?.img
                      ? <img src={user.img} alt="" className="w-full h-full object-cover" />
                      : (user?.nombreUsuario?.[0]?.toUpperCase() ?? "U")}
                  </div>
                  <span className={`text-[9px] tracking-wide font-medium ${
                    location.pathname === "/perfil" ? "text-[#1d1d1f]" : "text-[#6e6e73]"
                  }`}>Perfil</span>
                  {location.pathname === "/perfil" && (
                    <span className="w-1 h-1 rounded-full bg-[#1d1d1f]/40" aria-hidden="true" />
                  )}
                </Link>
              ) : (
                <Link to="/login" className="flex flex-col items-center gap-1 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-[9px] tracking-wide font-medium">Ingresar</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Sub-barra categorías (catálogo, desktop) ─────────────── */}
      {isCatalog && (
        <div
          className={`fixed z-40 inset-x-0 hidden md:flex justify-center gap-1 px-8 py-2 transition-all duration-500 bg-white/80 md:backdrop-blur-xl border-b border-black/[0.04] ${
            scrolled ? "top-[52px]" : "top-[68px]"
          }`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] px-3 py-1.5 rounded-full hover:bg-black/[0.04] transition-all"
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default AppNavbar;
