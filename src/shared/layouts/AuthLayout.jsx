import { Link, useLocation } from "react-router-dom";

const Logo = import.meta.env.VITE_ASSET_LOGO;

const COPY = {
  "/login": {
    title: "La mejor manera\nde comprar lo que amás.",
    features: [
      { text: "Garantía oficial Apple", sub: "Todos los productos con garantía de fábrica" },
      { text: "Envíos a todo el país", sub: "Despacho en 24-48 h con seguimiento en tiempo real" },
      { text: "Hasta 18 cuotas sin interés", sub: "Con todos los bancos y billeteras digitales" },
      { text: "Soporte certificado", sub: "Expertos disponibles para ayudarte a elegir" },
    ],
  },
  "/register": {
    title: "Únite a la familia Apple.",
    features: [
      { text: "Historial de compras", sub: "Todo tu recorrido disponible en un solo lugar" },
      { text: "Seguimiento de envíos", sub: "Estado de tus pedidos en tiempo real" },
      { text: "Acceso a soporte", sub: "Canales directos para resolver cualquier consulta" },
      { text: "Financiación y beneficios", sub: "Promociones guardadas para tus próximos equipos" },
    ],
  },
};

const AuthLayout = ({ children }) => {
  const location = useLocation();
  const content = COPY[location.pathname] ?? COPY["/login"];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="surface-metal relative hidden md:flex md:w-[45%] flex-col justify-between px-12 py-12 overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-center"
          aria-hidden="true"
        >
          {["Apple", "Store"].map((word, i) => (
            <span
              key={word}
              className="block font-semibold text-white leading-none"
              style={{
                fontSize: "clamp(80px, 14vw, 180px)",
                opacity: 0.028,
                letterSpacing: "-0.05em",
                paddingLeft: `${8 + i * 10}%`,
                lineHeight: 0.88,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

        <Link to="/" className="relative z-10 shrink-0">
          <img src={Logo} alt="Apple Store" crossOrigin="anonymous" className="h-8 invert" style={{ opacity: 0.75 }} />
        </Link>

        <div className="relative z-10 flex flex-col gap-10">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase mb-4" style={{ color: "#6e6e73" }}>
              Distribuidor Autorizado Apple
            </p>
            <h2
              className="font-semibold text-white leading-tight whitespace-pre-line"
              style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)", letterSpacing: "-0.03em" }}
            >
              {content.title}
            </h2>
          </div>

          <div className="rule-metal" />

          <ul className="flex flex-col gap-5">
            {content.features.map((f) => (
              <li key={f.text} className="flex items-start gap-3">
                <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: "#aeaeb2" }} aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-white/80">{f.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6e6e73" }}>{f.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs" style={{ color: "#3a3a3c" }}>
          Argentina · 2025
        </p>
      </div>

      <div className="flex-1 flex flex-col" style={{ background: "#f5f5f7" }}>
        <div className="md:hidden flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
          <Link to="/">
            <img src={Logo} alt="Apple Store" crossOrigin="anonymous" className="h-7" style={{ opacity: 0.6 }} />
          </Link>
          <Link to="/" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
            ← Volver
          </Link>
        </div>

        <div className="hidden md:flex justify-end px-10 pt-8">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>

        <div className="rule-metal-light" style={{ opacity: 0.5 }} aria-hidden="true" />
      </div>
    </div>
  );
};

export default AuthLayout;
