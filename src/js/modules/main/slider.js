export function initSlider() {
  const slider = document.querySelector('.slider');
  const before = document.querySelector('.slider__before');
  const beforeImage = before.querySelector('.slider__img');
  const change = document.querySelector('.slider__change');
  const body = document.body;

  let isActive = false;

  function updateImgWidth() {
    let width = slider.offsetWidth;
    beforeImage.style.width = `${width}px`;
  }

  function adjustChangePosition() {
    let currentWidth = before.offsetWidth;
    let maxWidth = slider.offsetWidth;

    if (currentWidth > maxWidth) {
      currentWidth = maxWidth;
      before.style.width = `${currentWidth}px`;
    }

    change.style.left = `${currentWidth}px`;
  }

  updateImgWidth();
  adjustChangePosition();

  window.addEventListener('resize', () => {
    updateImgWidth();
    adjustChangePosition();
  });

  change.addEventListener('mousedown', () => {
    isActive = true;
  });

  body.addEventListener('mouseup', () => {
    isActive = false;
  });

  body.addEventListener('mouseleave', () => {
    isActive = false;
  });

  const beforeAfterSlider = (x) => {
    let shift = Math.max(0, Math.min(x, slider.offsetWidth));
    before.style.width = `${shift}px`;
    change.style.left = `${shift}px`;
  };

  const pauseEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  body.addEventListener('mousemove', (e) => {
    if (!isActive) return;

    let x = e.pageX - slider.getBoundingClientRect().left;

    beforeAfterSlider(x);
    pauseEvents(e);
  });

  // Touch events
  change.addEventListener('touchstart', () => {
    isActive = true;
  });

  body.addEventListener('touchend', () => {
    isActive = false;
  });

  body.addEventListener('touchcancel', () => {
    isActive = false;
  });

  body.addEventListener('touchmove', (e) => {
    if (!isActive) return;

    let x = e.changedTouches[0].pageX - slider.getBoundingClientRect().left;

    beforeAfterSlider(x);
    pauseEvents(e);
  });
}



// export function initSlider() {
//   const slider = document.querySelector('.slider');
//   const before = document.querySelector('.slider__before');
//   const beforeImage = before.querySelector('.slider__img');
//   const change = document.querySelector('.slider__change');
//   const body = document.body;
//
//   let isActive = false;
//
//   function updateImgWidth() {
//     let width = slider.offsetWidth;
//     beforeImage.style.width = `${width}px`;
//   }
//
//   updateImgWidth();
//   window.addEventListener('resize', updateImgWidth);
//
//   change.addEventListener('mousedown', () => isActive = true);
//   body.addEventListener('mouseup', () => isActive = false);
//   body.addEventListener('mouseleave', () => isActive = false);
//
//   const beforeAfterSlider = (x) => {
//     let shift = Math.max(0, Math.min(x, slider.offsetWidth));
//     before.style.width = `${shift}px`;
//     change.style.left = `${shift}px`;
//   };
//
//   const pauseEvents = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };
//
//   body.addEventListener('mousemove', (e) => {
//     if (!isActive) return;
//     let x = e.pageX - slider.getBoundingClientRect().left;
//     beforeAfterSlider(x);
//     pauseEvents(e);
//   });
//
//   // Touch events
//   change.addEventListener('touchstart', () => isActive = true);
//   body.addEventListener('touchend', () => isActive = false);
//   body.addEventListener('touchcancel', () => isActive = false);
//
//   body.addEventListener('touchmove', (e) => {
//     if (!isActive) return;
//
//     let x = e.changedTouches[0].pageX - slider.getBoundingClientRect().left;
//
//     beforeAfterSlider(x);
//     pauseEvents(e);
//   });
// }
