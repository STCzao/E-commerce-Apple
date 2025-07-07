import React, { useEffect, useState } from "react";
import Carrousel from "../Carrousel/Carrousel";
import Lanzamientos from "../Lanzamientos/Lanzamientos";

const Hero = () => {

  return (
    <div className='flex flex-col items-center justify-center px-6 md: px16 lg:px-24 xl:px-32 text-white bg-[url("../src/assets/fondo-hero.png")] bg-no-repeat bg-center h-screen'>
      
      {/* Carrousel de imágenes */}

      <Lanzamientos/>
      
      {/* Boton de anuncio */}

      <div className="flex bg-white/50 text-black/60 items-center gap-2 border border-slate-500 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
        <span>Explora todos nuestros productos</span>
        <button className="flex items-center gap-1 font-medium">
          <span>Ver más</span>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54"
              stroke="#050040"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
