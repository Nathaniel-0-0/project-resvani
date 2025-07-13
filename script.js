// =================== CAROUSEL SETUP ===================
const images = document.querySelectorAll(".carousel-img");
const bars = document.querySelectorAll(".fill");
const captionEl = document.getElementById("slide-caption");
const captions = [
  "Precision is Power.",
  "Built to Be Feared.",
  "Military DNA. Civilian Attitude.",
  "Beast Mode Engaged."
];
let current = 0;
let intervalId;

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.remove("active");
    bars[i].classList.remove("active");
    bars[i].style.animation = "none";
    void bars[i].offsetWidth;
    bars[i].style.animation = null;
  });
  images[index].classList.add("active");
  bars[index].classList.add("active");
  captionEl.style.opacity = 0;
  setTimeout(() => {
    captionEl.textContent = captions[index];
    captionEl.style.opacity = 1;
  }, 400);
}

function nextSlide() {
  current = (current + 1) % images.length;
  showSlide(current);
}

// =================== FADE-IN SECTIONS ===================
const faders = document.querySelectorAll(".fade-in-section");
const fadeInObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(section => fadeInObserver.observe(section));

// =================== NAV BUTTON MODAL ===================
const buildBtn = document.getElementById("build-btn");
const modal = document.getElementById("build-modal");
const closeModal = document.querySelector(".close-modal");

buildBtn.addEventListener("click", () => modal.classList.add("visible"));
closeModal.addEventListener("click", () => modal.classList.remove("visible"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("visible");
});

// =================== RIPPLE BUTTON EFFECT ===================
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    this.appendChild(circle);
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
    setTimeout(() => circle.remove(), 600);
  });
});

// =================== ARROW CONTROLS ===================
document.getElementById("arrow-right").addEventListener("click", nextSlide);
document.getElementById("arrow-left").addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  showSlide(current);
});

const arrowContainer = document.querySelector(".carousel-arrows");
document.getElementById("hero-carousel").addEventListener("mousemove", (e) => {
  const { clientX } = e;
  const boundary = 100;
  const inLeftEdge = clientX < boundary;
  const inRightEdge = clientX > window.innerWidth - boundary;
  arrowContainer.classList.toggle("show-arrows", inLeftEdge || inRightEdge);
});
new IntersectionObserver(entries => {
  entries.forEach(entry => {
    arrowContainer.style.display = entry.isIntersecting ? "flex" : "none";
  });
}, { threshold: 0.1 }).observe(document.getElementById("hero-carousel"));

// =================== SCROLL TO SHOWCASE ===================
document.getElementById("look-btn").addEventListener("click", () => {
  document.getElementById("showcase-grid").scrollIntoView({ behavior: "smooth" });
});

// =================== INTRO LOGO SHRINK & PULSE ===================
// =================== INTRO LOGO SHRINK + RED WAVE ===================
window.addEventListener("load", () => {
  const introLogo = document.getElementById("intro-logo");
  const navLogo = document.getElementById("nav-logo");
  const introLoader = document.getElementById("intro-loader");

  navLogo.style.opacity = "0"; // Hide nav logo initially

  // 1. Start carousel after intro
  setTimeout(() => {
    showSlide(current);
    intervalId = setInterval(nextSlide, 5000);
  }, 3500);

  // 2. Shrink + fade out intro logo
  setTimeout(() => {
    introLogo.classList.add("shrink");
    introLoader.classList.add("fade-out"); // 🔥 fades red screen too
  }, 2500);

  // 3. Show nav logo + wave after both fade out
  setTimeout(() => {
    navLogo.style.opacity = "1";
    navLogo.classList.add("glow-wave");
    // Inject wave burst after logo is visible
const blast = document.createElement("div");
blast.classList.add("logo-blast");
document.body.appendChild(blast);
  }, 4000);
});


