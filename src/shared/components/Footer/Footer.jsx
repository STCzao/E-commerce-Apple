import { Link } from "react-router-dom";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const Footer = () => (
  <footer className="relative bg-[#111111] overflow-hidden">
    {/* Fade superior — empalma con el blanco de SelectImagen */}
    <div
      className="absolute inset-x-0 top-0 h-48 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, #ffffff 0%, transparent 100%)" }}
      aria-hidden="true"
    />

    {/* Línea decorativa */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

    {/* Dot grid */}
    <div className="absolute inset-0 dot-grid-dark opacity-[0.25] pointer-events-none" aria-hidden="true" />

    {/* Contenido — pt-52 para quedar por debajo del gradiente superior */}
    <div className="relative pt-52 pb-10 px-6 md:px-16 lg:px-36">
      <div className="flex flex-col md:flex-row justify-between gap-12 pb-10 border-b border-white/[0.1]">
        {/* Marca */}
        <div className="md:max-w-xs">
          <img
            className="w-20 h-auto invert opacity-75"
            src={Logo}
            alt="Logo Apple Store"
          />
          <p className="mt-5 text-sm text-white/65 leading-relaxed">
            Inspirate. Descubrí. Comprá con confianza.
            Distribuidor autorizado de Apple en Argentina con garantía oficial y soporte certificado.
          </p>
        </div>

        {/* Navegación */}
        <nav aria-label="Navegación del pie de página" className="flex flex-col gap-4 justify-end items-start md:items-end">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <Link
              to="/catalogo"
              className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Catálogo
            </Link>
            <Link
              to="/soporte"
              className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Soporte
            </Link>
            <Link
              to="/compra"
              className="text-sm text-white/60 hover:text-white transition-colors tracking-wide"
            >
              Compra
            </Link>
          </div>
          <span className="text-xs tracking-[0.2em] uppercase text-white/40 mt-2">
            Argentina · 2025
          </span>
        </nav>
      </div>

      <p className="pt-8 text-center text-xs text-white/45 tracking-wide">
        © 2025 Santiago Coronel. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
