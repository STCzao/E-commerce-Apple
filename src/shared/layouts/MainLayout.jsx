import AppNavbar from "../components/AppNavbar/AppNavbar";
import Footer from "../components/Footer/Footer";
import useCartStore from "../../store/cartStore";
import useCartDrawer from "../../store/cartDrawerStore";

const CartFab = () => {
  const count = useCartStore((s) => s.items.length);
  const open = useCartDrawer((s) => s.open);

  if (count === 0) return null;

  return (
    <button
      onClick={open}
      aria-label={`Abrir carrito — ${count} producto${count !== 1 ? "s" : ""}`}
      className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 flex items-center gap-2 bg-[#1d1d1f] text-white pl-4 pr-3 py-3 rounded-full shadow-lg shadow-black/25 hover:bg-[#1d1d1f]/90 transition-all"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span className="text-sm font-semibold min-w-[1ch] text-center">{count}</span>
    </button>
  );
};

const MainLayout = ({ children }) => (
  <>
    <AppNavbar />
    <main id="main-content">{children}</main>
    <Footer />
    <CartFab />
  </>
);

export default MainLayout;
