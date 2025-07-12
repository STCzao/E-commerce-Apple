import React from "react";
import { cardsCatalogo } from "../../../api";

const Cards = () => {
  return (
    <div className="flex flex-wrap items-center justify-center text-center mt-35">
      <div>
        <div id="iPhone" className="text-5xl font-semibold">{"iPhones"}</div>
        <div className="flex flex-wrap justify-center gap-4">
          {cardsCatalogo.map((cards) => (
            <div key={cards.id} className="max-w-80 mt-10">
              <div className="group">
                <img className="rounded-lg" src={cards.image} alt="img1" />
              </div>
              <p className="text-sm mt-2">{cards.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-35">
        <div id="iPad" className="text-5xl font-semibold">{"iPads"}</div>
        <div className="flex flex-wrap justify-center gap-4">
          {cardsCatalogo.map((cards) => (
            <div key={cards.id} className="max-w-80 mt-10">
              <div className="group">
                <img className="rounded-lg" src={cards.image} alt="img1" />
              </div>
              <p className="text-sm mt-2">{cards.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
