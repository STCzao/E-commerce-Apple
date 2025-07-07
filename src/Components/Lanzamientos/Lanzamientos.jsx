import React from "react";
import lanzamiento1 from "../../assets/lanzamiento-1.png";
import lanzamiento2 from "../../assets/lanzamiento-2.png";
import lanzamiento3 from "../../assets/lanzamiento-3.png";
import lanzamiento4 from "../../assets/lanzamiento-4.png";

const Lanzamientos = () => {
  const [stopScroll, setStopScroll] = React.useState(false);
  const cardData = [
    {
      title: "iPhone 16",
      image: lanzamiento1,
    },
    {
      title: "iPhone 16 Pro Max",
      image: lanzamiento2,
    },
    {
      title: "iPhone 16e",
      image: lanzamiento3,
    },
    {
      title: "iPhone 15",
      image: lanzamiento4,
    },
  ];
  return (
    <>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

      <div
        className="overflow-hidden w-full relative max-w-6xl mx-auto"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#ffffff] to-transparent" />
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: cardData.length * 2500 + "ms",
          }}
        >
          <div className="flex">
            {[...cardData, ...cardData].map((card, index) => (
              <div
                key={index}
                className="w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300"
              >
                <img
                  src={card.image}
                  alt="card"
                  className="w-full h-full object-cover"
                />
                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20">
                  <p className="text-white text-lg font-semibold text-center">
                    {card.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#ffffff] to-transparent" />
      </div>
      <div className="flex flex-column bg-black text-white items-center border hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 md:mt-10">
        <button className="flex items-center gap-2 font-medium">
          <span>Explorá nuestro catálogo</span>
        </button>
      </div>
    </>
  );
};

export default Lanzamientos;
