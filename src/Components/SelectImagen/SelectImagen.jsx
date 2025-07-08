import React, { useEffect } from "react";
import selectImage1 from "../../assets/fondo-home.png";
import selectImage2 from "../../assets/fondo-home-1.png";
import selectImage3 from "../../assets/fondo-home-2.png";
import selectImage4 from "../../assets/fondo-home-3.png";
import selectImage5 from "../../assets/fondo-home-4.png";

const SelectImage = () => {
  useEffect(() => {
    const container = document.getElementById("thumbnail-container");

    const handleClick = (e) => {
      if (e.target.classList.contains("thumb")) {
        const mainImage = document.getElementById("main-image");
        if (mainImage) {
          mainImage.src = e.target.src;
        }
      }
    };

    container?.addEventListener("click", handleClick);

    return () => {
      container?.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mb-40">
      <div className="flex flex-col items-center mb-15">
        <span className="text-5xl font-semibold mb-10">iPhone 16 Pro</span>
        <span className="text-xl">Creado para Apple Intelligence.</span>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div
          className="grid grid-cols-4 max-w-3xl gap-4"
          id="thumbnail-container"
        >
          <img
            src={selectImage1}
            alt="image-1"
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
          />
          <img
            src={selectImage2}
            alt="image-2"
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
          />
          <img
            src={selectImage3}
            alt="image-3"
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
          />
          <img
            src={selectImage4}
            alt="image-4"
            className="thumb rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
          />
        </div>

        <div className="w-full max-w-3xl">
          <img
            id="main-image"
            src={selectImage1}
            alt="main"
            className="w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center w-full max-w-3xl mt-40">
          <span className="text-2xl font-semibold mb-15">Míralo más de cerca.</span>
          <img
            src={selectImage5}
            alt="secondary-image"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectImage;
