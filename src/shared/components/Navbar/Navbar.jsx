import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const Navbar = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Soporte", path: "/soporte" },
  ];

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-16 lg:px-24 transition-all duration-500 ${
      scrolled ? "py-3 bg-black/55 backdrop-blur-xl border-b border-white/[0.05]" : "py-5"
    }`}>
      <Link to="/"><img src={Logo} alt="logo" className="h-8 invert opacity-80" /></Link>

      <div className="hidden md:flex items-center gap-7">
        {links.map((l, i) => (
          <Link key={i} to={l.path} className="group flex flex-col gap-0.5 text-sm text-white/50 hover:text-white transition-colors">
            {l.name}
            <div className="h-px w-0 group-hover:w-full bg-white/50 transition-all duration-300" />
          </Link>
        ))}
        {isAuthenticated ? (
          <button onClick={clearAuth} className="text-sm px-4 py-1.5 rounded-full border border-white/12 text-white/50 hover:text-white hover:border-white/25 transition-all">
            Salir
          </button>
        ) : (
          <Link to="/login">
            <button className="text-sm px-5 py-2 rounded-full font-medium bg-white text-black hover:bg-white/90 transition-colors">
              Ingresar
            </button>
          </Link>
        )}
      </div>

      <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/50 hover:text-white">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`fixed inset-0 bg-[#080808]/97 backdrop-blur-2xl flex flex-col md:hidden items-center justify-center gap-8 transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 dot-grid opacity-15" />
        <button className="absolute top-6 right-6 p-2 text-white/30 hover:text-white" onClick={() => setOpen(false)}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {links.map((l, i) => (
          <Link key={i} to={l.path} className="text-2xl text-white/60 hover:text-white transition-colors" onClick={() => setOpen(false)}>{l.name}</Link>
        ))}
        {isAuthenticated ? (
          <button onClick={() => { clearAuth(); setOpen(false); }} className="text-white/30 text-lg">Salir</button>
        ) : (
          <Link to="/login" onClick={() => setOpen(false)}>
            <button className="bg-white text-black px-10 py-3 rounded-full text-lg font-medium">Ingresar</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
