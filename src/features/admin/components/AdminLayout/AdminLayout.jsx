import { Link, NavLink } from "react-router-dom";

const Logo = import.meta.env.VITE_ASSET_LOGO;

const AdminLayout = ({ children }) => (
  <div className="min-h-screen bg-[#f5f5f7]">
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="shrink-0">
            <img
              src={Logo}
              alt="Apple Store"
              crossOrigin="anonymous"
              className="h-8 opacity-75"
            />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#6e6e73]">Administración</p>
            <h1 className="text-lg font-semibold text-[#1d1d1f]">Panel de administración</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <nav className="flex items-center gap-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1d1d1f] text-white"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]"
                }`
              }
            >
              Mis publicaciones
            </NavLink>
            <NavLink
              to="/admin/categorias"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#1d1d1f] text-white"
                    : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04]"
                }`
              }
            >
              Categorías
            </NavLink>
          </nav>
          <Link
            to="/"
            className="px-4 py-2 rounded-full text-sm text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </header>

    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {children}
    </main>
  </div>
);

export default AdminLayout;
