import React from "react";
import Hero from "../Components/Hero/Hero";
import Lanzamientos from "../Components/Lanzamientos/Lanzamientos";
import SelectImagen from "../Components/SelectImagen/SelectImagen";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="flex justify-center items-center mt-40 mb-40">
        <Lanzamientos />
      </div>
      <SelectImagen />
    </div>
  );
};

export default HomePage;
