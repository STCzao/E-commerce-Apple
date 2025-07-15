import React, { useState } from "react";
import {
  iPadsCatalogo,
  iPhonesCatalogo,
  MacsCatalogo,
  WatchsCatalogo,
} from "../../../api";

const Cards = () => {
  return (
    <div>
      {/* Cards */}

      <div className="flex flex-wrap items-center justify-center text-center mt-35">
        <div>
          <div id="iPhone" className="text-5xl font-semibold">
            {"iPhones"}
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-35">
            {iPhonesCatalogo.map((card) => (
              <div
                key={card.id}
                className="w-70 h-90 mx-auto [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-white border border-gray-200">
                    <img src={card.image} alt={card.name} />
                    <p>{card.name}</p>
                  </div>

                  {/* Back Side */}
                  <div className="flex flex-col bg-white border border-gray-200 absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md [transform:rotateY(180deg)]">
                    <p className="m-10 text-center text-sm h-35">
                      {card.description}
                    </p>
                    <p>{card.price}</p>
                    <button className="cursor-pointer px-3 py-2 bg-black text-white rounded-full mt-10">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-35">
          <div id="iPad" className="text-5xl font-semibold">
            {"iPads"}
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-35">
            {iPadsCatalogo.map((card) => (
              <div
                key={card.id}
                className="w-70 h-90 mx-auto [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-white border border-gray-200">
                    <img src={card.image} alt={card.name} />
                    <p>{card.name}</p>
                  </div>

                  {/* Back Side */}
                  <div className="flex flex-col bg-white border border-gray-200 absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md [transform:rotateY(180deg)]">
                    <p className="m-10 text-center text-sm h-35">
                      {card.description}
                    </p>
                    <p>{card.price}</p>
                    <button className="cursor-pointer px-3 py-2 bg-black text-white rounded-full mt-10">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-35">
          <div id="Mac" className="text-5xl font-semibold">
            {"Macs"}
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-35">
            {MacsCatalogo.map((card) => (
              <div
                key={card.id}
                className="w-70 h-90 mx-auto [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-white border border-gray-200">
                    <img src={card.image} alt={card.name} />
                    <p>{card.name}</p>
                  </div>

                  {/* Back Side */}
                  <div className="flex flex-col bg-white border border-gray-200 absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md [transform:rotateY(180deg)]">
                    <p className="m-10 text-center text-sm h-35">
                      {card.description}
                    </p>
                    <p>{card.price}</p>
                    <button className="cursor-pointer px-3 py-2 bg-black text-white rounded-full mt-10">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-35 mb-35">
          <div id="Watch" className="text-5xl font-semibold">
            {"Apple Watchs"}
          </div>
          <div className="flex flex-wrap gap-5 justify-center mt-35">
            {WatchsCatalogo.map((card) => (
              <div
                key={card.id}
                className="w-70 h-90 mx-auto [perspective:1000px] cursor-pointer"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-white border border-gray-200">
                    <img src={card.image} alt={card.name} />
                    <p>{card.name}</p>
                  </div>

                  {/* Back Side */}
                  <div className="flex flex-col bg-white border border-gray-200 absolute w-full h-full [backface-visibility:hidden] flex items-center justify-center rounded-md [transform:rotateY(180deg)]">
                    <p className="m-10 text-center text-sm h-35">
                      {card.description}
                    </p>
                    <p>{card.price}</p>
                    <button className="cursor-pointer px-3 py-2 bg-black text-white rounded-full mt-10">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Details */}

      <div></div>
    </div>
  );
};

export default Cards;
