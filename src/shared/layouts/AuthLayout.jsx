import { Link } from "react-router-dom";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const AuthLayout = ({ children }) => (
  <div className="relative min-h-screen bg-[#111111] overflow-hidden flex flex-col">
    {/* Aurora */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
    </div>
    <div className="absolute inset-0 dot-grid-dark opacity-[0.35]" />

    {/* Línea superior decorativa */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

    {/* Navegación */}
    <header className="relative z-10 flex items-center justify-between px-8 py-6">
      <Link to="/">
        <img src={Logo} alt="logo" className="h-8 invert opacity-70" />
      </Link>
      <Link to="/" className="flex items-center gap-1.5 text-sm text-white/35 hover:text-white/65 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al inicio
      </Link>
    </header>

    {/* Contenido centrado */}
    <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
      {children}
    </div>
  </div>
);

export default AuthLayout;
