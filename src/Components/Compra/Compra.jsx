import React from "react";
import { Link } from "react-router-dom";

const Compra = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/fondo-compra.png)] bg-cover bg-center text-white flex items-center justify-center">
        <button className="mt-10 bg-white/10 text-white/80 border hover:border-slate-400/70 rounded-full px-6 py-2 text-sm sm:text-base">
          <Link to={"/"}>Volver al inicio</Link>
        </button>
      </div>
    </div>
  );
};

export default Compra;
