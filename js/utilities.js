const navigation = document.querySelector(".navigation");
const navToggle = document.querySelector(".nav-toggle");

navToggle.addEventListener("click", (event) => {
  const visibility = navigation.getAttribute("data-visible");
  if (visibility === "false") {
    navigation.setAttribute("data-visible", "true");
  } else if (visibility === "true") {
    navigation.setAttribute("data-visible", "false");
  }
  console.log(visibility);
});
