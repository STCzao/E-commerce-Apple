import Navbar from "../src/Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactoPage from "./pages/ContactoPage.jsx";
import CatalogoPage from "./pages/CatalogoPage.jsx";
import { useState } from "react";

const App = () => {

  const [characterName, setCharacterName] = useState("");

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar setCharacterName={setCharacterName}/>
                <HomePage />
                <div>
                  <Footer />
                </div>
              </>
            }
          />

          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/catalogo" element={<CatalogoPage characterName={characterName}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
