import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCartStore from "../../../../store/cartStore";
import useFavoritesStore from "../../../../store/favoritesStore";
import useCartDrawer from "../../../../store/cartDrawerStore";
import useAuthStore from "../../../../store/authStore";

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const WAIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const ProductoDetalle = ({ product }) => {
  const images = product.imagenes?.length
    ? product.imagenes.map((i) => i.url ?? i)
    : product.image
      ? [product.image]
      : [];

  const [selected, setSelected] = useState(0);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartDrawer((s) => s.open);
  const toggleFav  = useFavoritesStore((s) => s.toggle);
  const isFavorite = useFavoritesStore((s) => s.isFavorite);

  const isFav = isFavorite(product._id ?? product.id);
  const inCart = cartItems.some((i) => i.id === product.id);

  const name = product.name ?? product.nombreProducto;
  const price = product.price ?? product.precio;

  const waMessage = encodeURIComponent(
    `Hola! Me interesa: *${name}* (${price}). ¿Podés darme más info?`,
  );

  const handleAddCart = () => {
    addItem(product);
    openCart();
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-6 md:px-16 max-w-7xl mx-auto">
        <nav
          aria-label="Miga de pan"
          className="flex items-center gap-2 text-xs text-[#6e6e73]"
        >
          <Link
            to="/catalogo"
            className="hover:text-[#1d1d1f] transition-colors flex items-center gap-1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Catálogo
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#1d1d1f] font-medium truncate max-w-[200px]">
            {name}
          </span>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="px-6 md:px-16 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* ── Galería ── */}
          <div className="lg:w-[55%] flex flex-col gap-4">
            <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-sm">
              <AnimatePresence mode="wait">
                {images.length > 0 ? (
                  <motion.img
                    key={selected}
                    src={images[selected]}
                    alt={`${name} — imagen ${selected + 1}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    className="absolute inset-0 w-full h-full object-contain p-8"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-black/15"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="w-20 h-20"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border overflow-hidden bg-white transition-all duration-200 ${
                      selected === i
                        ? "ring-2 ring-[#1d1d1f] ring-offset-2 ring-offset-[#f5f5f7] border-transparent scale-105"
                        : "border-black/[0.06] opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info y acciones ── */}
          <div className="lg:w-[45%] flex flex-col gap-6">
            {/* Nombre y precio */}
            <div>
              {(product.marca ?? product.brand) && (
                <p className="text-xs text-[#6e6e73] uppercase tracking-[0.15em] mb-2">
                  {product.marca ?? product.brand}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] leading-tight mb-4">
                {name}
              </h1>
              <p className="text-2xl font-semibold text-[#1d1d1f]">{price}</p>
            </div>

            {/* Descripción */}
            {(product.description ?? product.descripcion) && (
              <p className="text-[#6e6e73] text-sm leading-relaxed border-t border-black/[0.06] pt-5">
                {product.description ?? product.descripcion}
              </p>
            )}

            {/* Acciones */}
            <div className="flex flex-col gap-3 border-t border-black/[0.06] pt-5">
              {/* WhatsApp — siempre disponible, sin login */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#1d1d1f] text-white font-medium text-sm hover:bg-[#1d1d1f]/85 transition-colors"
              >
                <WAIcon className="w-4 h-4" />
                Consultar por WhatsApp
              </a>

              {/* Carrito y favoritos — requieren login */}
              {isAuthenticated ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleAddCart}
                    aria-label={
                      inCart
                        ? "Ya está en el carrito"
                        : "Agregar al carrito de consulta"
                    }
                    disabled={inCart}
                    className={`flex-1 py-3 rounded-2xl text-sm font-medium border transition-all ${
                      inCart
                        ? "bg-[#f5f5f7] text-[#6e6e73] border-black/[0.06] cursor-default"
                        : "bg-white border-black/10 text-[#1d1d1f] hover:border-black/20 hover:bg-[#f5f5f7]"
                    }`}
                  >
                    {inCart ? "En el carrito ✓" : "Agregar al carrito"}
                  </button>

                  <button
                    onClick={() => toggleFav(product, isAuthenticated)}
                    aria-label={
                      isFav ? "Quitar de favoritos" : "Guardar en favoritos"
                    }
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                      isFav
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-black/10 text-[#6e6e73] hover:border-red-200 hover:text-red-400"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={isFav ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                /* Sin sesión — invitación a iniciar sesión */
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="flex-1 py-3 rounded-2xl text-sm font-medium border border-black/10 text-[#6e6e73] bg-white hover:border-black/20 hover:text-[#1d1d1f] transition-all text-center"
                  >
                    Iniciá sesión para el carrito
                  </Link>
                  <Link
                    to="/login"
                    aria-label="Iniciá sesión para guardar en favoritos"
                    className="w-12 h-12 rounded-2xl border border-black/[0.06] flex items-center justify-center text-black/20 bg-white hover:border-black/15 transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Link>
                </div>
              )}

              <p className="text-xs text-[#6e6e73] text-center">
                {isAuthenticated ? (
                  "El carrito te permite consultar varios productos a la vez por WhatsApp."
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="underline underline-offset-2 hover:text-[#1d1d1f] transition-colors"
                    >
                      Iniciá sesión
                    </Link>{" "}
                    para guardar favoritos y armar un carrito de consulta.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
