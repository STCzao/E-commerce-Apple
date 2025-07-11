import React from "react";
import { Link } from "react-router-dom";
import CatalogoComponente from "../Components/CatalogoComponente/CatalogoComponente";

const CatalogoPage = () => {
  return (
    <div>
      <div>
        <CatalogoComponente />
      </div>
      <h1>Esta es la seccion de catalogo</h1>
      <button>
        <Link to="/">Volver a la pagina principal</Link>
      </button>
    </div>
  );
};

export default CatalogoPage;
