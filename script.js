document.querySelector(".menu-btn").onclick = () =>{
document.querySelector(".sidebar").classList.toggle("active")
}

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
  setTimeout(() => {
    document.getElementById("opening").classList.add("fade-out");
  }, 1500);
});
