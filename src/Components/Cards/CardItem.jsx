import React, { useState } from "react";

const CardItem = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-72 h-96 mx-auto cursor-pointer group"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Frente de la tarjeta */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg p-6 ">
          <img src={card.image} className="w-full h-48 object-contain" />
          <div className="w-full mt-4">
            <p>{card.name}</p>
          </div>
        </div>

        {/* Reverso de la tarjeta */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-between bg-white border border-gray-200 rounded-lg p-6 [transform:rotateY(180deg)]">
          <div className="w-full">
            <p className="text-sm text-black mb-4">{card.description}</p>
          </div>
          <div className="w-full">
            <p className="mb-4">${card.price}</p>
            <button className=" px-4 py-2 bg-black text-white rounded-full transition-colors">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
