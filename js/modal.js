const modal = document.querySelector("#modal");
const modalImage = modal.querySelector("#image");
const modalImageAlt = modal.querySelector("#caption");

const allImages = blogContainer.querySelectorAll("img");

allImages.forEach((img) =>
  img.addEventListener("click", () => {
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalImageAlt.innerText = img.alt;
    modal.style.display = "block";
  })
);

document.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Escape") modal.style.display = "none";
});

//console.log(allImages);
