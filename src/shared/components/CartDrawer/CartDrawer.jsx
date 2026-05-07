import { AnimatePresence, motion } from "framer-motion";
import useCartStore from "../../../store/cartStore";
import useCartDrawer from "../../../store/cartDrawerStore";
import useConfirmStore from "../../../store/confirmStore";

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const CartDrawer = () => {
  const { isOpen, close } = useCartDrawer();
  const { items, removeItem, clearCart } = useCartStore();
  const confirm = useConfirmStore((s) => s.confirm);

  const waMessage = encodeURIComponent(
    items.length
      ? `Hola! Quiero consultar por los siguientes productos:\n${items
          .map((p, i) => `${i + 1}. *${p.name ?? p.nombreProducto}* — ${p.price ?? p.precio}`)
          .join("\n")}\n\n¿Podés darme más info?`
      : "Hola! Quiero consultar sobre sus productos."
  );

  const handleRemove = (item) => {
    confirm({
      title: "Eliminar producto",
      message: `¿Querés quitar "${item.name ?? item.nombreProducto}" del carrito?`,
      confirmLabel: "Quitar",
      danger: true,
      onConfirm: () => removeItem(item.id ?? item._id),
    });
  };

  const handleClear = () => {
    confirm({
      title: "Vaciar carrito",
      message: "¿Querés quitar todos los productos del carrito?",
      confirmLabel: "Vaciar",
      danger: true,
      onConfirm: clearCart,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 md:bg-black/30 md:backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-sm bg-white shadow-2xl flex flex-col"
            aria-label="Carrito de consulta"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
              <div>
                <h2 className="font-semibold text-[#1d1d1f]">Carrito de consulta</h2>
                <p className="text-xs text-[#6e6e73] mt-0.5">{items.length} producto{items.length !== 1 ? "s" : ""}</p>
              </div>
              <button
                onClick={close}
                aria-label="Cerrar carrito"
                className="p-2 rounded-full hover:bg-black/[0.04] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14 text-black/15" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-[#1d1d1f] mb-1">Tu carrito está vacío</p>
                    <p className="text-sm text-[#6e6e73]">Agregá productos para consultar por WhatsApp</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id ?? item._id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 bg-[#f5f5f7] rounded-xl p-3"
                    >
                      <div className="w-14 h-14 shrink-0 bg-white rounded-lg border border-black/[0.06] flex items-center justify-center overflow-hidden">
                        {item.image || item.imagenes?.[0]?.url ? (
                          <img
                            src={item.image ?? item.imagenes[0].url}
                            alt={item.name ?? item.nombreProducto}
                            className="w-full h-full object-contain p-1.5"
                          />
                        ) : (
                          <span className="text-xs text-black/20">—</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1d1d1f] line-clamp-1">
                          {item.name ?? item.nombreProducto}
                        </p>
                        <p className="text-xs text-[#6e6e73] mt-0.5">
                          {item.price ?? item.precio}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        aria-label={`Eliminar ${item.name ?? item.nombreProducto}`}
                        className="shrink-0 p-1.5 rounded-full hover:bg-black/[0.06] text-[#6e6e73] hover:text-red-500 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-black/[0.06] flex flex-col gap-3">
              <a
                href={items.length ? `https://wa.me/${WA_NUMBER}?text=${waMessage}` : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={items.length === 0}
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-medium transition-colors ${
                  items.length
                    ? "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/85"
                    : "bg-black/[0.05] text-[#6e6e73] cursor-not-allowed"
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Consultar todo por WhatsApp
              </a>
              {items.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-xs text-[#6e6e73] hover:text-red-500 transition-colors text-center"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
