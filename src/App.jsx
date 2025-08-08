import Navbar from "../src/Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import CatalogoPage from "./pages/CatalogoPage.jsx";
import CompraPage from "./pages/CompraPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <div>
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/soporte" element={<ContactoPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/compra" element={<CompraPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
