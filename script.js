const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".section, .project-card, .skill-card")
  .forEach(el => observer.observe(el));

window.addEventListener("load", () => {

let logo = document.getElementById("logo");
let opening = document.getElementById("opening");
let main = document.getElementById("main-site");

logo.style.animation = "logoRise 1.2s ease forwards";

setTimeout(() => {
logo.style.animation = "logoZoom 1s ease forwards";
},1500);

setTimeout(() => {
opening.style.display="none";
main.style.display="block";
},2500);

});
