import React, { useEffect, useRef } from "react";
import slide1 from "../../assets/carrousel-1.png";
import slide2 from "../../assets/carrousel-2.png";
import slide3 from "../../assets/carrousel-3.png";
import slide4 from "../../assets/carrousel-4.png";
import slide5 from "../../assets/carrousel-5.png";

const Carrousel = () => {
  const sliderRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const currentSlide = useRef(0);
  let slideInterval = useRef(null);

  const goToSlide = (index) => {
    const slider = sliderRef.current;
    if (slider && slider.children.length > 0) {
      const slideWidth = slider.children[0].clientWidth;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
    }
  };

  const nextSlide = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const totalSlides = slider.children.length;
    currentSlide.current = (currentSlide.current + 1) % totalSlides;
    goToSlide(currentSlide.current);
  };

  const prevSlide = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const totalSlides = slider.children.length;
    currentSlide.current =
      (currentSlide.current - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide.current);
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(nextSlide, 3000);
  };

  useEffect(() => {
    const next = nextButtonRef.current;
    const prev = prevButtonRef.current;

    slideInterval.current = setInterval(nextSlide, 3000);
    goToSlide(0);

    if (next && prev) {
      next.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
      prev.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    window.addEventListener("resize", () => goToSlide(currentSlide.current));

    return () => {
      clearInterval(slideInterval.current);
      window.removeEventListener("resize", () =>
        goToSlide(currentSlide.current)
      );
    };
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <button
          ref={prevButtonRef}
          className="md:p-2 p-1 bg-black/30 md:mr-6 mr-2 rounded-full hover:bg-black/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="w-full max-w-3xl overflow-hidden relative rounded">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            ref={sliderRef}
          >
            <img src={slide1} className="w-full flex-shrink-0" alt="Slide 1" />
            <img src={slide2} className="w-full flex-shrink-0" alt="Slide 2" />
            <img src={slide3} className="w-full flex-shrink-0" alt="Slide 3" />
            <img src={slide4} className="w-full flex-shrink-0" alt="Slide 4" />
            <img src={slide5} className="w-full flex-shrink-0" alt="Slide 5" />
          </div>
        </div>
        <button
          ref={nextButtonRef}
          className="p-1 md:p-2 bg-black/30 md:ml-6 ml-2 rounded-full hover:bg-black/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex bg-black text-white items-center gap-2 border hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
        <button className="flex items-center gap-1 font-medium">
          <span>Sumergite en el mundo Apple</span>
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
