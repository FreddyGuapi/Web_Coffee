document.addEventListener("DOMContentLoaded", function () {
  runApp();

  try {
    createGaleri();
  } catch (error) {
    //console.log(error)
  }
});

function runApp() {
  navigationFija();
  hamburger();
}

function hamburger() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".main_navigation");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

function navigationFija() {
  const barra = document.querySelector(".header");
  const video = document.querySelector("#navbar");
  const body = document.querySelector("body");
  window.addEventListener("scroll", function () {
    if (video.getBoundingClientRect().top < 0) {
      barra.classList.add("fijo");
      body.classList.add("body_scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body_scroll");
    }
  });
}

//GALLERY

function createGaleri() {
  const btnClosse = document.querySelector(".btn-closse");
  const btnAdvance = document.querySelector(".btn-advance");
  const btnReturn = document.querySelector(".btn-return");
  const images = document.querySelectorAll(".gallery picture img");
  const lightbox = document.querySelector(".gallery_container");
  const activePicture = document.querySelector(".active_picture img ");
  let indexImages = 0;

  images.forEach((images) => {
    images.addEventListener("click", (event) => {
      activePicture.src = event.target.src;
      lightbox.style.display = "flex";
      indexImages = Array.from(images).indexOf(event.target);
    });
  });

  btnClosse.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  btnAdvance.addEventListener("click", () => {
    if (indexImages === images.length - 1) {
      indexImages = -1;
    }
    activePicture.src = images[indexImages + 1].src;
    indexImages++;
  });

  btnReturn.addEventListener("click", () => {
    if (indexImages === 0) {
      indexImages = images.length;
    }
    activePicture.src = images[indexImages - 1].src;
    indexImages--;
  });
}
