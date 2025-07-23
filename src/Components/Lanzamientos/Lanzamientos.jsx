import React from "react";
import lanzamiento1 from "../../assets/lanzamiento-1.png";
import lanzamiento2 from "../../assets/lanzamiento-2.png";
import lanzamiento3 from "../../assets/lanzamiento-3.png";
import lanzamiento4 from "../../assets/lanzamiento-4.png";

const Lanzamientos = () => {
  const [stopScroll, setStopScroll] = React.useState(false);

  const cardData = [
    { title: "iPhone 16", image: lanzamiento1 },
    { title: "iPhone 16 Pro Max", image: lanzamiento2 },
    { title: "iPhone 16e", image: lanzamiento3 },
    { title: "iPhone 15", image: lanzamiento4 },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <style>{`
        @keyframes scrollLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-wrapper {
          display: flex;
          width: fit-content;
          animation: scrollLoop linear infinite;
        }
      `}</style>

      <div
        className="relative w-full max-w-6xl mx-auto overflow-hidden"
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className="absolute left-0 top-0 h-full w-12 sm:w-16 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

        <div
          className="scrolling-wrapper"
          style={{
            animationPlayState: stopScroll ? "paused" : "running",
            animationDuration: `${cardData.length * 3}s`, 
          }}
        >
          {[...cardData, ...cardData].map((card, index) => (
            <div
              key={index}
              className="w-56 h-[20rem] mx-4 flex-shrink-0 relative group hover:scale-90 transition-all duration-300 sm:w-44 sm:h-64 sm:mx-2"
            >
              <img
                src={card.image}
                alt="card"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/20 rounded-md backdrop-blur-md flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-center text-lg font-semibold sm:text-base">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-12 sm:w-16 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
};

export default Lanzamientos;
