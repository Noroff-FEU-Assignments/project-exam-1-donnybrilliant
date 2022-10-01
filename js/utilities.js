const navigation = document.querySelector("#navigation");
const navToggle = document.querySelector("#nav-toggle");
const navIcon = document.querySelector("#nav-icon");

navToggle.addEventListener("click", (event) => {
  const visibility = navToggle.getAttribute("aria-expanded");
  if (visibility === "false") {
    navToggle.setAttribute("aria-expanded", "true");
    navigation.style.visibility = "visible";
    navIcon.classList.remove("fa-bars");
    navIcon.classList.add("fa-xmark");
  } else if (visibility === "true") {
    navToggle.setAttribute("aria-expanded", "false");
    navigation.style.visibility = "hidden";
    navIcon.classList.remove("fa-xmark");
    navIcon.classList.add("fa-bars");
  }
});
