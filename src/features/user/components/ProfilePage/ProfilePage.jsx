import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useAuth from "../../../auth/hooks/useAuth";
import useToastStore from "../../../../store/toastStore";
import useConfirmStore from "../../../../store/confirmStore";
import useFavoritesStore from "../../../../store/favoritesStore";
import useAuthStore from "../../../../store/authStore";
import AvatarUpload from "../../../../shared/components/AvatarUpload/AvatarUpload";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium text-[#6e6e73] uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-black/10 bg-[#f5f5f7] text-sm text-[#1d1d1f] placeholder-[#6e6e73]/50 outline-none focus:border-black/25 focus:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

const ProfilePage = () => {
  const navigate        = useNavigate();
  const { logout }      = useAuth();
  const addToast        = useToastStore((s) => s.addToast);
  const confirm         = useConfirmStore((s) => s.confirm);
  const favorites       = useFavoritesStore((s) => s.items);
  const toggleFav       = useFavoritesStore((s) => s.toggle);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const {
    user,
    profileForm,
    passForm,
    saving,
    savingPass,
    handleProfileChange,
    handlePassChange,
    saveProfile,
    savePassword,
    setProfileImg,
  } = useProfile();

  const handleAvatarUploaded = (url, err) => {
    if (err) { addToast("No se pudo subir la imagen", "error"); return; }
    setProfileImg(url);
  };

  const handleLogout = () => {
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

  const handleRemoveFav = (item) => {
    const p = item.producto ?? item;
    confirm({
      title: "Quitar de favoritos",
      message: `¿Querés quitar "${p.nombre ?? p.name ?? "este producto"}" de tus favoritos?`,
      confirmLabel: "Quitar",
      danger: true,
      onConfirm: () => toggleFav(p, isAuthenticated),
    });
  };

  const passValid =
    passForm.actual &&
    passForm.nueva.length >= 8 &&
    passForm.nueva === passForm.confirmar;

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4"
        >
          <AvatarUpload
            currentImg={profileForm.img}
            initial={user?.nombreUsuario?.[0]?.toUpperCase() ?? "?"}
            onUploaded={handleAvatarUploaded}
          />
          <div>
            <h1 className="text-xl font-semibold text-[#1d1d1f]">
              {user?.nombreUsuario ?? "Mi perfil"}
            </h1>
            <p className="text-sm text-[#6e6e73]">{user?.correo}</p>
            <p className="text-xs text-[#6e6e73]/60 mt-0.5">Hacé click en la foto para cambiarla</p>
          </div>
        </motion.div>

        {/* Datos del perfil */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.07 }}
          className="bg-white rounded-2xl border border-black/[0.06] p-6 flex flex-col gap-5"
        >
          <h2 className="font-semibold text-[#1d1d1f]">Datos personales</h2>
          <form onSubmit={saveProfile} className="flex flex-col gap-4">
            <Field label="Nombre de usuario">
              <input
                name="nombreUsuario"
                value={profileForm.nombreUsuario}
                onChange={handleProfileChange}
                placeholder="Tu nombre"
                disabled={saving}
                className={inputCls}
              />
            </Field>
            <Field label="Correo electrónico">
              <input
                value={user?.correo ?? ""}
                readOnly
                className={`${inputCls} opacity-50 cursor-not-allowed`}
              />
            </Field>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 transition-colors disabled:opacity-50"
              >
                {saving ? "Guardando…" : "Guardar cambios"}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Favoritos */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="bg-white rounded-2xl border border-black/[0.06] p-6 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[#1d1d1f]">Mis favoritos</h2>
            {favorites.length > 0 && (
              <span className="text-xs text-[#6e6e73] bg-[#f5f5f7] px-2.5 py-1 rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-10 h-10 text-black/15">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-sm text-[#6e6e73]">Todavía no tenés favoritos.</p>
              <Link to="/catalogo" className="text-sm text-[#1d1d1f] underline underline-offset-2 hover:opacity-60 transition-opacity">
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {favorites.map((item) => {
                const p     = item.producto ?? item;
                const id    = p._id ?? p.id;
                const name  = p.nombre ?? p.name ?? p.nombreProducto ?? "Producto";
                const price = p.precio ?? p.price;
                const image = p.imagen ?? p.image ?? p.imagenes?.[0]?.url;

                return (
                  <div key={item._id ?? id} className="group relative flex flex-col rounded-xl border border-black/[0.06] overflow-hidden bg-[#f5f5f7] hover:border-black/[0.14] hover:shadow-md transition-all">
                    {/* Botón quitar */}
                    <button
                      onClick={() => handleRemoveFav(item)}
                      aria-label={`Quitar ${name} de favoritos`}
                      className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.06] flex items-center justify-center text-[#6e6e73] hover:text-red-500 hover:border-red-200 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                        <path strokeLinecap="round" d="M3 3l10 10M13 3L3 13" />
                      </svg>
                    </button>

                    <Link to={`/catalogo/${id}`} className="flex flex-col flex-1">
                      <div className="aspect-square bg-white flex items-center justify-center p-3">
                        {image ? (
                          <img
                            src={image}
                            alt={name}
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                            className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-black/[0.06] rounded-lg" />
                        )}
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-xs font-medium text-[#1d1d1f] line-clamp-2 leading-snug">{name}</p>
                        {price && <p className="text-xs text-[#6e6e73] mt-0.5">{price}</p>}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* Cambiar contraseña */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.17 }}
          className="bg-white rounded-2xl border border-black/[0.06] p-6 flex flex-col gap-5"
        >
          <h2 className="font-semibold text-[#1d1d1f]">Cambiar contraseña</h2>
          <form onSubmit={savePassword} className="flex flex-col gap-4">
            <Field label="Contraseña actual">
              <input
                type="password"
                name="actual"
                value={passForm.actual}
                onChange={handlePassChange}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={savingPass}
                className={inputCls}
              />
            </Field>
            <Field label="Nueva contraseña">
              <input
                type="password"
                name="nueva"
                value={passForm.nueva}
                onChange={handlePassChange}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={savingPass}
                className={inputCls}
              />
            </Field>
            <Field label="Confirmar nueva contraseña">
              <input
                type="password"
                name="confirmar"
                value={passForm.confirmar}
                onChange={handlePassChange}
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={savingPass}
                className={inputCls}
              />
            </Field>

            {/* Indicador visual cuando no coinciden */}
            {passForm.confirmar && passForm.nueva !== passForm.confirmar && (
              <p className="text-xs text-red-400 px-1">Las contraseñas no coinciden.</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={savingPass || !passValid}
                className="px-6 py-2.5 rounded-full bg-[#1d1d1f] text-white text-sm font-medium hover:bg-[#1d1d1f]/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {savingPass ? "Cambiando…" : "Cambiar contraseña"}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Cerrar sesión */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex justify-end"
        >
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-full border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Cerrar sesión
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
