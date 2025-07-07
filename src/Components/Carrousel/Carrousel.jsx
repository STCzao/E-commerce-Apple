import React from "react";

const Carrousel = () => {
  const slider = document.getElementById("slider");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  let currentSlide = 0;
  const totalSlides = slider.children.length;

  function goToSlide(index) {
    const slideWidth = slider.children[0].clientWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  let slideInterval = setInterval(nextSlide, 3000);

  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  window.addEventListener("resize", () => goToSlide(currentSlide));

  goToSlide(currentSlide);

  return (
    <div>
      <div class="flex items-center">
        <button
          id="prev"
          class="md:p-2 p-1 bg-black/30 md:mr-6 mr-2 rounded-full hover:bg-black/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div class="w-full max-w-3xl overflow-hidden relative">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            id="slider"
          >
            
          </div>
        </div>

        <button
          id="next"
          class="p-1 md:p-2 bg-black/30 md:ml-6 ml-2 rounded-full hover:bg-black/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carrousel;
