export function burger() {
  const navMenu = document.querySelector(".burger__wrapper");
  const burger = document.querySelector(".nav__burger");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav__item-link");

  const toggleMenu = () => {
    navMenu.classList.toggle("active");
    burger.classList.toggle("active");
    body.classList.toggle("lock");
  };

  const closeMenu = () => {
    navMenu.classList.remove("active");
    burger.classList.remove("active");
    body.classList.remove("lock");
  };

  burger.addEventListener("click", toggleMenu);
  navLinks.forEach(link => link.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1420) {
      closeMenu();
    }
  });
}