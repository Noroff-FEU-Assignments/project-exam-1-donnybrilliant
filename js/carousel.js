const slidesContainer = document.querySelector(".carousel__slides-container");
const slide = document.querySelector(".carousel__slide");
const prevButton = document.querySelector("#carousel__arrow--previous");
const nextButton = document.querySelector("#carousel__arrow--next");

const carouselNav = document.querySelector(".carousel__nav");

/* const slideArray = Array.from(slidesContainer.children);
console.log("array from", slideArray);
console.log(slide); */

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});
