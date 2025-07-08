import React from "react";
import { Link } from "react-router-dom";

const ContactoComponente = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-contacto.png)] bg-cover bg-center text-white flex items-center justify-center">
        <h1>Esta es la seccion de contacto</h1>
        <button>
          <Link to="/">Volver a la pagina principal</Link>
        </button>
      </div>
    </div>
  );
};

export default ContactoComponente;
