import React from "react";
const Logo = import.meta.env.VITE_ASSET_LOGO;

const Footer = () => (
  <footer className="relative px-6 pt-12 pb-8 md:px-16 lg:px-36 w-full border-t border-white/[0.05] overflow-hidden">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <div className="absolute inset-0 dot-grid opacity-[0.06] pointer-events-none" />

    <div className="relative flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-white/[0.04]">
      <div className="md:max-w-sm">
        <img className="w-28 h-auto invert opacity-50" src={Logo} alt="logo" />
        <p className="mt-5 text-sm text-white/25 leading-relaxed">
          Inspirate. Descubrí. Comprá con confianza. Tecnología de vanguardia, atención personalizada.
          Distribuidor autorizado de productos Apple en Argentina.
        </p>
      </div>
      <div className="flex items-end">
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/15">Argentina · 2025</span>
      </div>
    </div>

    <p className="relative pt-6 text-center text-xs text-white/15 tracking-wide">
      © 2025 Santiago Coronel. Todos los derechos reservados.
    </p>
  </footer>
);

export default Footer;
