export function initPopupToggle() {
  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 800;

  popupLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Перевірка форми перед відкриттям попапу
      if (window.validateForm && !window.validateForm()) {
        e.preventDefault();
        return;
      }

      const popupName = link.dataset.popupTarget?.replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  });

  const popupCloseIcon = document.querySelectorAll('.close-popup');
  popupCloseIcon.forEach(el => {
    el.addEventListener('click', function(e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  });

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function(e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock && popupActive) {
      popupActive.classList.remove('open');
      if (doUnlock) bodyUnlock();
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.body').offsetWidth + 'px';

    lockPadding.forEach(el => el.style.paddingRight = lockPaddingValue);
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock-popup');

    unlock = false;
    setTimeout(() => { unlock = true; }, timeout);
  }

  function bodyUnlock() {
    setTimeout(() => {
      lockPadding.forEach(el => el.style.paddingRight = '0px');
      body.style.paddingRight = '0px';
      body.classList.remove('lock-popup');
    }, timeout);

    unlock = false;
    setTimeout(() => { unlock = true; }, timeout);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });
}
