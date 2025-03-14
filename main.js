const slides = document.querySelectorAll(".slider .slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const imgId = document.querySelector(".img-id");
const slider = document.querySelector(".slider");
const fullScreenBtn = document.querySelector(".full-screen");
const screen = document.querySelector(".screen");

const galleryContainer = document.querySelector(".gallery-container");
galleryContainer.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`;
let currentSlide = 0;

let touchStartX = 0;
let touchEndX = 0;

//  Auto-Play with Pause on Hover
let autoSlide = setInterval(() => {
  goToSlide(currentSlide + 1);
}, 3000);

slider.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 3000);
});

// galleryContainer.addEventListener("mouseleave", () => {});

updateSliderControls();

updateThumbnailActiveState(currentSlide);

function goToSlide(n) {
  // Remove Active Class from the current slide
  slides[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  updateThumbnailActiveState(currentSlide);
  updateSliderControls();
}

prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
});
nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
});

function updateSliderControls() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === slides.length - 1;
  imgId.innerHTML = `Image ${currentSlide + 1} of ${slides.length}`;
}

slides.forEach((img, index) => {
  const thumbnail = img.cloneNode();

  thumbnail.addEventListener("click", () => {
    goToSlide(index);
  });
  galleryContainer.appendChild(thumbnail);
});

function updateThumbnailActiveState(index) {
  galleryContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

//  Keyboard Navigation

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    goToSlide(currentSlide - 1);
  } else if (event.key === "ArrowRight") {
    goToSlide(currentSlide + 1);
  }
});

// Keyboard Shortcut for Auto-Play Toggle

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    } else {
      autoSlide = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 3000);
    }
  }
});

// Full screen img on clicking the slide

slides.forEach((img, i) => {
  fullScreenBtn.addEventListener("click", () => {
    if (currentSlide === i) {
      const imgCopy = img.cloneNode();
      screen.innerHTML = "";
      screen.appendChild(imgCopy);
      screen.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  });
});

screen.addEventListener("click", () => {
  screen.style.display = "none";
  screen.innerHTML = "";
  document.body.style.overflow = "auto";
});

document.querySelector(".slider").addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    goToSlide(currentSlide + 1);
  } else if (touchEndX - touchStartX > 50) {
    goToSlide(currentSlide - 1);
  }
}
