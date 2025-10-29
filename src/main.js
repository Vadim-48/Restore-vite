import { initPopupToggle } from './js/modules/popup.js';

document.addEventListener("DOMContentLoaded", () => {
  initPopupToggle();
});
// import './style.scss';
// import logoUrl from './img/base/header/logo.svg';

if (import.meta.hot) {
  import.meta.hot.on('some-event', () => {
    window.location.reload(); // повне перезавантаження сторінки
  });
}


// const container = document.getElementById('logo-container');
// const img = document.createElement('img');
// img.src = logoUrl;   // підставляємо шлях від Vite
// img.alt = 'Logo';
// img.className = 'logo'; // можна додати клас для стилів
// if (container) {
//   container.appendChild(img);
// } else {
//   console.error('Container #logo-container not found');
// }