import { Link } from "react-router-dom";

const Logo = import.meta.env.VITE_ASSET_LOGO;

const AuthLayout = ({ children }) => (
  <div className="surface-metal relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">

    {/* Arista de luz superior */}
    <div className="edge-light absolute top-0 inset-x-0 h-px" aria-hidden="true" />

    {/* Luz cenital suave — simula spot de estudio sobre el card */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
      aria-hidden="true"
    />

    {/* Logo */}
    <Link to="/" className="relative z-10 mb-10 shrink-0">
      <img
        src={Logo}
        alt="Apple Store"
        crossOrigin="anonymous"
        className="h-8 invert"
        style={{ opacity: 0.6 }}
      />
    </Link>

    {/* Formulario */}
    <div className="relative z-10 w-full max-w-sm">
      {children}
    </div>

    {/* Regla inferior */}
    <div className="rule-metal absolute bottom-0 inset-x-0" style={{ opacity: 0.4 }} aria-hidden="true" />
  </div>
);

export default AuthLayout;
