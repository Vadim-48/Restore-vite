export function headerScroll() {
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header__wrap');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 0);
    }
  });
}