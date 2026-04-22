import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./shared/layouts/MainLayout";
import AuthLayout from "./shared/layouts/AuthLayout";
import CursorSpotlight from "./shared/components/CursorSpotlight/CursorSpotlight.jsx";
import PageWrapper from "./shared/components/PageWrapper/PageWrapper.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import CatalogoPage from "./pages/CatalogoPage.jsx";
import CompraPage from "./pages/CompraPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ConfirmarEmailPage from "./pages/ConfirmarEmailPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><MainLayout><HomePage /></MainLayout></PageWrapper>} />
        <Route path="/soporte" element={<PageWrapper><MainLayout><ContactoPage /></MainLayout></PageWrapper>} />
        <Route path="/catalogo" element={<PageWrapper><MainLayout><CatalogoPage /></MainLayout></PageWrapper>} />
        <Route path="/compra" element={<PageWrapper><MainLayout><CompraPage /></MainLayout></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><AuthLayout><LoginPage /></AuthLayout></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><AuthLayout><RegisterPage /></AuthLayout></PageWrapper>} />
        <Route path="/auth/confirmar" element={<PageWrapper><AuthLayout><ConfirmarEmailPage /></AuthLayout></PageWrapper>} />
        <Route path="/auth/reset-password" element={<PageWrapper><AuthLayout><ResetPasswordPage /></AuthLayout></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    <CursorSpotlight />
    <AnimatedRoutes />
  </BrowserRouter>
);

export default App;
