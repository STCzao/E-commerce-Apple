import React from "react";
import { Link } from "react-router-dom";
import ContactoComponente from "../Components/ContactoComponente/ContactoComponente";

const ContactoPage = () => {
  return (
    <div>
      <div>
        <ContactoComponente />
        <h1>Esta es la seccion de contacto</h1>
        <button>
          <Link to="/">Volver a la pagina principal</Link>
        </button>
      </div>
    </div>
  );
};

export default ContactoPage;
