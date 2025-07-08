import React from "react";
import { Link } from "react-router-dom";

const NosotrosPage = () => {
  return (
    <div>
      <h1>Esta es la seccion de nosotros</h1>
      <button>
        <Link to="/">Volver a la pagina principal</Link>
      </button>
    </div>
  );
};

export default NosotrosPage;
