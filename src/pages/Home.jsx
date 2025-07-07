import React from "react";
import Hero from "../Components/Hero/Hero";
import Lanzamientos from "../Components/Lanzamientos/Lanzamientos";
import SelectImage from "../Components/SelectImage/SelectImage";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="flex justify-center items-center mt-40 mb-40">
        <Lanzamientos />
      </div>
      <SelectImage />
    </div>
  );
};

export default Home;
