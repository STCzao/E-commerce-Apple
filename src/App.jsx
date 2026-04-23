import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./shared/layouts/MainLayout";
import AuthLayout from "./shared/layouts/AuthLayout";
import CursorSpotlight from "./shared/components/CursorSpotlight/CursorSpotlight.jsx";
import CartDrawer from "./shared/components/CartDrawer/CartDrawer.jsx";
import PageWrapper from "./shared/components/PageWrapper/PageWrapper.jsx";
import ScrollToTop from "./shared/components/ScrollToTop/ScrollToTop.jsx";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary.jsx";
import PageLoadingFallback from "./shared/components/PageLoadingFallback/PageLoadingFallback.jsx";
import Toast from "./shared/components/Toast/Toast.jsx";
import ConfirmModal from "./shared/components/ConfirmModal/ConfirmModal.jsx";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute.jsx";

const HomePage             = lazy(() => import("./pages/HomePage.jsx"));
const ContactoPage         = lazy(() => import("./pages/ContactoPage.jsx"));
const CatalogoPage         = lazy(() => import("./pages/CatalogoPage.jsx"));
const ProductoDetallePage  = lazy(() => import("./pages/ProductoDetallePage.jsx"));
const LoginPage            = lazy(() => import("./pages/LoginPage.jsx"));
const RegisterPage         = lazy(() => import("./pages/RegisterPage.jsx"));
const ConfirmarEmailPage   = lazy(() => import("./pages/ConfirmarEmailPage.jsx"));
const ResetPasswordPage    = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const ProfilePage          = lazy(() => import("./pages/ProfilePage.jsx"));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"              element={<PageWrapper><MainLayout><HomePage /></MainLayout></PageWrapper>} />
            <Route path="/soporte"       element={<PageWrapper><MainLayout><ContactoPage /></MainLayout></PageWrapper>} />
            <Route path="/catalogo"      element={<PageWrapper><MainLayout><CatalogoPage /></MainLayout></PageWrapper>} />
            <Route path="/catalogo/:id"  element={<PageWrapper><MainLayout><ProductoDetallePage /></MainLayout></PageWrapper>} />
            <Route path="/perfil"        element={<ProtectedRoute><PageWrapper><MainLayout><ProfilePage /></MainLayout></PageWrapper></ProtectedRoute>} />
            <Route path="/login"         element={<PageWrapper><AuthLayout><LoginPage /></AuthLayout></PageWrapper>} />
            <Route path="/register"      element={<PageWrapper><AuthLayout><RegisterPage /></AuthLayout></PageWrapper>} />
            <Route path="/auth/confirmar"      element={<PageWrapper><AuthLayout><ConfirmarEmailPage /></AuthLayout></PageWrapper>} />
            <Route path="/auth/reset-password" element={<PageWrapper><AuthLayout><ResetPasswordPage /></AuthLayout></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <CursorSpotlight />
      <CartDrawer />
      <Toast />
      <ConfirmModal />
      <AnimatedRoutes />
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
