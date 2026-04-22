import { Link } from "react-router-dom";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const AuthLayout = ({ children }) => (
  <div className="relative min-h-screen bg-[#f5f5f7] overflow-hidden flex flex-col">
    {/* Header oscuro con fade */}
    <div className="absolute inset-x-0 top-0 h-64 bg-[#111111] z-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
      </div>
      <div className="absolute inset-0 dot-grid-dark opacity-[0.4]" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f5f5f7] to-transparent" />
    </div>

    {/* Navegación */}
    <header className="relative z-10 flex items-center justify-between px-8 py-6">
      <Link to="/">
        <img src={Logo} alt="logo" className="h-8 invert opacity-70" />
      </Link>
      <Link to="/" className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al inicio
      </Link>
    </header>

    {/* Contenido */}
    <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
      {children}
    </div>
  </div>
);

export default AuthLayout;
